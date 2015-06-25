'use strict';

describe('Signup', function() {

  it('should show the register page', function() {
    browser.get("/");

    var signupButton = element(by.css('.loginForm a'));

    signupButton.click();

    var currentUrl = browser.getCurrentUrl();

    expect(currentUrl).toEqual('http://localhost:9000/#/signup');
  });

  it('should signup a new user and redirect to its home page', function() {
    var submit = element(by.css('.loginForm button'));

    browser.get("/#/signup");

    var navBar = element(by.css('.navbar'));

    expect(navBar.isPresent()).toBeFalsy();

    element(by.model('user.email')).sendKeys('e2e_signup@domain.com');
    element(by.model('user.username')).sendKeys('e2e_signup');
    element(by.model('user.password')).sendKeys('12345');

    submit.click();

    var currentUrl = browser.getCurrentUrl();

    expect(currentUrl).toEqual('http://localhost:9000/#/');

    expect(navBar.isPresent()).toBeTruthy();
    expect(navBar.isDisplayed()).toBeTruthy();

    var navBrand = navBar.element(by.css('.navbar-brand'));

    expect(navBrand.getText()).toEqual('MEANP App');

    var menuItems = element.all(by.repeater('module in menu.base'));

    expect(menuItems.count()).toEqual(1);

    var homeMenuItem = menuItems.first();

    expect(homeMenuItem.element(by.css('a')).getText()).toEqual('Home');
    expect(homeMenuItem.element(by.css('a')).getAttribute('href')).toEqual('http://localhost:9000/#/');

    var username = element.all(by.binding('getCurrentUser().username'));

    expect(username.getText()).toEqual([ 'Welcome, e2e_signup', 'Hello e2e_signup' ]);
  });

});
