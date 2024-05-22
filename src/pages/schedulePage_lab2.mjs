import { By } from 'selenium-webdriver'
import BasePage from './basePage.mjs'

export class SchedulePage extends BasePage {
	constructor(driver) {
		super(driver)
		this.seeOnSiteLink = By.xpath("//a[@href='https://rasp.dmami.ru/']")
	}

	async clickSeeOnSiteLink() {
		await this.waitForElement(this.seeOnSiteLink, 20000)
		await this.click(this.seeOnSiteLink)
	}
}
