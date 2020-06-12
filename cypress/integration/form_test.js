describe("Form testing from Advanced Forms unit", function() {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });
    it("test each input and submit form", function() {
        cy.get('[data-cy="name"]').type("Test Name").should("have.value", "Test Name");
        cy.get('[data-cy="email"]').type("test@gmail.com").should("have.value", "test@gmail.com");
        cy.get('[data-cy="password"]').type("abc123").should("have.value", "abc123");
        cy.get('[data-cy="system"]').select("macOS").should("have.value", "mac");
        cy.get('[data-cy="terms"]').check().should("be.checked");
        cy.get('[data-cy="submit"]').click();

    })
})