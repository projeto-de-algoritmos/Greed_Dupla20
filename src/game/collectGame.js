class CollectGame extends Game {
    constructor(timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords, starsAttributes, starsCount, totalSpace, introDuration) {
        super(timeout, map, volume, introDuration);

        this.header = this.createHeader();
        this.map = map;

        this.score = 0;
        this.totalSpace = totalSpace;
        this.highscores = JSON.parse(localStorage.getItem('highscores')) || [];

        this.player = new Player(playerCoord, map);
        this.inteligentEnemy = new InteligentEnemy(inteligentEnemyCoord, map);
        this.enemies = enemiesCoords.map(ec => new Enemy(ec, map));
        this.stars = this.createStars(starsAttributes, starsCount);

        this.valuesTable = this.createValuesTable(starsAttributes);
        this.highscoreTable = this.createHighscoreTable();

        this.objects.push(...this.stars, this.player, ...this.enemies);

        [this.bestValue, this.bestStars] = knapsack(totalSpace, this.stars);
    }

    update() {
        super.update();
        this.inteligentEnemy.update(this.player);

        const starCollided = this.stars.find(s => s.collide(this.player));
        if (starCollided) {
            this.stars = this.stars.filter(s => s !== starCollided);
            this.objects = this.objects.filter(o => o !== starCollided)
            this.score += starCollided.value;
            this.player.sack += starCollided.weight;
        }

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
        this.setHighscore();
        this.highscoreTable = this.createHighscoreTable();
        super.end();
    }

    isGameOver() {
        return this.enemies.find(e => e.collide(this.player))
            || this.inteligentEnemy.collide(this.player)
            || this.player.sack > this.totalSpace;
    }

    createHeader() {
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

    createValuesTable(starsAttributes) {
        window.document.querySelector("#valuesTable").classList.remove("disabled");

        var html = `<caption>Tabela de Valores</caption>
                <tr>
                    <th>Estrela</th>
                    <th>Peso</th>
                    <th>Valor</th>
                </tr>`;

        starsAttributes.forEach(function (star) {
            html += `<tr>
                    <td><img src="assets/images/${star.color}.gif"/></td>
                    <td>${star.weight}</td>
                    <td>${star.value}</td>
                </tr>`
        });

        window.document.querySelector("#valuesTable").innerHTML = html;
        return window.document.querySelector("#valuesTable");
    }

    createHighscoreTable() {
        window.document.querySelector("#highscore").classList.remove("disabled");

        var html = `<caption>Melhores Pontuacoes</caption>
                <tr>
                    <th>Jogador</th>
                    <th>Pontuacao</th>
                </tr>`;

        this.highscores.forEach(function (highscore) {
            html += `<tr>
                    <td>${highscore.player}</td>
                    <td>${highscore.score}</td>
                </tr>`
        });

        window.document.querySelector("#highscore").innerHTML = html;
        return window.document.querySelector("#highscore");
    }

    startAnimation() {
        super.focusAnimation([...this.bestStars, this.player]);
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
        if (this.highscores.length < 5 || this.score > this.highscores[this.highscores.length - 1].score) {
            if (this.highscores.length == 5)
                this.highscores.pop();

            const playerName = window.prompt(`Insira seu nome:`);

            this.highscores.push({ score: this.score, player: playerName });
            this.highscores.sort((a, b) => a.score > b.score ? -1 : 1);
            localStorage.setItem('highscores', JSON.stringify(this.highscores));
        }
    }
}