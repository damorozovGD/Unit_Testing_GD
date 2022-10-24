const unitTestingTask = require("./unitTestingTask")

const formatError = 'Argument `format` must be a string';
const dateError = "Argument `date` must be instance of Date or Unix Timestamp or ISODate String";

const dateStringAM = 'February 2, 2015 04:09:03:07'
const dateStringPM = 'February 2, 2015 12:09:03:07';

const testDateAM = new Date(dateStringAM);
const testDatePM = new Date(dateStringPM);

describe("testing invalid arguments", () => {
    it("if no arguments were passed, an error should be thrown", () => {
        expect(() => unitTestingTask()).toThrow(formatError)
    })

    it("if first argument was passed, but it was not a string, an error should be thrown", () => {
        expect(() => unitTestingTask(true)).toThrow(formatError)
    })

    it("if second argument was neither an instance of Date, nor a Unix Timestamp, nor an ISODate String, an error should be thrown", () => {
        expect(() => unitTestingTask("someColdJoke", true)).toThrow(dateError)
        expect(() => unitTestingTask("someColdJoke", {})).toThrow(dateError)
        expect(() => unitTestingTask("someColdJoke", null)).toThrow(dateError)
    })
})

describe("testing valid arguments and 'YYYY'", () => {
    it("if second argument was a valid string, default year should be returned", () => {
        expect(unitTestingTask("YYYY", dateStringAM)).toBe("2015")
    })

    it("if second argument was an instance of date, default year should be returned", () => {
        expect(unitTestingTask("YYYY", testDateAM)).toBe("2015")
    })

    it("if second argument was a unix timestamp, default year should be returned", () => {
        const timestamp = Date.parse((dateStringAM))
        expect(unitTestingTask("YYYY", timestamp)).toBe("2015")
    })

    it("if second argument was not passed, current date should be returned", () => {
        expect(unitTestingTask("YYYY")).toBe(new Date().getFullYear().toString())
    })

    it("if first argument was 'ISODate', 'YYYY-MM-dd' date format should be returned", () => {
        expect(unitTestingTask("ISODate", testDateAM)).toBe("2015-02-02")
    })
})

describe("testing various formats", () => {
    it("'YY': should return the last 2 digits of the passed year", () => {
        expect(unitTestingTask("YY", testDateAM)).toBe("15")
    })

    it("'MM': should return the correct month consisting of 2 digits", () => {
        expect(unitTestingTask("MM", testDateAM)).toBe("02")
    })

    it("'M': should return the correct month consisting of 1 digit", () => {
        expect(unitTestingTask("M", testDateAM)).toBe("2")
    })

    it("'dd': should return the correct day consisting of 2 digits", () => {
        expect(unitTestingTask("dd", testDateAM)).toBe("02")
    })

    it("'d': should return the correct day consisting of 1 digit", () => {
        expect(unitTestingTask("d", testDateAM)).toBe("2")
    })

    it("'HH': should return the correct hour consisting of 2 digits", () => {
        expect(unitTestingTask("HH", testDateAM)).toBe("04")
    })

    it("'H': should return the correct hour consisting of 1 digit", () => {
        expect(unitTestingTask("H", testDateAM)).toBe("4")
    })

    it("'hh': should return the correct hour consisting of 2 digits", () => {
        expect(unitTestingTask("hh", testDatePM)).toBe("12")
    })

    it("'h': should return the correct hour consisting of 1 digit", () => {
        expect(unitTestingTask("h", testDatePM)).toBe("12")
    })

    it("'mm': should return correct minutes consisting of 2 digits", () => {
        expect(unitTestingTask("mm", testDateAM)).toBe("09")
    })

    it("'m': should return correct minutes consisting of 1 digit", () => {
        expect(unitTestingTask("m", testDateAM)).toBe("9")
    })

    it("'ss': should return correct seconds consisting of 2 digits", () => {
        expect(unitTestingTask("ss", testDateAM)).toBe("03")
    })

    it("'s': should return correct seconds consisting of 1 digit", () => {
        expect(unitTestingTask("s", testDateAM)).toBe("3")
    })

    it("'ff': should return correct milliseconds consisting of 3 digits", () => {
        expect(unitTestingTask("ff", testDateAM)).toBe("007")
    })

    it("'f': should return the correct milliseconds consisting of 1 digit", () => {
        expect(unitTestingTask("f", testDateAM)).toBe("7")
    })

    it("'MMMM': should return correct month name", () => {
        expect(unitTestingTask("MMMM", testDateAM)).toBe("February")
    })

    it("'MMM': should return correct and shortened name of the month", () => {
        expect(unitTestingTask("MMM", testDateAM)).toBe("Feb")
    })

    it("'DDD': should return correct name of the day", () => {
        expect(unitTestingTask("DDD", testDateAM)).toBe("Monday")
    })

    it("'DD': should return correct shortened month name", () => {
        expect(unitTestingTask("DD", testDateAM)).toBe("Mon")
    })

    it("'D': should return correct shortened month name", () => {
        expect(unitTestingTask("D", testDateAM)).toBe("Mo")
    })

    it("'ZZ': should return correct offset", () => {
        expect(unitTestingTask("ZZ", testDateAM)).toBe("+0000")
    })

    it("'Z': should return correct offset with a separator", () => {
        expect(unitTestingTask("Z", testDateAM)).toBe("+00:00")
    })

    it("'A': should return correct time of day according to 12-hour time convention", () => {
        expect(unitTestingTask("A", testDateAM)).toBe("AM")
        expect(unitTestingTask("A", testDatePM)).toBe("PM")
    })

    it("'a': should return correct time of day in lowercase according to 12-hour time convention", () => {
        expect(unitTestingTask("a", testDateAM)).toBe("am")
        expect(unitTestingTask("a", testDatePM)).toBe("pm")
    })
})

