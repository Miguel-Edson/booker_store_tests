import productPage from '../pages/shopping-cart/ProductPage.js';

describe('Funcionalidade de Cupons', () => {

  Cypress.on('uncaught:exception', () => false);

  beforeEach(() => {
    cy.viewport(1280, 800);                                   // Limitar o tamanho da tela para versão desktop
    productPage.visitManning();                               // Link Manning
  });

  it('deve exibir erro ao tentar aplicar um cupom inválido', () => {

    // Add o livro no carrinho
    productPage.addToCartTimer();                         // Clica no botão de ADICIONAR no carrinho de compras
    productPage.checkCartCount('1');                      // Contagem de itens no íconde do carrinho

    // Navegar para o carrinho
    productPage.goToCart();                               // Clica no botão do carrinho de compras  


    // Teste do Cupom
    cy.step('Aplicação de cupom');
    productPage.expandCouponField();                      // Abrir campo de cupom
    const cupomFalso = 'CUPOM_FAKE_123';                  // Nome do cupom salvo
    productPage.applyCoupon(cupomFalso);                  // Aplicação de cupom


    // Validações
    cy.step('Verificando reação do sistema');
    productPage.checkCouponError(cupomFalso);             // Verifica se apareceu o erro
    productPage.checkFinalPrice();                        // Checar se o preço final não foi alterado

  });
});