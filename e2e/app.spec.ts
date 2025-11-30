import { test, expect } from "@playwright/test";

test("home page loads and shows sign in button", async ({ page }) => {
  await page.goto("/");

  // Header should be visible
  await expect(page.getByRole("link", { name: "Profiles App" })).toBeVisible();

  // Sign in button should be visible (unauthenticated)
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();

  // Browse profiles heading should be visible
  await expect(page.getByRole("heading", { name: "Browse Profiles" })).toBeVisible();
});

test("profile page requires auth", async ({ page }) => {
  await page.goto("/profile");

  // Should show sign-in prompt
  await expect(page.getByText("Sign in to create your profile")).toBeVisible();
});
