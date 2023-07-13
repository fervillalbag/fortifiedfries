/// <reference types="cypress" />

const startRootAppTesting = () => {
  cy.viewport(390, 844);
  cy.visit("http://localhost:5173");
};

const registerEmailValidation = () => {
  // email required
  cy.get("[data-test='register-button-submit']").click();
  cy.get("[data-test='register-feedback-error']").contains(
    "El correo es obligatorio"
  );

  cy.get("[data-test='register-input-email']").type("fer@correo");
  // email validation
  cy.get("[data-test='register-button-submit']").click();
  cy.get("[data-test='register-feedback-error']").contains(
    "Debe ser un correo válido"
  );

  // email success
  cy.get("[data-test='register-input-email']").clear();
  cy.get("[data-test='register-input-email']").type("fer@correo.com");
  cy.get("[data-test='register-button-submit']").click();
};

const registerGenderValidation = () => {
  cy.get("[data-test='register-button-submit']").click();
  cy.get("[data-test='register-feedback-error']").contains(
    "Este campo es obligatorio"
  );

  cy.get("[data-test='register-button-select-gender']").click();
  cy.get("[data-test='register-button-gender-option']")
    .contains("Hombre")
    .click();
  cy.get("[data-test='register-button-submit']").click();
};

const registerPasswordValidation = () => {
  cy.get("[data-test='register-button-submit']").click();
  cy.get("[data-test='register-feedback-error']").contains(
    "La contrasena es obligatorio"
  );
  cy.get(
    "[data-test='register-feedback-error-confirmPassword']"
  ).contains("Confirme la contrasena");
  cy.get("[data-test='register-input-password']").type("fernando");
  cy.get("[data-test='register-input-confirm-password']").type(
    "fernando"
  );
  cy.get("[data-test='register-button-submit']").click();
};

describe("start app", () => {
  it("correctly works root screen", () => {
    startRootAppTesting();
  });
});

describe("All validations register", () => {
  beforeEach(() => {
    startRootAppTesting();

    cy.get("[data-test='root-create-account-button']").click();
    cy.get("[data-test='auth-register-email-button']")
      .contains("Registrarse con email")
      .click();
  });

  it("Email validations", () => {
    registerEmailValidation();
  });

  it("Gender validations", () => {
    registerEmailValidation();
    registerGenderValidation();
  });

  it("Password validations", () => {
    registerEmailValidation();
    registerGenderValidation();
    registerPasswordValidation();
  });
});
