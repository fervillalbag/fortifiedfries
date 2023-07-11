/// <reference types="cypress" />

describe("start app", () => {
  it("correctly works root screen", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:5173");
  });
});

const emailValidation = () => {
  // email required
  cy.get("button").contains("Siguiente").click();
  cy.get("p").contains("El correo es obligatorio");

  cy.get("[data-test='register-input-email']").type("fer@correo");
  // email validation
  cy.get("[data-test='register-button-submit']").click();
  cy.get("[data-test='register-feedback-error']").contains("Debe ser un correo válido");

  // email success
  cy.get("[data-test='register-input-email']").clear();
  cy.get("[data-test='register-input-email']").type("fer@correo.com");
  cy.get("[data-test='register-button-submit']").click();
};

const genderValidation = () => {
  cy.get("[data-test='register-button-submit']").click();
  cy.get("p").contains("Este campo es obligatorio");

  cy.get("[data-test='register-button-select-gender']").click();
  cy.get("[data-test='register-button-gender-option']").contains('Hombre').click();
  cy.get("[data-test='register-button-submit']").click();
};

const passwordValidation = () => {
  cy.get("button").contains("Siguiente").click();
  cy.get("p").contains("La contrasena es obligatorio");
  cy.get("p").contains("Confirme la contrasena");
  cy.get("[data-test='register-input-password']").type("fernando");
  cy.get("[data-test='register-input-confirm-password']").type("fernando");
  cy.get("[data-test='register-button-submit']").click();
};

describe("All validations register", () => {
  beforeEach(() => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:5173");

    cy.get("button").contains("Crear cuenta").click();
    cy.get("button").contains("Registrarse con email").click();
  })
  
  it("Email validations", () => {
    emailValidation();
  });

  it("Gender validations", () => {
    emailValidation();
    genderValidation();
  });

  it("Password validations", () => {
    emailValidation();
    genderValidation();
    passwordValidation();
  });
});
