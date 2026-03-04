describe('Funcionalidade do Carrinho Dinâmico', () => {

  Cypress.on('uncaught:exception', () => false);

  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('https://www.manning.com/books/software-testing-with-generative-ai');
  });

  it('deve validar que NOME e PREÇO do produto são iguais no carrinho', () => {

    cy.step('Capturando informações do produto na Loja');   // Passo 1: Conferir se a página foi redirecionado para a compra do livro escolhido.

    cy.get('h1').invoke('text').then((textoTitulo) => {

      const tituloLimpo = textoTitulo.trim();
      cy.log(`Título do Livro: ${tituloLimpo}`);            // Nome do livro no log

      cy.get('._final-price').first().invoke('text').then((textoPreco) => {
        
        const precoLimpo = textoPreco.trim();
        cy.log(`Preço do Livro: ${precoLimpo}`);            // Preço do livro no log


        cy.step('Adicionando livro ao Carrinho');           // Passo 2: Add o livro no carrinho
        
        cy.get('._add-to-cart-button')                      // Clica no botão de adicionar no carrinho de compras
        .filter(':visible')
        .click();

        cy.get('#header-cart-count').should('contain', '1'); // Verifica se houve a contagem do item no carrinho

        cy.step('Navegando para o Carrinho');               // Passo 3: Navegar para o carrinho
        cy.get('.visit-cart-link').click();


        cy.step('Validando dados no Carrinho');               // Passo 4: Validar se o nome e valor do livro condizem com o informado.

        cy.get('#summary-total-row-cost').should('contain', precoLimpo); // Verifica o nome
        cy.contains(tituloLimpo).should('be.visible');                   // Verifica o preço

      });
    });
  });
});