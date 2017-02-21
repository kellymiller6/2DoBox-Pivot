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
  driver.findElement(By.id('idea-title')).sendKeys('hello');
  driver.findElement(By.id('idea-content')).sendKeys('work');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.className('titleEdit')).clear();
  driver.findElement(By.className('titleEdit')).sendKeys('Place');
  driver.findElement(By.id('line-2')).clear();
  driver.findElement(By.id('line-2')).sendKeys('test');

  driver.sleep(3000).then(function() {
    driver.findElement(By.className('titleEdit')).getText().then(function(title) {
      if(title === 'Place') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });

  driver.sleep(3000).then(function() {
    driver.findElement(By.id('line-2')).getText().then(function(text) {
     if(text === 'test') {
       console.log('Test passed');
     }else {
       console.log('Test failed');
     }

    })

  })
  driver.quit();
}
