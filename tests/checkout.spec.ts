import {test, expect} from '@playwright/test';
import {login} from '../utils/login';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({page}) => {
    await login(page);
})

// test('checkout', async({page}) => {
//     const checkoutpage = new CheckoutPage(page);
//     await page.getByText('Sauce Labs Backpack').click();
//     const badge = checkoutpage.cartCount;
//     let initialCount = 0;

//     if (await badge.count() > 0) {
//         initialCount = Number(await badge.textContent());
//     }
//     await checkoutpage.addToCart.click();

//     await expect(badge).toHaveText(String(initialCount+1));
// })

// test('checkout_detail', async({page}) => {
//     const checkoutpage = new CheckoutPage(page);
//     await page.getByText('Sauce Labs Backpack').click();
//     const badge = checkoutpage.cartCount;
//     let initialCount = 0;

//     if (await badge.count() > 0) {
//         initialCount = Number(await badge.textContent());
//     }
//     await checkoutpage.addToCart.click();
//     await checkoutpage.shoppingCart.click();

//     await expect(page.getByText('Your Cart')).toBeVisible();
// })

// test('checkout_page', async({page}) => {
//         const checkoutpage = new CheckoutPage(page);
//     await page.getByText('Sauce Labs Backpack').click();
//     const badge = checkoutpage.cartCount;
//     let initialCount = 0;

//     if (await badge.count() > 0) {
//         initialCount = Number(await badge.textContent());
//     }
//     await checkoutpage.addToCart.click();
//     await checkoutpage.shoppingCart.click();
//     await checkoutpage.buttonCheckout.click();

//     await expect(page.getByText('Your Information')).toBeVisible();
// })

// test('continue_to_payment', async({page}) => {
//     const checkoutpage = new CheckoutPage(page);
//     await page.getByText('Sauce Labs Backpack').click();
//     const badge = checkoutpage.cartCount;
//     let initialCount = 0;

//     if (await badge.count() > 0) {
//         initialCount = Number(await badge.textContent());
//     }
//     await checkoutpage.addToCart.click();
//     await checkoutpage.shoppingCart.click();
//     await checkoutpage.buttonCheckout.click();
//     await checkoutpage.checkout('Anna', 'Lee', '11011');
    
//     await expect(page.getByText('Checkout: Overview')).toBeVisible();
// })

test('finish_checkout', async({page}) => {
    const checkoutpage = new CheckoutPage(page);
    await checkoutpage.addItemToCart('Sauce Labs Backpack');
    const badge = checkoutpage.cartCount;
    let initialCount = 0;

    if (await badge.count() > 0) {
        initialCount = Number(await badge.textContent());
    }
    // await checkoutpage.addToCart.click();
    // await checkoutpage.shoppingCart.click();
    // await checkoutpage.buttonCheckout.click();
    // await checkoutpage.checkout('Anna', 'Lee', '11011');
    // await checkoutpage.buttonFinish.click();

    await checkoutpage.checkout('Anna', 'Lee', '11011');

    await expect(page.getByText('Thank you for your order!')).toBeVisible();
})