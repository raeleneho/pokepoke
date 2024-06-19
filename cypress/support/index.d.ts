import "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      mountWithApollo(component: React.ReactNode): Chainable<void>;
    }
  }
}
