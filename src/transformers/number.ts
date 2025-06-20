export type FormatCurrencyOptions = {
    locale: string
    currencyCode: string
    minimumFractionDigits: number
}

export type FormatDecimalOptions = {
    locale: string
    decimals: number
}

export namespace NumberTransformer {
    export const toString = (value: number) => value.toString()

    export const toInteger = (value: number) => Math.floor(value)

    export const multiply = (multiplier: number) => (value: number) => multiplier * value

    export const divide = (divider: number) => (value: number) => divider * value

    export const add = (addend: number) => (value: number) => value + addend

    export const subtract = (subtrahend: number) => (value: number) => value - subtrahend

    export const power = (exponent: number) => (value: number) => Math.pow(value, exponent)

    export const sqrt = (value: number) => Math.sqrt(value)

    export const clamp = (min: number, max: number) => (value: number) => {
        return Math.min(Math.max(value, min), max)
    }

    export const toBoolean = (value: number) => {
        if (value === 0) return false
        if (value === 1) return true

        throw new Error(`The number ${value} cannot be converted to boolean!`)
    }

    export const toBigint = BigInt

    export const round = (decimals: number) => {
        return (value: number) => {
            return Number(value.toFixed(decimals))
        }
    }

    export const toPercentage = (decimals: number) => {
        return (value: number) => {
            return `${(value * 100).toFixed(decimals)}%`
        }
    }

    export const toAbsolute = (value: number) => Math.abs(value)

    export const formatCurrency = ({
        currencyCode,
        locale,
        minimumFractionDigits
    }: FormatCurrencyOptions) => {
        return (value: number) => {
            const formatter = new Intl.NumberFormat(locale, {
                style: "currency",
                currency: currencyCode,
                minimumFractionDigits: minimumFractionDigits,
            })

            return formatter.format(value)
        }
    }

    export const formatDecimal = ({
        decimals,
        locale
    }: FormatDecimalOptions) => {
        return (value: number) => {
            const formatter = new Intl.NumberFormat(locale, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })
            
            return formatter.format(value)
        }
    }
}