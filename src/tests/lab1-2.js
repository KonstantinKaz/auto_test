import { expect } from 'chai'
import { Browser, Builder } from 'selenium-webdriver'
import TodoPage from '../pages/todoPage_lab1.mjs'

describe('LambdaTest ToDo App', function () {
	let driver
	let todoPage
	let total = 5
	let remaining = total

	before(async function () {
		driver = await new Builder().forBrowser(Browser.CHROME).build()
		todoPage = new TodoPage(driver)
		await todoPage.open()
		await todoPage.maximizeWindow()
		await driver.sleep(1000)
	})

	after(async function () {
		await driver.quit()
	})

	it('should have the correct title', async function () {
		const title = await todoPage.getTitle()
		expect(title).to.equal('Sample page - lambdatest.com')
	})

	it('should verify remaining items initially', async function () {
		const remainingText = await todoPage.getRemainingText()
		expect(remainingText).to.equal(`${remaining} of ${total} remaining`)
	})

	it('should complete items and verify status and remaining count', async function () {
		for (let i = 1; i <= total; i++) {
			let status = await todoPage.checkItemStatus(i)
			expect(status.class).to.equal('done-false')
			await todoPage.clickItemCheckbox(i)
			status = await todoPage.checkItemStatus(i)
			expect(status.class).to.equal('done-true')
			remaining--
			const remainingText = await todoPage.getRemainingText()
			expect(remainingText).to.equal(`${remaining} of ${total} remaining`)
		}
	})

	it('should add a new item and verify', async function () {
		await todoPage.addItem('New Item')
		const newItemStatus = await todoPage.checkItemStatus(6)
		expect(newItemStatus.class).to.equal('done-false')
		expect(newItemStatus.text).to.equal('New Item')
		total++
		remaining++
		let remainingText = await todoPage.getRemainingText()
		expect(remainingText).to.equal(`${remaining} of ${total} remaining`)

		await todoPage.clickItemCheckbox(6)
		const updatedStatus = await todoPage.checkItemStatus(6)
		expect(updatedStatus.class).to.equal('done-true')
		remaining--
		remainingText = await todoPage.getRemainingText()
		expect(remainingText).to.equal(`${remaining} of ${total} remaining`)
	})

	it('should handle errors and take screenshot', async function () {
		try {
			await todoPage.checkItemStatus(100)
		} catch (error) {
			await todoPage.takeScreenshot('screenshot_error.png')
			console.error(`Error: ${error}`)
		}
	})
})
