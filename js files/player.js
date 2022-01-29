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

        //JS API
        //Create Player Object
        let player = document.createElement( 'li' );
        // player.textContent = '♟️';
        player.textContent = this.name;

        let gridNext = document.querySelector('#grid'+this.currentLocation.toString());
        gridNext.appendChild(player)
        //JS API
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

    updateLocation(move){
        //JS API
        //Remove Player Object
        let gridPrevious = document.querySelector('#grid'+this.currentLocation.toString());
        let playerPreviousLocation = gridPrevious.querySelector('li');
        gridPrevious.removeChild(playerPreviousLocation)
        //JS API

        // this.currentLocation = (this.currentLocation + move) % this.size;
        this.currentLocation = this.currentLocation + move;
        if (this.currentLocation >= this.size) {
            console.log("You received $200 for passing \"GO!\"");
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
    }
    getLocation(){
        return this.currentLocation;
    }

}
