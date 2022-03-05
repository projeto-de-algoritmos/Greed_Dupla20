
class Star {

    constructor(x, y, map, value, weight, color) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.value = value;
        this.weight = weight;
        this.color = color;
    }

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
        this.map.setImage(this.x, this.y, "star" + this.color);
    }

    collide(obj) {
        return hasCollided(this, obj);
    }
}