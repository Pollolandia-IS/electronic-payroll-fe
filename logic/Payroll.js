import { addDays } from "./DateTimeHelpers";

/**
 * Applies a percentage deduction (mandatory deduction) to the salary.
 * @param {number} salary The salary to apply the percentage deduction to.
 * @param {number} percentage The percentage of the salary to deduct.
 * @returns {number} The salary after the percentage deduction.
 * @throws {Error} if the salary is not a number
 * @throws {Error} if the percentage is not a number
 * @throws {Error} if the salary is less than 0
 * @throws {Error} if the percentage is less than 0 
 */
export function applyPercentageDeduction(totalSalary, percentageDeduction) {
    if (isNaN(totalSalary)) {
        throw new Error("The salary is not a number");
    }
    if (isNaN(percentageDeduction)) {
        throw new Error("The percentage deduction is not a number");
    }
    if (totalSalary < 0) {
        throw new Error("The salary is less than 0");
    }
    if (percentageDeduction < 0) {
        throw new Error("The percentage deduction is less than 0");
    }
    return totalSalary - totalSalary * percentageToDecimal(percentageDeduction);
}

const percentageToDecimal = (percentage) => percentage / 100;

/**
 * Applies a fixed deduction (voluntary deduction) to the salary.
 * @param {number} salary The salary to apply the fixed deduction to.
 * @param {number} fixedDeduction The fixed amount to deduct.
 * @returns {number} The salary after the fixed deduction.
 * @throws {Error} if the salary is not a number
 * @throws {Error} if the fixed deduction is not a number
 * @throws {Error} if the salary is less than 0
 * @throws {Error} if the fixed deduction is less than 0
 * @throws {Error} if the salary is less than the fixed deduction
 */
export function applyFixedDeduction(totalSalary, fixedDeduction) {
    if (isNaN(totalSalary)) {
        throw new Error("The salary is not a number");
    }
    if (isNaN(fixedDeduction)) {
        throw new Error("The fixed deduction is not a number");
    }
    if (totalSalary < 0) {
        throw new Error("The salary is less than 0");
    }
    if (fixedDeduction < 0) {
        throw new Error("The fixed deduction is less than 0");
    }
    if (totalSalary < fixedDeduction) {
        throw new Error("The salary is less than the fixed deduction");
    }
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
export function calculateHourlySalary(hours, hourlyRate) {
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
 * @param {number} benefit
 * @returns {number}
 * @throws {Error} if the salary is not a number
 * @throws {Error} if the benefits are not a number
 * @throws {Error} if the salary is less than 0
 * @throws {Error} if the benefits are less than 0
 */
export function addBenefit(salary, benefit) {
    if (isNaN(salary)) {
        throw new Error("The salary is not a number");
    }
    if (isNaN(benefit)) {
        throw new Error("The benefit is not a number");
    }
    if (salary < 0) {
        throw new Error("The salary is less than 0");
    }
    if (benefit < 0) {
        throw new Error("The benefit is less than 0");
    }
    return salary + benefit;
}

/**
 * Calculate the next payday.
 * If frequency is Mensual, next Payment is the last day of the month.
 * If frequency is Quincenal, next Payment is on the 15th of the month or the last day of the month
 * if frequency is weekly, next Payment is next Friday.
 * @param {Date} paymentDate The date of the last payment
 * @param {string} frequency The frequency of the payment
 * @returns {Date} the next payday
 * @throws {Error} if the paymentDate is not a Date
 * @throws {Error} if the frequency is not a string
 * @throws {Error} if the frequency is not Mensual, Quincenal or Semanal
 * @throws {Error} if the paymentDate is an invalid date
 */
export function getNextPaymentDate(paymentDate, frequency) {
    if (!(paymentDate instanceof Date)) {
        throw new Error("The payment date is not a date");
    }
    if (typeof frequency !== "string") {
        throw new Error("The frequency is not a string");
    }
    if (frequency !== "Mensual" && frequency !== "Quincenal" && frequency !== "Semanal") {
        throw new Error("The frequency is not Mensual, Quincenal or Semanal");
    }
    if (paymentDate == "Invalid Date") {
        throw new Error("The payment date is an invalid date");
    }
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
        const daysToAdd = ((7 - date.getDay() + 5) % 7);
        date.setDate(date.getDate() + daysToAdd);
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
export function createPayment(
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
        // TODO ask if benefits should be added to the salary
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
