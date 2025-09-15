import { test, expect, Page } from '@playwright/test';
import { Data_login } from '../Data/Data_login';

async function login ( page, username: string, password: string) {
  await page.goto('https://.../auth/login/');
  await page.locator('input[name="username"]').fill(Data_login.username);
  await page.locator('input[name="password"]').fill(Data_login.password);
  await page.getByRole("button", { name: "ログイン " }).click();
}

for(const c of Data_login.cases) {
  test(`Login test case ${c.id}`, async ({ page }) => {
    await login( page, c.username, c.password);
    switch(c.id) {
      case 1:
        await expect(page).toHaveURL("https://.../Dashboard");
        break;
      case 2:
      case 3:
      case 4:
        await expect(page.getByText('Invalid username or password')).toBeVisible();
        break;  
      case 5:
        await expect(page.getByText('Username and password are required')).toBeVisible();
        break;
      case 6:
        await expect(page.getByText('Password is required')).toBeVisible();
        break;
      case 7:
        await expect(page.getByText('Username is required')).toBeVisible();
        break;  
      default:
        throw new Error('Invalid test case id');
    }
});
}
