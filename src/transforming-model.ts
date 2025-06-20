export type TransformerFunction = (data: Record<string, any>) => any | Promise<any>

export type TransformationModelShapeValueBase = TransformerFunction[]

export type TransformationModelShapeNestedValue = {
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

    async transform(data: Record<string, any>): Promise<Record<string, any>> {
        const result: Record<string, any> = {...data}

        for (const key in this.shape) {
            const value = this.shape[key]

            if (Array.isArray(value)) {
                result[key] = await this.transformValueBase(value, key, result)
            } else {
                result[key] = await this.transformNestedValue(value, result)
            }
        }

        for (const field of this.fieldsToDelete) {
            delete result[field]
        }

        for (const [key, value] of Object.entries(this.fieldsToAppend)) {
            result[key] = value
        }

        return result
    }

    async transformValueBase(value: TransformationModelShapeValueBase, key: string, data: any) {
        let result: any

        for (const transformer of value) {
            result = await transformer({
                ...data,
                [key]: result
            })
        }

        return result
    }

    async transformNestedValue(value: TransformationModelShapeNestedValue, data: any) {
        if (value.multiple) {
            return await Promise.all(
                data.map(value.model.transform.bind(this))
            )
        } else {
            return await value.model.transform(data)
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