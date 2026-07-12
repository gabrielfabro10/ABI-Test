import { verifyUrl } from "../../support/utils/web";
import { getFakerUser } from "../../support/utils/users";

describe("Web - Products", () => {

    it("should list products after registration and login", () => {

        const user = getFakerUser();

        cy.createUserWithAPI(user)
            .then((response) => {

                expect(response.status)
                    .to.equal(201);

                cy.loginWithUI(user.email, user.password);
                cy.assertHomePage();

                cy.get('[data-testid="listarProdutos"]')
                    .should("be.visible")
                    .click();

                verifyUrl(`${Cypress.config("baseUrl")}/admin/listarprodutos`);

                cy.contains("Nome").should("be.visible");
                cy.contains("Preço").should("be.visible");
                cy.contains("Descrição").should("be.visible");
                cy.contains("Quantidade").should("be.visible");
                cy.contains("Imagem").should("be.visible");
                cy.contains("Ações").should("be.visible");

                cy.contains("button", "Editar").should("be.visible");
                cy.contains("button", "Excluir").should("be.visible");

            });

    });

});
