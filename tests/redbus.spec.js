import{test,expect} from "@playwright/test"

test('check bookings',async({page})=>{
page.goto('https://www.redbus.in/')
await page.goto('https://www.redbus.in/',{timeout:3000});
await page.getByRole('textbox', { name: 'From' }).click();

await page.getByRole('textbox', { name: 'From' }).fill('mad');
// Wait and click on "Madurai"
await page.locator('.placeHolderMainText', { hasText: 'Madurai' }).click();

await page.getByRole('textbox', { name: 'To' }).click();
await page.getByRole('textbox', { name: 'To' }).fill('che');
await page.locator('.placeHolderMainText',{hasText: 'Chennai'}).click()
await page.fill('[class="dateText"]','Apr 17')
await page.fill('[class="yearText"]','2025')
});

