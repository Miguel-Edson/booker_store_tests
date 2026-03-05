class ProductPage {
    
    // Ações de Navegação
    visitManning() {
        cy.visit('https://www.manning.com/books/software-testing-with-generative-ai');
    }

    // Ações do Produto
    addToCart() {
        cy.step('Adicionando livro ao Carrinho'); 
        cy.get('._add-to-cart-button')
          .filter(':visible')
          .click();
    }
    goToCart() {
        cy.step('Navegando para o Carrinho');
        cy.get('.visit-cart-link').click();
    }

    // Seletores (Getters) para pegar Texto
    getProductTitle() {
        return cy.get('h1').invoke('text');
    }

    getProductPrice() {
        return cy.get('._final-price').first().invoke('text');
    }

    // Checagem
    checkCartCount (amount){
        cy.get('#header-cart-count').should('contain', amount);
    }
    checkProductPrice(precolimpo) {
        cy.step('Validando Preço no Carrinho');
        cy.get('#summary-total-row-cost').should('contain', precolimpo);
    }
    checkProductTitle(tituloLimpo) {
        cy.step('Validando Título no Carrinho');
        cy.contains(tituloLimpo).should('be.visible');
    }
}

export default new ProductPage();