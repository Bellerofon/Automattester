import { test, expect } from '@playwright/test';

test('Verify button functionality', async ({ page }) => {
  // Navigate to the specified URL
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/1-press-the-button');

  // Click the button with specific text
  await page.click('button:has-text("Press Me")');

  // Verify that the expected text appears on the page after the button is clicked
  const resultText = await page.textContent('body');
  expect(resultText).toContain('You made it! Your assert code: ASSERTME');
});
