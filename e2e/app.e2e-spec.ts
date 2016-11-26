import { Ng2D3BarChart } from './app.po';

describe('Ng2D3BarChart App', function() {
  let page: Ng2D3BarChart;

  beforeEach(() => {
    page = new Ng2D3BarChart();
    page.navigateTo();
  });

  it('should display title : Angular 2 - D3.js Bar Chart', () => {
    expect(page.getParagraphText()).toEqual('Angular 2 - D3.js Bar Chart');
  });

  it('should contain an svg element', () => {
    expect(page.containsSvg()).toBe(true);
  });

  it('should contain an x axis', () => {
    expect(page.containsXAxis()).toBe(true);
  });

  it('should contain a y axis', () => {
    expect(page.containsYAxis()).toBe(true);
  });

  it('should contain 26 bars', () => {
    expect(page.containsNBars()).toEqual(26);
  });
});
