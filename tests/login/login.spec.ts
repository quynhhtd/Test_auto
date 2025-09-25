import { test, expect, Page } from '@playwright/test';
import { dataLogin } from '../../Data/DataLogin';

async function login(page, username: string, password: string) {
  await page.goto('https://.../login');
  await page.locator('input[name="username"]').fill(dataLogin.defaul.username);
  await page.locator('input[name="password"]').fill(dataLogin.defaul.password);
  await page.getByRole("button", { name: "ログイン " }).click();
}
try {
  for (const caseLogin of dataLogin.cases) {
    test(`Login test case ${caseLogin.id}`, async ({ page }) => {
      await login(page, caseLogin.username, caseLogin.password);
      switch (caseLogin.id) {
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
}
catch (error) {
  console.error('Error during test execution:', error);
}



