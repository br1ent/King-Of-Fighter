import { GameMap } from "/static/js/game_map.js";
import { Kyo } from "/static/js/kyo.js";

class KOF {
    constructor(id) {
        this.$kof = $("#" + id);
        
        this.gamemap = new GameMap(this);
        this.players = [
            new Kyo(this, {
                id: 0,
                x: 200,
                y: 0,
                width: 120,
                height: 200,
                color: "blue",
            }),
            new Kyo(this, {
                id: 1,
                x: 900,
                y: 0,
                width: 120,
                height: 200,
                color: "red",
            })
        ]
    }
}


export {
    KOF,
}