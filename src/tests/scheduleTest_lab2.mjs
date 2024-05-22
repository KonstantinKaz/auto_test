// scheduleTest_lab2.mjs
import { expect } from 'chai'
import { after, before, describe, it } from 'mocha'
import { Browser, Builder } from 'selenium-webdriver'
import { GroupPage } from '../pages/groupPage_lab2.mjs'
import { HomePage } from '../pages/homePage_lab2.mjs'
import { SchedulePage } from '../pages/schedulePage_lab2.mjs'
import { takeScreenshot } from '../utils/screenshot.mjs'

describe('Mospolytech Timetable Test', function () {
	this.timeout(30000)
	let driver
	let homePage
	let schedulePage
	let groupPage

	before(async function () {
		driver = await new Builder().forBrowser(Browser.CHROME).build()
		await driver.manage().window().maximize()
		homePage = new HomePage(driver)
		schedulePage = new SchedulePage(driver)
		groupPage = new GroupPage(driver)
	})

	after(async function () {
		await driver.quit()
	})

	it('should open timetable page and search for a group', async function () {
		const testName = this.test.fullTitle()

		try {
			await homePage.open('https://mospolytech.ru/')
			await homePage.clickScheduleButton()
			await schedulePage.waitForElement(schedulePage.seeOnSiteLink)
			await schedulePage.clickSeeOnSiteLink()
			const tabs = await driver.getAllWindowHandles()
			await driver.switchTo().window(tabs[1])
			await groupPage.waitForElement(groupPage.searchField)
			await groupPage.searchGroup('221-322')
			await groupPage.waitForElement(groupPage.searchResultLink)
			const groupLinks = await groupPage.getAllElements(
				groupPage.searchResultLink
			)
			expect(groupLinks.length).to.equal(1)
			await groupPage.clickSearchResult()
			await groupPage.waitForElement(groupPage.scheduleTable)
			const isCurrentDayHighlighted = await groupPage.isCurrentDayHighlighted()
			expect(isCurrentDayHighlighted).to.be.true
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})
})
