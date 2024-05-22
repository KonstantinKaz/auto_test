import { By } from 'selenium-webdriver';
import { BasePage } from './basePage.mjs';

export class HomePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.catalogButton = By.xpath('//div[@data-zone-name="catalog"]');
    this.gamingLink = By.xpath('//li[@data-zone-data=\'{"id":"119976441"}\']');
    this.gameConsoleLink = By.xpath('//a[@href="/catalog--igrovye-pristavki-xbox/41813471/list?hid=91122&glfilter=12782797%3A17888497%2C15163455%2C15163454%2C15163453%2C15163452%2C16092905"]');
  }

  async clickCatalogButton() {
    await this.click(this.catalogButton);
  }
  async hoverGamingLink() {
    await this.hover(this.gamingLink);
  }
  async clickGameConsoleLink() {
    await this.click(this.gameConsoleLink);
  }
}
