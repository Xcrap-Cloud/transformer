import { DateTansformer } from "../src"

describe("DateTansformer", () => {
    describe("fromString", () => {
        it("should parse a date string with the given template", () => {
            const parse = DateTansformer.fromString("yyyy-MM-dd")
            const date = parse("2024-06-01")
            expect(date).toBeInstanceOf(Date)
            expect(date.getFullYear()).toBe(2024)
            expect(date.getMonth()).toBe(5)
            expect(date.getDate()).toBe(1)
        })
    })

    describe("fromTimestamp", () => {
        it("should create a Date from a timestamp", () => {
            const timestamp = 1717200000000
            const date = DateTansformer.fromTimestamp(timestamp)
            expect(date).toBeInstanceOf(Date)
            expect(date.getTime()).toBe(timestamp)
        })
    })

    describe("fromISO", () => {
        it("should parse an ISO date string", () => {
            const isoString = "2024-06-01T12:34:56.789Z"
            const date = DateTansformer.fromISO(isoString)
            expect(date).toBeInstanceOf(Date)
            expect(date.toISOString()).toBe(isoString)
        })
    })

    describe("isValid", () => {
        it("should return true for a valid date", () => {
            const date = new Date("2024-06-01")
            expect(DateTansformer.isValid(date)).toBe(true)
        })

        it("should return false for an invalid date", () => {
            const date = new Date("invalid-date")
            expect(DateTansformer.isValid(date)).toBe(false)
        })
    })

    describe("toISO", () => {
        it("should convert a Date to ISO string", () => {
            const date = new Date(Date.UTC(2024, 5, 1, 12, 0, 0))
            expect(DateTansformer.toISO(date)).toBe("2024-06-01T12:00:00.000Z")
        })
    })

    describe("toTimestamp", () => {
        it("should convert a Date to timestamp", () => {
            const date = new Date("2024-06-01T00:00:00.000Z")
            expect(DateTansformer.toTimestamp(date)).toBe(date.getTime())
        })
    })

    describe("format", () => {
        it("should format a Date with the given template", () => {
            const format = DateTansformer.format("yyyy/MM/dd")
            const date = new Date(2024, 5, 1)
            expect(format(date)).toBe("2024/06/01")
        })
    })
})