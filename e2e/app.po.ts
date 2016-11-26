import { browser, element, by } from 'protractor';

export class Ng2D3BarChart {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  containsSvg() {
    return element(by.tagName('svg')).isDisplayed();
  }

  containsXAxis() {
    return element(by.css('svg > g > g.x.axis')).isDisplayed();
  }

  containsYAxis() {
    return element(by.css('svg > g > g.y.axis')).isDisplayed();
  }

  containsNBars() {
    return element.all(by.css('svg > g > rect.bar')).count();
  }
}
