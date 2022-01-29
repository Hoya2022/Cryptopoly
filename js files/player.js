class player {
  // constructor(name, money, propertyList, currentLocation, size){
  //     this.name = name;
  //     this.money = money;
  //     this.propertyList = propertyList;
  //     this.currentLocation = currentLocation;
  //     this.size = size;
  // }

  constructor(name){
    this.name = name;
    this.money = 1500;
    this.propertyList = [];
    this.currentLocation = 0;
    this.size = 40;
    this.jail = 0;
    this.jailFreeCard = false;

    //JS API
    //Create Player Object
    let player = document.createElement( 'li' );
    // player.textContent = '♟️';
    player.textContent = this.name;

    let gridNext = document.querySelector('#grid'+this.currentLocation.toString());
    gridNext.appendChild(player)

    //JS API
    //Create player profile
    this.profile = document.querySelector('#player1');
    this.update();
  }

  update() {
    this.profile.querySelector('.name div').textContent = this.name
    this.profile.querySelector('.jail div').textContent = this.jail
    this.profile.querySelector('.money div').textContent = this.money
    this.profile.querySelector('.location div').textContent = this.currentLocation
  }

  setName(name){
    this.name = name;
  }
  getName(){
    return this.name;
  }

  addProperty(p){
    this.propertyList.push(p);
  }
  getPropertyList(){
    return this.propertyList;
  }

  addMoney(m){
    this.money += m;
  }
  subMoney(m){
    this.money -= m;
  }
  getMoney(){
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

  updateLocation(move){
    let p = this;
    if (p.jail <= 0) {
      //JS API
      //Remove Player Object
      let gridPrevious = document.querySelector('#grid'+this.currentLocation.toString());
      let playerPreviousLocation = gridPrevious.querySelector('li');
      gridPrevious.removeChild(playerPreviousLocation)
      //JS API

      // this.currentLocation = (this.currentLocation + move) % this.size;
      this.currentLocation = this.currentLocation + move;
      if (this.currentLocation >= this.size) {
        this.print("You received $200 for passing \"GO!\"");
        this.money += 200;
      }

      this.currentLocation = (this.currentLocation) % this.size;
      console.log("Move to "+this.currentLocation);

      //JS API
      //Create Player Object
      let player = document.createElement( 'li' );
      // player.textContent = '♟️';
      player.textContent = this.name;

      let gridNext = document.querySelector('#grid'+this.currentLocation.toString());
      gridNext.appendChild(player)
      //JS API

      let currentProperty = g.board[this.getLocation()];
      let type = currentProperty.getType();

      if (type == "chance") {
        p.chance(g.playerList);
        // if (p.jail > 0)
        //     break;
      } else if (type == "gotojail") {
        if (!p.jailFreeCard) {
          p.setJail();
          p.setLocation(10);
        } else
        p.loseJailFreeCard();
      } else if (type == "nft") {
        this.print(p.name + " bought an NFT  for $200!");
        p.subMoney(200);
      } else if (type == "tax") {
        this.print("It's tax season!");
        p.subMoney(p.getMoney() / 10);
      } else if (type == "community") {
        p.community(playerList);
      }

    } else {
      p.print(p.name + " is in jail and has to wait " + p.jail + " turns!");
      p.jail = p.jail-1;
    }

  }
  getLocation(){
    return this.currentLocation;
  }

  setLocation(location) {
    //JS API
    //Remove Player Object
    let gridPrevious = document.querySelector('#grid'+this.currentLocation.toString());
    let playerPreviousLocation = gridPrevious.querySelector('li');
    gridPrevious.removeChild(playerPreviousLocation)
    //JS API

    this.currentLocation = location;

    //JS API
    //Create Player Object
    let player = document.createElement( 'li' );
    // player.textContent = '♟️';
    player.textContent = this.name;

    let gridNext = document.querySelector('#grid'+this.currentLocation.toString());
    gridNext.appendChild(player)
    //JS API
  }

  print(msg) {
    this.profile.querySelector('.message').innerHTML += "<li>"+msg+"</li>"
  }

  chance(playerList) {
    let chance = Math.floor(Math.random() * (16 + 1 - 0) + 0);
    if (chance <= 7) {
      let advance = Math.floor(Math.random() * (40 + 1 - 0) + 0);;
      this.updateLocation(advance);
      this.print("You advance " + advance + " steps to " + this.currentLocation + "!");
    } else if (chance == 8) {
      this.print("The bank pays you dividends!");
      this.addMoney(50);
    } else if (chance == 9) {
      this.print("You get a Get Out of Jail Free Card!");
      this.addJailFreeCard();
    } else if (chance == 10) {
      this.print("Go back 3 spaces!");
      this.updateLocation(-3);
    } else if (chance == 11) {
      this.print("You go to jail!");
      this.setLocation(20);
      this.setJail();
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
      this.setLocation(20);
      this.setJail();
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
}
