import { NumberValidator } from "../src"

describe("NumberValidator", () => {
    describe("isValid", () => {
        it("should return true for valid numbers", () => {
            expect(NumberValidator.isValid(123)).toBe(true)
            expect(NumberValidator.isValid(0)).toBe(true)
            expect(NumberValidator.isValid(-5)).toBe(true)
        })
        it("should return false for NaN and Infinity", () => {
            expect(NumberValidator.isValid(NaN)).toBe(false)
            expect(NumberValidator.isValid(Infinity)).toBe(false)
        })
    })

    describe("isInteger", () => {
        it("should return true for integers", () => {
            expect(NumberValidator.isInteger(5)).toBe(true)
            expect(NumberValidator.isInteger(-10)).toBe(true)
            expect(NumberValidator.isInteger(0)).toBe(true)
        })
        it("should return false for non-integers", () => {
            expect(NumberValidator.isInteger(1.5)).toBe(false)
            expect(NumberValidator.isInteger(-2.3)).toBe(false)
        })
        it("should return false for NaN and Infinity", () => {
            expect(NumberValidator.isInteger(NaN)).toBe(false)
            expect(NumberValidator.isInteger(Infinity)).toBe(false)
            expect(NumberValidator.isInteger(-Infinity)).toBe(false)
        })
    })

    describe("isFloat", () => {
        it("should return true for float numbers", () => {
            expect(NumberValidator.isFloat(1.5)).toBe(true)
            expect(NumberValidator.isFloat(-2.3)).toBe(true)
            expect(NumberValidator.isFloat(0.0001)).toBe(true)
            expect(NumberValidator.isFloat(-0.999)).toBe(true)
        })

        it("should return false for integer numbers", () => {
            expect(NumberValidator.isFloat(0)).toBe(false)
            expect(NumberValidator.isFloat(1)).toBe(false)
            expect(NumberValidator.isFloat(-10)).toBe(false)
            expect(NumberValidator.isFloat(100000)).toBe(false)
        })

        it("should return false for NaN and Infinity", () => {
            expect(NumberValidator.isFloat(NaN)).toBe(false)
            expect(NumberValidator.isFloat(Infinity)).toBe(false)
            expect(NumberValidator.isFloat(-Infinity)).toBe(false)
        })
    })

    describe("isPositiveInfinity", () => {
        it("should return true for positive Infinity", () => {
            expect(NumberValidator.isPositiveInfinity(Infinity)).toBe(true)
        })

        it("should return false for negative Infinity", () => {
            expect(NumberValidator.isPositiveInfinity(-Infinity)).toBe(false)
        })

        it("should return false for finite numbers", () => {
            expect(NumberValidator.isPositiveInfinity(123)).toBe(false)
            expect(NumberValidator.isPositiveInfinity(0)).toBe(false)
            expect(NumberValidator.isPositiveInfinity(-123)).toBe(false)
        })
    })

    describe("isNegativeInfinity", () => {
        it("should return true for negative Infinity", () => {
            expect(NumberValidator.isNegativeInfinity(-Infinity)).toBe(true)
        })

        it("should return false for positive Infinity", () => {
            expect(NumberValidator.isNegativeInfinity(Infinity)).toBe(false)
        })

        it("should return false for finite numbers", () => {
            expect(NumberValidator.isNegativeInfinity(123)).toBe(false)
            expect(NumberValidator.isNegativeInfinity(0)).toBe(false)
            expect(NumberValidator.isNegativeInfinity(-123)).toBe(false)
        })
    })

    describe("isInfinity", () => {
        it("should return true for positive Infinity", () => {
            expect(NumberValidator.isInfinity(Infinity)).toBe(true)
        })

        it("should return true for negative Infinity", () => {
            expect(NumberValidator.isInfinity(-Infinity)).toBe(true)
        })

        it("should return false for finite numbers", () => {
            expect(NumberValidator.isInfinity(0)).toBe(false)
            expect(NumberValidator.isInfinity(123)).toBe(false)
            expect(NumberValidator.isInfinity(-123)).toBe(false)
        })

        it("should return false for NaN", () => {
            expect(NumberValidator.isInfinity(NaN)).toBe(false)
        })
    })

    describe("isGreaterThan", () => {
        it("should return true if value is greater than min", () => {
            const fn = NumberValidator.isGreaterThan(10)
            expect(fn(11)).toBe(true)
        })
        it("should return false if value is not greater than min", () => {
            const fn = NumberValidator.isGreaterThan(10)
            expect(fn(10)).toBe(false)
            expect(fn(9)).toBe(false)
        })
    })

    describe("isGreaterThanOrEqual", () => {
        it("should return true if value is greater than or equal to min", () => {
            const fn = NumberValidator.isGreaterThanOrEqual(5)
            expect(fn(5)).toBe(true)
            expect(fn(6)).toBe(true)
        })
        it("should return false if value is less than min", () => {
            const fn = NumberValidator.isGreaterThanOrEqual(5)
            expect(fn(4)).toBe(false)
        })
    })

    describe("isLessThan", () => {
        it("should return true if value is less than max", () => {
            const fn = NumberValidator.isLessThan(10)
            expect(fn(9)).toBe(true)
        })
        it("should return false if value is not less than max", () => {
            const fn = NumberValidator.isLessThan(10)
            expect(fn(10)).toBe(false)
            expect(fn(11)).toBe(false)
        })
    })

    describe("isLessThanOrEqual", () => {
        it("should return true if value is less than or equal to max", () => {
            const fn = NumberValidator.isLessThanOrEqual(7)
            expect(fn(7)).toBe(true)
            expect(fn(6)).toBe(true)
        })
        it("should return false if value is greater than max", () => {
            const fn = NumberValidator.isLessThanOrEqual(7)
            expect(fn(8)).toBe(false)
        })
    })

    describe("isInRange", () => {
        it("should return true if value is within range", () => {
            const fn = NumberValidator.isInRange(1, 5)
            expect(fn(1)).toBe(true)
            expect(fn(3)).toBe(true)
            expect(fn(5)).toBe(true)
        })
        it("should return false if value is outside range", () => {
            const fn = NumberValidator.isInRange(1, 5)
            expect(fn(0)).toBe(false)
            expect(fn(6)).toBe(false)
        })
    })

    describe("isPositive", () => {
        it("should return true for positive numbers", () => {
            expect(NumberValidator.isPositive(1)).toBe(true)
            expect(NumberValidator.isPositive(100)).toBe(true)
        })
        it("should return false for zero or negative numbers", () => {
            expect(NumberValidator.isPositive(0)).toBe(false)
            expect(NumberValidator.isPositive(-1)).toBe(false)
        })
    })

    describe("isNegative", () => {
        it("should return true for negative numbers", () => {
            expect(NumberValidator.isNegative(-1)).toBe(true)
            expect(NumberValidator.isNegative(-100)).toBe(true)
        })
        it("should return false for zero or positive numbers", () => {
            expect(NumberValidator.isNegative(0)).toBe(false)
            expect(NumberValidator.isNegative(1)).toBe(false)
        })
    })

    describe("isZero", () => {
        it("should return true for zero", () => {
            expect(NumberValidator.isZero(0)).toBe(true)
        })
        it("should return false for non-zero numbers", () => {
            expect(NumberValidator.isZero(1)).toBe(false)
            expect(NumberValidator.isZero(-1)).toBe(false)
        })
    })

    describe("isEven", () => {
        it("should return true for even numbers", () => {
            expect(NumberValidator.isEven(2)).toBe(true)
            expect(NumberValidator.isEven(0)).toBe(true)
            expect(NumberValidator.isEven(-4)).toBe(true)
        })
        it("should return false for odd numbers", () => {
            expect(NumberValidator.isEven(1)).toBe(false)
            expect(NumberValidator.isEven(-3)).toBe(false)
        })
    })

    describe("isOdd", () => {
        it("should return true for odd numbers", () => {
            expect(NumberValidator.isOdd(1)).toBe(true)
            expect(NumberValidator.isOdd(-3)).toBe(true)
        })
        it("should return false for even numbers", () => {
            expect(NumberValidator.isOdd(2)).toBe(false)
            expect(NumberValidator.isOdd(0)).toBe(false)
        })
    })

    describe("isFinite", () => {
        it("should return true for finite numbers", () => {
            expect(NumberValidator.isFinite(1)).toBe(true)
            expect(NumberValidator.isFinite(0)).toBe(true)
            expect(NumberValidator.isFinite(-100)).toBe(true)
        })
        it("should return false for Infinity and NaN", () => {
            expect(NumberValidator.isFinite(Infinity)).toBe(false)
            expect(NumberValidator.isFinite(-Infinity)).toBe(false)
            expect(NumberValidator.isFinite(NaN)).toBe(false)
        })
    })

    describe("isMultipleOf", () => {
        it("should return true if value is a multiple of divisor", () => {
            const fn = NumberValidator.isMultipleOf(3)
            expect(fn(6)).toBe(true)
            expect(fn(0)).toBe(true)
            expect(fn(-9)).toBe(true)
        })
        it("should return false if value is not a multiple of divisor", () => {
            const fn = NumberValidator.isMultipleOf(3)
            expect(fn(4)).toBe(false)
            expect(fn(-5)).toBe(false)
        })
    })

    describe("hasDecimalPlaces", () => {
        it("should return true if value has the specified number of decimal places", () => {
            const fn = NumberValidator.hasDecimalPlaces(2)
            expect(fn(1.23)).toBe(true)
            expect(fn(-0.45)).toBe(true)
        })
        it("should return false if value does not have the specified number of decimal places", () => {
            const fn = NumberValidator.hasDecimalPlaces(2)
            expect(fn(1.2)).toBe(false)
            expect(fn(1)).toBe(false)
            expect(fn(1.234)).toBe(false)
        })
        it("should return true for integer if places is 0", () => {
            const fn = NumberValidator.hasDecimalPlaces(0)
            expect(fn(5)).toBe(true)
            expect(fn(5.0)).toBe(true)
        })
    })
})