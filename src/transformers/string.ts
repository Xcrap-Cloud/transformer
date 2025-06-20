import { StringValidator } from "../validators/string"

export namespace StringTransformer {
    export const raw = (value: string) => value

    export const toLowerCase = (value: string) => value.toLowerCase()

    export const toUpperCase = (value: string) => value.toUpperCase()

    export const trim = (value: string) => value.trim()

    export const toNumber = Number

    export const split = (separator: string) => (value: string) => value.split(separator)

    export const toBoolean = (value: string) => {
        if (!StringValidator.isBooleanText(value)) {
            throw new Error(`'${value}' cannot be converted to boolean!`)
        }

        const truthyValues = ["true", "1", "yes"]
        const lowerValue = value.toLowerCase()

        if (truthyValues.includes(lowerValue)) {
            return true
        }

        return false
    }

    export const normalize = (value: string) => {
        return value
            .normalize("NFD")
            .toLowerCase()
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
    }

    export const removeHtmlTags = (value: string) => value.replace(/<\/?[^>]+(>|$)/g, "")

    export const sanitize = (value: string) => value.replace(/[^a-zA-Z0-9\s]/g, "").trim()

    export const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim()


    export const lookupInRecord = (record: Record<string, string>) => {
        return (value: string) => {
            if (!(value in record)) {
                throw new Error(`Record does not have '${value}' as key!`)
            }

            return record[value]
        }
    }

    export const resolveUrl = (baseUrl: string) => {
        return (value: string) => {
            try {
                return new URL(value, baseUrl).href
            } catch (error) {
                throw new Error(`Invalid URL: '${value}' with base '${baseUrl}'`)
            }
        }
    }
}