package gameplay;

import java.util.List;
import java.util.ArrayList;

public class property {
    int location;
    String color;
    boolean owned;
    player owner;
    int numHouses;
    int marketPrice;
    int rent;
    String type;
    // types: nft = railroad

    public property(int location, String color, boolean owned, player owner, int numHouses, int marketPrice, int rent,
            String type) {
        this.location = location;
        this.color = color;
        this.owned = owned;
        this.owner = owner;
        this.numHouses = numHouses;
        this.marketPrice = marketPrice;
        this.rent = rent;
        this.type = type;
        // this.currentResiders = currentResiders;
    }

    int getLocation() {
        return location;
    }

    void setColor(String c) {
        color = c;
    }

    String getColor() {
        return color;
    }

    void setOwned() {
        owned = true;
    }

    boolean getOwned() {
        return owned;
    }

    void setMarketPrice(int price) {
        marketPrice = price;
    }

    int getMarketPrice() {
        return marketPrice;
    }

    void addHouse() {
        numHouses++;
    }

    int getHouse() {
        return numHouses;
    }

    void setOwner(player p) {
        owner = p;
    }

    player getOwner() {
        return owner;
    }

    void addRent(int r) {
        rent += r;
    }

    int getRent() {
        return rent;
    }

    String getType() {
        return type;
    }

    String getInfo() {
        return getLocation() + "(" + getColor() + ")";
    }

    void buyProperty(player p) {
        if (owned && !owner.equals(p)) {
            System.out.println("Not your property. Cannot buy.");
            return;
        }

        if (p.getMoney() - marketPrice < 0) {
            System.out.println("Not enough money.");
            return;
        }
        setOwned();
        setOwner(p);
        addHouse();
        addRent(rent);
        p.subMoney(marketPrice);
        System.out.println("Player " + p.getName() + " buys position " + getInfo());
    }

    void payRent(player p) {
        System.out.println("Player " + p.getName() + " needs to pay rent to " + getOwner().getName());
        if (p.getMoney() - rent < 0) {
            System.out.println("Not enough money.");
            return;
        }

        p.subMoney(rent);
        owner.addMoney(rent);
        System.out.println("Player " + p.getName() + " pays " + getOwner().getName() + " $" + getRent());
    }

}
