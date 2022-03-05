class CollectGame extends Game {
    constructor(timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords, starsAttributes) {
        super(timeout, map, volume);
        this.score = 0;
        this.maxWeight = 100;
        this.player = new Player(playerCoord, map);
        this.inteligentEnemy = new InteligentEnemy(inteligentEnemyCoord, map);
        this.enemies = enemiesCoords.map(ec => new Enemy(ec, map));
        this.stars = starsAttributes.map(sa => new Star(sa.coord, map, sa.value, sa.weight, sa.color));
        this.objects.push(this.player, ...this.enemies);
        this.bestValue = knapsack(55, this.stars);
    }

    update() {
        super.update();
        this.inteligentEnemy.update(this.player);

        if (this.isGameOver()) {
            this.end();
        }
    }

    render() {
        super.render();
        this.renderHeader();
        this.inteligentEnemy.render()
    }

    renderHeader() {
        window.document.querySelector("#cabecalho").innerHTML = `
            <h2>Valor Otimo: <span id="valorOtimo">0</span></h2>
            <h2>Score: <span id="score">0</span></h2>
            <h2>Mochila: <span id="espacoGastoMochila">0</span>/<span id="espacoTotalMochila">0</span></h2>
        `;

        window.document.querySelector("#score").innerHTML = this.score;
        window.document.querySelector("#valorOtimo").innerHTML = this.bestValue;
        window.document.querySelector("#espacoGastoMochila").innerHTML = this.player.sack;
        window.document.querySelector("#espacoTotalMochila").innerHTML = this.maxWeight;
    }

    end() {
        window.document.querySelector("#lost").classList.add("actived");
        super.end();
    }

    isGameOver() {
        return this.enemies.find(e => e.collide(this.player))
            || this.inteligentEnemy.collide(this.player);
    }
}