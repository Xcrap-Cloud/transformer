import { ArrayTransformer } from "../src"

describe("ArrayTransformer", () => {
    describe("join", () => {
        it("joins array with separator", () => {
            expect(ArrayTransformer.join(",")(["a", "b", "c"])).toBe("a,b,c")
        })
    })

    describe("filter", () => {
        it("filters array by predicate", () => {
            const isEven = (n: number) => n % 2 === 0
            expect(ArrayTransformer.filter(isEven)([1, 2, 3, 4])).toEqual([2, 4])
        })
    })

    describe("map", () => {
        it("maps array items", () => {
            const double = (n: number) => n * 2
            expect(ArrayTransformer.map(double)([1, 2, 3])).toEqual([2, 4, 6])
        })
    })

    describe("unique", () => {
        it("removes duplicates", () => {
            expect(ArrayTransformer.unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3])
        })
    })

    describe("sort", () => {
        it("sorts array with default compare", () => {
            expect(ArrayTransformer.sort()([3, 1, 2])).toEqual([1, 2, 3])
        })
        it("sorts array with custom compare", () => {
            const desc = (a: number, b: number) => b - a
            expect(ArrayTransformer.sort(desc)([1, 3, 2])).toEqual([3, 2, 1])
        })
    })

    describe("reduce", () => {
        it("reduces array to single value", () => {
            const sum = (acc: number, n: number) => acc + n
            expect(ArrayTransformer.reduce(sum, 0)([1, 2, 3])).toBe(6)
        })
    })

    describe("compact", () => {
        it("removes falsy values", () => {
            expect(ArrayTransformer.compact([0, 1, false, 2, "", 3, null, undefined])).toEqual([1, 2, 3])
        })
    })

    describe("first", () => {
        it("returns first element", () => {
            expect(ArrayTransformer.first()( [1, 2, 3] )).toBe(1)
        })
        it("returns default if array is empty", () => {
            expect(ArrayTransformer.first(42)([])).toBe(42)
        })
    })

    describe("last", () => {
        it("returns last element", () => {
            expect(ArrayTransformer.last()( [1, 2, 3] )).toBe(3)
        })
        it("returns default if array is empty", () => {
            expect(ArrayTransformer.last(99)([])).toBe(99)
        })
    })

    describe("chunk", () => {
        it("chunks array into groups of size", () => {
            expect(ArrayTransformer.chunk(2)([1, 2, 3, 4, 5])).toEqual([[1,2],[3,4],[5]])
        })
        it("returns whole array if size <= 0", () => {
            expect(ArrayTransformer.chunk(0)([1,2,3])).toEqual([[1,2,3]])
        })
    })

    describe("toNumbers", () => {
        it("converts string array to numbers", () => {
            expect(ArrayTransformer.toNumbers(["1", "2.5", "$3", "abc", "-4"])).toEqual([1, 2.5, 3, 0, -4])
        })
    })

    describe("sum", () => {
        it("sums numbers in array", () => {
            expect(ArrayTransformer.sum([1, 2, 3, 4])).toBe(10)
        })
        it("returns 0 for empty array", () => {
            expect(ArrayTransformer.sum([])).toBe(0)
        })
    })
})