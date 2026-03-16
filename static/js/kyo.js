import { Player } from "/static/js/player.js";
import { GIF } from "/static/js/utils/gif.js";

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);
        
        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let offsets = [0, -22, -22, -140, 0, 0, 0];
        for (let i = 0; i < 7; i ++) {
            let gif = GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`);
            this.animations.set(i, {
                gif: gif,
                frame_cnt: 0, // 动画帧的数量
                frame_rate: 10, // 每秒播放的帧数
                offset_y: offsets[i],
                lodaded: false,
                scale: 2, // 动画的缩放比例
            });

            gif.onload = () => {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;

                if (i === 3) {
                    obj.frame_rate = 8;
                }
            }
        }   
    }
}