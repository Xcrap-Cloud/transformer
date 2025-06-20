import { TransformingModel } from "./transforming-model"

export class Transformer {
    constructor(readonly data: Record<string, any> | Record<string, any>[]) {}

    async transform(transformingModel: TransformingModel) {
        if (Array.isArray(this.data)) {
            return await Promise.all(
                this.data.map((item) => transformingModel.transform(item))
            )
        }

        return await transformingModel.transform(this.data)
    }
}