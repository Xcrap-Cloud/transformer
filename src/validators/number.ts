export namespace NumberValidator {
    export const isValid = (value: number) => !isNaN(value) && !isInfinity(value)

    export const isInteger = (value: number) => Number.isInteger(value)

    export const isFloat = (value: number) => isValid(value) && !Number.isInteger(value)

    export const isInfinity = (value: number) => {
        return isPositiveInfinity(value) || isNegativeInfinity(value)
    }

    export const isPositiveInfinity = (value: number) => value === Infinity

    export const isNegativeInfinity = (value: number) => value === -Infinity

    export const isGreaterThan = (min: number) => {
        return (value: number) => value > min
    }

    export const isGreaterThanOrEqual = (min: number) => {
        return (value: number) => value >= min
    }

    export const isLessThan = (max: number) => {
        return (value: number) => value < max
    }

    export const isLessThanOrEqual = (max: number) => {
        return (value: number) => value <= max
    }

    export const isInRange = (min: number, max: number) => {
        return (value: number) =>
            value >= min && value <= max
    }

    export const isPositive = (value: number) => value > 0

    export const isNegative = (value: number) => value < 0

    export const isZero = (value: number) => value === 0

    export const isEven = (value: number) => value % 2 === 0

    export const isOdd = (value: number) => value % 2 !== 0

    export const isFinite = (value: number) => Number.isFinite(value)

    export const isMultipleOf = (divisor: number) => {
        return (value: number) => value % divisor === 0
    }

    export const hasDecimalPlaces = (places: number) => (value: number) => {
        const decimalPart = (value.toString().split(".")[1] || "").length
        return decimalPart === places
    }
}