class CollectGame extends Game {
    constructor(playerName, accumulateScore, timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords, starsAttributes, starsCount, totalSpace, introDuration) {
        super(timeout, map, volume, introDuration);

        this.header = this.createHeader();
        this.map = map;

        this.score = 0;
        this.accumulateScore = accumulateScore;
        this.totalSpace = totalSpace;

        this.highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        this.renderHighscoreTable();

        this.playerName = playerName;
        this.player = new Player(playerCoord, map);
        this.inteligentEnemy = new InteligentEnemy(inteligentEnemyCoord, map);
        this.enemies = enemiesCoords.map(ec => new Enemy(ec, map));
        this.stars = this.createStars(starsAttributes, starsCount);
        this.lightestStar = this.getLightestStar();

        this.valuesTable = this.createValuesTable(starsAttributes);

        this.objects.push(...this.stars, this.player, ...this.enemies);

        [this.bestValue, this.bestStars] = knapsack(totalSpace, this.stars);
    }

    startAnimation() {
        super.focusAnimation([...this.bestStars, this.player]);
    }

    update() {
        super.update();
        this.inteligentEnemy.update(this.player);

        const starCollided = this.stars.find(s => s.collide(this.player));
        if (starCollided) {
            this.removeStar(starCollided);
            this.player.sack += starCollided.weight;

            if (this.player.sack <= this.totalSpace) {
                this.accumulateScore.value += starCollided.value;
                this.score += starCollided.value;
            }

        }

        if (this.isGameOver()) {
            this.end();
        }

        if (this.isLevelClear()) {
            this.nextLevel();
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
        this.header.accumulateScore.innerText = this.accumulateScore.value;
    }

    end() {
        window.document.querySelector("#lost").classList.add("actived");
        this.setHighscore();
        this.renderHighscoreTable();
        super.end();
    }

    nextLevel() {
        this.setHighscore();
        this.renderHeader();
        this.renderNextLevelHeader();
        this.renderHighscoreTable();
        super.end();
    }

    isGameOver() {
        return this.enemies.find(e => e.collide(this.player))
            || this.inteligentEnemy.collide(this.player);
    }

    isLevelClear() {
        return this.stars.length === 0 || this.lightestStar.weight + this.player.sack > this.totalSpace;
    }

    getLightestStar() {
        return this.stars.reduce((prev, current) => (prev.weight < current.weight) ? prev : current)
    }

    removeStar(star) {
        this.stars = this.stars.filter(s => s !== star);
        this.objects = this.objects.filter(o => o !== star)
        this.lightestStar = this.getLightestStar();
    }

    createHeader() {
        const header = window.document.querySelector("#cabecalho");
        header.innerHTML = `
            <div id="collectGameScore">
                <h2 class="score">Score: <span id="score">0</span></h2>
                <h2 class="score">Mochila: <span id="espacoGastoMochila">0</span>/<span id="espacoTotalMochila">0</span></h2>
                <h2 class="score">Score otimo: <span id="valorOtimo">0</span></h2>
                <h2 class="score">Score acumulado: <span id="acumulado">0</span></h2>
            </div>
        `;
        return {
            element: header,
            score: window.document.querySelector("#score"),
            bestValue: window.document.querySelector("#valorOtimo"),
            sack: window.document.querySelector("#espacoGastoMochila"),
            totalSpace: window.document.querySelector("#espacoTotalMochila"),
            accumulateScore: window.document.querySelector("#acumulado"),
        }
    }

    createValuesTable(starsAttributes) {
        const valuesTable = window.document.querySelector("#valuesTable");

        let html = `<caption>Tabela de Valores</caption>
            <tr>
                <th>Estrela</th>
                <th>Peso</th>
                <th>Valor</th>
            </tr>`;

        starsAttributes.forEach(sa => {
            html += `<tr>
                <td><img src="assets/images/${sa.color}.gif"/></td>
                <td>${sa.weight}</td>
                <td>${sa.value}</td>
                </tr>`
        });

        valuesTable.classList.remove("disabled");
        valuesTable.innerHTML = html;
        return valuesTable;
    }

    renderHighscoreTable() {
        const highscoreTable = window.document.querySelector("#highscore")


        let html = `<caption>Melhores Pontuacoes</caption>
        <tr>
        <th>Jogador</th>
        <th>Pontuacao</th>
        </tr>`;

        this.highscores.forEach(h => {
            html += `<tr>
            <td>${h.player}</td>
            <td>${h.score}</td>
            </tr>`
        });

        highscoreTable.classList.remove("disabled");
        highscoreTable.innerHTML = html;
    }

    renderNextLevelHeader() {
        this.header.element.innerHTML = `
            <h1>Parabens!</h1>
            <h2>Nao ha mais estrelas que caibam na mochila!</h2>
            <button onclick="runCollectGame()">Proxima Fase</button>
        ` + this.header.element.innerHTML;
    }

    createStars(starsAttributes, starsCount) {
        const randomStarAttr = () => starsAttributes[getRandomInt(0, starsAttributes.length)];
        const createStar = starAttr => new Star(this.map, starAttr.value, starAttr.weight, starAttr.color);
        const stars = [];

        for (let i = 0; i < starsCount; i++) {
            stars.push(createStar(randomStarAttr()));
        }
        return stars;
    }

    setHighscore() {
        const player = this.highscores.find(h => h.player === this.playerName)

        if (player) {
            player.score = this.accumulateScore.value;
        } else {
            this.highscores.push({ score: this.accumulateScore.value, player: this.playerName });
        }

        this.highscores.sort((a, b) => b.score - a.score);
        this.highscores = this.highscores.slice(0, 5);

        localStorage.setItem('highscores', JSON.stringify(this.highscores));
    }
}