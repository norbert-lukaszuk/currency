"use strict";

// service worker registration - remove if you're not going to use it

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("serviceworker.js").then(
      function (registration) {
        // Registration was successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope,
        );
      },
      function (err) {
        // registration failed :(
        console.log("ServiceWorker registration failed: ", err);
      },
    );
  });
}
const exchangeRate__list = document.querySelector(".exchangeRate__list");
const button = document.getElementById("add_button");
let row;
let tbody;
let str = [];

const getData = () => {
  row = document.createElement("tr");

  setTimeout(() => {
    // get table body with currencies
    tbody = document.querySelector("tbody");
    // get spans where currency rates are
    const query = document.querySelectorAll("span");
    // put the currencies into string array
    query.forEach((element) => {
      str.push(element.innerText);
    });
    // convert strings arr to numbers arr
    const numbers = str.map((item) => Number(item.replace(",", ".")));

    let eurusd1 = (numbers[0] / numbers[2]).toString().slice(0, 5);
    let eurusd2 = (numbers[1] / numbers[3]).toString().slice(0, 5);
    row.innerHTML = `<td>EUR/USD</td><td id="count">${eurusd1}</td><td id="count">${eurusd2}</td>`;
    tbody.append(row);
  }, 1000);
};
const getUpdate = () => {
  const query = document.querySelectorAll("span");

  query.forEach((element) => {
    str.push(element.innerText);
  });
  const numbers = str.map((item) => Number(item.replace(",", ".")));

  let eurusd1 = (numbers[0] / numbers[2]).toString().slice(0, 5);
  let eurusd2 = (numbers[1] / numbers[3]).toString().slice(0, 5);
  row.innerHTML = `<td>EUR/USD</td><td id="count">${eurusd1}</td><td id="count">${eurusd2}</td>`;
  tbody.append(row);
  console.log("udpate");
};
getData();
setInterval(() => {
  getUpdate();
}, 15000);

console.log(exchangeRate__list);
fetch("https://api.nbp.pl/api/exchangerates/tables/A")
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    exchangeRate__list.innerText += ` ${data[0].effectiveDate}`;

    data[0].rates.forEach((e) => {
      if (e.code === "EUR" || e.code === "USD") {
        console.log(`${e.code}: ${e.mid} PLN`);
        exchangeRate__list.innerHTML += `<li class='list__item'>${e.code}: ${e.mid} PLN</li>`;
      }
    });
  });
