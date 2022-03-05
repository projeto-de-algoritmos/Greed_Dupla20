
class Star {

    constructor(coord, map, value, weight, color = "star") {
        this.map = map;
        this.x = coord.x;
        this.y = coord.y;
        this.value = value;
        this.weight = weight;
        this.color = color;
    }

    update() { }

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
        this.map.setImage(this.x, this.y, this.color);
    }

    collide(obj) {
        return hasCollided(this, obj);
    }
}