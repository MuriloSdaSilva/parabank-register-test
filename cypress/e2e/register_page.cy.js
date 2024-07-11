import { Faker, faker } from '@faker-js/faker';

class RegisterForm {
  elementsHtml = {
    firstNameInput: () => cy.get('input[id="customer.firstName"]'),
    lastNameInput: () => cy.get('input[id="customer.lastName"]'),
    adressInput: () => cy.get('input[id="customer.address.street"]'),
    cityInput: () => cy.get('input[id="customer.address.city"]'),
    stateInput: () => cy.get('input[id="customer.address.state"]'),
    zipCodeInput: () => cy.get('input[id="customer.address.zipCode"]'),
    phoneInput: () => cy.get('input[id="customer.phoneNumber"]'),
    ssnInput: () => cy.get('input[id="customer.ssn"]'),
    usernameInput: () => cy.get('input[id="customer.username"]'),
    passwordInput: () => cy.get('input[id="customer.password"]'),
    passwordConfirmInput: () => cy.get('input[id="repeatedPassword"]'),
    registerButton: () => cy.get('input[value="Register"]')
  }

  typeAllForm(){
    const password = faker.internet.password();
    this.elementsHtml.firstNameInput().type(faker.person.firstName());
    this.elementsHtml.lastNameInput().type(faker.person.lastName());
    this.elementsHtml.adressInput().type(faker.location.streetAddress());
    this.elementsHtml.cityInput().type(faker.location.city());
    this.elementsHtml.stateInput().type(faker.location.state());
    this.elementsHtml.zipCodeInput().type(faker.location.zipCode());
    this.elementsHtml.phoneInput().type(faker.phone.number());
    this.elementsHtml.ssnInput().type(faker.string.numeric(9).toString());
    this.elementsHtml.usernameInput().type(faker.internet.userName());
    this.elementsHtml.passwordInput().type(password);
    this.elementsHtml.passwordConfirmInput().type(password);
  }

  clickButton(){
    this.elementsHtml.registerButton().click()
  }
}
const registerForm = new RegisterForm();
describe('test-register-parabank', () => {

    after(() =>{
      cy.clearAllLocalStorage;
      cy.clearAllSessionStorage
      cy.clearAllCookies
    })

    it('Given that on the initial screen', () => {
      cy.visit(Cypress.config('baseUrl'));
      cy.get('img[title="ParaBank"]').should('exist');
    })
    it('When I click the register button', () =>{
      cy.xpath('//*[@id="loginPanel"]/p[2]/a').click();
    })

    it('Then I go to the registration screen', () =>{
      cy.xpath('//*[@id="rightPanel"]/h1').should('exist');
    })

    it('Then I fill in the registration screen', () =>{
      registerForm.typeAllForm();
    })

    it('Then I click register', () =>{
      registerForm.clickButton();
    })

    it('Then I see welcome message', () =>{
      cy.xpath('//*[@id="rightPanel"]/h1').should('exist');

      cy.xpath('//*[@id="leftPanel"]/ul/li[8]/a').should('exist').click();
    })
})