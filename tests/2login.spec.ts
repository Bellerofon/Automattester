import { test, expect } from '@playwright/test';

test('Log in with correct username and password', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/2-log-in');

  // Fill in the username and password fields
  await page.fill('input[placeholder="Enter your username here"]', 'Admin');
  await page.fill('input[placeholder="Enter your password here"]', 'SafePass123');

  // Submit the login form
  await page.click('button:has-text("Log In")');

  // Confirm the success message appears
  await page.waitForSelector('body:has-text("Good Job! Your well earned assert code: ASSERTME")', {
    state: 'visible'  // Ensures the element is visible
  });

  // Verify the result message content
  const successMessage = await page.textContent('body');
  expect(successMessage).toContain('Good Job! Your well earned assert code: ASSERTME');
});
