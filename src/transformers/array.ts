export namespace ArrayTransformer {
    export const join = (separator: string) => (value: string[]) => value.join(separator)

    export const filter = <T>(predicate: (item: T) => boolean) => {
        return (value: T[]) => {
            return value.filter(predicate)
        }
    }

    export const map = <T, R>(mapper: (item: T) => R) => (value: T[]) => {
        return value.map(mapper)
    }

    export const unique = <T>(value: T[]) => {
        return [...new Set(value)]
    }

    export const sort = <T>(compareFunction?: (a: T, b: T) => number) => {
        return (value: T[]) => {
            return [...value].sort(compareFunction)
        }
    }

    export const reduce = <T, R>(
        reducer: (acc: R, item: T) => R,
        initialValue: R
    ) => (value: T[]) => {
        return value.reduce(reducer, initialValue)
    }

    export const compact = <T>(value: T[]) => {
        return value.filter(Boolean)
    }

    export const first = <T>(defaultValue?: T) => (value: T[]) => {
        return value.length > 0 ? value[0] : defaultValue
    }

    export const last = <T>(defaultValue?: T) => (value: T[]) => {
        return value.length > 0 ? value[value.length - 1] : defaultValue
    }

    export const chunk = (size: number) => <T>(value: T[]) => {
        if (size <= 0) return [value]
        const result: T[][] = []

        for (let i = 0; i < value.length; i += size) {
            result.push(value.slice(i, i + size))
        }

        return result
    }

    export const toNumbers = (value: string[]) => {
        return value.map(item => Number(item.replace(/[^\d.-]/g, "")) || 0)
    }

    export const sum = (value: number[]) => {
        return value.reduce((acc, item) => acc + item, 0)
    }

    export const slice = (start: number, end: number) => (value: any[]) => {
        return value.slice(start, end)
    }
}