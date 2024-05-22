import { By } from "selenium-webdriver";
import { BasePage } from "./basePage.mjs";

export class CatalogPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.productTitles = By.xpath('//h3[@data-auto="snippet-title"]');
    this.productPrices = By.xpath(
      '//span[@data-auto="snippet-price-current"]/span[1]'
    );

    this.addToFavoritesButton = By.xpath('//button[@title="Добавить в избранное"]');

    this.removeFromFavoritesButton = By.xpath('//button[@title="Удалить из избранного"]');


    this.favoritesLink = By.xpath('//a[@href="/my/wishlist?track=head"]');
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

}
