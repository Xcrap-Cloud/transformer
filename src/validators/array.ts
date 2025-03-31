export namespace ArrayValidator {
    export const isEmpty = (value: any[]) => value.length === 0

    export const isNotEmpty = (value: any[]) => value.length > 0

    export const minLength = (min: number) => {
        return (value: any[]) => value.length >= min
    }

    export const maxLength = (max: number) => {
        return (value: any[]) => value.length <= max
    }

    export const exactLength = (length: number) => {
        return (value: any[]) => value.length === length
    }

    export const every = <T>(predicate: (item: T) => boolean) => {
        return (value: T[]) => value.every(predicate)
    }

    export const some = <T>(predicate: (item: T) => boolean) => {
        return (value: T[]) => value.some(predicate)
    }

    export const includes = <T>(item: T) => {
        return (value: T[]) => value.includes(item)
    }

    export const isUniformType = (value: any[]) => {
        return value.length === 0 || value.every(item => typeof item === typeof value[0])
    }

    export const isAllStrings = (value: any[]) => {
        return value.every(item => typeof item === "string")
    }

    export const isAllNumbers = (value: any[]) => {
        return value.every(item => typeof item === "number")
    }

    export const isAllBooleans = (value: any[]) => {
        return value.every(item => typeof item === "boolean")
    }

    export const hasNoDuplicates = <T>(value: T[]) => {
        return value.length === new Set(value).size
    }

    export const isSorted = (direction: "asc" | "desc" = "asc") => <T>(value: T[]) => {
        const compare = direction === "asc" ? (a: T, b: T) => a <= b : (a: T, b: T) => a >= b

        return value.every((item, index) => index === 0 || compare(value[index - 1], item))
    }

    export const isAllTruthy = (value: any[]) => value.every(Boolean)

    export const isAllFalsy = (value: any[]) => value.every(item => !item)
}