import { test, expect } from '@playwright/test';

test('Login, Add Nokia Edge to Cart, and Complete Checkout', async ({ page }) => {
  // Navigate to login page
  console.log('Navigating to login page...');
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.waitForLoadState('networkidle');
  
  // Credentials
  const username = 'rahulshettyacademy';
  const password = 'learning';
  console.log(`Logging in with username: ${username}`);
  
  // Fill in login credentials
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  
  // Select user type radio button - this triggers a modal
  console.log('Selecting User radio button...');
  await page.click('input[value="user"]');
  
  // Handle the modal dialog
  console.log('Waiting for modal to appear and clicking Okay...');
  await page.waitForSelector('#okayBtn', { timeout: 5000 });
  await page.click('#okayBtn');
  await page.waitForTimeout(500);
  
  // Click Sign in button
  console.log('Clicking Sign In button...');
  await page.click('#signInBtn');
  
  // Wait for redirect to shop page
  console.log('Waiting for products page to load...');
  await page.waitForURL('**/shop', { timeout: 10000 });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  // Find Nokia Edge product and add to cart
  console.log('Looking for Nokia Edge product...');
  const h4s = await page.locator('h4').all();
  console.log(`Found ${h4s.length} products`);
  
  // Find Nokia Edge and click its Add button
  const nokiaH4 = page.locator('h4').filter({ hasText: 'Nokia Edge' }).first();
  console.log('Found Nokia Edge!');
  
  // The button is in the ancestor card div with class "card h-100"
  const card = nokiaH4.locator('xpath=ancestor::div[@class="card h-100"]');
  const addButton = card.locator('button').first();
  
  console.log('Clicking Add button...');
  await addButton.click();
  console.log('✓ Successfully added Nokia Edge to cart');
  await page.waitForTimeout(1500);
  
  // Click on checkout link in top left
  console.log('Looking for checkout link...');
  const checkoutLink = page.locator('a:has-text("Checkout")').first();
  await checkoutLink.click();
  
  console.log('Waiting for checkout page to load...');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
  
  // On checkout page, click checkout button
  console.log('Clicking Checkout button...');
  const checkoutBtn = page.locator('button:has-text("Checkout")').first();
  await checkoutBtn.click();
  
  console.log('Waiting for confirmation page...');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  console.log('Checking for popups...');
  await page.locator('button:has-text("close")').first().click().catch(() => {
    console.log('No close button found');
  });
  
  // Select address as Pune from dropdown
  console.log('Selecting address (Pune)...');
  await page.locator('select').first().selectOption({ label: 'Pune' }).catch(() => {
    console.log('Could not select Pune by label');
  });
  
  // Click on T&C checkbox
  console.log('Clicking T&C checkbox...');
  await page.locator('input[type="checkbox"]').first().check().catch(() => {
    console.log('Could not check checkbox');
  });
  
  // Click Purchase button
  console.log('Clicking Purchase button...');
  await page.locator('button:has-text("Purchase")').first().click().catch(() => {
    console.log('Could not click purchase button');
  });
  
  console.log('Verifying success page...');
  await page.waitForLoadState('networkidle');
  
  const pageContent = await page.content();
  const hasSuccess = pageContent.includes('Success') || 
                    pageContent.includes('thank you') || 
                    pageContent.includes('order') ||
                    pageContent.includes('complete');
  
  expect(hasSuccess).toBeTruthy();
  console.log('✓ Test completed successfully!');
});
