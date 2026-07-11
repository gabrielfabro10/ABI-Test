import { faker } from '@faker-js/faker';
import { fillField, clickButton, verifyCheckbox, verifyText, verifyUrl } from "../../support/utils/web";

describe("Web - Registration", () => {

    it("should register a user successfully", () => {

        const fullName = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        // Access the login page
        cy.visit("/login");

        // Verify that the login page loaded
        cy.url()
            .should("eq", `${Cypress.config("baseUrl")}/login`);

        // Click the sign-up button
        clickButton("cadastrar");

        // Verify redirection to the registration page
        verifyUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

        // Fill the name field
        fillField("nome", fullName);

        // Fill the email field
        fillField("email", email);

        // Fill the password field
        fillField("password", password);

        // Mark the administrator checkbox
        verifyCheckbox("checkbox");

        // Click the register button
        clickButton("cadastrar");

        // Verify that the success message appears
        verifyText("Cadastro realizado com sucesso");

        cy.location("pathname", { timeout: 10000 })
            .should("eq", "/admin/home");

        // Save the email and password for future use
        Cypress.env("emailWeb", email);
        Cypress.env("passwordWeb", password);

    });


    it("should not allow registration with empty fields", () => {

        cy.visit("/login");

        clickButton("cadastrar");

        verifyUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

        cy.get('[data-testid="nome"]')
            .should("be.visible")
            .should("have.value", "");

        cy.get('[data-testid="email"]')
            .should("be.visible")
            .should("have.value", "");

        cy.get('[data-testid="password"]')
            .should("be.visible")
            .should("have.value", "");

        cy.get('[data-testid="cadastrar"]')
            .should("be.visible");

    });


    it("should not allow registration with an email that is already in use", () => {

        const email = faker.internet.email();
        const firstName = faker.person.fullName();
        const firstPassword = faker.internet.password();

        const secondName = faker.person.fullName();
        const secondPassword = faker.internet.password();

        cy.visit("/login");

        clickButton("cadastrar");

        verifyUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

        fillField("nome", firstName);

        fillField("email", email);

        fillField("password", firstPassword);

        verifyCheckbox("checkbox");

        clickButton("cadastrar");

        verifyText("Cadastro realizado com sucesso");

        cy.location("pathname", { timeout: 10000 })
            .should("eq", "/admin/home");

        cy.visit("/login");

        clickButton("cadastrar");

        verifyUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

        fillField("nome", secondName);

        fillField("email", email);

        fillField("password", secondPassword);

        verifyCheckbox("checkbox");

        clickButton("cadastrar");

        verifyText("Este email já está sendo usado");

    });

});
