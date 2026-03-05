import productPage from '../pages/shopping-cart/ProductPage.js';

describe('Funcionalidade do Carrinho Dinâmico', () => {

  Cypress.on('uncaught:exception', () => false);

  beforeEach(() => {
    cy.viewport(1280, 800);
    productPage.visitManning();
  });

  it('deve validar que NOME e PREÇO do produto são iguais no carrinho', () => {

    cy.step('Capturando informações do produto na Loja');   // Passo 1: Coletar Nome e Preço do livro

    productPage.getProductTitle().then((textoTitulo) => {

      const tituloLimpo = textoTitulo.trim();
      cy.log(`Título do Livro: ${tituloLimpo}`);            // Nome do livro no log

      productPage.getProductPrice().then((textoPreco) => {
        
        const precoLimpo = textoPreco.trim();
        cy.log(`Preço do Livro: ${precoLimpo}`);            // Preço do livro no log


        cy.step('Adicionando livro ao Carrinho');           // Passo 2: Add o livro no carrinho
        
        productPage.addToCart();                            // Clica no botão de adicionar no carrinho de compras
        
        cy.get('#header-cart-count').should('contain', '1');// Verifica se houve a contagem do item no carrinho

        cy.step('Navegando para o Carrinho');               // Passo 3: Navegar para o carrinho
        productPage.goToCart();                             // Botão do carrinho de compras  


        cy.step('Validando dados no Carrinho');             // Passo 4: Validar se o nome e valor do livro condizem com o informado.
        productPage.checkProductPrice(precoLimpo);
        productPage.checkProductTitle(tituloLimpo);

      });
    });
  });
});