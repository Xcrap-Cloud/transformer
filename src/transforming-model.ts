import { Data, SkipFunction } from "."

export type TransformerFunction = (data: Data, skip: SkipFunction) => any | Promise<any>

export type TransformationModelShapeValueBase = TransformerFunction[]

export type TransformationModelShapeNestedValue = {
    key?: string
    multiple?: boolean
    model: TransformingModel
    condition?: undefined
    default?: undefined
} | {
    condition: (data: Data) => boolean
    default: any
    key?: string
    multiple?: boolean
    model: TransformingModel
}

export type TransformingModelShape = {
    [key: string]: TransformationModelShapeValueBase | TransformationModelShapeNestedValue
}

export type TransformingModelAfterOptions = {
    delete?: string[]
    append?: Record<string, any>
}

export class TransformingModel {
    private readonly fieldsToDelete: string[] = []
    private readonly fieldsToAppend: Record<string, any> = {}

    constructor(readonly shape: TransformingModelShape) { }

    async transform(data: Record<string, any>, rootData?: Record<string, any>): Promise<Record<string, any>> {
        const isNested = !!rootData

        const internalData: Data = {
            local: (data && typeof data === "object" && !Array.isArray(data)) ? { ...data } : {},
            root: rootData || ((data && typeof data === "object" && !Array.isArray(data)) ? { ...data } : {})
        }

        for (const key in this.shape) {
            const value = this.shape[key]

            if (Array.isArray(value)) {
                internalData.local[key] = await this.transformValueBase(value, key, internalData)
            } else {
                internalData.local[key] = await this.transformNestedValue(value, internalData.local, internalData.root)
            }
        }

        for (const field of this.fieldsToDelete) {
            delete internalData.local[field]
        }

        for (const [key, value] of Object.entries(this.fieldsToAppend)) {
            internalData.local[key] = value
        }

        if (isNested) {
            const result: Record<string, any> = {}
            const resultKeys = new Set([...Object.keys(this.shape), ...Object.keys(this.fieldsToAppend)])

            for (const key of resultKeys) {
                if (key in internalData.local) {
                    result[key] = internalData.local[key]
                }
            }
            return result
        }

        return internalData.local
    }

    async transformValueBase(value: TransformationModelShapeValueBase, targetKey: string, data: Data) {
        let currentTransformedValue: any = data.local[targetKey]

        for (const transformer of value) {
            let skipped = false

            const skip = () => {
                skipped = true
            }

            const inputForTransformer: Data = {
                local: {
                    ...data.local,
                    [targetKey]: currentTransformedValue
                },
                root: data.root
            }

            let tempResult = await transformer(inputForTransformer, skip)

            if (!skipped) {
                currentTransformedValue = tempResult
            }
        }

        return currentTransformedValue
    }

    async transformNestedValue(value: TransformationModelShapeNestedValue, localData: Record<string, any> | Record<string, any>[], rootData: Record<string, any>) {
        if (value.condition) {
            const data = value.key ? { local: rootData[value.key], root: rootData } : { local: localData, root: rootData }

            if (!value.condition(data)) {
                return value.default
            }
        }

        if (value.multiple) {
            const data = value.key ? { local: rootData[value.key], root: rootData } : { local: localData, root: rootData }

            if (!Array.isArray(data.local)) {
                throw new Error("Input data for a 'multiple' nested model must be an array.")
            }

            return await Promise.all(
                data.local.map((item) => value.model.transform(item, data.root))
            )
        } else {
            const data = value.key ? { local: rootData[value.key], root: rootData } : { local: localData, root: rootData }

            if (value.condition && !value.condition(data)) {
                return null
            }

            return await value.model.transform(data.local, data.root)
        }
    }

    after({ delete: delete_, append }: TransformingModelAfterOptions) {
        if (delete_) {
            this.fieldsToDelete.push(...delete_)
        }

        if (append) {
            for (const [key, value] of Object.entries(append)) {
                this.fieldsToAppend[key] = value
            }
        }

        return this
    }
}