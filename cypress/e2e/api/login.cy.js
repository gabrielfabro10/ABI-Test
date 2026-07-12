import { getFakerUser } from "../../support/utils/users";

describe("API - Login", () => {

    it("should log in with a valid user", () => {

        const user = getFakerUser();

        cy.createUserWithAPI(user)
            .then((registrationResponse) => {

                expect(registrationResponse.status)
                    .to.equal(201);


                cy.loginWithAPI({
                    email: user.email,
                    password: user.password
                })
                    .then((loginResponse) => {

                        expect(loginResponse.status)
                            .to.equal(200);


                        expect(loginResponse.body.message)
                            .to.equal("Login realizado com sucesso");


                        expect(loginResponse.body.authorization)
                            .to.be.a("string")
                            .and.not.empty;


                        Cypress.env("token", loginResponse.body.authorization);

                    });

            });

    });


    it("should not log in with an invalid password", () => {

        const user = getFakerUser();

        cy.createUserWithAPI(user)
            .then((registrationResponse) => {

                expect(registrationResponse.status)
                    .to.equal(201);


                cy.loginWithAPI({
                    email: user.email,
                    password: "senhaIncorreta"
                }, {
                    failOnStatusCode: false
                })
                    .then((loginResponse) => {

                        expect(loginResponse.status)
                            .to.equal(401);

                        expect(loginResponse.body.message)
                            .to.equal("Email e/ou senha inválidos");

                    });

            });

    });

});