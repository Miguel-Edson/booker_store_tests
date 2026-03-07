describe('Book Purchase Redirect', () => {
  
  // Ignora erros aleatórios de sites externos (Bitly/Manning)
  Cypress.on('uncaught:exception', () => false);

  it('should flow from Home -> Bitly -> Manning', () => {
    // Origem: Restful Booker
    cy.visit('/'); 

    cy.get('a[href*="bit.ly/ai-testing"]').invoke('removeAttr', 'target').click();

    // Tela final: Manning
    cy.origin('https://www.manning.com', () => {
      cy.url({ timeout: 20000 }).should('include', 'manning.com');
      cy.get('h1').should('be.visible'); 
    });
  });
});