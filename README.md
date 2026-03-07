# 🧪 Manning Store E2E Automation

Projeto de automação de testes End-to-End (E2E) para o fluxo de compra de livros na loja **Manning.com**, desenvolvido com **Cypress**.

Este projeto foca em **boas práticas de QA** (como Page Object Model), validação dinâmica de dados, seletores resilientes e tratamento de cenários complexos de e-commerce.

## 🚀 Tecnologias e Estratégias

* **Cypress:** Framework de testes E2E.
* **Page Object Model (POM):** Arquitetura para reutilização de código e fácil manutenção (`ProductPage.js`).
* **Smart Waits:** Tratamento de latência e elementos dinâmicos sem uso de *hard waits*.
* **RegEx & Data Handling:** Limpeza e validação de strings de preços e mensagens dinâmicas.

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura modular baseada em **Page Objects**:

```text
cypress/
  ├── e2e/
  │    ├── pages/                 # 🧠 Lógica e Elementos (Page Object Model)
  │    │    └── shopping-cart/
  │    │         └── ProductPage.js
  │    │
  │    ├── redirects/             # 🔄 Testes de Fluxo e Navegação
  │    │    └── purchase_flow.cy.js
  │    │
  │    └── shopping-cart/         # 🛒 Testes Funcionais do Carrinho
  │         ├── add_standard_book.cy.js  # Cenário Happy Path
  │         ├── add_audiobook.cy.js      # Cenário Multi-formato
  │         └── invalid_coupon.cy.js     # Cenário de Exceção
  │
  ├── support/                    # Comandos customizados (ex: cy.step)
  └── fixtures/                   # Massas de dados