export namespace StringValidator {
    export const includes = (str: string) => (value: string) => value.includes(str)

    export const isNumeric = (value: string) => !isNaN(Number(value))

    export const isEmpty = (value: string) => value.trim() === ""

    export const minLength = (min: number) => (value: string) => value.length >= min

    export const maxLength = (max: number) => (value: string) => value.length <= max

    export const exactLength = (length: number) => (value: string) => value.length === length

    export const isEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value)
    }

    export const isUrl = (value: string) => {
        const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/
        return urlRegex.test(value)
    }

    export const matches = (regex: RegExp) => (value: string) => regex.test(value)

    export const isAlpha = (value: string) => /^[a-zA-Z]+$/.test(value)

    export const isAlphanumeric = (value: string) => /^[a-zA-Z0-9]+$/.test(value)

    export const isIntegerText = (value: string) => /^\d+$/.test(value)

    export const isDecimalText = (value: string) => /^\d+[.,]\d+$/.test(value)

    export const isWhitespace = (value: string) => /^\s+$/.test(value)

    export const isBooleanText = (value: string) => {
        const booleanValues = ["true", "false", "1", "0", "yes", "no"]
        return booleanValues.includes(value.toLowerCase())
    }
}