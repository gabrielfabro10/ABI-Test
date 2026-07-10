import { faker } from '@faker-js/faker';
import { preencherCampo, clicarBotao, verificarCheckbox, verificarTexto, verificarUrl } from "../../support/utils/web";

describe("Web - Cadastro", () => {

    it("deve cadastrar um usuário com sucesso", () => {

        const nome = faker.person.fullName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        // Acessar a página de login
        cy.visit("/login");

        // Verificar se a página de login foi carregada
        cy.url()
            .should("eq", `${Cypress.config("baseUrl")}/login`);

        // Clicar no botão Cadastre-se
        clicarBotao("cadastrar");

        // Verificar redirecionamento para página de cadastro
        verificarUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

        // Preencher o campo nome
        preencherCampo("nome", nome);

        // Preencher o campo email
        preencherCampo("email", email);

        // Preencher o campo password
        preencherCampo("password", password);

        // Marcar o checkbox de administrador
        verificarCheckbox("checkbox");

        // Clicar no botão cadastrar
        clicarBotao("cadastrar");

        // Verificar se a mensagem de sucesso aparece
        verificarTexto("Cadastro realizado com sucesso");

        // Aguardar alguns segundos e validar redirecionamento
        cy.wait(3000);
        verificarUrl(`${Cypress.config("baseUrl")}/admin/home`);

        // Salvar email e senha para uso posterior
        Cypress.env("emailWeb", email);
        Cypress.env("passwordWeb", password);

    });


    it("não deve permitir cadastro com campos vazios", () => {

        // Acessar a página de login
        cy.visit("/login");

        // Clicar no botão Cadastre-se
        clicarBotao("cadastrar");

        // Verificar redirecionamento para página de cadastro
        verificarUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

        // Verificar se os campos estão vazios e visíveis
        cy.get('[data-testid="nome"]')
            .should("be.visible")
            .should("have.value", "");

        cy.get('[data-testid="email"]')
            .should("be.visible")
            .should("have.value", "");

        cy.get('[data-testid="password"]')
            .should("be.visible")
            .should("have.value", "");

        // Tentar clicar no botão cadastrar sem preencher
        cy.get('[data-testid="cadastrar"]')
            .should("be.visible");

    });


    it("não deve permitir cadastro com email já utilizado", () => {

        const email = faker.internet.email();
        const nome1 = faker.person.fullName();
        const password1 = faker.internet.password();

        const nome2 = faker.person.fullName();
        const password2 = faker.internet.password();

        // Primeiro cadastro - acessar a página de login
        cy.visit("/login");

        // Clicar no botão Cadastre-se
        clicarBotao("cadastrar");

        // Verificar redirecionamento para página de cadastro
        verificarUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

        // Preencher o campo nome
        preencherCampo("nome", nome1);

        // Preencher o campo email
        preencherCampo("email", email);

        // Preencher o campo password
        preencherCampo("password", password1);

        // Marcar o checkbox
        verificarCheckbox("checkbox");

        // Clicar no botão cadastrar
        clicarBotao("cadastrar");

        // Verificar se a mensagem de sucesso aparece
        verificarTexto("Cadastro realizado com sucesso");

        // Aguardar alguns segundos e validar redirecionamento
        cy.wait(3000);
        verificarUrl(`${Cypress.config("baseUrl")}/admin/home`);

        // Voltar para a página de login
        cy.visit("/login");

        // Clicar novamente no botão Cadastre-se
        clicarBotao("cadastrar");

        // Verificar redirecionamento para página de cadastro
        verificarUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

        // Preencher o campo nome com outro nome
        preencherCampo("nome", nome2);

        // Preencher o campo email com o MESMO email
        preencherCampo("email", email);

        // Preencher o campo password com outra senha
        preencherCampo("password", password2);

        // Marcar o checkbox
        verificarCheckbox("checkbox");

        // Clicar no botão cadastrar
        clicarBotao("cadastrar");

        // Verificar se a mensagem de erro aparece
        verificarTexto("Este email já está sendo usado");

    });

});
