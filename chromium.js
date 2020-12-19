const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function getScreenshot(url, type, quality, fullPage, viewportWidth, viewportHeight) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        defaultViewport: {
            width: viewportWidth,
            height: viewportHeight
        }
    });

    const page = await browser.newPage();
    await page.goto(url);
    const file = await page.screenshot({ type,  quality, fullPage });
    await browser.close();
    return file;
}

async function fillDMVform(name) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        defaultViewport: {
            width: viewportWidth,
            height: viewportHeight
        }
    });

    const page = await browser.newPage();
    await page.goto('https://cdlis.dmv.de.gov/cdlis/');
    switch (name) {
        case 'David': {
            firstname = "David";
            lastname = "Zickafoose";
            state = "Pennsylvania";
        }
        case 'Jayaram': {
            firstname = "Bellave";
            lastname = "Jayaram";
            state = "Arizona";
        }
    }
    // Focuses the LastName input
    await page.focus('[id="LastName"]');
    // Types the text into the focused element
    await page.keyboard.type(lastname, { delay: 100 });

    // Focuses the FirstName input
    await page.focus('[id="FirstName"]');
    // Types the text into the focused element
    await page.keyboard.type(firstname, { delay: 100 });

    await page.select('#DlState', state)

    const file = await page.screenshot({ type,  quality, fullPage });
    await browser.close();
    return file;
}

module.exports = { fillDMVform };
//module.exports = { getScreenshot };