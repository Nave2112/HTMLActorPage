import {test,expect} from "@playwright/test"
test('make checkboxes',async({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/')

    let locator = ['#sunday', '#tuesday', '#saturday']

    for (let select of locator){
        await page.locator(select).check()
    }

    for (let unselect of locator){
        if(await expect (page.locator(unselect)).toBeChecked()){
            await page.locator(unselect).uncheck()
            await page.locator(unselect).not.toBeChecked()
        }
    }
    
    await page.waitForSelector('select#country'); // Wait for the dropdown to be available
await page.selectOption('select#country', { value: 'india' });
await expect(page.locator('select#country')).toHaveValue('india');

})