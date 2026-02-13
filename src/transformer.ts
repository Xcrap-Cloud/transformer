import { TransformingModel } from "./transforming-model"

export class Transformer<T extends Record<string, any> | Record<string, any>[]> {
    constructor(readonly data: T) {}

    async transform(transformingModel: TransformingModel) {
        if (Array.isArray(this.data)) {
            return await Promise.all(
                this.data.map((item) => transformingModel.transform(item))
            )
        }

        return await transformingModel.transform(this.data)
    }
}