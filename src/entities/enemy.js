const POSSIBLE_PATHS = [[0, 1], [0, -1], [1, 0], [-1, 0]];


class Enemy {
    constructor(coord, map, image = "enemy") {
        this.map = map;
        this.x = coord.x;
        this.y = coord.y;
        this.image = image;
        this.slow = 0;
        this.vel = {
            x: 1,
            y: 0,
        }
    }

    update() {
        if(this.inSlow()){
            return;
        }

        const possiblePaths = this.getPossiblePaths();
        if (possiblePaths.length > 2) {
            const inverseVel = [-this.vel.x, -this.vel.y];
            [this.vel.x, this.vel.y] = randomPath(possiblePaths.filter(p => !equals(...p, ...inverseVel)));
        }

        while (!this.map.isBlockFree(...this.nextPosition())) {
            [this.vel.x, this.vel.y] = randomVelocity();
        }

        [this.x, this.y] = this.nextPosition();
    }

    inSlow(){
        if (!this.map.hasBlockSlow(this.x, this.y)) {
            return false;
        }  
        if (this.slow === 0) {
            this.slow = this.map.getSlow(this.x, this.y);
            return true;
        }
        this.slow--;
        return this.slow > 0;
    }

    getPossiblePaths() {
        return POSSIBLE_PATHS
            .map(p => add(p, [this.x, this.y]))
            .filter(p => this.map.isBlockFree(...p))
            .map((p, index) => POSSIBLE_PATHS[index]);
    }

    render() {
        this.map.setImage(this.x, this.y, this.image);
    }

    nextPosition() {
        return [this.x + this.vel.x, this.y + this.vel.y];
    }

    collide(obj) {
        return hasCollided(this, obj);
    }
}

function randomVelocity() {
    const randomVel = getRandomBool() ? 1 : -1;
    return getRandomBool() ? [0, randomVel] : [randomVel, 0];
}

function randomPath(paths) {
    return paths[getRandomInt(0, paths.length)];
}