import { GameMap } from "/static/js/gamemap/base.js";
import { Player } from "/static/js/player/base.js";

class KOF {
    constructor(id) {
        this.$kof = $("#" + id);
        
        console.log(this.$kof);
        this.gamemap = new GameMap(this);
        this.player = [
            new Player(this, {
                id: 0,
                x: 200,
                y: 0,
                width: 120,
                height: 200,
                color: "blue",
            }),
            new Player(this, {
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