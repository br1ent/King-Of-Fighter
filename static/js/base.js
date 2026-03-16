import { GameMap } from "/static/js/gamemap/base.js";

class KOF {
    constructor(id) {
        this.$kof = $("#" + id);
        
        console.log(this.$kof);
        this.gamemap = new GameMap(this);
    }
}


export {
    KOF,
}