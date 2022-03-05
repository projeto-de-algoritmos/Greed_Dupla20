
class Coin {

    constructor(coord, map) {
        this.map = map;
        this.x = coord.x;
        this.y = coord.y;
    }

    update(){}

    updatePosition() {
        [this.x, this.y] = this.randomPosition();

        while (!this.map.isBlockFree(this.x, this.y)) {
            [this.x, this.y] = this.randomPosition();
        }
    }

    randomPosition() {
        const x = getRandomInt(0, this.map.height);
        const y = getRandomInt(0, this.map.width);
        return [x, y];
    }

    render() {
        this.map.setImage(this.x, this.y, "coin");
    }

    collide(obj) {
        return hasCollided(this, obj);
    }
}