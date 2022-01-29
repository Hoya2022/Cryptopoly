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

  drew(type,title,subtitle,description) {
      if(type) {
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
        function() {
        document.querySelector('#eventcard').style.display = "";
      }, 700
      )
    } else {
    document.querySelector('#eventcard').style.display = "none";

    let allType = ['chance','community'];
    for(let i = 0;i<allType.length; i++) {
    let card = document.querySelector(`#${allType[i]}-card`);
        if(allType[i]=="chance") {
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
    }

    }

}
