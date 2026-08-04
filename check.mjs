import { chromium } from "playwright";

const url = process.argv[2] || "https://warnode.cloud";
const browser = await chromium.launch();
for (const label of ["fresh", "consented"]) {
  const context = await browser.newContext();
  if (label === "consented") {
    await context.addInitScript(() => {
      localStorage.setItem("cookie-consent", "accepted");
      localStorage.setItem("cookie-preferences", JSON.stringify({ necessary: true, preferences: true }));
    });
  }
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2000);
  const body = await page.locator("body").innerText();
  const hasAppError = body.includes("Application error");
  console.log(`\n[${label}] appError=${hasAppError}`);
  console.log(errors.slice(0, 10));
  await context.close();
}
await browser.close();
