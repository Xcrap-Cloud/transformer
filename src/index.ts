export * from "./transforming-model"
export * from "./transformer"
export * from "./transformers"
export * from "./validators"

export type SkipFunction = () => void

export type TransformOptions<T, R> = {
    key: string,
    transformer: (value: T) => R | Promise<R>,
    condition?: (value: T) => boolean | Promise<boolean>
}

export function transform<T extends any, R extends any>({
    key,
    transformer,
    condition
}: TransformOptions<T, R>) {
    return async (data: Record<string, any>, skip: SkipFunction) => {
        const value = data[key] as T
        const isValid = condition ? await condition(value) : true

        if (!isValid) {
            return skip()
        }

        const transformedValue = await transformer(value)

        return transformedValue as R
    }
}

export type GetOptions<T> = {
    key: string,
    condition?: (value: T) => boolean | Promise<boolean>
}

export function get<T extends any>({ key, condition }: GetOptions<T>) {
    return async (data: Record<string, any>, skip: SkipFunction) => {
        const value = data[key] as T
        const isValid = condition ? await condition(value) : true

        if (!isValid) {
            return skip()
        }

        return value
    }
}