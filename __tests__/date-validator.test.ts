import { DateValidator } from "../src"

describe("DateValidator", () => {
    const now = new Date()
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    const sameDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const otherMonth = new Date(now.getFullYear(), now.getMonth() === 0 ? 1 : 0, 1)
    const otherYear = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())

    test("isValid returns true for valid date", () => {
        expect(DateValidator.isValid(now)).toBe(true)
    })

    test("isValid returns false for invalid date", () => {
        expect(DateValidator.isValid(new Date("invalid"))).toBe(false)
    })

    test("isAfter returns true if value is after compareDate", () => {
        expect(DateValidator.isAfter(yesterday)(now)).toBe(true)
    })

    test("isAfter returns false if value is not after compareDate", () => {
        expect(DateValidator.isAfter(now)(yesterday)).toBe(false)
    })

    test("isBefore returns true if value is before compareDate", () => {
        expect(DateValidator.isBefore(tomorrow)(now)).toBe(true)
    })

    test("isBefore returns false if value is not before compareDate", () => {
        expect(DateValidator.isBefore(now)(tomorrow)).toBe(false)
    })

    test("isEqualDate returns true for same day", () => {
        expect(DateValidator.isEqualDate(sameDay)(now)).toBe(true)
    })

    test("isEqualDate returns false for different day", () => {
        expect(DateValidator.isEqualDate(tomorrow)(now)).toBe(false)
    })

    test("isInRange returns true if value is within range", () => {
        expect(DateValidator.isInRange(yesterday, tomorrow)(now)).toBe(true)
    })

    test("isInRange returns false if value is outside range", () => {
        expect(DateValidator.isInRange(tomorrow, otherYear)(now)).toBe(false)
    })

    test("isFuture returns true for future date", () => {
        expect(DateValidator.isFuture(tomorrow)).toBe(true)
    })

    test("isFuture returns false for past date", () => {
        expect(DateValidator.isFuture(yesterday)).toBe(false)
    })

    test("isPast returns true for past date", () => {
        expect(DateValidator.isPast(yesterday)).toBe(true)
    })

    test("isPast returns false for future date", () => {
        expect(DateValidator.isPast(tomorrow)).toBe(false)
    })

    test("isToday returns true for today", () => {
        expect(DateValidator.isToday(now)).toBe(true)
    })

    test("isToday returns false for not today", () => {
        expect(DateValidator.isToday(yesterday)).toBe(false)
    })

    test("isWeekend returns true for Sunday", () => {
        const sunday = new Date(2023, 0, 1)
        expect(DateValidator.isWeekend(sunday)).toBe(true)
    })

    test("isWeekend returns true for Saturday", () => {
        const saturday = new Date(2023, 0, 7)
        expect(DateValidator.isWeekend(saturday)).toBe(true)
    })

    test("isWeekend returns false for weekday", () => {
        const monday = new Date(2023, 0, 2)
        expect(DateValidator.isWeekend(monday)).toBe(false)
    })

    test("isWeekday returns true for weekday", () => {
        const tuesday = new Date(2023, 0, 3)
        expect(DateValidator.isWeekday(tuesday)).toBe(true)
    })

    test("isWeekday returns false for weekend", () => {
        const sunday = new Date(2023, 0, 1)
        expect(DateValidator.isWeekday(sunday)).toBe(false)
    })

    test("isSameMonth returns true for same month", () => {
        expect(DateValidator.isSameMonth(now)(sameDay)).toBe(true)
    })

    test("isSameMonth returns false for different month", () => {
        expect(DateValidator.isSameMonth(otherMonth)(now)).toBe(false)
    })

    test("isSameYear returns true for same year", () => {
        expect(DateValidator.isSameYear(now)(sameDay)).toBe(true)
    })

    test("isSameYear returns false for different year", () => {
        expect(DateValidator.isSameYear(otherYear)(now)).toBe(false)
    })

    test("isFirstDayOfMonth returns true for first day", () => {
        expect(DateValidator.isFirstDayOfMonth(startOfMonth)).toBe(true)
    })

    test("isFirstDayOfMonth returns false for not first day", () => {
        expect(DateValidator.isFirstDayOfMonth(now)).toBe(false)
    })

    test("isLastDayOfMonth returns true for last day", () => {
        expect(DateValidator.isLastDayOfMonth(endOfMonth)).toBe(true)
    })

    test("isLastDayOfMonth returns false for not last day", () => {
        expect(DateValidator.isLastDayOfMonth(now)).toBe(false)
    })

    test("isParsable returns true for valid date string", () => {
        const template = "yyyy-MM-dd"
        expect(DateValidator.isParsable(template)("2023-01-01")).toBe(true)
    })

    test("isParsable returns false for invalid date string", () => {
        const template = "yyyy-MM-dd"
        expect(DateValidator.isParsable(template)("not-a-date")).toBe(false)
    })
})