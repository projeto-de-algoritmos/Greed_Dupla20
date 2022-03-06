class CollectGame extends Game {
    constructor(timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords, starsAttributes, totalSpace) {
        super(timeout, map, volume);
        this.map = map;
        this.score = 0;
        this.totalSpace = totalSpace;
        this.player = new Player(playerCoord, map);
        this.inteligentEnemy = new InteligentEnemy(inteligentEnemyCoord, map);
        this.enemies = enemiesCoords.map(ec => new Enemy(ec, map));
        this.stars = starsAttributes.map(sa => new Star(sa.coord, map, sa.value, sa.weight, sa.color));
        this.objects.push(...this.stars, this.player, ...this.enemies);
        [this.bestValue, this.bestStars] = knapsack(totalSpace, this.stars);
        this.header = this.createHeader();
    }

    start(){
        this.render();
        this.startBestStarAnimation();
        setTimeout(() => super.start(), 5000);
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
        this.inteligentEnemy.render()
        this.renderHeader();
    }

    renderHeader() {
        this.header.score.innerText = this.score;
        this.header.bestValue.innerText = this.bestValue;
        this.header.sack.innerText = this.player.sack;
        this.header.totalSpace.innerText = this.totalSpace;
    }

    end() {
        window.document.querySelector("#lost").classList.add("actived");
        super.end();
    }

    isGameOver() {
        return this.enemies.find(e => e.collide(this.player))
            || this.inteligentEnemy.collide(this.player);
    }

    createHeader(){
        window.document.querySelector("#cabecalho").innerHTML = `
            <h2>Valor Otimo: <span id="valorOtimo">0</span></h2>
            <h2>Score: <span id="score">0</span></h2>
            <h2>Mochila: <span id="espacoGastoMochila">0</span>/<span id="espacoTotalMochila">0</span></h2>
        `;
        return {
            score: window.document.querySelector("#score"),
            bestValue: window.document.querySelector("#valorOtimo"),
            sack: window.document.querySelector("#espacoGastoMochila"),
            totalSpace: window.document.querySelector("#espacoTotalMochila"),
        }
    }

    startBestStarAnimation(){
        this.bestStars.forEach(s => {
            const cell = this.map.getCellElement(s.x, s.y);
            cell.classList.add("bestStar");
        });
    }
}