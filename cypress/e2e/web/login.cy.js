import { faker } from '@faker-js/faker';
import { preencherCampo, clicarBotao, verificarUrl, verificarTexto } from "../../support/utils/web";
import { criarUsuarioApi } from "../../support/utils/api";
import { criarUsuario } from "../../support/utils/usuario";

describe("Web - Login", () => {

    it("deve realizar login com email e senha válidos", () => {

        const usuario = criarUsuario();

        criarUsuarioApi(usuario)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);


                cy.visit("/login");


                cy.url()
                    .should("eq", `${Cypress.config("baseUrl")}/login`);


                preencherCampo("email", usuario.email);

                preencherCampo("senha", usuario.password);


                clicarBotao("entrar");


                cy.wait(2000);


                verificarUrl(`${Cypress.config("baseUrl")}/admin/home`);

            });

    });


    it("não deve realizar login com senha inválida", () => {

        const usuario = criarUsuario();

        criarUsuarioApi(usuario)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);


                cy.visit("/login");


                preencherCampo("email", usuario.email);

                preencherCampo("senha", faker.internet.password());


                clicarBotao("entrar");


                verificarTexto("Email e/ou senha inválidos");

            });

    });

});
