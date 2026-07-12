import { faker } from "@faker-js/faker";
import { verifyText, verifyUrl } from "../../support/utils/web";

describe("Web - Registration", () => {

    it("should register a user successfully", () => {

        const fullName = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        cy.registerUserWithUI({
            name: fullName,
            email,
            password,
            admin: true
        });

        verifyText("Cadastro realizado com sucesso");
        cy.assertHomePage();

        Cypress.env("emailWeb", email);
        Cypress.env("passwordWeb", password);

    });


    it("should not allow registration with empty fields", () => {

        cy.visitLoginPage();
        cy.get('[data-testid="cadastrar"]').click();

        verifyUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

        cy.get('[data-testid="nome"]')
            .should("be.visible")
            .and("have.value", "");

        cy.get('[data-testid="email"]')
            .should("be.visible")
            .and("have.value", "");

        cy.get('[data-testid="password"]')
            .should("be.visible")
            .and("have.value", "");

        cy.get('[data-testid="cadastrar"]')
            .should("be.visible");

    });


    it("should not allow registration with an email that is already in use", () => {

        const email = faker.internet.email();
        const firstName = faker.person.fullName();
        const firstPassword = faker.internet.password();

        const secondName = faker.person.fullName();
        const secondPassword = faker.internet.password();

        cy.registerUserWithUI({
            name: firstName,
            email,
            password: firstPassword,
            admin: true
        });

        verifyText("Cadastro realizado com sucesso");
        cy.assertHomePage();

        cy.registerUserWithUI({
            name: secondName,
            email,
            password: secondPassword,
            admin: true
        });

        verifyText("Este email já está sendo usado");

    });

});
