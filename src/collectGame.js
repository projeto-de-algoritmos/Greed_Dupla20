
class CollectGame extends Game{
    constructor(timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords){
        super(timeout, map, volume);
        this.player = new Player(playerCoord, map);
        this.inteligentEnemy = new InteligentEnemy(inteligentEnemyCoord, map);
        this.enemies = enemiesCoords.map(ec => new Enemy(ec, map));
        this.objects.push(this.player, ...this.enemies);
    }
    
    update() {
        super.update();
        this.inteligentEnemy.update(this.player);
    
        if (this.isGameOver()) {
            this.end();
        }
    }

    render(){
        super.render();
        this.inteligentEnemy.render()
    }

    end(){
        window.document.querySelector("#lost").classList.add("actived");
        super.end();
    }

    isGameOver() {
        return this.enemies.find(e => e.collide(this.player))
            || this.inteligentEnemy.collide(this.player);
    }
}