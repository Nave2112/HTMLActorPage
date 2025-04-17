import {test,expect} from '@playwright/test'

test('locating element',async({page})=>{
    await page.goto('https://www.demoblaze.com/')
    await page.click("//div[@id='contcont']//a[2]")  //div#contcont a:nth-child(2)  by click phone section
    //await page.click("[onclick=\"byCat('phone')\"]");

    // Wait for products to be fully loaded
    await page.waitForLoadState('networkidle'); 
    page.waitForSelector('//h4[@class="card-title"]/a')
    const products = await page.$$('//h4[@class="card-title"]/a')
    
    for (const product of products) {
        const ProductName = await product.textContent();
        console.log(ProductName)

    }

    await page.locator('img[class="card-img-top img-fluid"]').nth(1).click()
   // await expect(page.getByText('Nokia lumia 1520')).toBeVisible()
    await expect(page.getByText('Nokia lumia 1520', { exact: true })).toBeVisible();
    //
    // await expect(page.getByTitle('STORE')).toBeVisible()
    await expect(page).toHaveTitle('STORE')
})