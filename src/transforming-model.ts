export type TransformerFunction = (data: Record<string, any>) => any | Promise<any>

export type TransformationModelShapeValueBase = TransformerFunction[]

export type TransformationModelShapeNestedValue = {
    multiple?: boolean
    model: TransformingModel
}

export type TransformingModelShape = {
    [key: string]: TransformationModelShapeValueBase | TransformationModelShapeNestedValue
}

export class TransformingModel {
    constructor(readonly shape: TransformingModelShape) {}

    async transform(data: Record<string, any>): Promise<Record<string, any>> {
        const result: Record<string, any> = {...data}

        for (const key in this.shape) {
            const value = this.shape[key]

            if (Array.isArray(value)) {
                result[key] = await this.transformValueBase(value, data)
            } else {
                result[key] = await this.transformNestedValue(value, data)
            }
        }

        return result
    }

    async transformValueBase(value: TransformationModelShapeValueBase, data: any) {
        let result: any

        for (const transformer of value) {
            result = await transformer(data)
        }

        return result
    }

    async transformNestedValue(value: TransformationModelShapeNestedValue, data: any) {
        if (value.multiple) {
            console.log(data)

            return await Promise.all(
                data.map(value.model.transform.bind(this))
            )
        } else {
            return await value.model.transform(data)
        }
    }
}