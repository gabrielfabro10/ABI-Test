# ABI Teste de Automação

Este repositório contém testes automatizados em Cypress.
## Estrutura do projeto

- `cypress/e2e/api/` - testes de API
- `cypress/e2e/web/` - testes de interface web
- `cypress/support/utils/` - helpers e utilitários para API e testes web
- `cypress.config.js` - configuração do Cypress
- `cypress.env.json` - variáveis de ambiente para os testes

## Pré-requisitos

- Node.js instalado
- Yarn instalado

## Instalação

```bash
cd c:/ABI/ABI-Test
yarn install
```

## Como executar

Executar todos os testes:

```bash
yarn cy:run
```

Executar apenas os testes de API:

```bash
yarn cy:run --spec "cypress/e2e/api/**/*.cy.js"
```

Executar apenas os testes web:

```bash
yarn cy:run --spec "cypress/e2e/web/**/*.cy.js"
```

## Variáveis de ambiente

O arquivo `cypress.env.json` contém as variáveis usadas pelos testes:

- `apiUrl`: URL base da API
- `baseUrl`: URL base da aplicação web
- `token`: token de autenticação usado nos testes de API
- `emailWeb`: email gerado no teste de cadastro web
- `passwordWeb`: senha gerada no teste de cadastro web

## Testes implementados

### API
- Cadastro de usuário
- Login de usuário
- Cadastro de produto
- Validação de produto duplicado
- Validação de token inválido / ausente

### Web
- Cadastro de usuário via interface
- Validação de email duplicado
- Login de usuário via interface
- Validação de senha incorreta
- Lista de produtos após login

---
