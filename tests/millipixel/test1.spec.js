// @ts-check
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Extract and Save Contact Details with Logos', () => {
    test('Extracts contact info, downloads logos, and writes to a JSON file', async ({ page, request }) => {
        await page.goto('https://www.medicines.org.uk/emc/browse-companies');

        const companies = await page.$$('.browse-results > a');
        const companyData = [];
        const indexes = [0, 2, companies.length - 1]; // First, third, and last company

        // Loop through selected companies
        for (const index of indexes) {
            const company = companies[index];
            const companyName = (await company.innerText()).trim().replace(/\s+/g, '_'); // Replace spaces with underscores for filenames

            const relativeUrl = await company.getAttribute('href');
            if (!relativeUrl) {
                console.warn(`Skipping company ${companyName} due to missing href`);
                continue;
            }

            const absoluteUrl = `https://www.medicines.org.uk${relativeUrl}`;
            await page.goto(absoluteUrl, { timeout: 10000 });

            // Extract contact details
            const contactSection = await page.$('.company-details-contact-items');
            if (!contactSection) {
                console.warn(`Skipping company ${companyName} due to missing contact details section`);
                continue;
            }

            const contactDetails = {};
            const contactItems = await contactSection.$$('div.company-contacts-item-title');

            for (const item of contactItems) {
                const label = (await item.innerText()).trim();
                const nextElement = await item.evaluateHandle(el => el.nextElementSibling);
                const value = nextElement ? (await nextElement.innerText()).trim() : '';

                // Map labels to structured fields
                if (label.includes('Address')) contactDetails.address = value;
                else if (label.includes('Telephone')) contactDetails.telephone = value;
                else if (label.includes('Fax')) contactDetails.fax = value;
                else if (label.includes('Medical Information e-mail')) contactDetails.medicalEmail = value;
                else if (label.includes('Medical Information Direct Line')) contactDetails.medicalDirectLine = value;
                else if (label.includes('Out of Hours Telephone')) contactDetails.outOfHoursTelephone = value;
            }

            // Extract logo URL
            const logoImage = await page.$('img[alt="Company image"]');
            if (logoImage) {
                const logoRelativeUrl = await logoImage.getAttribute('src');
                if (logoRelativeUrl) {
                    const logoUrl = `https://www.medicines.org.uk${logoRelativeUrl}`;
                    const logoFilename = `${companyName}_logo.png`;
                    const logoPath = `cypress/fixtures/logos/${logoFilename}`; // Path to save the logo

                    try {
                        // Download and save the logo image using Playwright's request
                        const response = await request.get(logoUrl);
                        expect(response.status()).toBe(200);

                        const buffer = await response.body();
                        const dir = path.dirname(logoPath);
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir, { recursive: true });
                        }

                        fs.writeFileSync(logoPath, buffer);

                        console.log(`Logo saved as: ${logoFilename}`);

                        // Push structured data into companyData
                        companyData.push({
                            company: companyName,
                            contact: contactDetails,
                            logo: logoFilename,
                        });
                    } catch (error) {
                        console.error(`Error downloading logo for ${companyName}: ${error}`);
                    }
                } else {
                    console.warn(`No logo URL found for ${companyName}`);
                    companyData.push({
                        company: companyName,
                        contact: contactDetails,
                        logo: null, // Or a default logo filename
                    });
                }
            }
              else{
                  console.warn(`No logo image found for ${companyName}`);
                  companyData.push({
                      company: companyName,
                      contact: contactDetails,
                      logo: null, // Or a default logo filename
                  });
              }
        }

        // Write the collected data to a JSON file
        const filePath = 'cypress/fixtures/company-contacts.json'; // File path within the project
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(companyData, null, 2));
        console.log(`Contact details written to ${filePath}`);
    });
});
