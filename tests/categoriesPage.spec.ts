
import { test, expect } from '@playwright/test';

test('categories displayed', async ({ page }) => {

    //navigate to page
    await page.goto('http://localhost:3000/categories');
  
    // Expect to buttons
    
    const button1 = await page.getByRole('link', { name: 'Film & Animation' });
    await expect(button1).toBeVisible();
    
    const button2 = await page.getByRole('link', { name: 'Music' });
    await expect(button2).toBeVisible();

    const button3 = await page.getByRole('link', { name: 'Sports' });
    await expect(button3).toBeVisible();

    const button4 = await page.getByRole('link', { name: 'Autos & Vehicles' });
    await expect(button4).toBeVisible();

    // check if search bar is visible
    const searchBar = await page.getByRole('textbox', { name: 'Search' });
    await expect(searchBar).toBeVisible();

    //add input to search bar
    await searchBar.fill('sports');

    //check if sports button is visible
    await expect(button3).toBeVisible();

    //check if other button that is not sport is not visible
    await expect(button1).not.toBeVisible();

    //clear search bar
    searchBar.fill('');

    //check navigation when buttons is clicked
    await button1.click();
    await expect(page).toHaveURL(/1/);

  });