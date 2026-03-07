class ProductPage {
    
    // Ações de Navegação
    visitManning() {
        cy.visit('https://www.manning.com/books/software-testing-with-generative-ai');
    }

    // Ações do Produto
    // Adicionar item no carrinho com contagem de tempo de resposta do botão
    addToCartTimer() { 
        cy.step('Adicionando ao Carrinho');
        
        // Cronômetro
        let inicio;
        cy.then(() => {
            inicio = Date.now();
        });

        // Clica em "adicionar no carrinho"
         cy.get('._add-to-cart-button')
          .filter(':visible')
          .click();

        // Aguardar item ser inserido no carrinho de compras
        cy.get('#header-cart-count', { timeout: 15000 })        // Timeout em 15s para garantir que capture a lentidão sem quebrar
          .should('not.contain', '0')
          .should('be.visible')
          .then(() => {
              
              // Parar o Cronômetro e Calcular
              const fim = Date.now();
              const tempoGasto = fim - inicio;                  // Tempo em milissegundos
              const segundos = (tempoGasto / 1000).toFixed(2);  // Converte para segundos

              // Resultado no log
              if (tempoGasto > 2000) {                          // Tempo de espera de 2s
                  cy.log(`⚠️ PERFORMANCE RUIM: ${segundos}s`);
                  cy.log(`🚨 BUG de usabilidade.🚨`);
                  cy.log(` O limite aceitável é 2s.`);
              } else {
                  cy.log(`✅ Performance OK: ${segundos}s`);
              }
          });
    }
    // Acessar carrinho
    goToCart() {
        cy.step('Navegando para o Carrinho');
        cy.get('.visit-cart-link').click();
    }
    // Abrir campo para inserir cupom
    expandCouponField() {
        cy.step('Expandindo campo de cupom');
        cy.get('.btn-link > .fa').click();
    }
    // Aplicar cupom
    applyCoupon(couponCode) {
        cy.step(`Tentando aplicar cupom: ${couponCode}`);
        cy.get('#code')
            .type(couponCode);
        cy.get('.loading-ellipsis').click();
    }
    // Mudar o formato do produto:
    chooseAudiobook(){
        cy.step('Selecionando formato online + audio');
        cy.get('button[data-product-type="online + audio"]')
        .filter(':visible')
        .click()
        .should('have.class', 'selected');
    }
    

    // Seletores (Getters) para pegar Texto
    // Pegar título
    getProductTitle() {
        return cy.get('h1').invoke('text');
    }
    // Pegar preço
    getProductPrice() {
        return cy.get('._final-price').first().invoke('text');    
    }
    // Pegar preço do audiobook (precisou de um seletor diferente, devido à má construção do HTML do site)
    // Usando o seletor normal, ele devolve um array com vários valores diferentes
    getAudiobookPrice() {
        cy.step('Coletando o preço final do Audiobook');
        return cy.get('span[id^="price-5569"]')
            .filter(':visible')
            .invoke('text');
    }
    getBookType() {
        cy.step('Coletando o formato do livro');
        return  cy.get('button[data-product-type="online + audio"]')
                .find('._product-offering-tab-title')
                .invoke('text');
    }


    // Checagem final
    // Checagem do contador do ícone do carrinho
    checkCartCount (amount){
        cy.step('Validando contagem de itens no carrinho');
        cy.get('#header-cart-count').should('contain', amount);
    }
    // Checagem do valor final da compra
    checkProductPrice(precolimpo) {
        cy.step('Validando Preço no Carrinho');
        cy.get('#summary-total-row-cost').should('contain', precolimpo);
    }
    // Checagem do título da obra no carrinho  
    checkProductTitle(tituloLimpo) {
        cy.step('Validando Título no Carrinho');
        cy.contains(tituloLimpo).should('be.visible');
    }
    // Checagem do formato da obra (audiobook)  
    checkProductType(tipo) {
        cy.step('Validando etiqueta de Audiobook');
        
        cy.get('.includes-audio')                                   // Verifica se a caixinha existe, está visível e tem o texto certo
          .should('be.visible')
          .and('contain.text', 'includes audio book');
    }
    // Checagem da mesagem de cupom inválido
    checkCouponError(couponCode) {
        cy.step(`Validando mensagem de erro para: ${couponCode}`);
        cy.get('.cart-column > .alert-danger')
            .should('be.visible')
            .and('contain.text', `Unable to apply code ${couponCode}`);
    }
    // Checagem de alteração de valor final
    checkFinalPrice(){
        cy.get('#summary-total-row-cost')             
      .invoke('text')
      .then((textoTotal) => {
          cy.log(`Preço final mantido: ${textoTotal.trim()}`);
          expect(textoTotal).to.not.contain('-');                   // Não pode ter sinal de negativo (desconto)
      });
    }
}

export default new ProductPage();