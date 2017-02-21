var assert = require('assert');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// var driver_saf = new webdriver.Builder()
//     .forBrowser('safari')
//     .build();

searchTest(driver_fx);
searchTest(driver_chr);
// searchTest(driver_saf);

function searchTest(driver) {
  driver.get('https://kellymiller6.github.io/2DoBox-Pivot/idea-box.html');
  driver.findElement(By.id('title-input')).sendKeys('hello');
  driver.findElement(By.id('body-input')).sendKeys('work');
  driver.findElement(By.id('save-button')).click();

driver.sleep(3000).then(function() {
  driver.findElements(By.className('item-card')).then(function(ideaCardList) {
    assert.equal(ideaCardList.length, 1);
  });
})
  driver.findElement(By.id('delete-button')).click();

driver.sleep(3000).then(function() {
  driver.findElements(By.className('item-card')).then(function(ideaCardList) {
    assert.equal(ideaCardList.length, 0);
  });
})
  driver.quit();
}
