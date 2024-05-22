// basePage.mjs
import { promises as fs } from 'fs'
import { until } from 'selenium-webdriver'

class BasePage {
	constructor(driver) {
		this.driver = driver
	}

	async open(url) {
		await this.driver.get(url)
	}

	async maximizeWindow() {
		await this.driver.manage().window().maximize()
	}

	async getTitle() {
		return await this.driver.getTitle()
	}

	async takeScreenshot(filePath) {
		let image = await this.driver.takeScreenshot()
		await fs.writeFile(filePath, image, 'base64')
	}

	async click(elementBy) {
		const element = await this.driver.findElement(elementBy)
		await element.click()
	}

	async waitForElement(locator, timeout = 10000) {
		const element = await this.driver.wait(
			until.elementLocated(locator),
			timeout
		)
		await this.driver.wait(until.elementIsVisible(element), timeout)
		return element
	}
}

export default BasePage
