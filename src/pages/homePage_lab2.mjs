// homePage_lab2.mjs
import { By } from 'selenium-webdriver'
import BasePage from './basePage.mjs'

export class HomePage extends BasePage {
	constructor(driver) {
		super(driver)
		this.scheduleButton = By.xpath('//a[@title="Расписание"]')
	}

	async clickScheduleButton() {
		await this.click(this.scheduleButton)
	}
}
