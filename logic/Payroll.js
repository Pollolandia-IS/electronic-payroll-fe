import { addDays, getDayDifference } from "./DateTimeHelpers";

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
export function applyPercentageDeduction(
    totalSalary,
    percentageDeduction,
    returnTotal = true
) {
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
    return returnTotal
        ? totalSalary - totalSalary * percentageToDecimal(percentageDeduction)
        : totalSalary * percentageToDecimal(percentageDeduction);
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
 * @param {Date} startDate The date the payroll period starts.
 * @param {string} frequency The frequency of the payment
 * @returns {Date} the next payday
 * @throws {Error} if the startDate is not a Date
 * @throws {Error} if the frequency is not a string
 * @throws {Error} if the frequency is not Mensual, Quincenal or Semanal
 * @throws {Error} if the startDate is an invalid date
 */
export function getNextPaymentDate(startDate, frequency) {
    if (!(startDate instanceof Date)) {
        throw new Error("The payment date is not a date");
    }
    if (typeof frequency !== "string") {
        throw new Error("The frequency is not a string");
    }
    if (
        frequency !== "Mensual" &&
        frequency !== "Quincenal" &&
        frequency !== "Semanal"
    ) {
        throw new Error("The frequency is not Mensual, Quincenal or Semanal");
    }
    if (startDate == "Invalid Date") {
        throw new Error("The payment date is an invalid date");
    }
    const date = new Date(startDate);
    date.setHours(date.getHours() + 6);
    if (frequency === "Mensual") {
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
        const daysToAdd = (7 - date.getDay() + 5) % 7;
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
    employerMandatoryDeductions,
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
    const totalEmployerMandatoryDeductions = employerMandatoryDeductions.reduce(
        (accumulated, deduction) => accumulated + deduction.amount,
        0
    );
    const netSalary =
        salary - totalMandatoryDeductions - totalVoluntaryDeductions;
    return {
        salary,
        benefits,
        totalBenefits,
        voluntaryDeductions,
        totalVoluntaryDeductions,
        mandatoryDeductions,
        totalMandatoryDeductions,
        employerMandatoryDeductions,
        totalEmployerMandatoryDeductions,
        netSalary,
    };
}
/**
 * Calculates if project is up to date, close to next payment date or if it is overdue.
 * @param {string} endDate The day the payroll period ends in iso string format.
 * @returns {string} The status of the project. Al dia if the project is up to date, Pendiente and a
 * positive number of days left if the project is close to the next payment date or Pendiente and a negative number of days left if the project is overdue.
 */
export function calculateProjectState(endDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const projectEndDate = new Date(endDate);
    const dayDifference = getDayDifference(projectEndDate, new Date(today));
    if (dayDifference > 2) {
        return "Al Día";
    } else if (dayDifference >= 0) {
        return "Pendiente " + dayDifference;
    } else {
        return "Pendiente " + dayDifference;
    }
}

export const calculateMandatoryDeductions = (
    salary,
    mandatoryDeductions,
    type
) => {
    const mandatoryDeductionsApplied = [];
    let currentPercentage;
    const totalMandatoryDeductions = mandatoryDeductions.reduce(
        (accumulated, deduction) => {
            if (
                deduction.nombre.startsWith(type) &&
                !deduction.nombre.includes("Impuesto de Renta")
            ) {
                currentPercentage = applyPercentageDeduction(
                    salary,
                    deduction.porcentaje,
                    false
                );
                mandatoryDeductionsApplied.push({
                    name: deduction.nombre.split(": ")[1],
                    amount: currentPercentage,
                });
                return accumulated + currentPercentage;
            }
            return accumulated;
        },
        0
    );
    if (type === "Empleado") {
        mandatoryDeductionsApplied.push(calculateIncomeTax(salary));
    }
    return mandatoryDeductionsApplied;
};

const calculateIncomeTax = (salary) => {
    const breakpoints = [0, 842000, 1236000, 2169000, 4337000, salary];
    const taxs = [0, 0.1, 0.15, 0.2, 0.25];
    let totalTax = 0;
    for (let i = 0; i < breakpoints.length - 1; i++) {
        if (salary > breakpoints[i]) {
            totalTax += (breakpoints[i + 1] - breakpoints[i]) * taxs[i];
        }
    }
    return { name: "Impuesto de Renta", amount: totalTax };
};

export const calculateVoluntaryDeductions = (voluntaryDeductions) => {
    const voluntaryDeductionsApplied = [];
    voluntaryDeductions.forEach((deduction) => {
        voluntaryDeductionsApplied.push({
            name: deduction.nombreDeduccion,
            amount: deduction.aporte,
        });
    });
    return voluntaryDeductionsApplied;
};

export const calculateBenefits = (userChoices) => {
    if (userChoices.length === 0) {
        return [];
    }
    let currentBenefit;
    const benefitsApplied = [];
    userChoices.forEach((benefit) => {
        currentBenefit = benefit.beneficios;
        benefitsApplied.push({
            name: currentBenefit.nombreBeneficio,
            amount: currentBenefit.montoPago,
        });
    });
    return benefitsApplied;
};
