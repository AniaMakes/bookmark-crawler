const puppeteer = require("puppeteer");
const fullPageScreenshot = require("puppeteer-full-page-screenshot");

const urlToSave = ['https://www.bbc.co.uk/news', 'https://www.theguardian.com/uk']

const visitAndScreenshot = async (page, urlList) => {

	for (i = 0; i < urlList.length; i++) {
		const theUrl = urlList[i];
		const regexOne = /\./g
		const regexTwo = /\//g
		const firstPart = theUrl.replace(regexOne, '-');
		const secondPart = firstPart.replace(':', '_');
		const imageName = secondPart.replace(regexTwo, '_');
		try {
			await page.goto(theUrl);
			await fullPageScreenshot.default(page, { path: `./${imageName}.jpg` });
		}
		catch (error) {
			console.log(error)
		}
	}
}

const fetchScreenshots = async (urlList) => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setViewport({ width: 1920, height: 1080 });
		await visitAndScreenshot(page, urlList);
		await browser.close();
	}
	catch (error) {
		console.log(error);
	}
}

const fetchSingleScreenshot = async (singleUrl) => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setViewport({ width: 1920, height: 1080 });
		await page.goto(singleUrl);
		await fullPageScreenshot.default(page, { path: `./screenshot.jpg` });
		await browser.close();
	}
	catch (error) {
		console.log(error);
	}
}

// fetchSingleScreenshot('https://www.bbc.co.uk/news')
fetchScreenshots(urlToSave);
