package gameplay;

import java.util.List;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

public class game {
    public static gameboard g;
    public static int size = 40;

    public static int rollDice() {
        Random dice = new Random();
        return dice.nextInt(5) + 1;
    }

    public static String scanner() {
        Scanner scanner = new Scanner(System.in);
        return scanner.next();
    }

    public static boolean checkColor(property p, player play) {
        String color = p.getColor();
        int min = p.getHouse();

        for (property prop : g.board) {
            if (prop.getColor().equals(color)) {
                if (!prop.getOwned())
                    min = 0;
                else if (!prop.getOwner().equals(play)) {
                    System.out.println("Must own all properties in this color");
                    return false;
                } else {
                    min = Math.min(min, prop.getHouse());
                }
            }
        }

        if (p.getHouse() + 1 - min >= 2) {
            System.out.println("Must balance number of houses in this color");
            return false;
        }
        return true;
    }

    public static void main(String[] args) {

        System.out.println("How many players?");
        int numPlayers = Integer.parseInt(scanner());
        List<player> playerList = new ArrayList<>();

        for (int i = 0; i < numPlayers; i++) {
            System.out.println("Enter player name: ");
            String name = scanner();
            player p = new player(name);
            playerList.add(p);
        }

        g = new gameboard(size, playerList);
        g.printGameboard();
        int turns = 100;
        for (int i = 0; i < turns; i++) {
            // roll dice
            for (int j = 0; j < playerList.size(); j++) {
                player p = playerList.get(j);
                if (p.jail <= 0) {

                    int move = rollDice();

                    // move and update location
                    p.updateLocation(move);

                    // get current property
                    property currentProperty = g.board.get(p.getLocation());

                    System.out.println("Player " + p.getName() + " moves " + move + " steps to position "
                            + p.getLocation() + "(" + currentProperty.getColor() + ")");

                    String type = currentProperty.getType();

                    if (type.equals("chance")) {
                        p.chance(playerList);
                    }
                    if (p.jail > 0)
                        break;

                    if (type.equals("realestate")) {
                        if (!currentProperty.owned) { // if no one owns property --> buy
                            System.out.println("Do you want to buy " + currentProperty.getInfo() + " for "
                                    + currentProperty.getMarketPrice() + "? yes:1, no:0");
                            int answer = Integer.parseInt(scanner());
                            if (answer == 1) {
                                currentProperty.buyProperty(p);
                                p.addProperty(currentProperty);
                            }
                        } else {
                            if (currentProperty.getOwner().equals(p)) { // if player owns --> buy more
                                System.out.println("Do you want to buy more " + currentProperty.getInfo() + " for "
                                        + currentProperty.getMarketPrice() + "? yes:1, no:0");
                                int answer = Integer.parseInt(scanner());
                                if (answer == 1) {
                                    if (checkColor(currentProperty, p)) {
                                        currentProperty.buyProperty(p);
                                        p.addProperty(currentProperty);
                                    }
                                }
                            } else { // otherwise pay rent
                                currentProperty.payRent(p);
                            }
                        }
                    } else if (type.equals("gotojail")) {
                        if (!p.jailFreeCard) {
                            p.setJail();
                            p.setLocation(10);
                        } else
                            p.loseJailFreeCard();
                    } else if (type.equals("nft")) {
                        System.out.println(p.name + " bought an NFT  for $200!");
                        p.subMoney(200);
                    } else if (type.equals("tax")) {
                        System.out.println("It's tax season!");
                        p.subMoney(p.getMoney() / 10);
                    } else if (type.equals("community")) {
                        p.community(playerList);
                    }

                } else {
                    System.out.println(p.name + " is in jail and has to wait " + p.jail + " turns!");
                    p.jail -= 1;
                }

                System.out.println("Player " + p.getName() + " has $" + p.getMoney());
                g.printGameboard();
            }
        }
    }
}
