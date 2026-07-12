import { fillField, clickButton, verifyUrl, verifyText } from "./utils/web";
import { createUserApi, loginApi } from "./utils/api";

Cypress.Commands.add("visitLoginPage", () => {
  cy.visit("/login");
  cy.url().should("eq", `${Cypress.config("baseUrl")}/login`);
});

Cypress.Commands.add("assertHomePage", () => {
  cy.location("pathname", { timeout: 10000 })
    .should("eq", "/admin/home");
});

Cypress.Commands.add("loginWithUI", (email, password) => {
  cy.visitLoginPage();
  fillField("email", email);
  fillField("senha", password);
  clickButton("entrar");
});

Cypress.Commands.add("registerUserWithUI", ({ name, email, password, admin = true }) => {
  cy.visitLoginPage();
  clickButton("cadastrar");
  verifyUrl(`${Cypress.config("baseUrl")}/cadastrarusuarios`);

  fillField("nome", name);
  fillField("email", email);
  fillField("password", password);

  if (admin) {
    cy.get('[data-testid="checkbox"]')
      .should("be.visible")
      .check()
      .should("be.checked");
  }

  clickButton("cadastrar");
});

Cypress.Commands.add("createUserWithAPI", (user, options = {}) => {
  return createUserApi(user, options);
});

Cypress.Commands.add("loginWithAPI", (credentials, options = {}) => {
  return loginApi(credentials, options);
});

Cypress.Commands.add("expectSuccessMessage", (message) => {
  verifyText(message);
});