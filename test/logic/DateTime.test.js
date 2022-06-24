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
