import { StringValidator } from "../validators/string"

export namespace StringTransformer {
    export const toLowerCase = (value: string) => value.toLowerCase()

    export const toUpperCase = (value: string) => value.toUpperCase()

    export const trim = (value: string) => value.trim()

    export const toNumber = Number

    export const replace = (searchValue: string | RegExp, replaceValue: string) => (value: string) =>
        value.replace(searchValue, replaceValue)

    export const remove = (searchValue: string | RegExp) => (value: string) => value.replace(searchValue, "")

    export const split = (separator: string) => (value: string) => value.split(separator)

    export const extract = (pattern: RegExp, index: number = 0) => (value: string) => {
        const match = value.match(pattern)

        if (!match) {
            throw new Error(`Pattern '${pattern}' did not match value '${value}'`)
        }

        const params = match[index]

        if (!params) {
            throw new Error(`Pattern '${pattern}' matched but index ${index} is out of bounds.`)
        }

        return params
    }

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

    export const lookupInRecord = (record: Record<string, any>) => {
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
                const resolvedUrl = new URL(value, baseUrl).href

                if (!StringValidator.isUrl(resolvedUrl)) {
                    throw new Error(`Invalid URL: '${value}' with base '${baseUrl}'`)
                }

                return resolvedUrl
            } catch (error) {
                throw new Error(`Invalid URL: '${value}' with base '${baseUrl}'`)
            }
        }
    }

    export const substr = (startIndex: number, length?: number) => (value: string) => {
        if (length) {
            return value.substring(startIndex, length)
        }

        return value.substring(startIndex)
    }

    export const addPrefix = (prefix: string) => (value: string) => {
        return prefix + value
    }

    export const addSuffix = (suffix: string) => (value: string) => {
        return value + suffix
    }

    export const removePrefix = (prefix: string) => (value: string) => {
        if (value.startsWith(prefix)) {
            return value.substring(prefix.length)
        }

        return value
    }

    export const removeSuffix = (suffix: string) => (value: string) => {
        if (value.endsWith(suffix)) {
            return value.substring(0, value.length - suffix.length)
        }

        return value
    }
}