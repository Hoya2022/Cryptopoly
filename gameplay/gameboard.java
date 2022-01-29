package gameplay;

import java.util.List;
import java.util.ArrayList;

public class gameboard {
    List<property> board;
    int size;
    List<player> playerList;

    public gameboard(int size, List<player> playerList) {
        this.size = size;
        board = new ArrayList<property>();
        this.playerList = playerList;
        createGameboard();
    }

    public void createGameboard() {
        for (int i = 0; i < size; i++) {
            String color = setGameboardColor(i);
            String type = setGameboardType(i);
            if (!type.equals("realestate"))
                color = type; // clor = '' for webappo
            property p = new property(i, color, false, null, 0, i * 100, i * 10, type);
            board.add(p);
        }
    }

    public void printGameboard() {
        System.out.println("\n******************************");
        for (int i = 0; i < size; i++) {
            if (board.get(i).owner == null) {
                System.out.println(i + "\t" + board.get(i).getColor() + "\t" + board.get(i).getHouse());
            }

            else {
                System.out.println(i + "\t" + board.get(i).getColor() + "\t" + board.get(i).getHouse() + "\t"
                        + board.get(i).owner.name);
            }

        }
        System.out.println("******************************\n");
    }

    public String setGameboardColor(int location) {
        int interval = size / 8;

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

    public String setGameboardType(int location) {
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
}
