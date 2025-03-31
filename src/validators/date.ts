import * as dateFns from "date-fns"

export namespace DateValidator {
    export const isValid = (value: Date) => dateFns.isValid(value)

    export const isAfter = (compareDate: Date) => {
        return (value: Date) => dateFns.isAfter(value, compareDate)
    }

    export const isBefore = (compareDate: Date) => {
        return (value: Date) => dateFns.isBefore(value, compareDate)
    }

    export const isEqualDate = (compareDate: Date) => {
        return (value: Date) => dateFns.isSameDay(value, compareDate)
    }

    export const isInRange = (start: Date, end: Date) => {
        return (value: Date) => dateFns.isWithinInterval(value, { start: start, end: end })
    }

    export const isFuture = (value: Date) => dateFns.isFuture(value)

    export const isPast = (value: Date) => dateFns.isPast(value)

    export const isToday = (value: Date) => dateFns.isToday(value)

    export const isWeekend = (value: Date) => {
        const day = dateFns.getDay(value)
        return day === 0 || day === 6
    }

    export const isWeekday = (value: Date) => !DateValidator.isWeekend(value)

    export const isSameMonth = (compareDate: Date) => {
        return (value: Date) => dateFns.isSameMonth(value, compareDate)
    }

    export const isSameYear = (compareDate: Date) => {
        return (value: Date) => dateFns.isSameYear(value, compareDate)
    }

    export const isFirstDayOfMonth = (value: Date) => dateFns.isFirstDayOfMonth(value)

    export const isLastDayOfMonth = (value: Date) => dateFns.isLastDayOfMonth(value)

    export const isParsable = (template: string) => {
        return (value: string) => {
            const parsed = dateFns.parse(value, template, new Date())
            return dateFns.isValid(parsed)
        }
    }
}