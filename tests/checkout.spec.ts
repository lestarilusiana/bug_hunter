import {test, expect} from '@playwright/test';
import {login} from '../utils/login';

test.beforeEach(async ({page}) => {
    await login(page);
})

test('checkout', async({page}) => {
    // await page.goto('https://www.saucedemo.com');
    // await page.getByPlaceholder('Username').fill('standard_user');
    // await page.getByPlaceholder('Password').fill('secret_sauce');
    // await page.getByRole('button', {name: 'Login'}).click();
    await page.getByText('Sauce Labs Backpack').click();
    const badge = page.locator('[data-test="shopping-cart-badge"]');
    let initialCount = 0;

    if (await badge.count() > 0) {
        initialCount = Number(await badge.textContent());
    }
    await page.locator('[id="add-to-cart"]').click();

    await expect(badge).toHaveText(String(initialCount+1));
})

test('checkout_detail', async({page}) => {
    await page.getByText('Sauce Labs Backpack').click();
    const badge = page.locator('[data-test="shopping-cart-badge"]');
    let initialCount = 0;

    if (await badge.count() > 0) {
        initialCount = Number(await badge.textContent());
    }
    await page.locator('[id="add-to-cart"]').click();
    await page.locator('[id="shopping_cart_container"]').click();

    await expect(page.getByText('Your Cart')).toBeVisible();
})

test('checkout_page', async({page}) => {
    await page.getByText('Sauce Labs Backpack').click();
    const badge = page.locator('[data-test="shopping-cart-badge"]');
    let initialCount = 0;

    if (await badge.count() > 0) {
        initialCount = Number(await badge.textContent());
    }
    await page.locator('[id="add-to-cart"]').click();
    await page.locator('[id="shopping_cart_container"]').click();
    await page.getByRole('button', {name:'checkout'}).click();

    await expect(page.getByText('Your Information')).toBeVisible();
})

test('continue_to_payment', async({page}) => {
    await page.getByText('Sauce Labs Backpack').click();
    const badge = page.locator('[data-test="shopping-cart-badge"]');
    let initialCount = 0;

    if (await badge.count() > 0) {
        initialCount = Number(await badge.textContent());
    }
    await page.locator('[id="add-to-cart"]').click();
    await page.locator('[id="shopping_cart_container"]').click();
    await page.getByRole('button', {name:'checkout'}).click();
    await page.getByPlaceholder('First Name').fill('Anna');
    await page.getByPlaceholder('Last Name').fill('lee');
    await page.getByPlaceholder('Zip/Postal Code').fill('11001');
    await page.getByRole('button', {name:'continue'}).click();
    
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
})

test('finish_checkout', async({page}) => {
    await page.getByText('Sauce Labs Backpack').click();
    const badge = page.locator('[data-test="shopping-cart-badge"]');
    let initialCount = 0;

    if (await badge.count() > 0) {
        initialCount = Number(await badge.textContent());
    }
    await page.locator('[id="add-to-cart"]').click();
    await page.locator('[id="shopping_cart_container"]').click();
    await page.getByRole('button', {name:'checkout'}).click();
    await page.getByPlaceholder('First Name').fill('Anna');
    await page.getByPlaceholder('Last Name').fill('lee');
    await page.getByPlaceholder('Zip/Postal Code').fill('11001');
    await page.getByRole('button', {name:'continue'}).click();
    await page.getByRole('button', {name:'finish'}).click();

    await expect(page.getByText('Thank you for your order!')).toBeVisible();
})