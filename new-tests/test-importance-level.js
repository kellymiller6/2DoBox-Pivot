var webdriver = require('selenium-webdriver'),
   By = webdriver.By,
   until = webdriver.until;

// var driver_fx = new webdriver.Builder()
//     .forBrowser('firefox')
//     .build();

var driver_chr = new webdriver.Builder()
   .forBrowser('chrome')
   .build();

// searchTest(driver_fx);
searchTest(driver_chr);

function searchTest(driver) {
 driver.get('https://kellymiller6.github.io/2DoBox-Pivot/idea-box.html');
 driver.findElement(By.id('title-input')).sendKeys('get to');
 driver.findElement(By.id('body-input')).sendKeys('work');
 driver.findElement(By.id('save-button')).click();
 driver.findElement(By.id('upvote-button')).click();

 driver.sleep(3000).then(function() {
   driver.findElement(By.id('qual')).getText().then(function(quality) {
     if(quality === 'high') {
       console.log('Test passed');
     } else {
       console.log('Test failed');
     }
   });
 })

 driver.navigate().refresh();
 driver.sleep(3000).then(function() {
   driver.findElement(By.id('qual')).getText().then(function(quality) {
     if(quality === 'high') {
       console.log('Test passed');
     } else {
       console.log('Test failed');
     }
   });
 })

 driver.findElement(By.id('upvote-button')).click();

 driver.sleep(3000).then(function() {
   driver.findElement(By.id('qual')).getText().then(function(quality) {
     if(quality === 'critical') {
       console.log('Test passed');
     } else {
       console.log('Test failed');
     }
   });
 });

 driver.findElement(By.id('downvote-button')).click();

 driver.sleep(3000).then(function() {
   driver.findElement(By.id('qual')).getText().then(function(quality) {
     if(quality === 'high') {
       console.log('Test passed');
     } else {
       console.log('Test failed');
     }
   });
 });

 driver.findElement(By.id('downvote-button')).click();

 driver.sleep(3000).then(function() {
   driver.findElement(By.id('qual')).getText().then(function(quality) {
     if(quality === 'normal') {
       console.log('Test passed');
     } else {
       console.log('Test failed');
     }
   });
 });

 driver.findElement(By.id('downvote-button')).click();

 driver.sleep(3000).then(function() {
   driver.findElement(By.id('qual')).getText().then(function(quality) {
     if(quality === 'low') {
       console.log('Test passed');
     } else {
       console.log('Test failed');
     }
   });
 });

 driver.findElement(By.id('downvote-button')).click();

 driver.sleep(3000).then(function() {
   driver.findElement(By.id('qual')).getText().then(function(quality) {
     if(quality === 'none') {
       console.log('Test passed');
     } else {
       console.log('Test failed');
     }
   });
 });

 driver.quit();
}
