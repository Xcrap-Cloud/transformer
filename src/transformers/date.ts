import * as dateFns from "date-fns"

export namespace DateTansformer {
    export const fromString = (template: string) => (value: string) => {
        return dateFns.parse(value, template, new Date())
    }

    export const fromTimestamp = (value: number) => {
        return new Date(value)
    }

    export const fromISO = (value: string) => {
        return dateFns.parseISO(value)
    }

    export const isValid = (value: Date) => {
        return dateFns.isValid(value)
    }

    export const toISO = (value: Date) => value.toISOString()

    export const toTimestamp = (value: Date) => value.getTime()

    export const format = (template: string) => (value: Date) => {
        return dateFns.format(value, template)
    }
}