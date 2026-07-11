import { fillField, clickButton, verifyUrl } from "../../support/utils/web";
import { createUserApi } from "../../support/utils/api";
import { getFakerUser } from "../../support/utils/users";

describe("Web - Products", () => {

    it("should list products after registration and login", () => {

        const user = getFakerUser();

        createUserApi(user)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);

                cy.visit("/login");

                cy.url()
                    .should("eq", `${Cypress.config("baseUrl")}/login`);

                // Log in with the created user
                fillField("email", user.email);
                fillField("senha", user.password);
                clickButton("entrar");

                cy.location("pathname", { timeout: 10000 })
                    .should("eq", "/admin/home");

                // Access the products list
                clickButton("listarProdutos");
                verifyUrl(`${Cypress.config("baseUrl")}/admin/listarprodutos`);

                // Verify the product table headers
                cy.contains("Nome").should("be.visible");
                cy.contains("Preço").should("be.visible");
                cy.contains("Descrição").should("be.visible");
                cy.contains("Quantidade").should("be.visible");
                cy.contains("Imagem").should("be.visible");
                cy.contains("Ações").should("be.visible");

                // Verify visible action buttons
                cy.contains("button", "Editar").should("be.visible");
                cy.contains("button", "Excluir").should("be.visible");

            });

    });

});
