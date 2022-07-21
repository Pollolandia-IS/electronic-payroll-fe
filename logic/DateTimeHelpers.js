/**
 * Converts a date to a string in the format DD-MM-YYYY where - is the given separator.
 * @param {Date} date
 * @param {string} separator
 * @returns {string}
 * @throws {Error} if the date is not a Date
 * @throws {Error} if the separator is not a string
 * @throws {Error} if the separator is empty
 * @throws {Error} if the separator is not a single character
 */
export function dateToString(date, separator = "-") {
    if (!(date instanceof Date)) {
        throw new Error("The date is not a date");
    }
    if (typeof separator !== "string") {
        throw new Error("The separator is not a string");
    }
    if (separator.length > 1) {
        throw new Error("The separator is not a single character");
    }
    if (separator.length === 0) {
        throw new Error("The separator is empty");
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // add leading zero if necessary
    const dayString = day < 10 ? "0" + day : day;
    const monthString = month < 10 ? "0" + month : month;
    return `${dayString}${separator}${monthString}${separator}${year}`;
}

/**
 *  convert a dd-mm-yyyy string with any separator to a date
 * @param {string} dateString
 * @param {string} separator
 * @returns {Date}
 * @throws {Error} if the dateString is not a string
 * @throws {Error} if the dateString is not a valid date
 * @throws {Error} if the separator is not a string
 * @throws {Error} if the separator is length is 0
 * @throws {Error} if the separator is not a single character
 */
export function stringToDate(dateString, separator = "-") {
    if (typeof dateString !== "string") {
        throw new Error("The dateString is not a string");
    }
    if (new Date(dateString).toString() === "Invalid Date") {
        throw new Error("The dateString is not a valid date");
    }
    if (typeof separator !== "string") {
        throw new Error("The separator is not a string");
    }
    if (separator.length === 0) {
        throw new Error("The separator is empty");
    }
    if (separator.length > 1) {
        throw new Error("The separator is not a single character");
    }
    const parts = dateString.split(separator);
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

/**
 * Converts a date to a string in the format DD-MM-YYYY HH:MM:SS where - is the given separator.
 * @param {Date} date
 * @param {string} separator
 * @returns {string}
 * @throws {Error} if the date is not a Date
 * @throws {Error} if the separator is not a string
 * @throws {Error} if the separator is empty
 * @throws {Error} if the separator is not a single character
 */
export function dateToStringWithTime(date, separator = "-") {
    if (!(date instanceof Date)) {
        throw new Error("The date is not a date");
    }
    if (typeof separator !== "string") {
        throw new Error("The separator is not a string");
    }
    if (separator.length > 1) {
        throw new Error("The separator is not a single character");
    }
    if (separator.length === 0) {
        throw new Error("The separator is empty");
    }
    return (
        dateToString(date, separator) +
        " " +
        date.toLocaleTimeString("en-Gb", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    );
}

/**
 * convert a dd-mm-yyyy HH:MM:SS string with any separator to a date
 * @param {string} dateString
 * @param {string} separator
 * @returns {Date}
 * @throws {Error} if the dateString is not a string
 * @throws {Error} if the dateString is not a valid date
 * @throws {Error} if the separator is not a string
 * @throws {Error} if the separator is length is 0
 * @throws {Error} if the separator is not a single character
 */
export function stringToDateWithTime(dateString, separator = "-") {
    if (typeof dateString !== "string") {
        throw new Error("The dateString is not a string");
    }
    if (new Date(dateString).toString() === "Invalid Date") {
        throw new Error("The dateString is not a valid date");
    }
    if (typeof separator !== "string") {
        throw new Error("The separator is not a string");
    }
    if (separator.length === 0) {
        throw new Error("The separator is empty");
    }
    if (separator.length > 1) {
        throw new Error("The separator is not a single character");
    }
    let [date, time] = dateString.split(" ");
    time = time + ":00";
    const [day, month, year] = date.split(separator);

    return new Date(`${year}-${month}-${day}T${time}`);
}

/**
 * Adds days to a date.
 * @param {Date} date
 * @param {number} days
 * @returns {Date} the date plus the days
 * @throws {Error} if the date is not a Date
 * @throws {Error} if the days is not a number
 * @throws {Error} if the days is not an integer
 */
export function addDays(date, days) {
    if (!(date instanceof Date)) {
        throw new Error("The date is not a date");
    }
    if (typeof days !== "number") {
        throw new Error("The days is not a number");
    }
    if (days % 1 !== 0) {
        throw new Error("The days is not an integer");
    }
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

/**
 * Subtracts two dates and returns the number of days between them.
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number} the number of days between the two dates
 * @throws {Error} if one of the dates is not a Date
 * @throws {Error} if one of the dates is an invalid date
 */
export function getDayDifference(date1, date2) {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
        throw new Error("One of the dates is not a date");
    }
    if (
        date1.toString() === "Invalid Date" ||
        date2.toString() === "Invalid Date"
    ) {
        throw new Error("One of the dates is an invalid date");
    }
    return Math.floor(
        (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
    );
}

export const createLocalDate = (date) => {
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
}
