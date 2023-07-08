/// <reference types="cypress" />

describe("start app", () => {
  it("correctly works root screen", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:5173");
  });
});

describe("register a new user", () => {
  it("register a new user", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:5173");

    cy.get("button").contains("Crear cuenta").click();
    cy.get("button").contains("Registrarse con email").click();
  });
});
