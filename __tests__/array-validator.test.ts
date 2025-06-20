import { ArrayValidator } from "../src"

describe("ArrayValidator", () => {
    describe("isEmpty", () => {
        it("should return true for empty array", () => {
            expect(ArrayValidator.isEmpty([])).toBe(true)
        })
        it("should return false for non-empty array", () => {
            expect(ArrayValidator.isEmpty([1])).toBe(false)
        })
    })

    describe("isNotEmpty", () => {
        it("should return false for empty array", () => {
            expect(ArrayValidator.isNotEmpty([])).toBe(false)
        })
        it("should return true for non-empty array", () => {
            expect(ArrayValidator.isNotEmpty([1])).toBe(true)
        })
    })

    describe("minLength", () => {
        it("should return true if array length >= min", () => {
            expect(ArrayValidator.minLength(2)([1, 2])).toBe(true)
            expect(ArrayValidator.minLength(2)([1, 2, 3])).toBe(true)
        })
        it("should return false if array length < min", () => {
            expect(ArrayValidator.minLength(3)([1, 2])).toBe(false)
        })
    })

    describe("maxLength", () => {
        it("should return true if array length <= max", () => {
            expect(ArrayValidator.maxLength(2)([1, 2])).toBe(true)
            expect(ArrayValidator.maxLength(3)([1, 2])).toBe(true)
        })
        it("should return false if array length > max", () => {
            expect(ArrayValidator.maxLength(1)([1, 2])).toBe(false)
        })
    })

    describe("exactLength", () => {
        it("should return true if array length === length", () => {
            expect(ArrayValidator.exactLength(2)([1, 2])).toBe(true)
        })
        it("should return false if array length !== length", () => {
            expect(ArrayValidator.exactLength(3)([1, 2])).toBe(false)
        })
    })

    describe("every", () => {
        it("should return true if every item matches predicate", () => {
            expect(ArrayValidator.every((x: number) => x > 0)([1, 2, 3])).toBe(true)
        })
        it("should return false if any item does not match predicate", () => {
            expect(ArrayValidator.every((x: number) => x > 0)([1, -2, 3])).toBe(false)
        })
    })

    describe("some", () => {
        it("should return true if some item matches predicate", () => {
            expect(ArrayValidator.some((x: number) => x > 2)([1, 2, 3])).toBe(true)
        })
        it("should return false if no item matches predicate", () => {
            expect(ArrayValidator.some((x: number) => x > 3)([1, 2, 3])).toBe(false)
        })
    })

    describe("includes", () => {
        it("should return true if item is included", () => {
            expect(ArrayValidator.includes(2)([1, 2, 3])).toBe(true)
        })
        it("should return false if item is not included", () => {
            expect(ArrayValidator.includes(4)([1, 2, 3])).toBe(false)
        })
    })

    describe("isUniformType", () => {
        it("should return true for empty array", () => {
            expect(ArrayValidator.isUniformType([])).toBe(true)
        })
        it("should return true if all items are of same type", () => {
            expect(ArrayValidator.isUniformType([1, 2, 3])).toBe(true)
            expect(ArrayValidator.isUniformType(["a", "b"])).toBe(true)
        })
        it("should return false if items are of different types", () => {
            expect(ArrayValidator.isUniformType([1, "a"])).toBe(false)
        })
    })

    describe("isAllStrings", () => {
        it("should return true if all items are strings", () => {
            expect(ArrayValidator.isAllStrings(["a", "b"])).toBe(true)
        })
        it("should return false if any item is not a string", () => {
            expect(ArrayValidator.isAllStrings(["a", 1])).toBe(false)
        })
    })

    describe("isAllNumbers", () => {
        it("should return true if all items are numbers", () => {
            expect(ArrayValidator.isAllNumbers([1, 2, 3])).toBe(true)
        })
        it("should return false if any item is not a number", () => {
            expect(ArrayValidator.isAllNumbers([1, "2"])).toBe(false)
        })
    })

    describe("isAllBooleans", () => {
        it("should return true if all items are booleans", () => {
            expect(ArrayValidator.isAllBooleans([true, false])).toBe(true)
        })
        it("should return false if any item is not a boolean", () => {
            expect(ArrayValidator.isAllBooleans([true, 0])).toBe(false)
        })
    })

    describe("hasNoDuplicates", () => {
        it("should return true if array has no duplicates", () => {
            expect(ArrayValidator.hasNoDuplicates([1, 2, 3])).toBe(true)
        })
        it("should return false if array has duplicates", () => {
            expect(ArrayValidator.hasNoDuplicates([1, 2, 2])).toBe(false)
        })
    })

    describe("isSorted", () => {
        it("should return true for ascending sorted array", () => {
            expect(ArrayValidator.isSorted("asc")([1, 2, 3])).toBe(true)
        })
        it("should return false for unsorted array (asc)", () => {
            expect(ArrayValidator.isSorted("asc")([3, 2, 1])).toBe(false)
        })
        it("should return true for descending sorted array", () => {
            expect(ArrayValidator.isSorted("desc")([3, 2, 1])).toBe(true)
        })
        it("should return false for unsorted array (desc)", () => {
            expect(ArrayValidator.isSorted("desc")([1, 2, 3])).toBe(false)
        })
        it("should return true for empty array", () => {
            expect(ArrayValidator.isSorted("asc")([])).toBe(true)
        })
        it("should return true for single element array", () => {
            expect(ArrayValidator.isSorted("asc")([1])).toBe(true)
        })
    })

    describe("isAllTruthy", () => {
        it("should return true if all items are truthy", () => {
            expect(ArrayValidator.isAllTruthy([1, "a", true, {}])).toBe(true)
        })
        it("should return false if any item is falsy", () => {
            expect(ArrayValidator.isAllTruthy([1, 0, "a"])).toBe(false)
        })
    })

    describe("isAllFalsy", () => {
        it("should return true if all items are falsy", () => {
            expect(ArrayValidator.isAllFalsy([0, "", false, null, undefined])).toBe(true)
        })
        it("should return false if any item is truthy", () => {
            expect(ArrayValidator.isAllFalsy([0, 1, false])).toBe(false)
        })
    })
})