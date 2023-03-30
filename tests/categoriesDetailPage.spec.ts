
import { test, expect } from '@playwright/test';

test('Category Details page working', async ({ page }) => {
    
  //start from main page 
  await page.goto('http://localhost:3000');
  
  // go to details page
  await page.getByRole('link', { name: 'Music' }).click();
  
  // check if we are on the details page
  await expect(page).toHaveURL(/10/);

  // check if buttons are visible
  const viewsbutton = await page.getByRole('button', { name: 'Views' });
  await expect(viewsbutton).toBeVisible();

  const videosButton = await page.getByRole('button', { name: 'Videos' });
  await expect(videosButton).toBeVisible();

  const likesButton = await page.getByRole('button', { name: 'Likes' });
  await expect(likesButton).toBeVisible();

  });