// Smoke test for the production build: serves dist/ with `vite preview`, loads it in headless Chromium and fails on
// anything that suggests an upgrade broke the app at runtime (uncaught errors, React errors, missing UI, dead navigation).
// Usage: pnpm build && pnpm smoke   (set CHROMIUM_PATH to use an already-installed Chromium instead of Playwright's)
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PORT = 4173;
const URL = `http://localhost:${PORT}/`;
const failures = [];
const fail = (msg) => { failures.push(msg); console.error(`FAIL: ${msg}`); };

const server = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' });
const stop = () => server.kill();
process.on('exit', stop);

async function waitForServer() {
    for (let i = 0; i < 60; i++) {
        try { if ((await fetch(URL)).ok) return; } catch { /* not up yet */ }
        await new Promise((r) => setTimeout(r, 500));
    }
    throw new Error('preview server did not start');
}

try {
    await waitForServer();
    const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
    for (const [name, viewport] of [['desktop', { width: 1300, height: 900 }], ['mobile', { width: 390, height: 844 }]]) {
        const page = await browser.newPage({ viewport });
        const tag = (m) => `[${name}] ${m}`;
        page.on('pageerror', (e) => fail(tag(`uncaught error: ${e.message}`)));
        page.on('console', (m) => {
            // 3D models come from an external host; a flaky CDN must not fail an upgrade check
            if (m.type() === 'error' && !/Failed to load (resource|model)|ERR_|jsdelivr/i.test(m.text())) fail(tag(`console error: ${m.text().slice(0, 200)}`));
            if (m.type() === 'warning' && /React|deprecated|Invalid (prop|DOM)|unique "key"/i.test(m.text())) fail(tag(`React warning: ${m.text().slice(0, 200)}`));
        });
        page.on('response', (r) => {
            const u = r.url();
            if (u.startsWith(URL) && r.status() >= 400) fail(tag(`HTTP ${r.status()} for ${u}`));
        });

        await page.goto(URL);
        await page.waitForSelector('.modal button', { timeout: 15000 }).catch(() => fail(tag('disclaimer modal did not render')));
        await page.locator('.modal button').last().click();
        await page.waitForSelector('.modal.show', { state: 'detached', timeout: 5000 }).catch(() => fail(tag('disclaimer modal did not close')));

        if ((await page.locator('canvas').count()) < 1) fail(tag('3D canvas missing'));
        if ((await page.locator('.nav-pills .nav-link').count()) < 4) fail(tag('fact tabs missing'));
        if ((await page.locator('.carousel-item').count()) < 1) fail(tag('carousels missing'));

        // broken asset URLs show up as images that finished loading with zero width
        const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src));
        broken.forEach((src) => fail(tag(`broken image: ${src}`)));

        // model navigation should step Thruster -> Chamber
        const title = () => page.locator('h2.section-title').first().innerText().then((t) => t.trim().toLowerCase());
        const before = await title();
        await page.evaluate(() => document.getElementById('forward')?.click());
        await page.waitForTimeout(500);
        if ((await title()) === before) fail(tag('forward navigation did not change the view'));

        // each fact tab should switch without errors
        const tabs = page.locator('.nav-pills .nav-link');
        for (let i = 0; i < (await tabs.count()); i++) { await tabs.nth(i).click(); await page.waitForTimeout(200); }
        await page.close();
    }
    await browser.close();
} catch (e) {
    fail(e.message);
} finally {
    stop();
}

if (failures.length) { console.error(`\nSmoke test failed with ${failures.length} problem(s).`); process.exit(1); }
console.log('Smoke test passed.');
