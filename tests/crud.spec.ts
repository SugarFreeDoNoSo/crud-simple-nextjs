import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://loclah.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test.beforeEach(async ({ page }) =>
  await page.goto('http://localhost:3000')
)


test.describe('Testing Create', () => {
  test('Probar C', async ({ page }) => {
    // await page.getByRole("button").fill
    await page.getByText("Agregar Objeto", {exact: true}).click();

    await page.getByLabel("Título", {exact: true}).fill('Objeto 1')
    // await page.getByLabel("Fecha", {exact: true}).fill('01-01-2000')
    await page.getByLabel("Descripción", {exact: true}).fill('Descripción de prueba')
    
    await page.getByText("Guardar", {exact: true}).click();
  })

})