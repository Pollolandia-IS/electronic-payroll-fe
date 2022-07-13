/**
 * @jest-environment jsdom
 */

 import React from "react";
 import { useRouter } from "next/router";
 import LogIn from "../../pages/LogIn";
 import { render, fireEvent, waitFor, act, screen } from "@testing-library/react";
 import '@testing-library/jest-dom';
 
 jest.mock("next/router");
 
 describe("LogIn", () => {
     let expectedEmail, expectedPassword, expectedRouterPush;
 
     beforeEach(() => {
         expectedEmail = "marialopez@pollolandia.com";
         expectedPassword = "contra123";
         expectedRouterPush = jest.fn();
         useRouter.mockReturnValue({ push: expectedRouterPush });
     });
 
     it("should deny access and show error when password is incorrect", async () => {
         /// mock api response for in
         window.fetch = jest.fn().mockImplementation(() => {
             return Promise.resolve({
                 json: () => Promise.resolve({ type: -1, error: "Usuario y/o contraseña incorrectos" }),
             });
         });
         const { getByTestId } = render(<LogIn />);
         const emailInput = getByTestId("email-input");
         const passwordInput = getByTestId("password-input");
         const submitButton = getByTestId("submit-button");
         fireEvent.change(emailInput, { target: { value: expectedEmail } });
         fireEvent.change(passwordInput, {
             target: { value: "wrong password" },
         });
         fireEvent.click(submitButton);
         await waitFor(() => {
             expect(window.fetch).toHaveBeenCalledTimes(1);
             expect(window.fetch).toHaveBeenCalledWith(
                 "/api/login",
                 {
                     method: "POST",
                     headers: {
                         "Content-Type": "application/json",
                     },
                     body: JSON.stringify({
                         email: expectedEmail,
                         password: "wrong password",
                     }),
                 }
             );
             expect(expectedRouterPush).toHaveBeenCalledTimes(0);
             expect(screen.getByText("Correo o contraseña incorrecta")).toBeInTheDocument();
         });
     });
 
     /// should allow access and redirect to home page when password is correct
     it("should allow access and redirect to home page when password is correct", async () => {
         /// mock api response for in
         window.fetch = jest.fn().mockImplementation(() => {
             return Promise.resolve({
                 json: () => Promise.resolve({ type: 1, token: "token" }),
             });
         }
         );
 
         const { getByTestId } = render(<LogIn />);
         const emailInput = getByTestId("email-input");
         const passwordInput = getByTestId("password-input");
         const submitButton = getByTestId("submit-button");
         fireEvent.change(emailInput, { target: { value: expectedEmail } });
         fireEvent.change(passwordInput, { target: { value: expectedPassword } });
         fireEvent.click(submitButton);
         await waitFor(() => {
             expect(window.fetch).toHaveBeenCalledTimes(1);
             expect(window.fetch).toHaveBeenCalledWith(
                 "/api/login",
                 {
                     method: "POST",
                     headers: {
                         "Content-Type": "application/json",
                     },
                     body: JSON.stringify({
                         email: expectedEmail,
                         password: expectedPassword,
                     }),
                 }
             );
             expect(expectedRouterPush).toHaveBeenCalledTimes(1);
             expect(expectedRouterPush).toHaveBeenCalledWith("/");
         }
         );
     }
     );
 });
 