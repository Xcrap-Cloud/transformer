import { AnyValidator } from "../src"

describe("AnyValidator", () => {
    describe("isString", () => {
        it("should return true for strings", () => {
            expect(AnyValidator.isString("hello")).toBe(true)
        })
        it("should return false for non-strings", () => {
            expect(AnyValidator.isString(123)).toBe(false)
            expect(AnyValidator.isString({})).toBe(false)
            expect(AnyValidator.isString([])).toBe(false)
            expect(AnyValidator.isString(null)).toBe(false)
            expect(AnyValidator.isString(undefined)).toBe(false)
        })
    })

    describe("isNumber", () => {
        it("should return true for numbers", () => {
            expect(AnyValidator.isNumber(123)).toBe(true)
            expect(AnyValidator.isNumber(0)).toBe(true)
            expect(AnyValidator.isNumber(-1)).toBe(true)
            expect(AnyValidator.isNumber(NaN)).toBe(true)
            expect(AnyValidator.isNumber(Infinity)).toBe(true)
        })
        it("should return false for non-numbers", () => {
            expect(AnyValidator.isNumber("123")).toBe(false)
            expect(AnyValidator.isNumber({})).toBe(false)
            expect(AnyValidator.isNumber([])).toBe(false)
            expect(AnyValidator.isNumber(null)).toBe(false)
            expect(AnyValidator.isNumber(undefined)).toBe(false)
        })
    })

    describe("isArray", () => {
        it("should return true for arrays", () => {
            expect(AnyValidator.isArray([])).toBe(true)
            expect(AnyValidator.isArray([1, 2, 3])).toBe(true)
        })
        it("should return false for non-arrays", () => {
            expect(AnyValidator.isArray({})).toBe(false)
            expect(AnyValidator.isArray("array")).toBe(false)
            expect(AnyValidator.isArray(123)).toBe(false)
            expect(AnyValidator.isArray(null)).toBe(false)
            expect(AnyValidator.isArray(undefined)).toBe(false)
        })
    })

    describe("isBigint", () => {
        it("should return true for bigints", () => {
            expect(AnyValidator.isBigint(BigInt(123))).toBe(true)
        })
        it("should return false for non-bigints", () => {
            expect(AnyValidator.isBigint(123)).toBe(false)
            expect(AnyValidator.isBigint("123")).toBe(false)
            expect(AnyValidator.isBigint(null)).toBe(false)
            expect(AnyValidator.isBigint(undefined)).toBe(false)
        })
    })

    describe("isFunction", () => {
        it("should return true for functions", () => {
            expect(AnyValidator.isFunction(() => {})).toBe(true)
            expect(AnyValidator.isFunction(function() {})).toBe(true)
        })
        it("should return false for non-functions", () => {
            expect(AnyValidator.isFunction(123)).toBe(false)
            expect(AnyValidator.isFunction("fn")).toBe(false)
            expect(AnyValidator.isFunction(null)).toBe(false)
            expect(AnyValidator.isFunction(undefined)).toBe(false)
        })
    })

    describe("isSymbol", () => {
        it("should return true for symbols", () => {
            expect(AnyValidator.isSymbol(Symbol("sym"))).toBe(true)
        })
        it("should return false for non-symbols", () => {
            expect(AnyValidator.isSymbol(123)).toBe(false)
            expect(AnyValidator.isSymbol("sym")).toBe(false)
            expect(AnyValidator.isSymbol(null)).toBe(false)
            expect(AnyValidator.isSymbol(undefined)).toBe(false)
        })
    })

    describe("isObject", () => {
        it("should return true for objects", () => {
            expect(AnyValidator.isObject({})).toBe(true)
        })
        it("should return false for non-objects", () => {
            expect(AnyValidator.isObject(123)).toBe(false)
            expect(AnyValidator.isObject("obj")).toBe(false)
            expect(AnyValidator.isObject(undefined)).toBe(false)
            expect(AnyValidator.isObject([])).toBe(false)
            expect(AnyValidator.isObject(null)).toBe(false)
        })
    })

    describe("isBoolean", () => {
        it("should return true for booleans", () => {
            expect(AnyValidator.isBoolean(true)).toBe(true)
            expect(AnyValidator.isBoolean(false)).toBe(true)
        })
        it("should return false for non-booleans", () => {
            expect(AnyValidator.isBoolean(0)).toBe(false)
            expect(AnyValidator.isBoolean("true")).toBe(false)
            expect(AnyValidator.isBoolean(null)).toBe(false)
            expect(AnyValidator.isBoolean(undefined)).toBe(false)
        })
    })

    describe("isUndefined", () => {
        it("should return true for undefined", () => {
            expect(AnyValidator.isUndefined(undefined)).toBe(true)
        })
        it("should return false for defined values", () => {
            expect(AnyValidator.isUndefined(null)).toBe(false)
            expect(AnyValidator.isUndefined(0)).toBe(false)
            expect(AnyValidator.isUndefined("")).toBe(false)
            expect(AnyValidator.isUndefined({})).toBe(false)
        })
    })

    describe("isNull", () => {
        it("should return true for null", () => {
            expect(AnyValidator.isNull(null)).toBe(true)
        })
        it("should return false for non-null values", () => {
            expect(AnyValidator.isNull(undefined)).toBe(false)
            expect(AnyValidator.isNull(0)).toBe(false)
            expect(AnyValidator.isNull("")).toBe(false)
            expect(AnyValidator.isNull({})).toBe(false)
        })
    })
})