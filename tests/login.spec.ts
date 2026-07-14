import { test, expect } from '../fixtures/fixture';

test.use({
  storageState: { cookies: [], origins: [] },
});

test('Login Success', async({ page, loginpage }) => {
    await loginpage.login('standard_user', 'secret_sauce'); 

    await expect(page.getByText('Products')).toBeVisible();
});

test('Locked User', async({page, loginpage}) => {
    await loginpage.login('locked_out_user', 'secret_sauce'); 

    await expect(loginpage.errormessage).toContainText('locked out');
})

test ('Wrong Credentials', async({page, loginpage}) => {
    await loginpage.login('problem_user', 'secret'); 

    await expect(loginpage.errormessage).toContainText('do not match');
})

test ('Username Empty', async({page, loginpage}) => {
    await loginpage.login('', 'secret_sauce');

    await expect(loginpage.errormessage).toContainText('Username is required');

})

test ('Password Empty', async({page, loginpage}) => {
    await loginpage.login('standard_user', '');  
    
    await expect(loginpage.errormessage).toContainText('Password is required');
})

test ('Username & Password Empty', async({page, loginpage}) => {
    await loginpage.login('', '');  
    
    await expect(loginpage.errormessage).toContainText('Username is required');
})