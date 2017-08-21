import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for angularApp', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be angularApp', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('angularApp');
    })
  });

  it('navbar-brand should be my-network@0.1.6',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('my-network@0.1.6');
  });

  
    it('Commodity component should be loadable',() => {
      page.navigateTo('/Commodity');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Commodity');
    });

    it('Commodity table should have 6 columns',() => {
      page.navigateTo('/Commodity');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  

});
