import productPage from '../pages/shopping-cart/ProductPage.js';

describe('Funcionalidade do Carrinho Dinâmico', () => {

  Cypress.on('uncaught:exception', () => false);

  beforeEach(() => {
    cy.viewport(1280, 800);                                   // Limitar o tamanho da tela para versão desktop
    productPage.visitManning();                               // Link Manning
  });

  it('deve validar que NOME e PREÇO do produto são iguais no carrinho', () => {

    cy.step('Capturando informações do produto na Loja');     // Coletar Nome e Preço do livro

    productPage.getProductTitle().then((textoTitulo) => {

      const tituloLimpo = textoTitulo.trim();                 // Salva o nome do livro
      cy.log(`Título do Livro: ${tituloLimpo}`);              // Nome do livro no log

      productPage.getProductPrice().then((textoPreco) => {
        
        const precoLimpo = textoPreco.trim();                 // Salva o preço do livro
        cy.log(`Preço do Livro: ${precoLimpo}`);              // Preço do livro no log


        // Add o livro no carrinho
        productPage.addToCartTimer();                         // Clica no botão de ADICIONAR no carrinho de compras
        productPage.checkCartCount('1');                      // Contagem de itens no íconde do carrinho
       
        // Navegar para o carrinho
        productPage.goToCart();                               // Clica no botão do carrinho de compras  

        // Validar se o nome e valor do livro condizem com o informado.
        cy.step('Validando dados no Carrinho');               
        productPage.checkProductPrice(precoLimpo);            // Checagem de preço
        productPage.checkProductTitle(tituloLimpo);           // Checagem de título

      });
    });
  });
});