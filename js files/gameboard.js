class gameboard {
  constructor(size, playerList) {
    this.size = size;
    this.board = [];
    this.playerList = playerList;
    this.isMoving = false;
    this.createGameboard();
    this.promptEvent = false;
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
}
