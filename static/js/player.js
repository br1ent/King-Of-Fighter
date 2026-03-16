import { GameObject } from "/static/js/game_object.js";

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
        this.speedy = -2000; // 垂直速度

        this.status = 3; // 角色的状态, 0: 站立, 1: 移动 2: 后退, 3: 跳跃, 4: 攻击, 5: 受击, 6: 死亡
        this.animations = new Map(); // 存储角色的动画帧数据
        this.frame_current_cnt = 0; // 当前动画帧的计数器
    }

    start() {

    }

    update_direction() {
        let players = this.root.players;
        if (players && players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) {
                me.direction = 1; // 如果角色在另一个角色的左侧，则朝右
            } else {
                me.direction = -1; // 如果角色在另一个角色的右侧，则朝左
            }
        }
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
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {
                if (d) {
                    this.vx = this.speedx;
                } else if (a) {
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = this.speedy;
                this.status = 3;
                this.frame_current_cnt = 0;
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
        if (this.status === 3) { // 如果角色处于跳跃状态
            this.vy += this.gravity; // 受重力影响，垂直速度增加
        } 
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
        this.update_direction();
        this.render();
    }

    render() {
        let status = this.status;

        if (this.status === 1 && this.direction * this.vx < 0) {
            status = 2; // 如果角色正在移动但方向与当前速度相反，则切换到后退状态
        }

        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            if (this.direction > 0) {
                let k = parseInt(this.frame_current_cnt / obj.frame_rate % obj.frame_cnt);
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            } else {
                this.ctx.save();
                this.ctx.scale(-1, 1); // 水平翻转画布
                this.ctx.translate(-this.root.gamemap.$canvas.width(), 0); // 将画布平移到正确的位置

                let k = parseInt(this.frame_current_cnt / obj.frame_rate % obj.frame_cnt);
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.gamemap.$canvas.width() - this.x - image.width, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore();
            }
        }

        if (status === 4 && this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1)) {
            this.status = 0; // 攻击动画播放完毕后切换回站立状态
        }
        this.frame_current_cnt ++;
    }
}