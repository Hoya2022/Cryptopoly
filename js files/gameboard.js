class gameboard {
  constructor(size, playerList) {
    this.size = size;
    this.board = [];
    this.playerList = playerList;
    this.isMoving = false;
    this.createGameboard();
    this.promptEvent = false;
    this.previousPrice = [];
    this.setPreviousPrice();
    this.drewEvent = false;
    this.player = 0;
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

  toggleMarket(toggle) {

    if(toggle==0) {
    document.querySelector('#cryptomarket').style.display = "none";
  } else {
    document.querySelector('#cryptomarket').style.display = "";
  }
  }

  initializeCryto() {

    this.cryptoInfo();
  }

  printCrypto(arrayList) {
    let test = [
      [100,0,0,"1/2"],
      [200,0,0,"3/2"]
    ]
    //
    // arrayList = test;

    for (let i = 0;i<arrayList.length;i++) {
        for (let j = 0;j<arrayList[i].length;j++) {
        document.querySelectorAll(".tbodyCrypto tr")[i].querySelectorAll("td")[j+1].textContent = arrayList[i][j];
      }
    }
  }

  cryptoInfo() {
    let arrOfCrypto = [];
    let names = ["Bitcoin", "Ethereum", "Tether", "Binance Coin", "Cardano", "HEX", "Solana", "XRP"];
    let numPlayers = this.playerList.length;
    let turn = 0;

    let p = this.playerList[this.player];

    for (let i = 0; i < 8; i++) {
      let info = [];
      let currentName = names[i];
      info.push(currentName);
      info.push(randomStartingPrice());
      info.push(0); // percent change
      info.push(p.priceList[i]);
      info.push(p.cryptoList[i]);
      arrOfCrypto.push(info);
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

    console.log(arrOfCrypto);

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
      if (turn != 0 && turn % numPlayers == 0) {
        // update the percentage
        let newArr = [];
        for (let i = 0; i < 8; i++) {
          let currentChange = randomPercentage();
          newArr.push(currentChange);
        }

        for (let i = 0; i < 8; i++) {
          arrOfCrypto[i][1] = Math.round(arrOfCrypto[i][1] * (1 + newArr[i]) * 100) / 100;
          arrOfCrypto[i][2] = Math.round(newArr[i] * 100) / 100;
          if (p.newCryptoIndex == i && p.buyCrypto == true) {
            arrOfCrypto[i][3] = (arrOfCrypto[i][3] * arrOfCrypto[i][4] + this.previousPrice[i] * p.newCryptoNum) / p.cryptoList[i];
            p.priceList[i] = arrOfCrypto[i][3];
          } else {
            arrOfCrypto[i][3] = p.priceList[i];
          }
          arrOfCrypto[i][3] = Math.round(arrOfCrypto[i][3] * 100) / 100;
          arrOfCrypto[i][4] = p.cryptoList[i];
        }


        console.log(arrOfCrypto);
      }

      // for (let i = 0; i < 8; i++) {
      //   document.querySelector(".dummy").remove();
      // }

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
            for (let i = 0; i < 8; i++) {
              for (let j = 1; j < 5; j++) {
                document.querySelectorAll('#cryptomarket tbody tr')[i].querySelectorAll("td")[j]
              }
            }
      for (let i = 0; i < 8; i++) {
        this.previousPrice[i] = arrOfCrypto[i][1];
      }
      turn++;
    })








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
