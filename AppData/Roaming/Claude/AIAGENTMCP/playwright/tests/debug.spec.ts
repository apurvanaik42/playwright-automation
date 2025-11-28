import { test } from '@playwright/test';

test('Debug - Find Add button location for Nokia Edge', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.waitForLoadState('networkidle');
  
  // Login
  const username = 'rahulshettyacademy';
  const password = 'learning';
  
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('input[value="user"]');
  
  // Handle modal
  await page.waitForSelector('#okayBtn', { timeout: 5000 });
  await page.click('#okayBtn');
  await page.waitForTimeout(500);
  
  // Click Sign in
  await page.click('#signInBtn');
  await page.waitForURL('**/shop', { timeout: 10000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // Get Nokia H4 and find button in its ancestor card
  const nokiaH4 = page.locator('h4').filter({ hasText: 'Nokia Edge' }).first();
  
  // The button is in the card ancestor, not sibling. Let's search parent.card for button
  const card = nokiaH4.locator('xpath=ancestor::div[@class="card h-100"]');
  const button = card.locator('button');
  const buttonCount = await button.count();
  console.log('Buttons in card:', buttonCount);
  
  if (buttonCount > 0) {
    // Get button text
    const buttonTexts = await button.allTextContents();
    console.log('Button texts in card:', buttonTexts);
    
    // Click the first button
    console.log('Clicking Add button...');
    await button.first().click();
    console.log('✓ Successfully clicked Add button');
  } else {
    console.log('No button found in card!');
    
    // Let's inspect the full card HTML
    const cardHtml = await card.evaluate(el => el.outerHTML);
    console.log('Card HTML length:', cardHtml.length);
    console.log('Card HTML:', cardHtml.substring(0, 1500));
  }
});


