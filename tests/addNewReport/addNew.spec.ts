import { test, expect, Page } from '@playwright/test';
import { dataAddNewReport } from '../../Data/dataAddNewReport';

async function fillData(
  page: Page,
  calendar: string,
  staff: string[],
  handle: string[],
  activity: string[],
  notes: string,
  action : "save" | "cancel" = "save"
) {
  if (calendar) {
    await page.locator(`input[name="calendar"]`).click();
    await page.getByText(calendar, { exact: true }).click();
  }
  if (staff.length > 0) {
    await page.selectOption('select[name="staff"]', staff.map(label => ({ label })));
  }
  if (handle.length > 0) {
    await page.selectOption('select[name="handle"]', handle.map(label => ({ label })));
  }
  if (activity.length > 0) {
    await page.selectOption('select[name="activity"]', activity.map(label => ({ label })));
  }
  if (notes) {
    await page.locator('input[name="notes"]').fill(notes)
  }
  if (action === "save"){
    await page.getByRole("button", { name: "save" }).click();
  }
  else {
    await page.getByRole("button", { name: "cancel" }).click();
  } 
}

for (const caseValidate of dataAddNewReport.caseValidate) {
  test(`Validate test case ${caseValidate.id}`, async ({ page }) => {
    await fillData(page, caseValidate.calendar, caseValidate.staff, caseValidate.handle, caseValidate.activity, caseValidate.notes);
    switch (caseValidate.id) {
      case 1:
        await expect(page.getByText('Calendar is required')).toBeVisible();
        await expect(page.getByText('staff is required')).toBeVisible();
        await expect(page.getByText('activity is required')).toBeVisible();
        await expect(page.getByText('notes is required')).toBeVisible();
        break;
      case 2:
        await expect(page.getByText('Calendar cannot be in the past')).toBeVisible();
        break;
      case 3:
        await expect(page.getByText('Notes is required')).toBeVisible();
        break;
      case 4:
        await expect(page.getByText('Notes cannot exceed 5000 characters')).toBeVisible();
        break;
      case 5:
        await expect(page.getByText('Report saved successfully')).toBeVisible();
        await page.getByRole("textbox", { name: "活動履歴" }).click();
        const form = page.locator('#reportHistoryForm');
        await expect(form.getByText(caseValidate.calendar)).toBeVisible();
        await expect(form.getByText(String(caseValidate.staff))).toBeVisible();
        await expect(form.getByText(String(caseValidate.handle))).toBeVisible();
        await expect(form.getByText(String(caseValidate.activity))).toBeVisible();
        await expect(form.getByText(caseValidate.notes)).toBeVisible();
        break;
      case 6:
        await fillData(page, caseValidate.calendar, caseValidate.staff, caseValidate.handle, caseValidate.activity, caseValidate.notes, "cancel");
        await expect(page.locator('#formAddNewReport')).not.toBeVisible();
        await page.getByRole("textbox", { name: "活動履歴" }).click();
        const formHistory = page.locator('#reportHistoryForm');
        await expect(formHistory.getByText(caseValidate.calendar)).toHaveCount(0);
        await expect(formHistory.getByText(String(caseValidate.staff))).toHaveCount(0);
        await expect(formHistory.getByText(String(caseValidate.handle))).toHaveCount(0);
        await expect(formHistory.getByText(String(caseValidate.activity))).toHaveCount(0);
        await expect(formHistory.getByText(caseValidate.notes)).toHaveCount(0);
        break;
      default:
        throw new Error('Invalid test case id');
    }
  });
} 