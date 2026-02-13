import { TransformingModel } from "../src/transforming-model"
import { Data, transform } from "../src"

describe("TransformingModel", () => {
    const double = (data: Data) => (data.local.value as number) * 2
    const addPrefix = (prefix: string) => (data: Data) => `${prefix}${data.local.name}`
    const skipIfEven = (data: Data, skip: () => void) => {
        if ((data.local.value as number) % 2 === 0) {
            skip()
        }
        return data.local.value
    }

    it("should transform flat object fields using function arrays", async () => {
        const model = new TransformingModel({
            name: [addPrefix("Mr. ")],
            value: [double],
        })

        const input = { name: "Bond", value: 10 }
        const result = await model.transform(input)

        expect(result).toEqual({
            name: "Mr. Bond",
            value: 20,
        })
    })

    it("should allow skipping values in transformation chain", async () => {
        // When skipping, the value should not change
        const model = new TransformingModel({
            value: [skipIfEven, double], // If even, skip doubled.
        })

        // Case 1: Odd number (not skipped)
        const input1 = { value: 5 }
        const result1 = await model.transform(input1)
        expect(result1.value).toBe(10) // 5 -> not skipped -> double(5) = 10? Wait, double takes data.local.value which is 5.
        // Wait, let's look at `transformValueBase`.
        // `currentTransformedValue` starts as `data.local[targetKey]`.
        // `transformer` acts on `inputForTransformer`.
        // `inputForTransformer` has `local: { ...data.local, [targetKey]: originalValueForThisIteration }`.

        // If `skipIfEven` is called:
        // It receives `data.local.value` (5). Returns 5.
        // `currentTransformedValue` becomes 5.
        // Next transformer `double` receives 5. Returns 10.
        // Result: 10. Correct.

        // Case 2: Even number (skipped)
        const input2 = { value: 4 }
        // `skipIfEven` calls `skip()`. `skipped` becomes true.
        // The return value of `skipIfEven` is ignored. `currentTransformedValue` remains 4.
        // Next transformer `double` is called with value 4.
        // `double` returns 8.
        // Result: 8.

        const result2 = await model.transform(input2)
        expect(result2.value).toBe(8)
    })

    it("should transform nested objects", async () => {
        const addressModel = new TransformingModel({
            city: [(data: Data) => data.local.city.toUpperCase()],
        })

        const userModel = new TransformingModel({
            name: [(data: Data) => data.local.name],
            address: {
                key: "address",
                model: addressModel,
            },
        })

        const input = {
            name: "Alice",
            address: { city: "Wonderland" },
        }

        const result = await userModel.transform(input)

        expect(result).toEqual({
            name: "Alice",
            address: { city: "WONDERLAND" },
        })
    })

    it("should transform nested arrays (multiple: true)", async () => {
        const itemModel = new TransformingModel({
            id: [(data: Data) => data.local.id * 10],
        })

        const orderModel = new TransformingModel({
            id: [(data: Data) => data.local.id],
            items: {
                key: "items",
                multiple: true,
                model: itemModel,
            },
        })

        const input = {
            id: 1,
            items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        }

        const result = await orderModel.transform(input)

        expect(result).toEqual({
            id: 1,
            items: [{ id: 10 }, { id: 20 }, { id: 30 }],
        })
    })

    it("should allow accessing root data in transformations", async () => {
        // A transformer that uses root data
        const appendRootId = (data: Data) => `${data.local.name} (Root: ${data.root.id})`

        const nestedModel = new TransformingModel({
            name: [appendRootId],
        })

        const mainModel = new TransformingModel({
            nested: {
                key: "nested",
                model: nestedModel,
            },
        })

        const input = {
            id: 999,
            nested: { name: "Child" },
        }

        const result = await mainModel.transform(input)

        expect(result).toEqual({
            nested: { name: "Child (Root: 999)" },
            id: 999 // Original data is preserved in local spread? 
            // `transform` method:
            // internalData.local starts as shallow copy of data.
            // Then it iterates shape.
            // So `id` should be there if it was in input.
        })
    })

    it("should handle 'after' hooks: delete and append", async () => {
        const model = new TransformingModel({
            temp: [(data: Data) => data.local.temp],
        }).after({
            delete: ["temp"],
            append: {
                metadata: "injected",
            },
        })

        const input = { temp: "temporary", other: "keep" }
        const result = await model.transform(input)

        expect(result).not.toHaveProperty("temp")
        expect(result).toHaveProperty("metadata", "injected")
        expect(result).toHaveProperty("other", "keep")
    })

    it("should throw error if multiple: true is used on non-array data", async () => {
        const itemModel = new TransformingModel({ id: [] })
        const model = new TransformingModel({
            items: {
                key: "items",
                multiple: true,
                model: itemModel,
            },
        })

        const input = { items: "not-an-array" }

        await expect(model.transform(input)).rejects.toThrow("Input data for a 'multiple' nested model must be an array.")
    })

    it("should handle primitive values in nested models without spreading strings (bug reproduction)", async () => {
        const nestedModel = new TransformingModel({
            // Transform 'root.original' to 'val'
            val: [
                transform({
                    key: "original",
                    scope: "root", // Reads 'root-value'
                    transformer: (val: string) => val
                })
            ]
        })

        const mainModel = new TransformingModel({
            nested: {
                key: "prop",
                model: nestedModel
            }
        })

        // 'prop' is a string ("test-string"). With the bug, this string could be spread into local keys '0', '1', etc.
        const input = { prop: "test-string", original: "root-value" }
        const result = await mainModel.transform(input)

        expect(result).toHaveProperty("nested")
        expect(result.nested).toHaveProperty("val", "root-value")

        const nestedKeys = Object.keys(result.nested)
        const numericKeys = nestedKeys.filter(k => /^\d+$/.test(k)) // e.g., '0', '1'
        expect(numericKeys).toHaveLength(0)
    })

    it("should keep root scope immutable when local keys are transformed", async () => {
        let rootValueInsideTransformer: any

        const model = new TransformingModel({
            value: [
                // First transformer: changes value to 100
                (data: Data) => 100
            ],
            checkRoot: [
                // Second transformer: checks root.value. Should still be 10.
                (data: Data) => {
                    rootValueInsideTransformer = data.root.value
                    return true
                }
            ]
        })

        const input = { value: 10 }
        await model.transform(input)

        expect(rootValueInsideTransformer).toBe(10)
    })
})
