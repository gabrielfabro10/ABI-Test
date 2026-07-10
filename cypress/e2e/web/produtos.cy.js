import { faker } from '@faker-js/faker';
import { preencherCampo, clicarBotao, verificarUrl, verificarTexto } from "../../support/utils/web";
import { criarUsuarioApi } from "../../support/utils/api";
import { criarUsuario } from "../../support/utils/usuario";

describe("Web - Produtos", () => {

    it("deve listar produtos após cadastro e login", () => {

        const usuario = criarUsuario();

        criarUsuarioApi(usuario)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);

                // Acessar a página de login
                cy.visit("/login");

                cy.url()
                    .should("eq", `${Cypress.config("baseUrl")}/login`);

                // Realizar login com o usuário criado
                preencherCampo("email", usuario.email);
                preencherCampo("senha", usuario.password);
                clicarBotao("entrar");

                cy.wait(2000);
                verificarUrl(`${Cypress.config("baseUrl")}/admin/home`);

                // Acessar a lista de produtos
                clicarBotao("listarProdutos");
                verificarUrl(`${Cypress.config("baseUrl")}/admin/listarprodutos`);

                // Verificar cabeçalhos da tabela de produtos
                cy.contains("Nome").should("be.visible");
                cy.contains("Preço").should("be.visible");
                cy.contains("Descrição").should("be.visible");
                cy.contains("Quantidade").should("be.visible");
                cy.contains("Imagem").should("be.visible");
                cy.contains("Ações").should("be.visible");

                // Verificar botões de ação visíveis
                cy.contains("button", "Editar").should("be.visible");
                cy.contains("button", "Excluir").should("be.visible");

            });

    });

});
