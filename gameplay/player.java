package gameplay;

import java.util.Random;
import java.util.List;
import java.util.ArrayList;

public class player {
    String name;
    int money;
    List<property> propertyList;
    int currentLocation;
    int size;
    int jail;
    boolean jailFreeCard;

    public player(String name, int money, List<property> propertyList, int currentLocation, int size, int jail) {
        this.name = name;
        this.money = money;
        this.propertyList = propertyList;
        this.currentLocation = currentLocation;
        this.size = size;
        this.jail = jail;
        this.jailFreeCard = false;
    }

    public player(String name) {
        this.name = name;
        this.money = 150000;
        this.propertyList = new ArrayList<property>();
        this.currentLocation = 0;
        this.size = 40;
        this.jail = 0;
        this.jailFreeCard = false;
    }

    void setName(String name) {
        this.name = name;
    }

    String getName() {
        return name;
    }

    void addProperty(property p) {
        propertyList.add(p);
    }

    List<property> getPropertyList() {
        return propertyList;
    }

    void addMoney(int m) {
        money += m;
    }

    void subMoney(int m) {
        money -= m;
    }

    int getMoney() {
        return money;
    }

    void updateLocation(int move) {
        currentLocation += move;
        if (currentLocation >= size) {
            System.out.println("You received $200 for passing \"GO!\"");
            money += 200;
        }

        currentLocation = (currentLocation) % size;
    }

    int getLocation() {
        return currentLocation;
    }

    void setLocation(int location) {
        currentLocation = location;
    }

    void setJail() {
        jail = 3;
    }

    void addJailFreeCard() {
        jailFreeCard = true;
    }

    void loseJailFreeCard() {
        jailFreeCard = false;
    }

    void chance(List<player> playerList) {
        Random rand = new Random();
        int chance = rand.nextInt(16) + 1;
        if (chance <= 7) {
            int advance = rand.nextInt(40) + 1;
            updateLocation(advance);
            System.out.println("You advance " + advance + " steps to " + currentLocation + "!");
        } else if (chance == 8) {
            System.out.println("The bank pays you dividends!");
            addMoney(50);
        } else if (chance == 9) {
            System.out.println("You get a Get Out of Jail Free Card!");
            addJailFreeCard();
        } else if (chance == 10) {
            System.out.println("Go back 3 spaces!");
            updateLocation(-3);
        } else if (chance == 11) {
            System.out.println("You go to jail!");
            setLocation(20);
            setJail();
        } else if (chance == 12) {
            System.out.println("You pay repairs for each house you own!");
            for (int i = 0; i < propertyList.size(); i++) {
                int houses = propertyList.get(i).numHouses;
                subMoney(25 * houses);
            }
        } else if (chance == 13) {
            System.out.println("You get a speeding fine!");
            subMoney(15);
        } else if (chance == 14) {
            System.out.println("Move up to nearest NFT!");
            while (!(currentLocation % 5 == 0 && currentLocation % 10 != 0))
                updateLocation(1);
        } else if (chance == 15) {
            System.out.println("You are the chairman. Pay everyone $50 each.");
            for (int i = 0; i < playerList.size(); i++) {
                playerList.get(i).addMoney(50);
                subMoney(50);
            }
        } else {
            System.out.println("Your building loam matures. Collect $150.");
            addMoney(150);
        }

    }

    void community(List<player> playerList) {
        Random rand = new Random();
        int community = rand.nextInt(16);
        if (community == 0) {
            System.out.println("Advance to Go");
            updateLocation(size - currentLocation);
        } else if (community == 1) {
            System.out.println("Bank error in your favor. Collect $200");
            addMoney(200);
        } else if (community == 2) {
            System.out.println("Doctor’s fee. Pay $50");
            subMoney(50);
        } else if (community == 3) {
            System.out.println("From sale of stock you get $50");
            addMoney(50);
        } else if (community == 4) {
            System.out.println("Get Out of Jail Free");
            addJailFreeCard();
        } else if (community == 5) {
            System.out.println("Go to Jail. Go directly to jail, do not pass Go, do not collect $200");
            setLocation(20);
            setJail();
        } else if (community == 6) {
            System.out.println("Holiday fund matures. Receive $100");
            addMoney(100);
        } else if (community == 7) {
            System.out.println("Income tax refund. Collect $20");
            addMoney(20);
        } else if (community == 8) {
            System.out.println("It is your birthday. Collect $10 from every player");
            for (int i = 0; i < playerList.size(); i++) {
                playerList.get(i).subMoney(10);
                addMoney(10);
            }
        } else if (community == 9) {
            System.out.println("Life insurance matures. Collect $100");
            addMoney(100);
        } else if (community == 10) {
            System.out.println("Pay hospital fees of $100");
            subMoney(100);
        } else if (community == 11) {
            System.out.println("Pay school fees of $50");
            subMoney(50);
        } else if (community == 12) {
            System.out.println("Receive $25 consultancy fee");
            addMoney(25);
        } else if (community == 13) {
            System.out.println("You are assessed for street repair. $40 per house.");
            for (int i = 0; i < propertyList.size(); i++) {
                int houses = propertyList.get(i).numHouses;
                addMoney(40 * houses);
            }
        } else if (community == 14) {
            System.out.println("You have won second prize in a beauty contest. Collect $10");
            addMoney(200);
        } else {
            System.out.println("");
            addMoney(10);
        }
    }
}
