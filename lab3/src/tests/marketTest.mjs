import { expect } from 'chai'
import { describe, it } from 'mocha'

import { Browser, Builder } from 'selenium-webdriver'
import { CatalogPage } from '../pages/catalogPage.mjs'
import { HomePage } from '../pages/homePage.mjs'
import { takeScreenshot } from '../utils/screenshot.mjs'

describe('Yandex Market Test', function () {
	this.timeout(60000)
	let driver
	let homePage
	let catalogPage
	let firstProduct

	before(async function () {
		driver = await new Builder().forBrowser(Browser.CHROME).build()
		await driver.manage().window().maximize()
		homePage = new HomePage(driver)
		catalogPage = new CatalogPage(driver)
	})

	after(async function () {
		await driver.quit()
	})

	it('should open Yandex Market homepage', async function () {
		const testName = this.test.fullTitle()
		try {
			await homePage.open('https://market.yandex.ru')
			await driver.sleep(1000) // Для прохождения капчи
			const title = await driver.getTitle()
			console.log('Opened Yandex Market homepage.')
			expect(title).to.include('Яндекс Маркет')
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})

	it('should navigate to Gaming section', async function () {
		const testName = this.test.fullTitle()

		try {
			await homePage.clickCatalogButton()
			console.log('Clicked on Catalog button.')
			await driver.sleep(3000)
			await homePage.waitForElement(homePage.gamingLink)
			console.log('gaming link is mounted.')
			await homePage.hoverGamingLink()
			console.log('Hovered over Gaming link.')
			await homePage.waitForElement(homePage.gameConsoleLink, 20000)
			await homePage.clickGameConsoleLink()
			console.log('Clicked on Game Console link.')
			const title = await driver.getTitle()
			console.log('Opened Gaming Consoles section.')
			expect(title).to.include('Яндекс Маркет')
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})

	it('should log first 5 products with their prices', async function () {
		const testName = this.test.fullTitle()

		try {
			const products = await catalogPage.getProductNamesAndPrices()
			console.log('First 5 products:')
			products.slice(0, 5).forEach((product, index) => {
				console.log(`${index + 1}. ${product.title} - ${product.price}`)
			})
			firstProduct = products[0] // Запомнить первый продукт
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})

	// it('should add to favorites and verify first product is present', async function () {
	//   const testName = this.test.fullTitle();

	//   try {
	//     await catalogPage.clickButtonToFavorites();
	//     console.log('Add to favorites.');
	//     await driver.sleep(3000);
	//     const isAddNotificationDisplayed = await catalogPage.isNotificationDisplayed();
	//     expect(isAddNotificationDisplayed).to.be.true;
	//     console.log('Notification displayed.');
	//     await driver.sleep(3000);
	//   } catch (error) {
	//     await takeScreenshot(driver, testName);
	//     throw error;
	//   }
	// });

	it('should add to favorites and verify first product is present', async function () {
		const testName = this.test.fullTitle()

		try {
			await catalogPage.clickButtonToFavorites()
			console.log('Add to favorites.')
			await driver.sleep(3000)
			const isAddNotificationDisplayed =
				await catalogPage.isNotificationDisplayed()
			expect(isAddNotificationDisplayed).to.be.true
			console.log('Notification displayed.')
			await driver.sleep(3000)
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})
  

	it('should navigate to favorites and verify page is true', async function () {
		const testName = this.test.fullTitle()

		try {
			await catalogPage.clickFavoritesHead()
			console.log('Opened my favorites.')
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})

	it('remove from fav', async function () {
		const testName = this.test.fullTitle()
		console.log('remove')

		try {
			await catalogPage.clickButtonRemoveFromFavorites()
			console.log('Remove from favorites.')

			await driver.sleep(3000)
			const isRemoveNotificationDisplayed =
				await catalogPage.isRemoveNotificationDisplayed()
			expect(isRemoveNotificationDisplayed).to.be.true
			console.log('Notification displayed.')
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})

	it('should refresh the page', async function () {
		const testName = this.test.fullTitle()

		try {
			await driver.navigate().refresh()
			console.log('Page refreshed.')
		} catch (error) {
			await takeScreenshot(driver, testName)
			throw error
		}
	})
})
