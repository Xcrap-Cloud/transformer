import currencies from "currency-list"
import Decimal from "decimal.js"

import { StringValidator } from "../validators/string"

const allCurrencies = currencies.getAll()

const CURRENCY_CODES: string[] = []
const CURRENCY_SYMBOLS: string[] = []
const CURRENCY_NATIONAL_SYMBOLS: string[] = []

const DOLLAR_CODES = CURRENCY_CODES.filter(k => k.endsWith("D"))

const DOLLAR_REGEX = new RegExp(
    `\\b(?:${DOLLAR_CODES.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|")})(?=\\$?(?:[\\W\\d]|$))`,
    'g'
)

const OTHER_CURRENCY_SYMBOLS_SET = new Set<string>([
    ...CURRENCY_CODES,
    ...CURRENCY_SYMBOLS,
    ...CURRENCY_NATIONAL_SYMBOLS,
    "р", "Р"
])

for (const locale in allCurrencies) {
    if (Object.prototype.hasOwnProperty.call(allCurrencies, locale)) {
        const currenciesInLocale = allCurrencies[locale]

        for (const code in currenciesInLocale) {
            if (Object.prototype.hasOwnProperty.call(currenciesInLocale, code)) {
                const currency = currenciesInLocale[code as keyof typeof currenciesInLocale] as {
                    name: string
                    symbol_native: string
                    symbol: string
                    code: string
                    name_plural: string
                    rounding: number
                    decimal_digits: number
                }

                if (!CURRENCY_CODES.includes(currency.code)) {
                    CURRENCY_CODES.push(currency.code)
                }
                if (currency.symbol && !CURRENCY_SYMBOLS.includes(currency.symbol)) {
                    CURRENCY_SYMBOLS.push(currency.symbol)
                }
                if (currency.symbol_native && !CURRENCY_NATIONAL_SYMBOLS.includes(currency.symbol_native)) {
                    CURRENCY_NATIONAL_SYMBOLS.push(currency.symbol_native)
                }
            }
        }
    }
}

const SAFE_CURRENCY_SYMBOLS: string[] = [
    "Bds$", "CUC$", "MOP$", "AR$", "AU$", "BN$", "BZ$", "CA$", "CL$", "CO$", "CV$", "HK$",
    "MX$", "NT$", "NZ$", "TT$", "RD$", "WS$", "US$", "$U", "C$", "J$", "N$", "R$", "S$",
    "T$", "Z$", "A$", "SY£", "LB£", "CN¥", "GH₵",
    "$", "€", "£", "zł", "Zł", "Kč", "₽", "¥", "￥", "฿", "դր.", "դր", "₦", "₴", "₱", "৳",
    "₭", "₪", "﷼", "៛", "₩", "₫", "₡", "টকা", "ƒ", "₲", "؋", "₮", "नेरू", "₨", "₶", "₾",
    "֏", "ރ", "৲", "૱", "௹", "₠", "₢", "₣", "₤", "₧", "₯", "₰", "₳", "₷", "₸", "₹", "₺",
    "₼", "₾", "₿", "ℳ",
    "ر.ق.\u200f", "د.ك.\u200f", "د.ع.\u200f", "ر.ع.\u200f", "ر.ي.\u200f", "ر.س.\u200f", "د.ج.\u200f",
    "د.م.\u200f", "د.إ.\u200f", "د.ت.\u200f", "د.ل.\u200f", "ل.س.\u200f", "د.ب.\u200f", "د.أ.\u200f",
    "ج.م.\u200f", "ل.ل.\u200f",
    " تومان", "تومان",
    "EUR", "euro", "eur", "CHF", "DKK", "Rp", "lei", "руб.", "руб", "грн.", "грн",
    "дин.", "Dinara", "динар", "лв.", "лв", "р.", "тңг", "тңг.", "ман.",
]

CURRENCY_CODES.sort()
CURRENCY_SYMBOLS.sort((a, b) => b.length - a.length)
CURRENCY_NATIONAL_SYMBOLS.sort((a, b) => b.length - a.length)

SAFE_CURRENCY_SYMBOLS.forEach(s => OTHER_CURRENCY_SYMBOLS_SET.delete(s))

OTHER_CURRENCY_SYMBOLS_SET.delete("-")
OTHER_CURRENCY_SYMBOLS_SET.delete("XXX")
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(char => OTHER_CURRENCY_SYMBOLS_SET.delete(char))

const OTHER_CURRENCY_SYMBOLS = Array.from(OTHER_CURRENCY_SYMBOLS_SET).sort((a, b) => b.length - a.length)

export namespace StringTransformer {
    export const toLowerCase = (value: string) => value.toLowerCase()

    export const toUpperCase = (value: string) => value.toUpperCase()

    export const trim = (value: string) => value.trim()

    export const toNumber = Number

    export const split = (separator: string) => (value: string) => value.split(separator)

    export const toBoolean = (value: string) => {
        if (!StringValidator.isBooleanText(value)) {
            throw new Error(`'${value}' cannot be converted to boolean!`)
        }

        const truthyValues = ["true", "1", "yes"]
        const lowerValue = value.toLowerCase()

        if (truthyValues.includes(lowerValue)) {
            return true
        }

        return false
    }

    export const normalize = (value: string) => {
        return value
            .normalize("NFD")
            .toLowerCase()
            .replace(/[\u0300-\u036f]/g, "")
            .trim()
    }

    export const removeHtmlTags = (value: string) => value.replace(/<\/?[^>]+(>|$)/g, "")

    export const sanitize = (value: string) => value.replace(/[^a-zA-Z0-9\s]/g, "").trim()

    export const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim()


    export const lookupInRecord = (record: Record<string, string>) => {
        return (value: string) => {
            if (!(value in record)) {
                throw new Error(`Record does not have '${value}' as key!`)
            }

            return record[value]
        }
    }

    export const resolveUrl = (baseUrl: string) => {
        return (value: string) => {
            try {
                return new URL(value, baseUrl).href
            } catch (error) {
                throw new Error(`Invalid URL: '${value}' with base '${baseUrl}'`)
            }
        }
    }
}