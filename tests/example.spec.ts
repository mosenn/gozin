import { test, expect } from "@playwright/test";

test("login form should be visible", async ({ page }) => {
  await page.goto("/login");

  await expect(page.getByPlaceholder("ایمیل خود را وارد کنید")).toBeVisible();
  await expect(page.getByPlaceholder("رمز خود را وارد کنید")).toBeVisible();
});