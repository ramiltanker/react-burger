describe("drag-and-drop works correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should drag and drop bun ingridient", function () {
    cy.get('[data-testid="burger-ingridients"]').as("burger-ingridients");

    cy.get('[data-testid="burger-constructor"]').as("burger-constructor");

    cy.get("@burger-ingridients")
      .find("a")
      .contains("Краторная булка N-200i")
      .as("ingridient-card");

    cy.get("@ingridient-card").trigger("dragstart");

    cy.get("@burger-constructor").trigger("drop");
  });

  it("should drag and drop sauce ingridient", function () {
    cy.get('[data-testid="burger-ingridients"]').as("burger-ingridients");

    cy.get('[data-testid="burger-constructor"]').as("burger-constructor");

    cy.get("@burger-ingridients")
      .find("a")
      .contains("Соус Spicy-X")
      .as("ingridient-card");

    cy.get("@ingridient-card").trigger("dragstart");

    cy.get("@burger-constructor").trigger("drop");
  });
  
});
