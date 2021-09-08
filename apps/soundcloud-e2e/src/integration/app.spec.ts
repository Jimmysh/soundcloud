import { getGreeting } from '../support/app.po';

describe('soundcloud', () => {
  beforeEach(() => cy.visit('/'));

  it('should display Dashboard', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Dashboard');
  });
});
