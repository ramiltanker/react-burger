describe("drag-and-drop works correctly", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should drag and drop element", function () {
    cy.get('[data-testid="burger-constructor"]').as("burger-constructor");

    cy.get('[data-testid="burger-ingridients"]').as("burger-ingridients");

    cy.get("@burger-ingridients")
      .find("a")
      .contains("Соус Spicy-X")
      .as("sauce_one");

    cy.get("@burger-ingridients")
      .find("a")
      .contains("Соус традиционный галактический")
      .as("sauce_two");

    cy.get("@sauce_one").trigger("dragstart");
    cy.get("@burger-constructor").trigger("drop");

    cy.get("@sauce_two").trigger("dragstart");
    cy.get("@burger-constructor").trigger("drop");

    cy.get("@burger-constructor")
      .find("div")
      .contains("Соус Spicy-X")
      .as("sauce_spicy");

    cy.get("@burger-constructor")
      .find("div")
      .contains("Соус традиционный галактический")
      .as("sauce_galaxy");

    cy.get("@sauce_spicy").trigger("dragstart");
    cy.get("@sauce_galaxy").trigger("drop");
  });
});
