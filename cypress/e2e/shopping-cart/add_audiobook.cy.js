import productPage from '../pages/shopping-cart/ProductPage.js';

describe('Funcionalidade do Carrinho', () => {

  Cypress.on('uncaught:exception', () => false);

  beforeEach(() => {
      cy.viewport(1280, 800);                                   // Limitar o tamanho da tela para versão desktop
      productPage.visitManning();                               // Link Manning
    });

  it('deve validar que TIPO e PREÇO do produto são iguais no carrinho', () => {

    productPage.chooseAudiobook();                              // Seleciona o formato Audiobook + ebook

    cy.step('Coletando tipo do produto');
    productPage.getBookType().then((tipoTexto) => {             // Salva o tipo do livro

        const tipo = tipoTexto.trim();
        productPage.getAudiobookPrice().then((precoTexto) => {

          const preco = precoTexto.trim();                      // Salva o preço do livro

          cy.log(`Tipo: ${tipo}`);                              // Expor tipo para debug
          cy.log(`Preço: ${preco}`);                            // Expor valor para debug

          // Add o livro no carrinho
          productPage.addToCartTimer();                         // Clica no botão de ADICIONAR no carrinho de compras
          productPage.checkCartCount('1');                      // Contagem de itens no íconde do carrinho

          // Navegar para o carrinho
          productPage.goToCart();                               // Clica no botão do carrinho de compras  
 
          // Validar se o nome e valor do livro condizem com o informado.
          cy.step('Validando dados no Carrinho');               
          productPage.checkProductPrice(preco);            // Checagem de preço
          productPage.checkProductType();                  // Checagem de tipo

          });

      });

  });

});
