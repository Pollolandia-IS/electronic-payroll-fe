import { addDays } from "./DateTimeHelpers";

/**
 *
 * @param {number} salary
 * @param {number} percentage
 */
function applyPercentageDeduction(totalSalary, percentageDeduction) {
    return totalSalary - totalSalary * percentageToDecimal(percentageDeduction);
}

const percentageToDecimal = (percentage) => percentage / 100;

function applyFixedDeduction(totalSalary, fixedDeduction) {
    return totalSalary - fixedDeduction;
}

/**
 * Calculate salary based on the working hours and the hourly rate.
 * @param {number} hours
 * @param {number} hourlyRate
 * @returns {number}
 * @throws {Error} if the hours are not a number
 * @throws {Error} if the hourly rate is not a number
 * @throws {Error} if the hours are less than 0
 * @throws {Error} if the hourly rate is less than 0
 */
function calculateHourlySalary(hours, hourlyRate) {
    if (isNaN(hours)) {
        throw new Error("The hours are not a number");
    }
    if (isNaN(hourlyRate)) {
        throw new Error("The hourly rate is not a number");
    }
    if (hours < 0) {
        throw new Error("The hours are less than 0");
    }
    if (hourlyRate < 0) {
        throw new Error("The hourly rate is less than 0");
    }
    return hours * hourlyRate;
}

/**
 * Add benefits to the salary.
 * @param {number} salary
 * @param {number} benefits
 * @returns {number}
 * @throws {Error} if the salary is not a number
 * @throws {Error} if the benefits are not a number
 * @throws {Error} if the salary is less than 0
 * @throws {Error} if the benefits are less than 0
 */
function addBenefit(salary, benefit) {
    if (isNaN(salary)) {
        throw new Error("The salary is not a number");
    }
    if (isNaN(benefits)) {
        throw new Error("The benefits are not a number");
    }
    if (salary < 0) {
        throw new Error("The salary is less than 0");
    }
    if (benefits < 0) {
        throw new Error("The benefits are less than 0");
    }
    return salary + benefits;
}

/**
 * Calculate the next payday.
 * If frequency is Mensual, next Payment is the last day of the month.
 * If frequency is Quincenal, next Payment is on the 15th of the month or the last day of the month
 * if frequency is weekly, next Payment is next Sunday
 * @param {Date} paymentDate The date of the last payment
 * @param {string} frequency
 * @returns {Date} the next payday
 */
export function getNextPaymentDate(paymentDate, frequency) {
    const date = new Date(paymentDate);
    if (frequency === "Mensual") {
        // last day of the month
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
    } else if (frequency === "Quincenal") {
        if (date.getDate() < 15) {
            date.setDate(15);
        } else {
            date.setDate(1);
            date.setMonth(date.getMonth() + 1);
            date.setDate(0);
        }
    } else if (frequency === "Semanal") {
        // next Sunday
        date.setDate(date.getDate() + (7 - date.getDay()));
    }
    return date;
}

/**
 * Creates a payment fields object with the Name of the field and the amount.
 * @param {string} name The name of the field
 * @param {number} amount The amount of the field
 * @returns {{name: string, amount: number}} The payment fields object
 * @throws {Error} if the name is not a string
 * @throws {Error} if the amount is not a number
 * @throws {Error} if the amount is less than 0
 * @throws {Error} if the name is empty
 */
export function createPaymentField(name, amount) {
    if (typeof name !== "string") {
        throw new Error("The name is not a string");
    }
    if (isNaN(amount)) {
        throw new Error("The amount is not a number");
    }
    if (amount < 0) {
        throw new Error("The amount is less than 0");
    }
    if (name === "") {
        throw new Error("The name is empty");
    }
    return { name, amount };
}

/**
 * Creates all the payment fields for the employee. The fields are:
 * - Salario Bruto
 * - Beneficios
 * - Total Beneficios
 * - Deducciones Voluntarias
 * - Total Deducciones Voluntarias
 * - Deducciones Obligatorias
 * - Total Deducciones Obligatorias
 * - Salario Neto
 * @param {number} salary The salary of the employee
 * @param {Array<{name: string, amount: number}>} mandatoryDeductions The mandatory deductions of the employee
 * @param {Array<{name: string, amount: number}>} voluntaryDeductions The voluntary deductions of the employee
 * @param {Array<{name: string, amount: number}>} benefits The benefits of the employee
 * @returns {{
 * salary: number,
 * benefits: Array<{name: string, amount: number}>,
 * totalBenefits: number,
 * voluntaryDeductions: Array<{name: string, amount: number}>,
 * totalVoluntaryDeductions: number,
 * mandatoryDeductions: Array<{name: string, amount: number}>,
 * totalMandatoryDeductions: number,
 * netSalary: number
 * }} The payment fields object
 */
export function createPaymentFields(
    salary,
    mandatoryDeductions,
    voluntaryDeductions,
    benefits
) {
    const totalBenefits = benefits.reduce(
        (accumulated, benefit) => accumulated + benefit.amount,
        0
    );
    const totalVoluntaryDeductions = voluntaryDeductions.reduce(
        (accumulated, deduction) => accumulated + deduction.amount,
        0
    );
    const totalMandatoryDeductions = mandatoryDeductions.reduce(
        (accumulated, deduction) => accumulated + deduction.amount,
        0
    );
    const netSalary =
        salary - totalMandatoryDeductions - totalVoluntaryDeductions + totalBenefits;
    return {
        salary,
        benefits,
        totalBenefits,
        voluntaryDeductions,
        totalVoluntaryDeductions,
        mandatoryDeductions,
        totalMandatoryDeductions,
        netSalary,
    };
}
