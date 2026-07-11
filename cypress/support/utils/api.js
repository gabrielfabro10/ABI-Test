export function createUserApi(user, options = {}) {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/usuarios`,
    body: user,
    ...options
  });
}

export function loginApi(credentials, options = {}) {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/login`,
    body: credentials,
    ...options
  });
}

export function createProductApi(product, options = {}) {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/produtos`,
    body: product,
    headers: {
      "Authorization": Cypress.env("token")
    },
    ...options
  });
}