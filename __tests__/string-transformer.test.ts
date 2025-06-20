import { StringTransformer } from "../src"

describe("StringTransformer", () => {
    describe("raw", () => {
        it("returns the input string", () => {
            expect(StringTransformer.raw("abc")).toBe("abc")
        })
    })

    describe("toLowerCase", () => {
        it("converts string to lower case", () => {
            expect(StringTransformer.toLowerCase("ABC")).toBe("abc")
        })
    })

    describe("toUpperCase", () => {
        it("converts string to upper case", () => {
            expect(StringTransformer.toUpperCase("abc")).toBe("ABC")
        })
    })

    describe("trim", () => {
        it("trims whitespace", () => {
            expect(StringTransformer.trim("  abc  ")).toBe("abc")
        })
    })

    describe("toNumber", () => {
        it("converts string to number", () => {
            expect(StringTransformer.toNumber("123")).toBe(123)
        })
        it("returns NaN for non-numeric string", () => {
            expect(StringTransformer.toNumber("abc")).toBeNaN()
        })
    })

    describe("replace", () => {
        it("replaces substring", () => {
            expect(StringTransformer.replace("a", "b")("abc")).toBe("bbc")
        })
        it("replaces using regex", () => {
            expect(StringTransformer.replace(/a/g, "b")("aab")).toBe("bbb")
        })
    })

    describe("remove", () => {
        it("removes substring", () => {
            expect(StringTransformer.remove("a")("abc")).toBe("bc")
        })
        it("removes using regex", () => {
            expect(StringTransformer.remove(/a/g)("aab")).toBe("b")
        })
    })

    describe("split", () => {
        it("splits string by separator", () => {
            expect(StringTransformer.split(",")("a,b,c")).toEqual(["a", "b", "c"])
        })
    })

    describe("toBoolean", () => {
        it("returns true for 'true', '1', 'yes' (case-insensitive)", () => {
            expect(StringTransformer.toBoolean("true")).toBe(true)
            expect(StringTransformer.toBoolean("1")).toBe(true)
            expect(StringTransformer.toBoolean("yes")).toBe(true)
            expect(StringTransformer.toBoolean("TRUE")).toBe(true)
        })
        it("returns false for other boolean-like values", () => {
            expect(StringTransformer.toBoolean("false")).toBe(false)
            expect(StringTransformer.toBoolean("0")).toBe(false)
            expect(StringTransformer.toBoolean("no")).toBe(false)
        })
        it("throws for invalid boolean text", () => {
            // Mock StringValidator.isBooleanText to return false
            jest.spyOn(require("../src/validators/string").StringValidator, "isBooleanText").mockReturnValue(false)
            expect(() => StringTransformer.toBoolean("maybe")).toThrow(/cannot be converted to boolean/i)
            jest.restoreAllMocks()
        })
    })

    describe("normalize", () => {
        it("normalizes string (removes accents, lowercases, trims)", () => {
            expect(StringTransformer.normalize("  ÁÉÍÓÚ  ")).toBe("aeiou")
        })
    })

    describe("removeHtmlTags", () => {
        it("removes HTML tags", () => {
            expect(StringTransformer.removeHtmlTags("<b>abc</b>")).toBe("abc")
            expect(StringTransformer.removeHtmlTags("a<br>b")).toBe("ab")
        })
    })

    describe("sanitize", () => {
        it("removes non-alphanumeric characters", () => {
            expect(StringTransformer.sanitize("a!b@c# 123")).toBe("abc 123")
        })
    })

    describe("collapseWhitespace", () => {
        it("collapses multiple whitespaces", () => {
            expect(StringTransformer.collapseWhitespace("a   b   c")).toBe("a b c")
        })
    })

    describe("lookupInRecord", () => {
        const record = { a: 1, b: 2 }
        const lookup = StringTransformer.lookupInRecord(record)
        it("returns value for existing key", () => {
            expect(lookup("a")).toBe(1)
        })
        it("throws for missing key", () => {
            expect(() => lookup("c")).toThrow(/does not have 'c' as key/i)
        })
    })

    describe("resolveUrl", () => {
        const resolve = StringTransformer.resolveUrl("https://example.com/")
        it("resolves relative URL", () => {
            expect(resolve("path")).toBe("https://example.com/path")
        })
        it("resolves absolute URL", () => {
            expect(resolve("https://other.com/abc")).toBe("https://other.com/abc")
        })
        it("throws for invalid URL", () => {
            expect(() => resolve("::::")).toThrow(/Invalid URL/)
        })
    })
})