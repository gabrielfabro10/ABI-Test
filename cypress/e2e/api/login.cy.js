import { getFakerUser } from "../../support/utils/users";
import { createUserApi, loginApi } from "../../support/utils/api";


describe("API - Login", () => {

    it("should log in with a valid user", () => {

        const user = getFakerUser();

        createUserApi(user)
            .then((registrationResponse) => {

                expect(registrationResponse.status)
                    .to.equal(201);


                loginApi({
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

        createUserApi(user)
            .then((registrationResponse) => {

                expect(registrationResponse.status)
                    .to.equal(201);


                loginApi({
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