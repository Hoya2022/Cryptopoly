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
    this.cryptoList = [0, 0, 0, 0, 0, 0, 0, 0];
    this.priceList = [0, 0, 0, 0, 0, 0, 0, 0];
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
    this.jail = 5;
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

  removePlayer() {
    let gridPrevious = document.querySelector('#grid' + this.currentLocation.toString());
    let playerPreviousLocation = gridPrevious.querySelectorAll('li');
    for (let i = 0; i < playerPreviousLocation.length; i++) {
      if (playerPreviousLocation[i].textContent == this.name)
        gridPrevious.removeChild(playerPreviousLocation[i])
    }
  }

  updateLocation(move) {
    let p = this;
    if (p.jail <= 0) {
      //JS API
      //Remove Player Object
      this.removePlayer()
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
    this.removePlayer()
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
    let p = this;
    this.print("You got a chance card!");
    if (chance <= 7) {

      let advance = Math.floor(Math.random() * (40 + 1 - 0) + 0);;
      g.drewEvent = function () {
        p.updateLocation(advance);
      }
      g.drew("chance", "Move", "Chance Card", "You advance " + advance + " steps to " + this.currentLocation + "!")
      this.print("You advance " + advance + " steps to " + this.currentLocation + "!");
    } else if (chance == 8) {
      this.print("The bank pays you dividends!");
      g.drewEvent = function () {
        p.addMoney(50);
      }
      g.drew("chance", "$$$", "Chance Card", "The bank pays you dividends! Gain 50")
    } else if (chance == 9) {

      this.print("You get a Get Out of Jail Free Card!");
      g.drewEvent = function () {
        p.addJailFreeCard();
      }
      g.drew("chance", "Jail", "Chance Card", "You get a Get Out of Jail Free Card!")
    } else if (chance == 10) {
      this.print("Go back 3 spaces!");
      g.drewEvent = function () {
        p.updateLocation(-3);
      }
      g.drew("chance", "Move", "Chance Card", "Go back 3 spaces!")
    } else if (chance == 11) {
      this.print("You go to jail!");
      g.drewEvent = function () {
        p.setJail();
        p.moveTo(this.currentLocation, 10, 100, false)
      }
      g.drew("chance", "Jail", "Chance Card", "You go to jail!")
      // this.setLocation(20);
    } else if (chance == 12) {
      this.print("You pay repairs for each house you own!");
      g.drewEvent = function () {
        for (let i = 0; i < propertyList.length; i++) {
          let houses = propertyList[i].numHouses;
          p.subMoney(25 * houses);
        }
      }
      g.drew("chance", "$$$", "Chance Card", "You pay repairs for each house you own!")
    } else if (chance == 13) {
      this.print("You get a speeding fine!");

      g.drewEvent = function () {
        p.subMoney(15);
      }
      g.drew("chance", "$$$", "Chance Card", "You get a speeding fine!")
    } else if (chance == 14) {
      this.print("Move up to nearest NFT!");
      g.drewEvent = function () {
        while (!(this.currentLocation % 5 == 0 && this.currentLocation % 10 != 0))
          p.updateLocation(1);
      }
      g.drew("chance", "Move", "Chance Card", "Move up to nearest NFT!")
    } else if (chance == 15) {
      this.print("You are the chairman. Pay everyone $50 each.");
      g.drewEvent = function () {
        for (let i = 0; i < playerList.length; i++) {
          playerList[i].addMoney(50);
          p.subMoney(50);
        }
      }
      g.drew("chance", "$$$", "Chance Card", "You are the chairman. Pay everyone $50 each.")
    } else {
      this.print("Your building loam matures. Collect $150.");
      g.drewEvent = function () {
        p.addMoney(150);
      }
      g.drew("chance", "$$$", "Chance Card", "Your building loam matures. Collect $150.")
    }

  }

  community(playerList) {
    let community = Math.floor(Math.random() * (16 - 0) + 0);
    let p = this;
    this.print("You got a commmunity card!")
    if (community == 0) {
      this.print("Advance to Go");
      g.drewEvent = function () {
        p.updateLocation(this.size - this.currentLocation);
      }
      g.drew("community", "Go", "Community Card", "Advance to Go")
    } else if (community == 1) {
      this.print("Bank error in your favor. Collect $200");
      g.drewEvent = function () {
        p.addMoney(200);
      }
      g.drew("community", "$$$", "Community Card", "Bank error in your favor. Collect $200")
    } else if (community == 2) {
      this.print("Doctor’s fee. Pay $50");
      g.drewEvent = function () {
        p.subMoney(50);
      }
      g.drew("community", "$$$", "Community Card", "Doctor’s fee. Pay $50")
    } else if (community == 3) {
      this.print("From sale of stock you get $50");
      g.drewEvent = function () {
        p.addMoney(50);
      }
      g.drew("community", "$$$", "Community Card", "From sale of stock you get $50")
    } else if (community == 4) {
      this.print("Get Out of Jail Free");
      g.drewEvent = function () {
        p.addJailFreeCard();
      }
      g.drew("community", "Jail", "Community Card", "Get Out of Jail Free")
    } else if (community == 5) {
      this.print("Go to Jail. Go directly to jail, do not pass Go, do not collect $200");
      g.drewEvent = function () {
        p.setJail();
        p.moveTo(this.currentLocation, 10, 100, false)
      }
      g.drew("community", "Jail", "Community Card", "Go to Jail. Go directly to jail, do not pass Go, do not collect $200")
      // this.setLocation(20);
    } else if (community == 6) {
      this.print("Holiday fund matures. Receive $100");
      g.drewEvent = function () {
        p.addMoney(100);
      }
      g.drew("community", "$$$", "Community Card", "Holiday fund matures. Receive $100")
    } else if (community == 7) {
      this.print("Income tax refund. Collect $20");
      g.drewEvent = function () {
        p.addMoney(20);
      }
      g.drew("community", "$$$", "Community Card", "Income tax refund. Collect $20")
    } else if (community == 8) {
      this.print("It is your birthday. Collect $10 from every player");
      g.drewEvent = function () {
        for (let i = 0; i < playerList.length; i++) {
          playerList[i].subMoney(10);
          p.addMoney(10);
        }
      }
      g.drew("community", "$$$", "Community Card", "It is your birthday. Collect $10 from every player")
    } else if (community == 9) {
      this.print("Life insurance matures. Collect $100");
      g.drewEvent = function () {
        p.addMoney(100);
      }
      g.drew("community", "$$$", "Community Card", "Life insurance matures. Collect $100")
    } else if (community == 10) {
      this.print("Pay hospital fees of $100");
      g.drewEvent = function () {
        p.subMoney(100);
      }
      g.drew("community", "$$$", "Community Card", "Pay hospital fees of $100")
    } else if (community == 11) {
      this.print("Pay school fees of $50");
      g.drewEvent = function () {
        p.subMoney(50);
      }
      g.drew("community", "$$$", "Community Card", "Pay school fees of $50")
    } else if (community == 12) {
      this.print("Receive $25 consultancy fee");
      g.drewEvent = function () {
        p.addMoney(25);
      }
      g.drew("community", "$$$", "Community Card", "Receive $25 consultancy fee")
    } else if (community == 13) {
      this.print("You are assessed for street repair. $40 per house.");
      g.drewEvent = function () {
        for (let i = 0; i < propertyList.length; i++) {
          let houses = propertyList[i].numHouses;
          p.addMoney(40 * houses);
        }
      }
      g.drew("community", "$$$", "Community Card", "You are assessed for street repair. $40 per house.")
    } else if (community == 14) {
      this.print("You have won second prize in a beauty contest. Collect $10");
      g.drewEvent = function () {
        p.addMoney(200);
      }
      g.drew("community", "$$$", "Community Card", "You have won second prize in a beauty contest. Collect $10")
    } else {
      this.print("");
      g.drewEvent = function () {
        p.addMoney(10);
      }
      g.drew("community", "$$$", "Community Card", "You got $10")
    }

  }

  addPropertyLevel(currentProperty) {
    let currentGrid = document.querySelector('#grid' + this.currentLocation.toString());

    if (currentProperty.location >= 1 && currentProperty.location <= 10) { // upper
      let createDot = document.createElement("div");
      createDot.classList.add("dot");
      createDot.classList.add("player" + this.id);
      // createDot.classList.add("align-self-end");
      currentGrid.appendChild(createDot);
    }
    else if (currentProperty.location >= 11 && currentProperty.location <= 20) { // right side
      let createDot = document.createElement("div");
      createDot.classList.add("dot");
      createDot.classList.add("player" + this.id);
      currentGrid.appendChild(createDot);
    }
    else if (currentProperty.location >= 21 && currentProperty.location <= 30) { // bottom
      let createDot = document.createElement("div");
      createDot.classList.add("dot");
      createDot.classList.add("player" + this.id);
      currentGrid.appendChild(createDot);
    }
    else { // left
      let createDot = document.createElement("div");
      createDot.classList.add("dot");
      createDot.classList.add("player" + this.id);
      currentGrid.appendChild(createDot);
    }
  }

  triggerEvent() {
    g.cryptoInfo();
    this.buyCrypto = false;
    g.beforeTurn = true;

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
      g.toggleMarket(1)

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
              p.profile.querySelector('.property div').innerHTML += `<span class="badge badge-primary" style="background-color: ${currentProperty.getColor()}">${currentProperty.getInfo()}</span>`;
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

    g.beforeTurn = false;
    // g.cryptoInfo();
    g.printGameboard();
    this.checkBankruptcy();
    g.switchPlayer();
  }
}
