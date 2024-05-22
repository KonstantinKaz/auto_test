import { By } from 'selenium-webdriver';
import { BasePage } from './basePage.mjs';

export class MainPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.logo = By.id('logo-icon');
    this.searchInput = By.xpath("//input[@id='search']");
    this.searchButton = By.xpath("//button[@id='search-icon-legacy']");
    this.videoTitles = By.xpath("//h3[@class='title-and-badge style-scope ytd-video-renderer']//a[@id='video-title']");
  }

  async typeSearchInput(text) {
    await this.type(this.searchInput, text);
  }

  async clickSearchButton() {
    await this.click(this.searchButton);
  }

  async getVideoTitles() {
    const elements = await this.getAllElements(this.videoTitles);
    const titles = [];
    for (let element of elements) {
      titles.push(await element.getText());
    }
    return titles;
  }
}
