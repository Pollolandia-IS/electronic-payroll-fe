/// Calculations for date and time


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
    return date.getDate() + separator + (date.getMonth() + 1) + separator + date.getFullYear();
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
 * @throws {Error} if the separator is a number character
 */
export function stringToDate(dateString, separator = "-") {
    if (typeof dateString !== "string") {
        throw new Error("The dateString is not a string");
    }
    if (!dateString.match(/^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/)) {
        throw new Error("The dateString is not a valid date");
    }
    if (typeof separator !== "string") {
        throw new Error("The separator is not a string");
    }
    if (separator.length === 0) {
        throw new Error("The separator is length is 0");
    }
    if (isNaN(separator.charCodeAt(0))) {
        throw new Error("The separator is a number character");
    }
    const parts = dateString.split(separator);
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

export function dateToStringWithTime(date, separator = "-") {
    return dateToString(date, separator) + " " + date.toLocaleTimeString();
}


export function stringToDateWithTime(dateString, separator = "-") {
    const [day, month, year, time] = dateString.split(separator);
    return new Date(year, month - 1, day, time);
}

/**
 * Adds days to a date.
 * @param {Date} date
 * @param {number} days
 * @returns {Date} the date plus the days
 */
export function addDays(date, days) {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

export function getDayDifference(date1, date2) {
    return Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
}

