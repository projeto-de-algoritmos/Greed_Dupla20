class FreeGame extends Game {
    constructor(timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords, introDuration) {
        super(timeout, map, volume, introDuration);
        this.score = 0;
        this.player = new Player(playerCoord, map);
        this.star = new Star(map);
        this.inteligentEnemy = new InteligentEnemy(inteligentEnemyCoord, map);
        this.enemies = enemiesCoords.map(ec => new Enemy(ec, map));
        this.objects.push(this.player, ...this.enemies, this.star);
    }

    update() {
        super.update();
        this.inteligentEnemy.update(this.player);
        
        if (this.star.collide(this.player)) {
            this.star.updatePosition();
            this.score++;
        }

        if (this.isGameOver()) {
            this.end();
        }
    }

    render() {
        super.render();
        this.renderScore();
        this.inteligentEnemy.render();
    }

    renderScore() {
        window.document.querySelector("#cabecalho").innerHTML = `<h2>Score: <span id="score">${this.score}</span></h2>`;
    }

    end() {
        window.document.querySelector("#lost").classList.add("actived");
        super.end();
    }

    isGameOver() {
        return this.enemies.find(e => e.collide(this.player))
            || this.inteligentEnemy.collide(this.player);
    }

    startAnimation(){
        super.focusAnimation([...this.objects.slice(1), this.inteligentEnemy]);
    }
}