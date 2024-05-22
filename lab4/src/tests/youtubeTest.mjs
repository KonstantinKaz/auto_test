import { expect } from 'chai'
import mocha from 'mocha'
import { Browser, Builder } from 'selenium-webdriver'
import { MainPage } from '../pages/mainPage.mjs'
import { takeScreenshot } from '../utils/screenshot.mjs'
const { it, describe, after, before } = mocha

describe('YouTube Test', function () {
	this.timeout(60000)
	let driver
	let mainPage

	before(async function () {
		driver = await new Builder().forBrowser(Browser.CHROME).build()
		await driver.manage().window().maximize()
		mainPage = new MainPage(driver)
	})

	after(async function () {
		await driver.quit()
	})

	it('should open youtube homepage', async function () {
		const testName = this.test.fullTitle()
		try {
			await mainPage.open('https://www.youtube.com/')
			await driver.sleep(3000)
			const title = await driver.getTitle()
			console.log('Opened YouTube homepage.')
			expect(title).to.include('YouTube')
			console.log('Task #1. Done')
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})

	it('should search video', async function () {
		const testName = this.test.fullTitle()
		console.log('Start task #1')

		try {
			await mainPage.typeSearchInput('кеширование данных')
			console.log("Открылся input, вписали: 'кеширование данных'")
			await driver.sleep(3000)
			await mainPage.clickSearchButton()
			console.log("Открылась страница по запросу 'кеширование данных'")
			await driver.sleep(3000)

			const videoTitles = await mainPage.getVideoTitles()
			const found = videoTitles.some((title) =>
				title.toLowerCase().includes('кеширование данных')
			)
			expect(found).to.be.true
			console.log('Полное название первого видео', videoTitles[0])
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})
})
