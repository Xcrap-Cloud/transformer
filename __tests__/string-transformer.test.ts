import { StringTransformer } from "../src"

describe("StringTransfomer", () => {
    it("trim", () => {
        const value = " Xpto "
        const trimedValue = StringTransformer.trim(value)
        expect(trimedValue).toEqual("Xpto")
    })

    it("split", () => {
        const value = "1,2,3,4,5"
        const splitFuction = StringTransformer.split(",")
        const splitedValue = splitFuction(value)
        expect(splitedValue).toEqual(["1", "2", "3", "4", "5"])
    })

    it("toBoolean", () => {
        const value = "yes"
        const booleanedValue = StringTransformer.toBoolean(value)
        expect(booleanedValue).toEqual(true)
    })

    it("toNumber", () => {
        const value = "5.5"
        const valueNumber = StringTransformer.toNumber(value)
        expect(valueNumber).toEqual(5.5)
    })

    it("toLowerCase", () => {
        const value = "ABcDe"
        const lowerCaseValue = StringTransformer.toLowerCase(value)
        expect(lowerCaseValue).toEqual("abcde")
    })

    it("toUpperCase", () => {
        const value = "abCdE"
        const upperCaseValue = StringTransformer.toUpperCase(value)
        expect(upperCaseValue).toEqual("ABCDE")
    })

    it("normalize", () => {
        const value = " xPTó-ã "
        const normalizedValue = StringTransformer.normalize(value)
        expect(normalizedValue).toEqual("xpto-a")
    })

    it("removeHtmlTags", () => {
        const value = "<p>Xpto</p>"
        const withoutHtmlTags = StringTransformer.removeHtmlTags(value)
        expect(withoutHtmlTags).toEqual("Xpto")
    })

    it("sanitize", () => {
        const value = "  #Xpt_o! "
        const sanitizedValue = StringTransformer.sanitize(value)
        expect(sanitizedValue).toEqual("Xpto")
    })

    it("collapseWhitespace", () => {
        const value = "  Hello    World "
        const collapsedValue = StringTransformer.collapseWhitespace(value)
        expect(collapsedValue).toEqual("Hello World")
    })

    it("currencyToNumber", () => {
        const value = "R$ 1.234,56"
        const currencyToNumberFunction = StringTransformer.currencyToNumber("R$")
        const valueNumber = currencyToNumberFunction(value)
        expect(valueNumber).toEqual(1234.56)
    })
})