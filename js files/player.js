class player {
  // constructor(name, money, propertyList, currentLocation, size){
  //     this.name = name;
  //     this.money = money;
  //     this.propertyList = propertyList;
  //     this.currentLocation = currentLocation;
  //     this.size = size;
  // }

  constructor(name, id) {
    this.name = name;
    this.money = 1500;
    this.propertyList = [];
    this.cryptoList = [];
    this.priceList = [];
    this.setCryptoList();
    this.setPriceList();
    this.currentLocation = 0;
    this.size = 40;
    this.jail = 0;
    this.jailFreeCard = false;
    this.message = [];
    this.id = id;
    this.newCryptoNum = 0;
    this.newCryptoIndex = 0;
    this.buyCrypto = false;
    this.names = ["Bitcoin", "Ethereum", "Tether", "Binance Coin", "Cardano", "HEX", "Solana", "XRP"];


    //JS API
    //Create Player Object
    let player = document.createElement('li');
    // player.textContent = '♟️';
    player.textContent = this.name;

    let gridNext = document.querySelector('#grid' + this.currentLocation.toString());
    gridNext.appendChild(player)

    //JS API
    //Create player profile
    this.profile = document.querySelector('#player' + this.id);
    this.update();
  }

  update() {
    this.profile.querySelector('.name div').textContent = this.name
    this.profile.querySelector('.jail div').textContent = this.jail
    this.profile.querySelector('.money div').textContent = Math.round(this.money * 100) / 100;
    this.profile.querySelector('.location div').textContent = this.currentLocation
  }

  setName(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  addProperty(p) {
    this.propertyList.push(p);
  }
  getPropertyList() {
    return this.propertyList;
  }

  addMoney(m) {
    this.money += m;
  }
  subMoney(m) {
    this.money -= m;
  }
  getMoney() {
    return this.money;
  }

  setJail() {
    this.jail = 3;
  }

  addJailFreeCard() {
    this.jailFreeCard = true;
  }

  loseJailFreeCard() {
    this.jailFreeCard = false;
  }

  checkBankruptcy() {
    if (this.money < 0) alert("You are bankrupt!");
  }

  setCryptoList() {
    for (let i = 0; i < 8; i++)
      if (this.cryptoList[i] == null)
        this.cryptoList.push(0);
  }

  setPriceList() {
    for (let i = 0; i < 8; i++)
      if (this.priceList[i] == null)
        this.priceList.push(0);
  }

  updateLocation(move) {
    let p = this;
    if (p.jail <= 0) {
      //JS API
      //Remove Player Object
      let gridPrevious = document.querySelector('#grid' + this.currentLocation.toString());
      let playerPreviousLocation = gridPrevious.querySelector('li');
      gridPrevious.removeChild(playerPreviousLocation)
      //JS API

      // this.currentLocation = (this.currentLocation + move) % this.size;
      let previousLocation = this.currentLocation;
      // this.currentLocation = this.currentLocation + move;
      let nextLocation = this.currentLocation + move;
      // if (this.currentLocation >= this.size) {
      if (nextLocation >= this.size) {
        this.print("You received $200 for passing \"GO!\"");
        this.money += 200;
      }

      // this.currentLocation = (this.currentLocation) % this.size;
      nextLocation = (nextLocation) % this.size;
      this.moveTo(previousLocation, nextLocation, 300);
      console.log("Move to " + this.currentLocation);

      //JS API
      //Create Player Object
      let player = document.createElement('li');
      // player.textContent = '♟️';
      player.textContent = this.name;

      let gridNext = document.querySelector('#grid' + this.currentLocation.toString());
      gridNext.appendChild(player)
      //JS API
    } else {
      p.print(p.name + " is in jail and has to wait " + p.jail + " turns!");
      p.jail = p.jail - 1;
    }

  }
  getLocation() {
    return this.currentLocation;
  }

  setLocation(location) {
    //JS API
    //Remove Player Object
    let gridPrevious = document.querySelector('#grid' + this.currentLocation.toString());
    let playerPreviousLocation = gridPrevious.querySelector('li');
    gridPrevious.removeChild(playerPreviousLocation)
    //JS API

    this.currentLocation = location;

    //JS API
    //Create Player Object
    let player = document.createElement('li');
    // player.textContent = '♟️';
    player.textContent = this.name;

    let gridNext = document.querySelector('#grid' + this.currentLocation.toString());
    gridNext.appendChild(player)
    //JS API
  }

  moveTo(previousLocation, location, speed, event) {
    g.isMoving = true;
    let p = this;

    let diff = location - previousLocation;

    if (previousLocation > location)
      diff = (40 - previousLocation) + (location - 0);

    for (let i = 0; i < diff + 1; i++) {
      setTimeout(
        function () {

          if (i == diff) {
            p.triggerEvent()
            g.isMoving = false;
          } else {
            let nextLocation = (previousLocation + i + 1) % p.size;
            p.setLocation(nextLocation)
          }

        }
        , speed * i
      )
    }
  }

  print(msg) {
    if (this.message.length == 5) {
      this.message.shift();
    }
    this.message.push(msg);
    this.profile.querySelector('.message').innerHTML = "";
    for (let i = 0; i < this.message.length; i++) {
      this.profile.querySelector('.message').innerHTML += "<li>" + this.message[i] + "</li>";
    }
  }

  prompt(title, subtitle, message, callback) {
    document.querySelector('#event').style.display = '';
    document.querySelector('#event .card-title').textContent = title;
    document.querySelector('#event .card-subtitle').textContent = subtitle;
    document.querySelector('#event .card-text').textContent = message;
    g.promptEvent = callback;
  }

  chance(playerList) {
    let chance = Math.floor(Math.random() * (16 + 1 - 0) + 0);
    this.print("You got a chance card!");
    if (chance <= 7) {
      let advance = Math.floor(Math.random() * (40 + 1 - 0) + 0);;
      this.updateLocation(advance);
      g.drew("change", "You advance " + advance + " steps to " + this.currentLocation + "!")
      // this.print("You advance " + advance + " steps to " + this.currentLocation + "!");
    } else if (chance == 8) {
      // this.print("The bank pays you dividends!");
      g.drew("The bank pays you dividends! Gain 50")
      this.addMoney(50);
    } else if (chance == 9) {
      // this.print("You get a Get Out of Jail Free Card!");
      g.drew("You get a Get Out of Jail Free Card!")
      this.addJailFreeCard();
    } else if (chance == 10) {
      // this.print("Go back 3 spaces!");
      g.drew("Go back 3 spaces!")
      this.updateLocation(-3);
    } else if (chance == 11) {
      this.print("You go to jail!");
      g.drew("Go back 3 spaces!")
      // this.setLocation(20);
      this.setJail();
      this.moveTo(this.currentLocation, 10, 100, false)
    } else if (chance == 12) {
      this.print("You pay repairs for each house you own!");
      for (let i = 0; i < propertyList.length; i++) {
        let houses = propertyList[i].numHouses;
        this.subMoney(25 * houses);
      }
    } else if (chance == 13) {
      this.print("You get a speeding fine!");
      this.subMoney(15);
    } else if (chance == 14) {
      this.print("Move up to nearest NFT!");
      while (!(this.currentLocation % 5 == 0 && this.currentLocation % 10 != 0))
        this.updateLocation(1);
    } else if (chance == 15) {
      this.print("You are the chairman. Pay everyone $50 each.");
      for (let i = 0; i < playerList.length; i++) {
        playerList[i].addMoney(50);
        this.subMoney(50);
      }
    } else {
      this.print("Your building loam matures. Collect $150.");
      this.addMoney(150);
    }

  }

  community(playerList) {
    let community = Math.floor(Math.random() * (16 - 0) + 0);
    this.print("You got a commmunity card!")
    if (community == 0) {
      this.print("Advance to Go");
      this.updateLocation(this.size - this.currentLocation);
    } else if (community == 1) {
      this.print("Bank error in your favor. Collect $200");
      this.addMoney(200);
    } else if (community == 2) {
      this.print("Doctor’s fee. Pay $50");
      this.subMoney(50);
    } else if (community == 3) {
      this.print("From sale of stock you get $50");
      this.addMoney(50);
    } else if (community == 4) {
      this.print("Get Out of Jail Free");
      this.addJailFreeCard();
    } else if (community == 5) {
      this.print("Go to Jail. Go directly to jail, do not pass Go, do not collect $200");
      // this.setLocation(20);
      this.setJail();
      this.moveTo(this.currentLocation, 10, 100, false)
    } else if (community == 6) {
      this.print("Holiday fund matures. Receive $100");
      this.addMoney(100);
    } else if (community == 7) {
      this.print("Income tax refund. Collect $20");
      this.addMoney(20);
    } else if (community == 8) {
      this.print("It is your birthday. Collect $10 from every player");
      for (let i = 0; i < playerList.length; i++) {
        playerList[i].subMoney(10);
        this.addMoney(10);
      }
    } else if (community == 9) {
      this.print("Life insurance matures. Collect $100");
      this.addMoney(100);
    } else if (community == 10) {
      this.print("Pay hospital fees of $100");
      this.subMoney(100);
    } else if (community == 11) {
      this.print("Pay school fees of $50");
      this.subMoney(50);
    } else if (community == 12) {
      this.print("Receive $25 consultancy fee");
      this.addMoney(25);
    } else if (community == 13) {
      this.print("You are assessed for street repair. $40 per house.");
      for (let i = 0; i < propertyList.length; i++) {
        let houses = propertyList[i].numHouses;
        this.addMoney(40 * houses);
      }
    } else if (community == 14) {
      this.print("You have won second prize in a beauty contest. Collect $10");
      this.addMoney(200);
    } else {
      this.print("");
      this.addMoney(10);
    }

  }

  addPropertyLevel(currentProperty) {
    let currentGrid = document.querySelector('#grid' + this.currentLocation.toString());

    if (currentProperty.location >= 1 && currentProperty.location <= 10) { // upper
      let createDot = document.createElement("div");
      createDot.classList.add("dot");
      // createDot.classList.add("align-self-end");
      currentGrid.appendChild(createDot);
    }
    else if (currentProperty.location >= 11 && currentProperty.location <= 20) { // right side
      let createDot = document.createElement("div");
      createDot.classList.add("dot");
      currentGrid.appendChild(createDot);
    }
    else if (currentProperty.location >= 21 && currentProperty.location <= 30) { // bottom
      let createDot = document.createElement("div");
      createDot.classList.add("dot");
      currentGrid.appendChild(createDot);
    }
    else { // left
      let createDot = document.createElement("div");
      createDot.classList.add("dot");
      currentGrid.appendChild(createDot);
    }
  }

  triggerEvent() {
    this.buyCrypto = false;

    let p = this;
    let currentProperty = g.board[this.getLocation()];
    let type = currentProperty.getType();

    if (type == "chance") {
      p.chance(g.playerList);
      // if (p.jail > 0)
      //     break;
    } else if (type == "gotojail") {
      if (!p.jailFreeCard) {
        p.setJail();
        // p.setLocation(10);
        this.moveTo(this.currentLocation, 10, 100, false)
      } else
        p.loseJailFreeCard();
    } else if (type == "nft") {
      // this.print(p.name + " bought an NFT for $200!");
      // p.subMoney(200);

      this.print("You can buy crypto!");
      if (true) {
        //buy "Bitcoin";
        let coin = "Bitcoin";
        this.buyCrypto = true;
        this.newCryptoIndex = this.names.indexOf(coin);
        //buy 3 bitcoin
        this.newCryptoNum = 3;
        this.cryptoList[this.newCryptoIndex] += this.newCryptoNum;
      }

    } else if (type == "tax") {
      this.print("It's tax season!");
      p.subMoney(p.getMoney() / 10);
    } else if (type == "community") {
      p.community(playerList);
    } else if (type == "realestate") {
      if (currentProperty.owned == false) {
        if (p.getMoney() >= currentProperty.marketPrice) {
          // let answer = prompt(`Do you want to buy ${currentProperty.getInfo()} for ${currentProperty.getMarketPrice()}? yes:1, no:0`);
          // answer = parseInt(answer);

          p.prompt(
            `Buy ${currentProperty.getInfo()}`,
            'Property',
            `Do you want to buy ${currentProperty.getInfo()} for ${currentProperty.getMarketPrice()}?`,
            function () {
              currentProperty.buyProperty(p);
              p.addProperty(currentProperty);
              // alert(`${p.getName()} successfully purchased ${currentProperty.getInfo()}!`);
              p.print(`successfully purchased ${currentProperty.getInfo()}`);
              p.profile.querySelector('.property div').innerHTML += `${currentProperty.getInfo()}`;
              p.addPropertyLevel(currentProperty);
              p.update();
            }
          )
        } else {
          confirm("Insufficient Fund. Cannot buy this property.");
        }
      }
      else { // if it is owned by someone
        if (currentProperty.getOwner().name == p.name) {

          // let answer = prompt(`Do you want to upgrade ${currentProperty.getInfo()} for ${currentProperty.getMarketPrice()}? yes:1, no:0`);
          // answer = parseInt(answer);

          p.prompt(
            `Upgrade ${currentProperty.getInfo()}`,
            'Property',
            `Do you want to upgrade ${currentProperty.getInfo()} for ${currentProperty.getMarketPrice()}?`,
            function () {
              // should have a maximum property level
              if (currentProperty.numHouses === 3) {
                alert("Property reached highest level.\nNo further update is allowed");
                return;
              }
              // removed checkColor function!!!!!
              currentProperty.buyProperty(p);
              p.addProperty(currentProperty);
              p.addPropertyLevel(currentProperty);
              p.update();
            }
          )

          // if (answer == 1) {
          //   // should have a maximum property level
          //   if (currentProperty.numHouses === 3) {
          //     alert("Property reached highest level.\nNo further update is allowed");
          //     return;
          //   }
          //   // removed checkColor function!!!!!
          //   currentProperty.buyProperty(p);
          //   p.addProperty(currentProperty);
          //   this.addPropertyLevel(currentProperty);
          // }
        }
        else { // owns by someone else, pay rent
          currentProperty.payRent(p);
        }
      }
    }

    g.printGameboard();
    this.checkBankruptcy();
  }
}
