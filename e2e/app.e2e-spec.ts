import { D3jsPage } from './app.po';

describe('d3js App', function() {
  let page: D3jsPage;

  beforeEach(() => {
    page = new D3jsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
