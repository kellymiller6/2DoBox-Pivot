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
  driver.findElement(By.id('title-input')).sendKeys('kool kids')
  driver.findElement(By.id('body-input')).sendKeys('big house');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('warm sweater')
  driver.findElement(By.id('body-input')).sendKeys('wintertime');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('summertime')
  driver.findElement(By.id('body-input')).sendKeys('shorts');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('title-input')).sendKeys('rain')
  driver.findElement(By.id('body-input')).sendKeys('springtime');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('search')).sendKeys('warm sweater');


  driver.findElements(By.id('card-body')).then(function(bodies) {
    bodies.forEach(function(body){
      body.isDisplayed().then(function(bodyIsDisplayed) {
        if(bodyIsDisplayed == true) {
          body.getText().then(function(bodyText){
            assert.equal(bodyText, 'wintertime');
          })
        }
      })
    })
  });


  driver.quit();
}
