// let arrOfCrypto = [];
// let names = ["Bitcoin", "Ethereum", "Tether", "Binance Coin", "Cardano", "HEX", "Solana", "XRP"];
// let numPlayers = g.playerList.length;
// let turn = 0;

// let p = g.playerList[g.player];

// for (let i = 0; i < 8; i++) {
//     let info = [];
//     let currentName = names[i];
//     info.push(currentName);
//     info.push(randomStartingPrice());
//     info.push(0); // percent change
//     info.push(p.priceList[i]);
//     info.push(p.cryptoList[i]);
//     arrOfCrypto.push(info);
// }

// function randomStartingPrice() {
//     return Math.floor(Math.random() * 91) + 10;
// }

// function randomPercentage() {
//     let x = Math.random();
//     let y = Math.random();
//     if (x <= 0.5) {
//         y = y * -1;
//     }
//     return y;
// }

// console.log(arrOfCrypto);

// let tableCrypto = document.querySelector(".tbodyCrypto");
// for (let i = 0; i < 8; i++) {
//     let row = document.createElement("tr");
//     for (let j = 0; j < 5; j++) {
//         let cell = document.createElement("td");
//         let cellText = document.createTextNode(arrOfCrypto[i][j]);
//         cell.appendChild(cellText);
//         row.appendChild(cell);
//     }
//     row.classList.add("dummy");
//     tableCrypto.appendChild(row);
// }

// let rollBtn1 = document.querySelector(".rollBtn");
// rollBtn1.addEventListener("click", () => {
//     if (turn != 0 && turn % numPlayers == 0) {
//         // update the percentage
//         let newArr = [];
//         for (let i = 0; i < 8; i++) {
//             let currentChange = randomPercentage();
//             newArr.push(currentChange);
//         }

//         for (let i = 0; i < 8; i++) {
//             arrOfCrypto[i][1] = Math.round(arrOfCrypto[i][1] * (1 + newArr[i]) * 100) / 100;
//             arrOfCrypto[i][2] = Math.round(newArr[i] * 100) / 100;
//             if (p.newCryptoIndex == i && p.buyCrypto == true) {
//                 arrOfCrypto[i][3] = (arrOfCrypto[i][3] * arrOfCrypto[i][4] + g.previousPrice[i] * p.newCryptoNum) / p.cryptoList[i];
//                 p.priceList[i] = arrOfCrypto[i][3];
//             } else
//                 arrOfCrypto[i][3] = p.priceList[i];
//             arrOfCrypto[i][3] = Math.round(arrOfCrypto[i][3] * 100) / 100;
//             arrOfCrypto[i][4] = p.cryptoList[i];
//         }


//         console.log(arrOfCrypto);
//     }

//     for (let i = 0; i < 8; i++) {
//         document.querySelector(".dummy").remove();
//     }

//     for (let i = 0; i < 8; i++) {
//         let row = document.createElement("tr");
//         for (let j = 0; j < 5; j++) {
//             let cell = document.createElement("td");
//             let cellText = document.createTextNode(arrOfCrypto[i][j]);
//             cell.appendChild(cellText);
//             row.appendChild(cell);
//         }
//         row.classList.add("dummy");
//         tableCrypto.appendChild(row);
//     }
//     for (let i = 0; i < 8; i++) {
//         g.previousPrice[i] = arrOfCrypto[i][1];
//     }
//     turn++;
// })








// // let parse = document.createElement('script');

// // parse.onload = function(){
// //     let rollBtn1 = document.querySelector(".rollBtn");
// //     rollBtn1.addEventListener("click", () =>{
// //         Papa.parse("https://storage.googleapis.com/crypto_stuff/files/priceChanges.csv",{
// //             download: true,
// //             header: false,
// //             complete: function(result){
// //                 console.log(result);
// //             }
// //         })
// //     })
// // };
// // parse.src = "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js";

// // document.head.appendChild(parse);







// // let rollBtn1 = document.querySelector(".rollBtn");
// // rollBtn1.addEventListener("click", () =>{
// //     let parse = document.createElement('script');

// //     parse.onload = function(){
// //         Papa.parse("https://storage.googleapis.com/crypto_stuff/files/priceChanges.csv",{
// //             download: true,
// //             header: false,
// //             complete: function(result){
// //                 console.log(result);
// //             }
// //         })
// //     };
// //     parse.src = "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js";
// //     document.head.appendChild(parse);
<<<<<<< HEAD
// // });
=======
// // });
>>>>>>> 22d3fbc5c43913dddec9a70c17b0096727b9a40a
