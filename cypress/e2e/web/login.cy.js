import { faker } from '@faker-js/faker';
import { fillField, clickButton, verifyUrl, verifyText } from "../../support/utils/web";
import { createUserApi } from "../../support/utils/api";
import { getFakerUser } from "../../support/utils/users";

describe("Web - Login", () => {

    it("should log in with a valid email and password", () => {

        const user = getFakerUser();

        createUserApi(user)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);


                cy.visit("/login");


                cy.url()
                    .should("eq", `${Cypress.config("baseUrl")}/login`);


                fillField("email", user.email);

                fillField("senha", user.password);


                clickButton("entrar");

                cy.location("pathname", { timeout: 10000 })
                    .should("eq", "/admin/home");

            });

    });


    it("should not log in with an invalid password", () => {

        const user = getFakerUser();

        createUserApi(user)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);


                cy.visit("/login");


                fillField("email", user.email);

                fillField("senha", faker.internet.password());


                clickButton("entrar");


                verifyText("Email e/ou senha inválidos");

            });

    });

});
