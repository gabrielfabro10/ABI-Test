import { getFakerUser } from "../../support/utils/users";
import { createUserApi, loginApi, createProductApi } from "../../support/utils/api";
import { createProduct } from "../../support/utils/product";

describe("API - Products", () => {

    beforeEach(() => {
        const user = getFakerUser();

        return createUserApi(user)
            .then((registrationResponse) => {

                expect(registrationResponse.status)
                    .to.equal(201);

                return loginApi({
                    email: user.email,
                    password: user.password
                })
                    .then((loginResponse) => {

                        expect(loginResponse.status)
                            .to.equal(200);

                        Cypress.env("token", loginResponse.body.authorization);

                    });

            });
    });


    it("should create a product successfully", () => {

        const product = createProduct();

        createProductApi(product)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);

                expect(response.body)
                    .to.have.all.keys(
                        "message",
                        "_id"
                    );

                expect(response.body.message)
                    .to.equal("Cadastro realizado com sucesso");

                expect(response.body._id)
                    .to.be.a("string")
                    .and.not.empty;

            });

    });


    it("should not allow creating a product with a name that is already in use", () => {

        const product = createProduct();

        createProductApi(product)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);

                createProductApi(product, {
                    failOnStatusCode: false
                })
                    .then((duplicateResponse) => {

                        expect(duplicateResponse.status)
                            .to.equal(400);

                        expect(duplicateResponse.body.message)
                            .to.equal("Já existe produto com esse nome");

                    });

            });

    });


    it("should not create a product without a token", () => {

        const product = createProduct();

        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/produtos`,
            body: product,
            failOnStatusCode: false
        })
            .then((response) => {

                expect(response.status)
                    .to.equal(401);

                expect(response.body.message)
                    .to.equal("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");

            });

    });


    it("should not create a product with an invalid token", () => {

        const product = createProduct();

        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/produtos`,
            body: product,
            headers: {
                "Authorization": "tokenInvalido"
            },
            failOnStatusCode: false
        })
            .then((response) => {

                expect(response.status)
                    .to.equal(401);

                expect(response.body.message)
                    .to.equal("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");

            });

    });


    it("should not create a product without administrator privileges", () => {

        const regularUser = getFakerUser();
        regularUser.administrador = "false";

        createUserApi(regularUser)
            .then((registrationResponse) => {

                expect(registrationResponse.status)
                    .to.equal(201);

                loginApi({
                    email: regularUser.email,
                    password: regularUser.password
                })
                    .then((loginResponse) => {

                        expect(loginResponse.status)
                            .to.equal(200);

                        const product = createProduct();
                        const regularToken = loginResponse.body.authorization;

                        cy.request({
                            method: "POST",
                            url: `${Cypress.env("apiUrl")}/produtos`,
                            body: product,
                            headers: {
                                "Authorization": regularToken
                            },
                            failOnStatusCode: false
                        })
                            .then((productResponse) => {

                                expect(productResponse.status)
                                    .to.equal(403);

                                expect(productResponse.body.message)
                                    .to.equal("Rota exclusiva para administradores");

                            });

                    });

            });

    });

});
