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
  driver.findElement(By.id('title-input')).sendKeys('1');
  driver.findElement(By.id('body-input')).sendKeys('1');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('upvote-button')).click();
  driver.findElement(By.id('upvote-button')).click();

  driver.findElement(By.id('title-input')).sendKeys('2')
  driver.findElement(By.id('body-input')).sendKeys('2');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('upvote-button')).click();

  driver.findElement(By.id('title-input')).sendKeys('3')
  driver.findElement(By.id('body-input')).sendKeys('3');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('downvote-button')).click();

  driver.findElement(By.className('crit-btn')).click();
  driver.findElements(By.id('card-body')).then(function(bodies) {
    bodies.forEach(function(body){
      body.isDisplayed().then(function(bodyIsDisplayed) {
        if(bodyIsDisplayed == true) {
          body.getText().then(function(bodyText){
            assert.equal(bodyText, '1');
          })
        }
      })
    })
  })
  driver.findElement(By.className('low-btn')).click();
  driver.findElements(By.id('card-body')).then(function(bodies) {
      bodies.forEach(function(body){
        body.isDisplayed().then(function(bodyIsDisplayed) {
          if(bodyIsDisplayed == true) {
            body.getText().then(function(bodyText){
              assert.equal(bodyText, '3');
            })
          }
        })
      })
    })

  driver.quit();
}
