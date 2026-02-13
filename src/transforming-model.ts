import { Data, SkipFunction } from "."

export type TransformerFunction = (data: Data, skip: SkipFunction) => any | Promise<any>

export type TransformationModelShapeValueBase = TransformerFunction[]

export type TransformationModelShapeNestedValue = {
    key: string
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

    constructor(readonly shape: TransformingModelShape) {}

    async transform(data: Record<string, any>, rootData?: Record<string, any>): Promise<Record<string, any>> {
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

        return internalData.local
    }

    async transformValueBase(value: TransformationModelShapeValueBase, targetKey: string, data: Data) {
        let currentTransformedValue: any = data.local[targetKey]

        for (const transformer of value) {
            let skipped = false

            const skip = () => {
                skipped = true
            }

            const originalValueForThisIteration = currentTransformedValue

            const inputForTransformer: Data = {
                local: {
                    ...data.local,
                    [targetKey]: originalValueForThisIteration
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
        if (value.multiple) {
            if (!Array.isArray((localData as Record<string, any>)[value.key])) {
                throw new Error("Input data for a 'multiple' nested model must be an array.")
            }

            return await Promise.all(
                ((localData as Record<string, any>)[value.key] as Record<string, any>[]).map((item) => value.model.transform(item, rootData))
            )
        } else {
            return await value.model.transform((localData as Record<string, any>)[value.key], rootData)
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