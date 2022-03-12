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
    tbody = document.querySelector("tbody");

    const query = document.querySelectorAll("span");

    query.forEach((element) => {
      str.push(element.innerText);
    });
    const numbers = str.map((item) => Number(item.replace(",", ".")));

    let eurusd = (numbers[1] / numbers[3]).toString().slice(0, 5);
    row.innerHTML = `<td>EUR/USD</td><td id="count">${eurusd}</td>`;
    tbody.append(row);
  }, 800);
};
const getUpdate = () => {
  const query = document.querySelectorAll("span");

  query.forEach((element) => {
    str.push(element.innerText);
  });
  const numbers = str.map((item) => Number(item.replace(",", ".")));

  let eurusd = (numbers[1] / numbers[3]).toString().slice(0, 5);
  row.innerHTML = `<td>EUR/USD</td><td id="count">${eurusd}</td>`;
  tbody.append(row);
  console.log("udpate");
};
getData();
setInterval(() => {
  getUpdate();
}, 3000);

// setTimeout(() => {
// let strings = [];

// const euro = document.querySelector('td[title="Euro"]');
//   const spans = document.querySelectorAll("span");
//   console.log(spans[0].innerText, spans[2].innerText, typeof spans);
//   spans.forEach((str) => strings.push(str.innerText));
//   const digits = strings.map((str) => Number(str.replace(",", ".")));
//   console.log(
//     "setTimeout ~ digits",
//     digits,
//     (digits[0] / digits[2]).toString().slice(0, 5),
//   );
// }, 700);

console.log(exchangeRate__list);
fetch("https://api.nbp.pl/api/exchangerates/tables/A")
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    exchangeRate__list.innerText += ` ${data[0].effectiveDate}`;
    // console.log(data[0].effectiveDate);
    // console.log(data[0].rates[7].code, data[0].rates[7].mid);
    data[0].rates.forEach((e) => {
      if (e.code === "EUR" || e.code === "USD") {
        console.log(`${e.code}: ${e.mid} PLN`);
        exchangeRate__list.innerHTML += `<li class='list__item'>${e.code}: ${e.mid} PLN</li>`;
      }
    });
  });
