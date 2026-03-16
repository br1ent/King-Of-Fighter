import { GameObject } from "../game_object/base.js";

export class Player extends GameObject {
    constructor(root, info) {
        super();
        
        this.root = root;
        this.ctx = this.root.gamemap.ctx;
        this.pressed_keys = this.root.gamemap.controller.pressed_keys; // 获取控制器的按键状态

        this.id = info.id;
        this.x = info.x; // 角色的初始水平位置
        this.y = info.y; // 角色的初始垂直位置
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.vx = 0;
        this.vy = 0;
        this.direction = 1; // 角色的朝向，1表示向右，-1表示向左
        this.gravity = 50; // 重力加速度

        this.speedx = 400; // 水平速度
        this.speedy = -1000; // 垂直速度

        this.status = 3; // 角色的状态, 0: 站立, 1: 移动 2: 跳跃, 3: 攻击, 4: 受击, 5: 死亡
    }

    start() {

    }
    
    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');
            a = this.pressed_keys.has('a');
            d = this.pressed_keys.has('d');
            space = this.pressed_keys.has(' ');
        } else {
            w = this.pressed_keys.has('ArrowUp');
            a = this.pressed_keys.has('ArrowLeft');
            d = this.pressed_keys.has('ArrowRight');
            space = this.pressed_keys.has('Enter');
        }

        if (this.status === 0 || this.status === 1) { // 只有在站立和移动状态下才允许控制
            if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 2;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_move() {
        this.vy += this.gravity; // 受重力影响，垂直速度增加
        this.x  += this.vx * this.timedelta / 1000; // 根据水平速度和时间间隔更新水平位置
        this.y  += this.vy * this.timedelta / 1000; // 根据垂直速度和时间间隔更新垂直位置

        if (this.y > 450) { // 如果角色落地
            this.y = 450;
            this.vy = 0;
            this.status = 0;
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.gamemap.$canvas.width()) {
            this.x = this.root.gamemap.$canvas.width() - this.width;
        }
    }

    update() {
        this.update_control();
        this.update_move();    
        this.render();
    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}