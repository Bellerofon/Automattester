import { test, expect } from '@playwright/test';

test('Intercept API call and verify data', async ({ page }) => {
  // Mock data for the users
  const mockUserData = [
    { "name": "Richard", "age": 41 },
    { "name": "Dinesh", "age": 40 },
    { "name": "Gilfoyle", "age": 40 },
    { "name": "Bighead", "age": 40 },
    { "name": "Jared", "age": 40 }
  ];

  // Setting up the route interception for network requests
  await interceptNetworkRequest(page, mockUserData);

  // Navigate to the page where data is to be verified
  await page.goto('https://daedalus.janniskaranikis.dev/challenges/4-bad-data');

  // Evaluate and extract user data from the page
  const users = await extractUserData(page);

  // Assert that the extracted text is present and correct
  await verifyTextPresenceResult(page);
});

async function interceptNetworkRequest(page, userData) {
  await page.route('**/api/users', route => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(userData)
  }));
}

async function extractUserData(page) {
  return page.evaluate(() => {
    const userElements = [...document.querySelectorAll('.user')];
    return userElements.map(user => {
      const name = user.querySelector('.name').textContent.trim();
      const age = parseInt(user.querySelector('.age').textContent.trim());
      return { name, age };
    });
  });
}

async function verifyTextPresenceResult(page) {
  const isTextPresent = await page.$eval('.text-green-600.text-lg', element => {
    return element.textContent.includes('Good job! Your assert code: ASSERTME');
  });
  expect(isTextPresent).toBeTruthy();
}
