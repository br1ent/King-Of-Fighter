export class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;
        this.pressed_keys = new Set(); // 存储当前按下的键
        this.start();
    }
    
    start() {
        let outer = this;
        this.$canvas.keydown(e => {
            outer.pressed_keys.add(e.key);
        })

        this.$canvas.keyup(e => {
            outer.pressed_keys.delete(e.key);
        });
    }
}