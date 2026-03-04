describe('Funcionalidade do Carrinho Dinâmico', () => {
  Cypress.on('uncaught:exception', () => false);

  beforeEach(() => {
    cy.visit('https://www.manning.com/books/software-testing-with-generative-ai');
  });

  it('deve validar que NOME e PREÇO do produto são iguais no carrinho', () => {

    // CAPTURAR O NOME DO LIVRO
    cy.get('h1').invoke('text').then((textoTitulo) => {
        const tituloLimpo = textoTitulo.trim();
        cy.log(`Título capturado: ${tituloLimpo}`);

        // CAPTURAR O PREÇO
        cy.get('.hidden-xs > .add-to-cart-box-v1 > ._heading > [data-product-offering-id="5568"] > ._price > #price-5568')
          .invoke('text')
          .then((textoPreco) => {
            
            const precoLimpo = textoPreco.trim();
            cy.log(`Preço capturado: ${precoLimpo}`);

            // --- AÇÃO DE COMPRA --- 

            cy.get('.hidden-xs > .add-to-cart-box-v1 > :nth-child(2) > ._add-to-cart-button').click();  // Clica no botão "add to cart"
            cy.get('#header-cart-count').should('contain', '1');                                        // Verificação do Contador
            cy.get('.visit-cart-link').click();                                                         // Item Carrinho

            
            // --- VALIDAÇÕES FINAIS ---

            cy.get('#summary-total-row-cost').should('contain', precoLimpo);                            // Preço 
            cy.contains(tituloLimpo).should('be.visible');                                              // Título do libro
            
          });
    });
  });
});