export * from "./transforming-model"
export * from "./transformer"
export * from "./transformers"
export * from "./validators"

export type Data = {
    local: Record<string, any>
    root: Record<string, any>
}

export type SkipFunction = () => void

export type TransformOptions<T, R> = {
    key: string
    scope?: keyof Data
    transformer: (value: T) => R | Promise<R>
    condition?: (value: T) => boolean | Promise<boolean>
}

export function transform<T extends any, R extends any>({
    key,
    scope = "local",
    transformer,
    condition
}: TransformOptions<T, R>) {
    return async (data: Data, skip: SkipFunction) => {
        const scopedData = data[scope]
        const value = scopedData[key] as T
        const isValid = condition ? await condition(value) : true

        if (!isValid) {
            return skip()
        }

        const transformedValue = await transformer(value)

        return transformedValue as R
    }
}

export type GetOptions<T> = {
    key: string
    scope?: keyof Data
    condition?: (value: T) => boolean | Promise<boolean>
}

export function get<T extends any>({
    key,
    scope = "local",
    condition
}: GetOptions<T>) {
    return async (data: Data, skip: SkipFunction) => {
        const scopedData = data[scope]
        const value = scopedData[key] as T
        const isValid = condition ? await condition(value) : true

        if (!isValid) {
            return skip()
        }

        return value
    }
}