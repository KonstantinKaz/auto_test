import { By } from 'selenium-webdriver';
import { BasePage } from './basePage.mjs';

export class CatalogPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.productTitles = By.xpath('//h3[@data-auto="snippet-title"]');
    this.productPrices = By.xpath('//span[@data-auto="snippet-price-current"]/span[1]');

    this.addToFavoritesButton = By.xpath('//button[@title="Добавить в избранное"]');

    this.removeFromFavoritesButton = By.xpath('//button[@title="Удалить из избранного"]');

    this.notification = By.xpath('//button[@title="Удалить из избранного"]');

    this.favoritesLink = By.xpath('//a[@href="/my/wishlist?track=head"]');

    this.removeNotificationMessage = By.xpath(
      "//div[@data-auto='notification']/div[text()='Товар удалён из избранного']",
    );

    this.addNotificationMessage = By.xpath("//div[@data-auto='notification']");
  }

  async isNotificationDisplayed() {
    const notificationElement = await this.driver.findElement(this.addNotificationMessage);
    return await notificationElement.isDisplayed();
  }

  async isRemoveNotificationDisplayed() {
    const notificationElement = await this.driver.findElement(this.removeNotificationMessage);
    return await notificationElement.isDisplayed();
  }

  async clickButtonToFavorites() {
    await this.click(this.addToFavoritesButton);
  }
  async clickButtonRemoveFromFavorites() {
    await this.click(this.removeFromFavoritesButton);
  }
  async clickFavoritesHead() {
    await this.click(this.favoritesLink);
  }

  async getProductNamesAndPrices(limit = 5) {
    const titles = await this.getAllElements(this.productTitles);
    const prices = await this.getAllElements(this.productPrices);
    const products = [];

    for (let i = 0; i < Math.min(limit, titles.length, prices.length); i++) {
      const titleText = await titles[i].getText();
      const priceText = await prices[i].getText();
      products.push({ title: titleText, price: priceText });
    }

    return products;
  }

  async getProductTitlePage() {
    return await this.getText(this.prductTitleOnPage);
  }

  async isProductInFavorites(product) {
    try {
      // Ожидаем загрузку страницы избранных
      await this.waitForElement(this.favoritesLink);

      // Находим все элементы, содержащие названия и цены товаров на странице избранных
      const productElements = await this.driver.findElements(this.productTitles);
      const products = [];

      // Получаем названия и цены товаров с помощью цикла
      for (let i = 0; i < productElements.length; i++) {
        const title = await productElements[i].getText();
        products.push(title);
      }

      // Проверяем, есть ли добавленный товар в списке избранных
      return products.includes(product.title);
    } catch (error) {
      console.error('Error occurred while checking if product is in favorites:', error);
      return false;
    }
  }

  async isElementWithTitlePresent(locator, title) {
    const elements = await this.getAllElements(locator);
    for (const element of elements) {
      const elementText = await element.getText();
      if (elementText === title) {
        return true;
      }
    }
    return false;
  }
}
