"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
const exchangeRate__list = document.querySelector('.exchangeRate__list');
console.log(exchangeRate__list);
fetch('http://api.nbp.pl/api/exchangerates/tables/A')
.then(resp => {return resp.json()})
.then(data => {
exchangeRate__list.innerText += ` ${data[0].effectiveDate}`
  console.log(data[0].effectiveDate);
  console.log(data[0].rates[7].code, data[0].rates[7].mid);
  data[0].rates.forEach(e=>{
      if(e.code === 'EUR' || e.code === 'USD'){
        console.log(`${e.code}: ${e.mid} PLN`)
        exchangeRate__list.innerHTML +=`<li class='list__item'>${e.code}: ${e.mid} PLN</li>`

      }
  })

})





