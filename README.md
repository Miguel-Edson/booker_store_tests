# 🧪 Manning Store E2E Automation

Projeto de automação de testes End-to-End (E2E) para o fluxo de compra de livros na loja **Manning.com**, desenvolvido com **Cypress**.

Este projeto foca em boas práticas de QA, validação dinâmica de dados e manipulação de cenários complexos de redirecionamento.

## 🚀 Tecnologias Utilizadas

* [Cypress](https://www.cypress.io/) - Framework de testes E2E.
* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Linguagem de script.
* [Node.js](https://nodejs.org/) - Ambiente de execução.

## 📂 Estrutura do Projeto

O projeto está organizado por **contextos de teste** para facilitar a colaboração e manutenção:

```text
cypress/
  ├── e2e/
  │    ├── 1-redirects/              # Testes de fluxo de navegação e redirecionamento
  │    │      └── purchase_flow.cy.js
  │    │
  │    ├── 2-shopping-cart/          # Testes focados nas funcionalidades do Carrinho
  │    │      ├── add_standard_book.cy.js
  │    │      ├── add_audiobook.cy.js
  │    │      └── remove_from_cart.cy.js
  │    │
  │    └── 3-catalog/                # Testes de catálogo e variação de produtos
  │           └── buy_different_book.cy.js
  │
  ├── support/                       # Comandos globais e configurações (e2e.js)
  └── fixtures/                      # Massas de dados estáticas (se necessário)