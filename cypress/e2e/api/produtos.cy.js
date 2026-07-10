import { criarUsuario } from "../../support/utils/usuario";
import { criarUsuarioApi, loginApi, criarProdutoApi } from "../../support/utils/api";
import { criarProduto } from "../../support/utils/produto";

describe("API - Produtos", () => {

    before(() => {
        const usuario = criarUsuario();

        criarUsuarioApi(usuario)
            .then((responseCadastro) => {

                expect(responseCadastro.status)
                    .to.equal(201);

                loginApi({
                    email: usuario.email,
                    password: usuario.password
                })
                    .then((responseLogin) => {

                        expect(responseLogin.status)
                            .to.equal(200);

                        Cypress.env("token", responseLogin.body.authorization);

                    });

            });
    });


    it("deve cadastrar um produto com sucesso", () => {

        const produto = criarProduto();

        criarProdutoApi(produto)
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


    it("não deve permitir cadastrar produto com nome já utilizado", () => {

        const produto = criarProduto();

        criarProdutoApi(produto)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);

                criarProdutoApi(produto, {
                    failOnStatusCode: false
                })
                    .then((responseDuplicado) => {

                        expect(responseDuplicado.status)
                            .to.equal(400);

                        expect(responseDuplicado.body.message)
                            .to.equal("Já existe produto com esse nome");

                    });

            });

    });


    it("não deve cadastrar produto sem token", () => {

        const produto = criarProduto();

        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/produtos`,
            body: produto,
            failOnStatusCode: false
        })
            .then((response) => {

                expect(response.status)
                    .to.equal(401);

                expect(response.body.message)
                    .to.equal("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");

            });

    });


    it("não deve cadastrar produto com token inválido", () => {

        const produto = criarProduto();

        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/produtos`,
            body: produto,
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


    it("não deve cadastrar produto sem ser administrador", () => {

        const usuarioComum = criarUsuario();
        usuarioComum.administrador = "false";

        criarUsuarioApi(usuarioComum)
            .then((responseCadastro) => {

                expect(responseCadastro.status)
                    .to.equal(201);

                loginApi({
                    email: usuarioComum.email,
                    password: usuarioComum.password
                })
                    .then((responseLogin) => {

                        expect(responseLogin.status)
                            .to.equal(200);

                        const produto = criarProduto();
                        const tokenComum = responseLogin.body.authorization;

                        cy.request({
                            method: "POST",
                            url: `${Cypress.env("apiUrl")}/produtos`,
                            body: produto,
                            headers: {
                                "Authorization": tokenComum
                            },
                            failOnStatusCode: false
                        })
                            .then((responseProduto) => {

                                expect(responseProduto.status)
                                    .to.equal(403);

                                expect(responseProduto.body.message)
                                    .to.equal("Rota exclusiva para administradores");

                            });

                    });

            });

    });

});
