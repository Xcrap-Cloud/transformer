import { NumberTransformer, FormatCurrencyOptions, FormatDecimalOptions } from "../src"

describe("NumberTransformer", () => {
    describe("toString", () => {
        it("should convert number to string", () => {
            expect(NumberTransformer.toString(123)).toBe("123")
        })
    })

    describe("toInteger", () => {
        it("should floor the number", () => {
            expect(NumberTransformer.toInteger(3.7)).toBe(3)
            expect(NumberTransformer.toInteger(-3.7)).toBe(-4)
        })
    })

    describe("multiply", () => {
        it("should multiply the value", () => {
            const mul2 = NumberTransformer.multiply(2)
            expect(mul2(5)).toBe(10)
        })
    })

    describe("divide", () => {
        it("should divide the value by divider", () => {
            const div2 = NumberTransformer.divide(2)
            expect(div2(10)).toBe(5)
        })
    })

    describe("add", () => {
        it("should add the addend", () => {
            const add3 = NumberTransformer.add(3)
            expect(add3(7)).toBe(10)
        })
    })

    describe("subtract", () => {
        it("should subtract the subtrahend", () => {
            const sub2 = NumberTransformer.subtract(2)
            expect(sub2(10)).toBe(8)
        })
    })

    describe("power", () => {
        it("should raise value to the exponent", () => {
            const pow3 = NumberTransformer.power(3)
            expect(pow3(2)).toBe(8)
        })
    })

    describe("sqrt", () => {
        it("should return the square root", () => {
            expect(NumberTransformer.sqrt(9)).toBe(3)
        })
    })

    describe("clamp", () => {
        it("should clamp value within min and max", () => {
            const clamp = NumberTransformer.clamp(1, 5)
            expect(clamp(0)).toBe(1)
            expect(clamp(3)).toBe(3)
            expect(clamp(10)).toBe(5)
        })
    })

    describe("toBoolean", () => {
        it("should convert 0 to false", () => {
            expect(NumberTransformer.toBoolean(0)).toBe(false)
        })
        it("should convert 1 to true", () => {
            expect(NumberTransformer.toBoolean(1)).toBe(true)
        })
        it("should throw for other numbers", () => {
            expect(() => NumberTransformer.toBoolean(2)).toThrow()
            expect(() => NumberTransformer.toBoolean(-1)).toThrow()
        })
    })

    describe("toBigint", () => {
        it("should convert number to bigint", () => {
            expect(NumberTransformer.toBigint(10)).toBe(BigInt(10))
        })
    })

    describe("round", () => {
        it("should round to given decimals", () => {
            const round2 = NumberTransformer.round(2)
            expect(round2(3.14159)).toBe(3.14)
            expect(round2(2)).toBe(2)
        })
    })

    describe("toPercentage", () => {
        it("should convert to percentage string", () => {
            const toPercent1 = NumberTransformer.toPercentage(1)
            expect(toPercent1(0.1234)).toBe("12.3%")
        })
    })

    describe("toAbsolute", () => {
        it("should return absolute value", () => {
            expect(NumberTransformer.toAbsolute(-5)).toBe(5)
            expect(NumberTransformer.toAbsolute(5)).toBe(5)
        })
    })

    describe("formatCurrency", () => {
        it("should format number as currency", () => {
            const opts: FormatCurrencyOptions = {
                locale: "en-US",
                currencyCode: "USD",
                minimumFractionDigits: 2
            }
            const format = NumberTransformer.formatCurrency(opts)
            expect(format(1234.5)).toBe("$1,234.50")
        })
    })

    describe("formatDecimal", () => {
        it("should format number with decimals", () => {
            const opts: FormatDecimalOptions = {
                locale: "en-US",
                decimals: 3
            }
            const format = NumberTransformer.formatDecimal(opts)
            expect(format(1234.5678)).toBe("1,234.568")
        })
    })
})