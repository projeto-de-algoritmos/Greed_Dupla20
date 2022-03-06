
class InteligentEnemy extends Enemy {
    constructor(coord, map) {
        super(coord, map, "enemy2")
    }

    update(player) {
        if(this.inSlow()){
            return;
        }

        const shortestPaths = dijkstra(this.map, this.x, this.y, player.x, player.y);

        if (shortestPaths === undefined) {
            return;
        }

        [this.x, this.y] = shortestPaths.nextPosition(player.x, player.y);
    }
}