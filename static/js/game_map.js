import {GameObject} from "/static/js/game_object.js";
import { Controller } from "/static/js/controller.js";

export class GameMap extends GameObject {
    constructor(root) {
        super();

        this.root = root;
        this.$canvas = $(`<canvas width="1280" height="720" tabindex=0></canvas>`);
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas); // 将画布添加到页面中
        this.$canvas.focus();

        this.controller = new Controller(this.$canvas);
        this.root.$kof.append($(
            `<div class="kof-head">
            <div class="kof-head-hp-0"><div><div></div></div></div>
            <div class="kof-head-timer">60</div>
            <div class="kof-head-hp-1"><div><div></div></div></div>
            </div>`))

            this.time_left = 60000; // 游戏时间，单位为毫秒
            this.$timer = this.root.$kof.find('.kof-head-timer');
    }

    start() {

    }

    update() {
        this.time_left -= this.timedelta;
        if (this.time_left < 0) {
            this.time_left = 0;

            let [a, b] = this.root.players;
            if (a.status !== 6 && b.status !== 6) {
                a.status = b.status = 6;
                a.frame_current_cnt = b.frame_current_cnt = 0;
                a.vx = b.vx = 0;
            }
        }

        this.$timer.text(parseInt(this.time_left / 1000)); // 更新计时器显示

        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}