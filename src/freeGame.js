
class FreeGame extends Game{
    constructor(timeout, map, volume, playerCoord, coinCoord, inteligentEnemyCoord, enemiesCoords){
        super(timeout, map, volume);
        this.score = 0;
        this.player = new Player(playerCoord, map);
        this.coin = new Coin(coinCoord, map);
        this.inteligentEnemy = new InteligentEnemy(inteligentEnemyCoord, map);
        this.enemies = enemiesCoords.map(ec => new Enemy(ec, map));
        this.objects.push(this.player, ...this.enemies, this.coin);
    }
    
    update() {
        super.update();
        this.inteligentEnemy.update(this.player);
    
        if (this.coin.collide(this.player)) {
            this.coin.updatePosition();
            this.score++;
        }
    
        if (this.isGameOver()) {
            this.end();
        }
    }

    render(){
        super.render();
        this.inteligentEnemy.render()
        this.renderScore();
    }

    renderScore(){
        window.document.querySelector("#score").innerHTML = this.score;
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