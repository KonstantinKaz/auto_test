// todoPage.mjs
import { By } from 'selenium-webdriver'
import BasePage from './basePage.mjs'

class TodoPage extends BasePage {
	constructor(driver) {
		super(driver)
		this.url = 'https://lambdatest.github.io/sample-todo-app/'
	}

	async open() {
		await super.open(this.url)
	}

	async getRemainingText() {
		let element = await this.driver.findElement(By.className('ng-binding'))
		return await element.getText()
	}

	async checkItemStatus(index) {
		let item = await this.driver.findElement(
			By.xpath(`//input[@name='li${index}']/following-sibling::span`)
		)
		let itemClass = await item.getAttribute('class')
		let itemText = await item.getText()
		return { class: itemClass, text: itemText }
	}

	async clickItemCheckbox(index) {
		let checkbox = await this.driver.findElement(By.name(`li${index}`))
		await checkbox.click()
		await this.driver.sleep(1000)
	}

	async addItem(text) {
		let input = await this.driver.findElement(By.id('sampletodotext'))
		await input.sendKeys(text)
		await this.driver.sleep(1000)
		let button = await this.driver.findElement(By.id('addbutton'))
		await button.click()
		await this.driver.sleep(1000)
	}
}

export default TodoPage
