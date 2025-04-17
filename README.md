GitHub Repository Submission
🔗 Repository Link: https://github.com/Nave2112/rtCampTask.git
📄 HTML Report: file:///C:/Users/Naveen/Playwright/custom-report-folder/index.html

//Below the 📁 Test Folder Structure for the testcase 
tests/
├── SauceDemo.spec.js
├── SauceDemo.spec.js-snapshots/
├── utils/
│   ├── a11y-helpers.js
│   ├── constants.js
│   └── helperss.js
├── custom-report-folder/
│   ├── data/
│   ├── video/              <-- optional if you want to add videos later
│   └── index.html



---

## ⚙️ Prerequisites

- Node.js v16 or above
- Git
- VS Code (recommended)
- Playwright

Install Playwright and dependencies:
Step 1: Initialize a New Project 
npm init playwright@latest
Step 2: Install Dependencies  
npm install @playwright/test
This project also uses axe-core/playwright for accessibility checks.
  npm install @axe-core/playwright

🚀 Test Execution  - either we use headed and headless
Run the test in headless mode
npx playwright test tests/SauceDemo.spec.js --project=chromium or npx playwright test tests/SauceDemo.spec.js --project chromium
Run in headed/debug mode

After test execution, generate the report:
    npx playwright show-report tests/custom-report-folder
The HTML report will be available at: tests/custom-report-folder/index.htmlr



