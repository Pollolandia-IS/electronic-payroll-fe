/**
 * @jest-environment jsdom
 */

import React from "react";
import {
    dateToString,
    stringToDate,
    dateToStringWithTime,
    stringToDateWithTime,
    addDays,
    getDayDifference,
} from "../../logic/DateTimeHelpers";

describe("Date to String", () => {
    it("should convert a date to a string", () => {
        const date = new Date(2018, 0, 1);
        expect(dateToString(date)).toBe("01-01-2018");
    }),
        it("should convert a date to a string with a custom separator", () => {
            const date = new Date(2018, 0, 1);
            expect(dateToString(date, "/")).toBe("01/01/2018");
        }),
        it("should throw an error if the date is not a date", () => {
            expect(() => {
                dateToString(1);
            }).toThrowError("The date is not a date");
        }),
        it("should throw an error if the separator is not a string", () => {
            expect(() => {
                dateToString(new Date(), 1);
            }).toThrowError("The separator is not a string");
        }),
        it("should throw an error if the separator is empty", () => {
            expect(() => {
                dateToString(new Date(), "");
            }).toThrowError("The separator is empty");
        }),
        it("should throw an error if the separator is not a single character", () => {
            expect(() => {
                dateToString(new Date(), "-/");
            }).toThrowError("The separator is not a single character");
        });
});

describe("String to Date", () => {
    it("should convert a string to a date", () => {
        const date = new Date(2018, 0, 1);
        expect(stringToDate("01-01-2018")).toEqual(date);
    }),
        it("should convert a string to a date with a custom separator", () => {
            const date = new Date(2018, 0, 1);
            expect(stringToDate("01/01/2018", "/")).toEqual(date);
        }),
        it("should throw an error if the dateString is not a string", () => {
            expect(() => {
                stringToDate(1);
            }).toThrowError("The dateString is not a string");
        }),
        it("should throw an error if the dateString is not a valid date", () => {
            expect(() => {
                stringToDate("44-01-2018");
            }).toThrowError("The dateString is not a valid date");
        }),
        it("should throw an error if the separator is not a string", () => {
            expect(() => {
                stringToDate("01-01-2018", 1);
            }).toThrowError("The separator is not a string");
        }),
        it("should throw an error if the separator is length is 0", () => {
            expect(() => {
                stringToDate("01-01-2018", "");
            }).toThrowError("The separator is empty");
        }),
        it("should throw an error if the separator is not a single character", () => {
            expect(() => {
                stringToDate("01-01-2018", "-/");
            }).toThrowError("The separator is not a single character");
        });
});

describe("Date to String with Time", () => {
    it("should convert a date to a string", () => {
        const date = new Date(2018, 0, 1);
        expect(dateToStringWithTime(date)).toBe("01-01-2018 00:00");
    }),
        it("should convert a date to a string with a custom separator", () => {
            const date = new Date(2018, 0, 1);
            expect(dateToStringWithTime(date, "/")).toBe("01/01/2018 00:00");
        }),
        it("should throw an error if the date is not a date", () => {
            expect(() => {
                dateToStringWithTime(1);
            }).toThrowError("The date is not a date");
        }),
        it("should throw an error if the separator is not a string", () => {
            expect(() => {
                dateToStringWithTime(new Date(), 1);
            }).toThrowError("The separator is not a string");
        }),
        it("should throw an error if the separator is empty", () => {
            expect(() => {
                dateToStringWithTime(new Date(), "");
            }).toThrowError("The separator is empty");
        }),
        it("should throw an error if the separator is not a single character", () => {
            expect(() => {
                dateToStringWithTime(new Date(), "-/");
            }).toThrowError("The separator is not a single character");
        });
});

describe("String to Date with Time", () => {
    it("should convert a string to a date", () => {
        const date = new Date(2018, 0, 1);
        expect(stringToDateWithTime("01-01-2018 00:00")).toEqual(date);
    }),
        it("should convert a string to a date with a custom separator", () => {
            const date = new Date(2018, 0, 1);
            expect(stringToDateWithTime("01/01/2018 00:00", "/")).toEqual(date);
        }),
        it("should throw an error if the dateString is not a string", () => {
            expect(() => {
                stringToDateWithTime(1);
            }).toThrowError("The dateString is not a string");
        }),
        it("should throw an error if the dateString is not a valid date", () => {
            expect(() => {
                stringToDateWithTime("44-01-2018 00:00");
            }).toThrowError("The dateString is not a valid date");
        }),
        it("should throw an error if the separator is not a string", () => {
            expect(() => {
                stringToDateWithTime("01-01-2018 00:00", 1);
            }).toThrowError("The separator is not a string");
        }),
        it("should throw an error if the separator is length is 0", () => {
            expect(() => {
                stringToDateWithTime("01-01-2018 00:00", "");
            }).toThrowError("The separator is empty");
        }),
        it("should throw an error if the separator is not a single character", () => {
            expect(() => {
                stringToDateWithTime("01-01-2018 00:00", "-/");
            }).toThrowError("The separator is not a single character");
        });
});

describe("Add Days", () => {
    it("should add days to a date", () => {
        const date = new Date(2018, 0, 1);
        expect(addDays(date, 1)).toEqual(new Date(2018, 0, 2));
    }),
        it("should add days to a date with a custom separator", () => {
            const date = new Date(2018, 0, 1);
            expect(addDays(date, 1, "/")).toEqual(new Date(2018, 0, 2));
        }),
        it("should throw an error if the date is not a date", () => {
            expect(() => {
                addDays(1, 1);
            }).toThrowError("The date is not a date");
        }),
        it("should throw an error if the days is not a number", () => {
            expect(() => {
                addDays(new Date(), "1");
            }).toThrowError("The days is not a number");
        }),
        it("should throw an error if the days is not an integer", () => {
            expect(() => {
                addDays(new Date(), 1.5);
            }).toThrowError("The days is not an integer");
        });
});

describe("Get Days difference", () => {
    it("should get the days difference between two dates", () => {
        const date1 = new Date(2018, 0, 2);
        const date2 = new Date(2018, 0, 1);
        expect(getDayDifference(date1, date2)).toBe(1);
    }),
        it("should throw an error if one of the dates is not a date", () => {
            expect(() => {
                getDayDifference(1, new Date());
            }).toThrowError("One of the dates is not a date");
        }),
        it("should throw an error if one of the dates is an invalid date", () => {
            expect(() => {
                getDayDifference(new Date(), new Date("44-01-2018"));
            }).toThrowError("One of the dates is an invalid date");
        });
});
