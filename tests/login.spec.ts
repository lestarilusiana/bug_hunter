import { test, expect } from '@playwright/test';


test('login success', async({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.getByText('Products')).toBeVisible();
});

test('login fail', async({page}) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
})

test ('login_wrong_credentials', async({page}) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('problem_user');
    await page.getByPlaceholder('Password').fill('secret');
    await page.getByRole('button', {name: 'Login'}).click();

    const error = page.locator('[data-test="error"]');
    console.log(await error.textContent());
    await expect(error).toContainText('do not match');
})