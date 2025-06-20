import { StringValidator } from "../src"

describe("StringValidator", () => {
    describe("includes", () => {
        it("should return true if string includes substring", () => {
            expect(StringValidator.includes("foo")("foobar")).toBe(true)
        })
        it("should return false if string does not include substring", () => {
            expect(StringValidator.includes("baz")("foobar")).toBe(false)
        })
    })

    describe("isNumeric", () => {
        it("should return true for numeric strings", () => {
            expect(StringValidator.isNumeric("123")).toBe(true)
            expect(StringValidator.isNumeric("123.45")).toBe(true)
        })
        it("should return false for non-numeric strings", () => {
            expect(StringValidator.isNumeric("abc")).toBe(false)
        })
    })

    describe("isEmpty", () => {
        it("should return true for empty or whitespace strings", () => {
            expect(StringValidator.isEmpty("")).toBe(true)
            expect(StringValidator.isEmpty("   ")).toBe(true)
        })
        it("should return false for non-empty strings", () => {
            expect(StringValidator.isEmpty("foo")).toBe(false)
        })
    })

    describe("minLength", () => {
        it("should return true if string length >= min", () => {
            expect(StringValidator.minLength(3)("abcd")).toBe(true)
        })
        it("should return false if string length < min", () => {
            expect(StringValidator.minLength(5)("abc")).toBe(false)
        })
    })

    describe("maxLength", () => {
        it("should return true if string length <= max", () => {
            expect(StringValidator.maxLength(5)("abc")).toBe(true)
        })
        it("should return false if string length > max", () => {
            expect(StringValidator.maxLength(2)("abc")).toBe(false)
        })
    })

    describe("exactLength", () => {
        it("should return true if string length equals exact", () => {
            expect(StringValidator.exactLength(3)("abc")).toBe(true)
        })
        it("should return false if string length does not equal exact", () => {
            expect(StringValidator.exactLength(2)("abc")).toBe(false)
        })
    })

    describe("isEmail", () => {
        it("should return true for valid emails", () => {
            expect(StringValidator.isEmail("test@example.com")).toBe(true)
        })
        it("should return false for invalid emails", () => {
            expect(StringValidator.isEmail("test@com")).toBe(false)
            expect(StringValidator.isEmail("test.com")).toBe(false)
        })
    })

    describe("isUrl", () => {
        it("should return true for valid URLs", () => {
            expect(StringValidator.isUrl("http://example.com")).toBe(true)
            expect(StringValidator.isUrl("https://example.com/path")).toBe(true)
        })
        it("should return false for invalid URLs", () => {
            expect(StringValidator.isUrl("example")).toBe(false)
            expect(StringValidator.isUrl("http:/example.com")).toBe(false)
        })
    })

    describe("matches", () => {
        it("should return true if string matches regex", () => {
            expect(StringValidator.matches(/foo/)("foobar")).toBe(true)
        })
        it("should return false if string does not match regex", () => {
            expect(StringValidator.matches(/baz/)("foobar")).toBe(false)
        })
    })

    describe("isAlpha", () => {
        it("should return true for alphabetic strings", () => {
            expect(StringValidator.isAlpha("abcDEF")).toBe(true)
        })
        it("should return false for non-alphabetic strings", () => {
            expect(StringValidator.isAlpha("abc123")).toBe(false)
        })
    })

    describe("isAlphanumeric", () => {
        it("should return true for alphanumeric strings", () => {
            expect(StringValidator.isAlphanumeric("abc123")).toBe(true)
        })
        it("should return false for non-alphanumeric strings", () => {
            expect(StringValidator.isAlphanumeric("abc!")).toBe(false)
        })
    })

    describe("isIntegerText", () => {
        it("should return true for integer strings", () => {
            expect(StringValidator.isIntegerText("123")).toBe(true)
        })
        it("should return false for non-integer strings", () => {
            expect(StringValidator.isIntegerText("123.45")).toBe(false)
            expect(StringValidator.isIntegerText("abc")).toBe(false)
        })
    })

    describe("isDecimalText", () => {
        it("should return true for decimal strings", () => {
            expect(StringValidator.isDecimalText("123.45")).toBe(true)
            expect(StringValidator.isDecimalText("123,45")).toBe(true)
        })
        it("should return false for non-decimal strings", () => {
            expect(StringValidator.isDecimalText("123")).toBe(false)
            expect(StringValidator.isDecimalText("abc")).toBe(false)
        })
    })

    describe("isWhitespace", () => {
        it("should return true for whitespace strings", () => {
            expect(StringValidator.isWhitespace("   ")).toBe(true)
            expect(StringValidator.isWhitespace("\t\n")).toBe(true)
        })
        it("should return false for non-whitespace strings", () => {
            expect(StringValidator.isWhitespace("abc")).toBe(false)
        })
    })

    describe("isBooleanText", () => {
        it("should return true for boolean text", () => {
            expect(StringValidator.isBooleanText("true")).toBe(true)
            expect(StringValidator.isBooleanText("False")).toBe(true)
            expect(StringValidator.isBooleanText("1")).toBe(true)
            expect(StringValidator.isBooleanText("no")).toBe(true)
        })
        it("should return false for non-boolean text", () => {
            expect(StringValidator.isBooleanText("maybe")).toBe(false)
            expect(StringValidator.isBooleanText("yesno")).toBe(false)
        })
    })
})