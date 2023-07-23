/// <reference types="cypress" />

const { customAlphabet, nanoid } = require("nanoid");

const customValuesEntry = "123456789abcdefghijkl";
const nanoCustom = customAlphabet(customValuesEntry, 12);

const testWithEmailAlready = !true;

const emailAlready = "fer@correo.com";
const newEmail = `${nanoCustom()}@correo.com`;

const startRootAppTesting = () => {
  cy.viewport(390, 844);
  cy.visit("http://localhost:5173");
};

const registerFullnameValidation = () => {
  cy.get("[data-test='register-button-submit']").click();
  cy.get("[data-test='register-feedback-error']").contains(
    "El nombre completo es obligatorio"
  );

  cy.get("[data-test='register-input-name']").type(
    "Fernando Villalba"
  );
  cy.get("[data-test='register-button-submit']").click();
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
  cy.get("[data-test='register-input-email']").type(
    testWithEmailAlready ? emailAlready : newEmail
  );
  cy.get("[data-test='register-button-submit']").click();
};

const registerGenderValidation = () => {
  console.log(cy.get("[data-test='register-button-submit']"));
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
  cy.get("[data-test='register-input-password']").clear();
  cy.get("[data-test='register-input-confirm-password']").clear();

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

  if (testWithEmailAlready) {
    cy.get("[data-test='register-button-submit']").click();
    cy.get("[data-test='register-alert-feedback']").contains(
      "El email ya existe"
    );
    return;
  }

  cy.get("[data-test='register-button-submit']").click();
};

const registerUsernameValidation = () => {
  if (emailAlready) return;

  cy.get("[data-test='register-input-username']").clear();
  cy.get("[data-test='register-button-submit']").click();
  cy.get("[data-test='register-alert-feedback']").contains(
    "El nombre de usuario ya está en uso por otro usuario"
  );

  cy.get("[data-test='register-input-username']").type(nanoid(5));
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

  it("Register all forms validations", () => {
    registerFullnameValidation();
    registerEmailValidation();
    registerGenderValidation();
    // registerPasswordValidation();

    // if (emailAlready) return;
    // registerUsernameValidation();
  });
});
