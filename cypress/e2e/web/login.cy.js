import { faker } from "@faker-js/faker";
import { verifyText } from "../../support/utils/web";
import { getFakerUser } from "../../support/utils/users";

describe("Web - Login", () => {

    it("should log in with a valid email and password", () => {

        const user = getFakerUser();

        cy.createUserWithAPI(user)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);

                cy.loginWithUI(user.email, user.password);
                cy.assertHomePage();

            });

    });


    it("should not log in with an invalid password", () => {

        const user = getFakerUser();

        cy.createUserWithAPI(user)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);

                cy.loginWithUI(user.email, faker.internet.password());
                verifyText("Email e/ou senha inválidos");

            });

    });

});
