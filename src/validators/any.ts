export namespace AnyValidator {
    export const isString = (value: any) => typeof value === "string"
    export const isNumber = (value: any) => typeof value === "number"
    export const isArray = Array.isArray
    export const isBigint = (value: any) => typeof value === "bigint"
    export const isFunction = (value: any) => typeof value === "function"
    export const isSymbol = (value: any) => typeof value === "symbol"
    export const isObject = (value: any) => typeof value === "object" && !Array.isArray(value) && value !== null
    export const isBoolean = (value: any) => typeof value === "boolean"
    export const isUndefined = (value: any) => value === undefined
    export const isNull = (value: any) => value === null
}