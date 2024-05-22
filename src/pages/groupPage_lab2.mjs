// groupPage_lab2.mjs
import { By } from 'selenium-webdriver'
import BasePage from './basePage.mjs'

export class GroupPage extends BasePage {
	constructor(driver) {
		super(driver)
		this.searchField = By.xpath("//input[@placeholder='группа ...']")
		this.searchResultLink = By.xpath('//div[contains(text(), "221-322")]')
		this.scheduleTable = By.css('.schedule-week')
		this.currentDay = By.css('.schedule-day_today')
	}

	async type(element, text) {
		await this.driver.findElement(element).sendKeys(text)
	}

	async searchGroup(groupNumber) {
		await this.type(this.searchField, groupNumber)
		await this.driver.findElement(this.searchField).sendKeys('\n')
	}

	async getAllElements(locator) {
		return await this.driver.findElements(locator)
	}

	async getElement(locator) {
		return await this.driver.findElement(locator)
	}

	async clickSearchResult() {
		await this.click(this.searchResultLink)
	}

	async isCurrentDayHighlighted() {
		const daysOfWeek = [
			'понедельник',
			'вторник',
			'среда',
			'четверг',
			'пятница',
			'суббота',
			'воскресенье',
		]

		const todayDayOfWeek = new Date().getDay()

		if (todayDayOfWeek === 0) {
			try {
				const currentDayElement = await this.getElement(this.currentDay)
				return !(await currentDayElement.isDisplayed())
			} catch (e) {
				return true
			}
		}

		const currentDayElement = await this.getElement(this.currentDay)
		const highlightedDayText = (await currentDayElement.getText()).toLowerCase()

		return highlightedDayText === daysOfWeek[todayDayOfWeek - 1]
	}
}
