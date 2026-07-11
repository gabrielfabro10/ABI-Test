export function fillField(dataTestId, value) {
  cy.get(`[data-testid="${dataTestId}"]`)
    .should("be.visible")
    .should("not.be.disabled")
    .clear()
    .type(value);
}

export function clickButton(dataTestId) {
  cy.get(`[data-testid="${dataTestId}"]`)
    .should("be.visible")
    .should("not.be.disabled")
    .click();
}

export function verifyCheckbox(dataTestId) {
  cy.get(`[data-testid="${dataTestId}"]`)
    .should("be.visible")
    .check()
    .should("be.checked");
}

export function verifyText(text) {
  cy.contains(text, { timeout: 10000 })
    .should("be.visible");
}

export function verifyUrl(url) {
  cy.url()
    .should("eq", url);
}
