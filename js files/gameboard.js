class gameboard {
  constructor(size, playerList) {
    this.size = size;
    this.board = [];
    this.playerList = playerList;
    this.isMoving = false;
    this.createGameboard();
    this.promptEvent = false;
    this.previousPrice = [];
    this.arrOfCrypto = [[0, 0, 0, "0/0"], [0, 0, 0, "0/0"], [0, 0, 0, "0/0"], [0, 0, 0, "0/0"], [0, 0, 0, "0/0"], [0, 0, 0, "0/0"], [0, 0, 0, "0/0"], [0, 0, 0, "0/0"]];
    this.setPreviousPrice();
    this.drewEvent = false;
    this.player = 0;
    this.turn = 0;
    this.percentChange = [0, 0, 0, 0, 0, 0, 0, 0];
  }

  startGame() {
    document.querySelector(`#gameMenu`).style.display = "none";
  }

  switchPlayer() {
    document.querySelector(`#player${this.player}profile`).click();
    if (this.player == 0) {
      this.player = 1
    } else if (this.player == 1) {
      this.player = 0
    }
  }

  createPlayer() {

    let player0 = "One"
    let player1 = "Two"
    if (document.querySelector('#player0name').value != "")
      player0 = document.querySelector('#player0name').value
    if (document.querySelector('#player1name').value != "")
      player1 = document.querySelector('#player1name').value

    playerList.push(new player(player0, 0));
    playerList.push(new player(player1, 1));

    document.querySelector('#playerInfo').style.display = "none";
  }

  createGameboard() {
    for (let i = 0; i < this.size; i++) {
      let color = this.setGameboardColor(i);
      let type = this.setGameboardType(i);
      if (type != "realestate") {
        color = '';
        document.querySelector('#grid' + i.toString()).textContent = type
      } else {
        document.querySelector('#grid' + i.toString()).textContent = i
      }
      let p = new property(i, color, false, null, 0, 100, i * 10, type);
      this.board.push(p);
    }
  }

  printGameboard() {
    // printing the UI
    for (let i = 0; i < this.playerList.length; i++) {
      this.playerList[i].update()
    }
  }

  setPreviousPrice() {
    for (let i = 0; i < 8; i++)
      if (this.previousPrice[i] == null)
        this.previousPrice.push(0);
  }

  setGameboardColor(location) {
    let interval = this.size / 8; // all elements are assigned to a color? No event location?

    if (location < interval)
      return "brown";
    else if (location < interval * 2)
      return "skyblue";
    else if (location < interval * 3)
      return "pink";
    else if (location < interval * 4)
      return "orange";
    else if (location < interval * 5)
      return "red";
    else if (location < interval * 6)
      return "yellow";
    else if (location < interval * 7)
      return "green";
    else
      return "blue";
  }

  setGameboardType(location) {
    if (location % 5 == 0 && location % 10 != 0)
      return "nft";
    else if (location == 7 || location == 22 || location == 36)
      return "chance";
    else if (location == 2 || location == 17 || location == 33)
      return "community";
    else if (location == 4 || location == 12 || location == 28 || location == 38)
      return "tax";
    else if (location == 0)
      return "go";
    else if (location == 10)
      return "jail";
    else if (location == 20)
      return "parking";
    else if (location == 30)
      return "gotojail";
    else
      return "realestate";
  }

  prompt(answer) {
    if (answer == 1) {
      g.promptEvent();
    }
    document.querySelector('#event').style.display = 'none';
  }

  drew(type, title, subtitle, description) {
    if (type) {
      let card = document.querySelector(`#${type}-card`);

      card.style.setProperty('left', 'calc(100% - (100% - 60px*9)/2 - 8px - 360px)');
      card.style.setProperty('top', 'calc(20px + 60px*9 - 340px)');
      card.style.setProperty('transform', 'rotate(90deg)');
      card.style.setProperty('height', '300px');
      card.style.setProperty('width', '200px');
      card.style.setProperty('z-index', '1');

      document.querySelector('#eventcard .card-header').textContent = title;
      document.querySelector('#eventcard .card-title').textContent = subtitle;
      document.querySelector('#eventcard .card-text').textContent = description;

      setTimeout(
        function () {
          document.querySelector('#eventcard').style.display = "";
        }, 700
      )
    } else {
      document.querySelector('#eventcard').style.display = "none";

      let allType = ['chance', 'community'];
      for (let i = 0; i < allType.length; i++) {
        let card = document.querySelector(`#${allType[i]}-card`);
        if (allType[i] == "chance") {
          card.style.setProperty('left', 'calc((100% - 60px*9 - 80px)/2 - 48px + 180px)');
          card.style.setProperty('top', '180px');
        } else {
          card.style.setProperty('left', 'calc(100% - (100% - 60px*9)/2 - 8px - 200px)');
          card.style.setProperty('top', 'calc(20px + 60px*9 - 140px )');
        }
        card.style.setProperty('transform', 'rotate(45deg)');
        card.style.setProperty('height', '130px');
        card.style.setProperty('width', '100px');
        card.style.setProperty('z-index', '0');
      }
      setTimeout(
        function () {
          g.drewEvent();
        }, 700
      )
    }


  }

  handleRealData(result) {

    for (let i = 0; i < this.percentChange.length; i++) {
      let percent = parseFloat(result.data[i + 1][2]);
      if (percent == 0) {
        percent = Math.floor(Math.random() * (10 - 1) + 1) / 100; //1 to 10%
      } else {
        while (Math.abs(percent) < 0.1) {
          percent = percent * 10;
        }
      }
      this.percentChange[i] = percent.toFixed(2) //Bit Coin "-0.00015754859627089649

    }
  }

  toggleMarket(toggle) {

    if (toggle == 0) {
      document.querySelector('#cryptomarket').style.display = "none";
    } else {
      document.querySelector('#cryptomarket').style.display = "";
    }


  }

  initializeCryto() {

    this.cryptoInfo();
  }

  buyCoin(coinIndex) {

    let p = this.playerList[(this.player + 1) % 2]
    let otherP = this.playerList[this.player];
    // if (this.player == 1) {
    //   otherP = this.playerList[this.player]
    //   p = this.playerList[(this.player + 1) % 2];
    // }

    if (p.getMoney() - this.arrOfCrypto[p.newCryptoIndex][0] < 0) {
      alert("You are out of money!");
      return;
    }

    if (this.player == 1) {
      p.buyCrypto = true;
      // this.newCryptoIndex = this.names.indexOf(coin);
      //buy 3 bitcoin
      p.newCryptoIndex = coinIndex;
      p.newCryptoNum = 1;
      p.priceList[p.newCryptoIndex] = (p.cryptoList[p.newCryptoIndex] * p.priceList[p.newCryptoIndex]
        + p.newCryptoNum * this.arrOfCrypto[p.newCryptoIndex][0]) / (p.cryptoList[p.newCryptoIndex] + p.newCryptoNum);
      p.cryptoList[p.newCryptoIndex] += p.newCryptoNum;

      // let otherP = this.playerList[(this.player + 1) % 2];

      for (let i = 0; i < 8; i++) {
        this.arrOfCrypto[i][2] = Math.round(p.priceList[i] * 100) / 100;
        // this.arrOfCrypto[i][3] = p.cryptoList[i];
        this.arrOfCrypto[i][3] = p.cryptoList[i] + "/" + otherP.cryptoList[i];
      }
    } else {
      p.buyCrypto = true;
      // this.newCryptoIndex = this.names.indexOf(coin);
      //buy 3 bitcoin
      p.newCryptoIndex = coinIndex;
      p.newCryptoNum = 1;
      p.priceList[p.newCryptoIndex] = (p.cryptoList[p.newCryptoIndex] * p.priceList[p.newCryptoIndex]
        + p.newCryptoNum * this.arrOfCrypto[p.newCryptoIndex][0]) / (p.cryptoList[p.newCryptoIndex] + p.newCryptoNum);
      p.cryptoList[p.newCryptoIndex] += p.newCryptoNum;

      // let otherP = this.playerList[(this.player + 1) % 2];

      for (let i = 0; i < 8; i++) {
        this.arrOfCrypto[i][2] = Math.round(p.priceList[i] * 100) / 100;
        // this.arrOfCrypto[i][3] = p.cryptoList[i];
        this.arrOfCrypto[i][3] = otherP.cryptoList[i] + "/" + p.cryptoList[i];
      }
    }
    p.subMoney(this.arrOfCrypto[p.newCryptoIndex][0]);
    this.printGameboard();

    console.log(p.priceList);
    console.log(p.cryptoList);
    this.printCrypto(this.arrOfCrypto);



  }

  printCrypto(arrayList) {
    let test = [
      [100, 0, 0, "1/2"],
      [200, 0, 0, "3/2"]
    ]
    //
    // arrayList = test;

    for (let i = 0; i < arrayList.length; i++) {
      for (let j = 0; j < arrayList[i].length; j++) {
            if(j==1) {
              document.querySelectorAll(".tbodyCrypto tr")[i].querySelectorAll("td")[j + 1].textContent = arrayList[i][j].toFixed(2);
            } else {
              document.querySelectorAll(".tbodyCrypto tr")[i].querySelectorAll("td")[j + 1].textContent = arrayList[i][j];
            }
        }
    }
  }

  cryptoInfo() {
    // let arrOfCrypto = [];
    let names = ["Bitcoin", "Ethereum", "Tether", "Binance Coin", "Cardano", "HEX", "Solana", "XRP"];
    let numPlayers = this.playerList.length;

    let p = this.playerList[this.player]
    let otherP = this.playerList[(this.player + 1) % 2];
    if (this.player == 1) {
      otherP = this.playerList[this.player]
      p = this.playerList[(this.player + 1) % 2];
    }

    if (this.player == 1) {
      for (let i = 0; i < 8; i++) {
        let info = [];
        let currentName = names[i];
        // info.push(currentName);
        info.push(randomStartingPrice());
        info.push(this.percentChange[i]); // percent change
        info.push(p.priceList[i]);
        info.push(p.cryptoList[i] + "/" + otherP.cryptoList[i]);
        this.arrOfCrypto.shift();
        this.arrOfCrypto.push(info);
      }

      function randomStartingPrice() {
        return Math.floor(Math.random() * 91) + 10;
      }

      function randomPercentage() {
        let x = Math.random();
        let y = Math.random();
        if (x <= 0.5) {
          y = y * -1;
        }
        return y;
      }

      console.log(this.arrOfCrypto);

      // let tableCrypto = document.querySelector(".tbodyCrypto");
      // for (let i = 0; i < 8; i++) {
      //   let row = document.createElement("tr");
      //   for (let j = 0; j < 5; j++) {
      //     let cell = document.createElement("td");
      //     let cellText = document.createTextNode(arrOfCrypto[i][j]);
      //     cell.appendChild(cellText);
      //     row.appendChild(cell);
      //   }
      //   row.classList.add("dummy");
      //   tableCrypto.appendChild(row);
      // }

      let rollBtn1 = document.querySelector(".rollBtn");
      rollBtn1.addEventListener("click", () => {
        if (this.turn != 0 && this.turn % numPlayers == 0) {
          // update the percentage
          let newArr = [];
          for (let i = 0; i < 8; i++) {
            let currentChange = this.percentChange[i];
            newArr.push(currentChange);
          }

          for (let i = 0; i < 8; i++) {
            this.arrOfCrypto[i][0] = Math.round(this.arrOfCrypto[i][1] * (1 + newArr[i]) * 100) / 100;
            this.arrOfCrypto[i][1] = Math.round(newArr[i] * 100) / 100;
            if (p.newCryptoIndex == i && p.buyCrypto == true) {
              this.arrOfCrypto[i][2] = (this.arrOfCrypto[i][2] * this.arrOfCrypto[i][3] + this.previousPrice[i] * p.newCryptoNum) / p.cryptoList[i];
              p.priceList[i] = this.arrOfCrypto[i][2];
            } else {
              this.arrOfCrypto[i][2] = p.priceList[i];
            }
            this.arrOfCrypto[i][2] = Math.round(this.arrOfCrypto[i][2] * 100) / 100;
            this.arrOfCrypto[i][3] = p.cryptoList[i] + "/" + otherP.cryptoList[i];
          }


          console.log(this.arrOfCrypto);
        }

        // for (let i = 0; i < 8; i++) {
        //   document.querySelector(".dummy").remove();
        // }

        // for (let i = 0; i < 8; i++) {
        //   let row = document.createElement("tr");
        //   for (let j = 0; j < 5; j++) {
        //     let cell = document.createElement("td");
        //     let cellText = document.createTextNode(this.arrOfCrypto[i][j]);
        //     cell.appendChild(cellText);
        //     row.appendChild(cell);
        //   }
        //   row.classList.add("dummy");
        //   tableCrypto.appendChild(row);
        // }
        for (let i = 0; i < 8; i++) {
          for (let j = 1; j < 5; j++) {
            document.querySelectorAll('#cryptomarket tbody tr')[i].querySelectorAll("td")[j]
          }
        }
        for (let i = 0; i < 8; i++) {
          this.previousPrice[i] = this.arrOfCrypto[i][1];
        }
        this.turn++;
        this.printCrypto(this.arrOfCrypto);
      })
    } else {
      for (let i = 0; i < 8; i++) {
        let info = [];
        let currentName = names[i];
        // info.push(currentName);
        info.push(randomStartingPrice());
        info.push(this.percentChange[i]); // percent change
        info.push(otherP.priceList[i]);
        info.push(otherP.cryptoList[i] + "/" + p.cryptoList[i]);
        this.arrOfCrypto.shift();
        this.arrOfCrypto.push(info);
      }

      function randomStartingPrice() {
        return Math.floor(Math.random() * 91) + 10;
      }

      function randomPercentage() {
        let x = Math.random();
        let y = Math.random();
        if (x <= 0.5) {
          y = y * -1;
        }
        return y;
      }

      console.log(this.arrOfCrypto);

      // let tableCrypto = document.querySelector(".tbodyCrypto");
      // for (let i = 0; i < 8; i++) {
      //   let row = document.createElement("tr");
      //   for (let j = 0; j < 5; j++) {
      //     let cell = document.createElement("td");
      //     let cellText = document.createTextNode(arrOfCrypto[i][j]);
      //     cell.appendChild(cellText);
      //     row.appendChild(cell);
      //   }
      //   row.classList.add("dummy");
      //   tableCrypto.appendChild(row);
      // }

      let rollBtn1 = document.querySelector(".rollBtn");
      rollBtn1.addEventListener("click", () => {
        if (this.turn != 0 && this.turn % numPlayers == 0) {
          // update the percentage
          let newArr = [];
          for (let i = 0; i < 8; i++) {
            let currentChange = this.percentChange[i];
            newArr.push(currentChange);
          }

          for (let i = 0; i < 8; i++) {
            this.arrOfCrypto[i][0] = Math.round(this.arrOfCrypto[i][1] * (1 + newArr[i]) * 100) / 100;
            this.arrOfCrypto[i][1] = Math.round(newArr[i] * 100) / 100;
            if (p.newCryptoIndex == i && p.buyCrypto == true) {
              this.arrOfCrypto[i][2] = (this.arrOfCrypto[i][2] * this.arrOfCrypto[i][3] + this.previousPrice[i] * p.newCryptoNum) / p.cryptoList[i];
              p.priceList[i] = this.arrOfCrypto[i][2];
            } else {
              this.arrOfCrypto[i][2] = p.priceList[i];
            }
            this.arrOfCrypto[i][2] = Math.round(this.arrOfCrypto[i][2] * 100) / 100;
            this.arrOfCrypto[i][3] = otherP.cryptoList[i] + "/" + p.cryptoList[i];
          }


          console.log(this.arrOfCrypto);
        }

        // for (let i = 0; i < 8; i++) {
        //   document.querySelector(".dummy").remove();
        // }

        // for (let i = 0; i < 8; i++) {
        //   let row = document.createElement("tr");
        //   for (let j = 0; j < 5; j++) {
        //     let cell = document.createElement("td");
        //     let cellText = document.createTextNode(this.arrOfCrypto[i][j]);
        //     cell.appendChild(cellText);
        //     row.appendChild(cell);
        //   }
        //   row.classList.add("dummy");
        //   tableCrypto.appendChild(row);
        // }
        for (let i = 0; i < 8; i++) {
          for (let j = 1; j < 5; j++) {
            document.querySelectorAll('#cryptomarket tbody tr')[i].querySelectorAll("td")[j]
          }
        }
        for (let i = 0; i < 8; i++) {
          this.previousPrice[i] = this.arrOfCrypto[i][1];
        }
        this.turn++;
        this.printCrypto(this.arrOfCrypto);
      })
    }



    // let parse = document.createElement('script');

    // parse.onload = function(){
    //     let rollBtn1 = document.querySelector(".rollBtn");
    //     rollBtn1.addEventListener("click", () =>{
    //         Papa.parse("https://storage.googleapis.com/crypto_stuff/files/priceChanges.csv",{
    //             download: true,
    //             header: false,
    //             complete: function(result){
    //                 console.log(result);
    //             }
    //         })
    //     })
    // };
    // parse.src = "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js";

    // document.head.appendChild(parse);







    // let rollBtn1 = document.querySelector(".rollBtn");
    // rollBtn1.addEventListener("click", () =>{
    //     let parse = document.createElement('script');

    //     parse.onload = function(){
    //         Papa.parse("https://storage.googleapis.com/crypto_stuff/files/priceChanges.csv",{
    //             download: true,
    //             header: false,
    //             complete: function(result){
    //                 console.log(result);
    //             }
    //         })
    //     };
    //     parse.src = "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.1/papaparse.min.js";
    //     document.head.appendChild(parse);
    // });}

  }
}
