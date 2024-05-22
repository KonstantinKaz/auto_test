import assert from 'assert'
import { promises as fs } from 'fs'
import { Builder, By } from 'selenium-webdriver'

async function lambdaTest() {
	let driver = await new Builder().forBrowser('chrome').build()
	let total = 5
	let remaining = 5
	let success = true

	try {
		await driver.get('https://lambdatest.github.io/sample-todo-app/')
		await driver.manage().window().maximize()
		await driver.sleep(1000)

		const title = await driver.getTitle()
		assert.strictEqual(title, 'Sample page - lambdatest.com')

		await checkRemainingItems(driver, remaining, total)

		for (let i = 1; i <= total; i++) {
			await checkItemStatus(driver, i, false)
			await clickItemCheckbox(driver, i)
			await checkItemStatus(driver, i, true)
			remaining--
			await checkRemainingItems(driver, remaining, total)
		}

		await addItem(driver, 'New Item')

		await checkItemStatus(driver, 6, false, 'New Item')
		total++
		remaining++
		await checkRemainingItems(driver, remaining, total)

		await clickItemCheckbox(driver, 6)
		await checkItemStatus(driver, 6, true)
		remaining--
		await checkRemainingItems(driver, remaining, total)
	} catch (error) {
		success = false
		const image = await driver.takeScreenshot()
		await fs.writeFile('screenshot_error.png', image, 'base64')
		console.error(`Error: ${error}`)
	} finally {
		await driver.quit()
		if (success) {
			console.log('All steps executed successfully')
		}
	}
}

async function checkRemainingItems(driver, remaining, total) {
	const remainingElem = await driver.findElement(By.className('ng-binding'))
	const text = await remainingElem.getText()
	const expectedText = `${remaining} of ${total} remaining`
	assert.strictEqual(text, expectedText)
}

async function checkItemStatus(driver, index, isDone, expectedText = null) {
	const item = await driver.findElement(
		By.xpath(`//input[@name='li${index}']/following-sibling::span`)
	)
	const itemClass = await item.getAttribute('class')
	assert.strictEqual(itemClass, isDone ? 'done-true' : 'done-false')
	if (expectedText) {
		const itemText = await item.getText()
		assert.strictEqual(itemText, expectedText)
	}
}

async function clickItemCheckbox(driver, index) {
	await driver.findElement(By.name(`li${index}`)).click()
	await driver.sleep(1000)
}

async function addItem(driver, text) {
	const input = await driver.findElement(By.id('sampletodotext'))
	await input.sendKeys(text)
	await driver.sleep(1000)
	const button = await driver.findElement(By.id('addbutton'))
	await button.click()
	await driver.sleep(1000)
}

lambdaTest()
