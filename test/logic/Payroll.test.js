import React from "react";
import {
    applyPercentageDeduction,
    applyFixedDeduction,
    calculateHourlySalary,
    addBenefit,
    getNextPaymentDate,
    createPaymentField,
    createPayment,
} from "../../logic/Payroll";

describe("Apply Percentage Deduction", () => {
    it("should apply a percentage deduction to a salary", () => {
        expect(applyPercentageDeduction(1000, 10)).toBe(900);
    });
    it("should throw an error if the salary is not a number", () => {
        expect(() => applyPercentageDeduction("a", 10)).toThrow(
            new Error("The salary is not a number")
        );
    });
    it("should throw an error if the percentage is not a number", () => {
        expect(() => applyPercentageDeduction(1000, "a")).toThrow(
            new Error("The percentage deduction is not a number")
        );
    });
    it("should throw an error if the salary is less than 0", () => {
        expect(() => applyPercentageDeduction(-1, 10)).toThrow(
            new Error("The salary is less than 0")
        );
    });
    it("should throw an error if the percentage is less than 0", () => {
        expect(() => applyPercentageDeduction(1000, -1)).toThrow(
            new Error("The percentage deduction is less than 0")
        );
    });
});

describe("Apply Fixed Deduction", () => {
    it("should apply a fixed deduction to a salary", () => {
        expect(applyFixedDeduction(1000, 100)).toBe(900);
    });
    it("should throw an error if the salary is not a number", () => {
        expect(() => applyFixedDeduction("a", 10)).toThrow(
            new Error("The salary is not a number")
        );
    });
    it("should throw an error if the fixed deduction is not a number", () => {
        expect(() => applyFixedDeduction(1000, "a")).toThrow(
            new Error("The fixed deduction is not a number")
        );
    });
    it("should throw an error if the salary is less than 0", () => {
        expect(() => applyFixedDeduction(-1, 10)).toThrow(
            new Error("The salary is less than 0")
        );
    });
    it("should throw an error if the fixed deduction is less than 0", () => {
        expect(() => applyFixedDeduction(1000, -1)).toThrow(
            new Error("The fixed deduction is less than 0")
        );
    });
    it("should throw an error if the salary is less than the fixed deduction", () => {
        expect(() => applyFixedDeduction(100, 1000)).toThrow(
            new Error("The salary is less than the fixed deduction")
        );
    });
});

describe("Calculate Hourly Salary", () => {
    it("should calculate the hourly salary", () => {
        expect(calculateHourlySalary(200, 2500)).toBe(500000);
    });
    it("should throw an error if the hours are not a number", () => {
        expect(() => calculateHourlySalary("a", 2500)).toThrow(
            new Error("The hours are not a number")
        );
    });
    it("should throw an error if the hourly rate is not a number", () => {
        expect(() => calculateHourlySalary(200, "a")).toThrow(
            new Error("The hourly rate is not a number")
        );
    });
    it("should throw an error if the hours are less than 0", () => {
        expect(() => calculateHourlySalary(-1, 2500)).toThrow(
            new Error("The hours are less than 0")
        );
    });
    it("should throw an error if the hourly rate is less than 0", () => {
        expect(() => calculateHourlySalary(200, -1)).toThrow(
            new Error("The hourly rate is less than 0")
        );
    });
});

describe("Add Benefit", () => {
    it("should add a benefit to a salary", () => {
        expect(addBenefit(1000, 100)).toBe(1100);
    });
    it("should throw an error if the salary is not a number", () => {
        expect(() => addBenefit("a", 10)).toThrow(
            new Error("The salary is not a number")
        );
    });
    it("should throw an error if the benefit is not a number", () => {
        expect(() => addBenefit(1000, "a")).toThrow(
            new Error("The benefit is not a number")
        );
    });
    it("should throw an error if the salary is less than 0", () => {
        expect(() => addBenefit(-1, 10)).toThrow(
            new Error("The salary is less than 0")
        );
    });
    it("should throw an error if the benefit is less than 0", () => {
        expect(() => addBenefit(1000, -1)).toThrow(
            new Error("The benefit is less than 0")
        );
    });
});

describe("Get Next Payment Date", () => {
    const testDate2 = new Date(2022, 1, 28);
    const testDate1 = new Date(2022, 0, 31);
    const testDate3 = new Date(2022, 0, 15);
    const testDate4 = new Date(2022, 1, 28);
    const testDate5 = new Date(2022, 0, 7);   
    const testDate6 = new Date(2022, 0, 7);
    const testDate7 = new Date(2022, 0, 21);
    const testDate8 = new Date(2022, 2, 4);
    testDate1.setHours(testDate1.getHours() + 6);
    testDate2.setHours(testDate2.getHours() + 6);
    testDate3.setHours(testDate3.getHours() + 6);
    testDate4.setHours(testDate4.getHours() + 6);
    testDate5.setHours(testDate5.getHours() + 6);
    testDate6.setHours(testDate6.getHours() + 6);
    testDate7.setHours(testDate7.getHours() + 6);
    testDate8.setHours(testDate8.getHours() + 6);

    it("should get the next payment date", () => {
        expect(getNextPaymentDate(new Date(2022, 0, 1), "Mensual")).toEqual(
            testDate1
        );
        expect(getNextPaymentDate(new Date(2022, 1, 1), "Mensual")).toEqual(
            testDate2
        );
        expect(getNextPaymentDate(new Date(2022, 0, 1), "Quincenal")).toEqual(
            testDate3
        );
        expect(getNextPaymentDate(new Date(2022, 1, 16), "Quincenal")).toEqual(
            testDate4
        );
        expect(getNextPaymentDate(new Date(2022, 0, 1), "Semanal")).toEqual(
            testDate5
        );
        expect(getNextPaymentDate(new Date(2022, 0, 7), "Semanal")).toEqual(
            testDate6
        );
        expect(getNextPaymentDate(new Date(2022, 0, 18), "Semanal")).toEqual(
            testDate7
        );
        expect(getNextPaymentDate(new Date(2022, 1, 28), "Semanal")).toEqual(
            testDate8
        );
    });

    it("should throw an error if the payment date is not a date", () => {
        expect(() => getNextPaymentDate("a", "Mensual")).toThrow(
            new Error("The payment date is not a date")
        );
    });
    it("should throw an error if the payment frequency is not a string", () => {
        expect(() => getNextPaymentDate(new Date(2022, 1, 1), 1)).toThrow(
            new Error("The frequency is not a string")
        );
    });
    it("should throw an error if the frequency is not Mensual, Semanal, or Quincenal", () => {
        expect(() =>
            getNextPaymentDate(new Date(2022, 1, 1), "Diario")
        ).toThrow(
            new Error("The frequency is not Mensual, Quincenal or Semanal")
        );
    });
    it("should throw an error if the payment date is an invalid date", () => {
        expect(() =>
            getNextPaymentDate(new Date("44-09-2022"), "Mensual")
        ).toThrow(new Error("The payment date is an invalid date"));
    });
});

describe("Create Payment Field", () => {
    it("should create a payment field", () => {
        expect(createPaymentField("Deduccion Pollolandia", 2000)).toEqual({
            name: "Deduccion Pollolandia",
            amount: 2000,
        });
        expect(createPaymentField("Beneficio 1", 202)).toEqual({
            name: "Beneficio 1",
            amount: 202,
        });
    });
    it("should throw an error if the name is not a string", () => {
        expect(() => createPaymentField(1, 2000)).toThrow(
            new Error("The name is not a string")
        );
    });
    it("should throw an error if the amount is not a number", () => {
        expect(() => createPaymentField("Deduccion Pollolandia", "a")).toThrow(
            new Error("The amount is not a number")
        );
    });
    it("should throw an error if the amount is less than 0", () => {
        expect(() => createPaymentField("Deduccion Pollolandia", -1)).toThrow(
            new Error("The amount is less than 0")
        );
    });
    it("should throw an error if the name is empty", () => {
        expect(() => createPaymentField("", 2000)).toThrow(
            new Error("The name is empty")
        );
    });
});

describe("Create Payment", () => {
    it("should create a payment", () => {
        expect(
            createPayment(
                100000,
                [
                    createPaymentField("Deduccion Obligatoria 1", 2000),
                    createPaymentField("Deduccion Obligatoria 2", 250),
                ],
                [
                    createPaymentField("Deduccion Obligatoria Empleador 1", 2000),
                    createPaymentField("Deduccion Obligatoria Empleador 2", 2500),
                ],
                [
                    createPaymentField("Deduccion Voluntaria 1", 2000),
                    createPaymentField("Deduccion Voluntaria 2", 250),
                ],
                [
                    createPaymentField("Beneficio 1", 2000),
                    createPaymentField("Beneficio 2", 250),
                ]
            )
        ).toEqual({
            salary: 100000,
            benefits: [
                { name: "Beneficio 1", amount: 2000 },
                { name: "Beneficio 2", amount: 250 },
            ],
            totalBenefits: 2250,
            voluntaryDeductions: [
                { name: "Deduccion Voluntaria 1", amount: 2000 },
                { name: "Deduccion Voluntaria 2", amount: 250 },
            ],
            totalVoluntaryDeductions: 2250,
            mandatoryDeductions: [
                { name: "Deduccion Obligatoria 1", amount: 2000 },
                { name: "Deduccion Obligatoria 2", amount: 250 },
            ],
            totalMandatoryDeductions: 2250,
            employerMandatoryDeductions: [
                { name: "Deduccion Obligatoria Empleador 1", amount: 2000 },
                { name: "Deduccion Obligatoria Empleador 2", amount: 2500 },
            ],
            totalEmployerMandatoryDeductions: 4500,
            netSalary: 95500,
        });
    });
});
