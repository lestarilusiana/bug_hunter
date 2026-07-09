import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly cartCount: Locator;
    readonly addToCart: Locator;
    readonly shoppingCart: Locator;
    readonly buttonCheckout;
    readonly firstName;
    readonly lastName;
    readonly zipCode;
    readonly buttonContinue;
    readonly buttonFinish;

    constructor(private page: Page){
        this.cartCount = page.locator('[data-test="shopping-cart-badge"]');
        this.addToCart = page.locator('[id="add-to-cart"]');
        this.shoppingCart = page.locator('[id="shopping_cart_container"]');
        this.buttonCheckout = page.getByRole('button', {name:'checkout'});
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zipCode = page.getByPlaceholder('Zip/Postal Code');
        this.buttonContinue = page.getByRole('button', {name:'continue'});
        this.buttonFinish = page.getByRole('button', {name:'finish'});
    }

    async checkout(firstname: string, lastname: string, zipcode: string) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zipCode.fill(zipcode);
        await this.buttonContinue.click();
  }
  
}