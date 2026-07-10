export function criarUsuarioApi(usuario, options = {}) {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/usuarios`,
    body: usuario,
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


export function criarProdutoApi(produto, options = {}) {
  return cy.request({
    method: "POST",
    url: `${Cypress.env("apiUrl")}/produtos`,
    body: produto,
    headers: {
      "Authorization": Cypress.env("token")
    },
    ...options
  });
}