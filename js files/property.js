class property {
    constructor(location, color, owned, owner, numHouses, marketPrice, rent, type) {
        this.location = location;
        this.color = color;
        this.owned = owned;
        this.owner = owner;
        this.numHouses = numHouses;
        this.marketPrice = marketPrice;
        this.rent = rent;
        this.type = type;

        this.setColor(this.color)
    }

    getLocation() {
        return this.location;
    }

    setColor(c) {
        this.color = c;

        //JS API
        let grid = document.querySelector('#grid' + this.location.toString());
        grid.style.backgroundColor = this.color;
        //JS API
    }
    getColor() {
        return this.color;
    }

    setOwned() {
        this.owned = true;
    }
    getOwned() {
        return this.owned;
    }

    setMarketPrice(price) {
        this.marketPrice = price;
    }
    getMarketPrice() {
        return this.marketPrice;
    }

    addHouse() {
        this.numHouses += 1;
    }
    getHouse() {
        return this.numHouses;
    }

    setOwner(p) {
        this.owner = p;
    }
    getOwner() {
        return this.owner;
    }

    addRent(r) {
        this.rent += r;
    }
    getRent() {
        return this.rent;
    }

    getType() {
        return this.type;
    }

    getInfo() {
        return `${this.getLocation()} (${this.getColor()})`;
    }

    buyProperty(p) {
        if (this.owned && this.owner !== p) {
            console.log("Not your property. Cannot buy.");
            // add alert or some
            return;
        }

        if (p.getMoney() - this.marketPrice < 0) {
            console.log("Not enough money.");
            return;
        }

        this.setOwned();
        this.setOwner(p);
        this.addHouse();
        this.addRent(this.rent);
        p.subMoney(this.marketPrice);

        // console.log
        console.log("Purchase!");
    }

    payRent(p) {
        // console.log
        let sumP = 0;
        let sumOwner = 0;
        for (let i = 0; i < p.priceList.length; i++) {
            sumP += p.priceList[i];
            sumOwner += this.owner.priceList[i];
        }

        if (sumP > sumOwner) {
            this.print(p.getName() + " has more crypto assets than " + this.owner.getName() + ", so " + p.getName() + " does not have to pay rent!");
            return;
        }


        console.log(`Player ${p.getName()} needs to pay rent to ${this.getOwner().getName()}`);

        if (p.getMoney() - this.rent < 0) {
            console.log("Not enough money");
            // maybe game over for this player
            return;
        }

        p.subMoney(this.rent);
        this.owner.addMoney(this.rent);

        console.log("Rent paid!");
    }
}
