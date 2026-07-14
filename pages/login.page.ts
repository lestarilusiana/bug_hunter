import {Page, Locator} from '@playwright/test';

export class LoginPage {
    readonly username: Locator;
    readonly password: Locator;
    readonly buttonLogin: Locator;
    readonly errormessage: Locator;

    constructor(private page: Page){
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.buttonLogin = page.getByRole('button', {name:'Login'});
        this.errormessage = page.locator('[data-test="error"]');
    }

    async goto(){
        await this.page.goto('/');
    }

    async login(uname: string, pass: string){
        await this.goto();
        await this.username.fill(uname);
        await this.password.fill(pass);
        await this.buttonLogin.click();
    }
}