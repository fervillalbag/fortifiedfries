/// <reference types="cypress" />

describe("start app", () => {
  it("correctly works root screen", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:5173");
  });
});

describe("Validaciones del formulario", () => {
  it("El correo es obligatorio", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:5173");

    cy.get("button").contains("Crear cuenta").click();
    cy.get("button").contains("Registrarse con email").click();
    
    cy.get("button").contains("Siguiente").click();
    cy.get("p").contains("El correo es obligatorio");
  });

  it("El correo es valido", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:5173");

    cy.get("button").contains("Crear cuenta").click();
    cy.get("button").contains("Registrarse con email").click();
    
    cy.get("input").type("fer@correo");
    // email validation
    cy.get("button").contains("Siguiente").click();
    cy.get("p").contains("Debe ser un correo válido");

     cy.get("input").clear();
     cy.get("input").type("fer@correo.com");
     cy.get("button").contains("Siguiente").click();
  });

  it("El genero es obligatorio", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:5173");
    
    cy.get("button").contains("Crear cuenta").click();
    cy.get("button").contains("Registrarse con email").click();
    
    cy.get("input").type("fer@correo.com");
    cy.get("button").contains("Siguiente").click();
    
    cy.get("button").contains("Siguiente").click();
    cy.get("p").contains("Este campo es obligatorio");
    
    cy.get("button").contains("Selecciona una opcion").click();
    cy.get("button").contains("Hombre").click();
    cy.get("button").contains("Siguiente").click();
  });
  
  it("El genero es obligatorio", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:5173");
    
    cy.get("button").contains("Crear cuenta").click();
    cy.get("button").contains("Registrarse con email").click();
    
    cy.get("input").type("fer@correo.com");
    cy.get("button").contains("Siguiente").click();
    
    cy.get("button").contains("Siguiente").click();
    cy.get("p").contains("Este campo es obligatorio");
    
    cy.get("button").contains("Selecciona una opcion").click();
    cy.get("button").contains("Hombre").click();
    cy.get("button").contains("Siguiente").click();
    
    cy.get("button").contains("Siguiente").click();
    cy.get("p").contains("La contrasena es obligatorio");
    cy.get("p").contains("Confirme la contrasena");
    cy.get("input[placeholder='nueva contrasena']").type("fernando")
    cy.get("input[placeholder='confirme su contrasena']").type("fernando")
    cy.get("button").contains("Siguiente").click();
  });
});