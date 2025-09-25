import { test, expect, Page } from '@playwright/test';
import { dataAddNewReport } from '../../Data/dataAddNewReport';

async function fillData(page, calendar: string, staff: string[], handle: string[], activity: string[], notes: string) 
{
  if (calendar){
  await page.locator(`input[name="calendar"]`).click();
  await page.getByText(calendar, { exact: true }).click();
  }
  if(staff.length > 0){
    await page.selectOption('select[name="staff"]', staff.map(label => ({ label })));
  }
  if(handle.length > 0){
    await page.selectOption('select[name="handle"]', handle.map(label => ({ label })));
  }
  //test
  if(activity.length > 0){
    await page.selectOption('select[name="activity"]', activity.map(label => ({ label })));
  }
  if(notes){
    await page.locator('input[name="notes"]').fill(notes)
  }
  await page.getByRole("button", { name: "save" }).click();
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
        default:
          throw new Error('Invalid test case id');
      }
    });
  } 