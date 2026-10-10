// Import Cypress real events plugin
import "cypress-real-events/support";

describe("Intro Section with Dropdown Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081"); // Adjust the path if necessary
  });

  describe("Navigation and Header", () => {
    it("should display the logo correctly", () => {
      cy.get("header .logo")
        .should("be.visible")
        .and("have.attr", "alt", "snap's logo");
    });

    it("should open and close the menu on mobile view", () => {
      cy.viewport(375, 667); // Set to mobile view

      cy.get(".open-menu").should("be.visible").click();
      cy.get(".overlay").should("be.visible").and("have.css", "opacity", "1");

      cy.get(".close-menu").should("be.visible").click();
      cy.get(".overlay")
        .should("not.be.visible")
        .and("have.css", "opacity", "0");
    });

    it("should open and close the dropdown menu", () => {
      cy.get(".nav-link").first().click();
      cy.get(".nav-link").first().should("have.class", "link-open");
      cy.get(".dropdown-list").first().should("be.visible");

      cy.get(".nav-link").first().click();
      cy.get(".nav-link").first().should("not.have.class", "link-open");
      cy.get(".dropdown-list").first().should("not.be.visible");
    });

    it("should navigate to the correct sections in the dropdown menu", () => {
      cy.get(".nav-link").first().click();
      cy.get(".dropdown-link a")
        .first()
        .should("have.attr", "aria-label", "todo-list");
    });

    it("should display the login and register buttons", () => {
      cy.get(".registration button").contains("Login").should("be.visible");
      cy.get(".registration button").contains("Register").should("be.visible");
    });
    
  });

  describe("Main Content", () => {
    it("should display the hero image correctly on mobile view", () => {
      cy.viewport(375, 667); // Set to mobile view
      cy.get("main picture img")
        .should("have.attr", "src", "./assets/images/image-hero-mobile.png")
        .and("be.visible");
    });

    it("should display the hero image correctly on desktop view", () => {
      cy.viewport(1280, 720); // Set to desktop view
      cy.get("main picture source").should(
        "have.attr",
        "srcset",
        "./assets/images/image-hero-desktop.png"
      );
    });

    it("should display the main heading and paragraph", () => {
      cy.get(".text-content h1").should("contain.text", "Make remote work");
      cy.get(".text-content p").should(
        "contain.text",
        "Get your team in sync, no matter your location. Streamline processes, create team rituals, and watch productivity soar."
      );
    });

    it("should display client logos correctly", () => {
      const clients = [
        "client-databiz.svg",
        "client-audiophile.svg",
        "client-meet.svg",
        "client-maker.svg",
      ];
      clients.forEach((client) => {
        cy.get(`.clients img[src='./assets/images/${client}']`).should("be.visible");
      });
    });
  });

  describe("Footer Content", () => {
    it("should display the footer attribution with correct links", () => {
      cy.get(".attribution a")
        .first()
        .should("have.attr", "href", "https://crio.do")
        .and("have.attr", "target", "_blank");
    });
  });
});
