describe("Docs page test", function() {
  it("Imports and displays components from @fakescope/components", function() {
    cy.visit("/");
    cy.findAllByText("Hello World from docs!").should("exist");
    cy.findAllByText("A button from components").should("exist");
  });
});
