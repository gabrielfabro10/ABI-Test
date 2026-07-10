export function preencherCampo(dataTestId, valor) {
  cy.get(`[data-testid="${dataTestId}"]`)
    .should("be.visible")
    .should("not.be.disabled");
  cy.get(`[data-testid="${dataTestId}"]`)
    .type(valor);
}


export function clicarBotao(dataTestId) {
  cy.get(`[data-testid="${dataTestId}"]`)
    .should("be.visible")
    .should("not.be.disabled")
    .click();
}


export function verificarCheckbox(dataTestId) {
  cy.get(`[data-testid="${dataTestId}"]`)
    .should("be.visible")
    .check()
    .should("be.checked");
}


export function verificarTexto(texto) {
  cy.contains(texto)
    .should("be.visible");
}


export function verificarUrl(url) {
  cy.url()
    .should("eq", url);
}
