
const TIMEOUT = 300;
const VOLUME = 0.1;

const songs = [document.getElementById('music2'), document.getElementById('music3')];
const music = songs[getRandomInt(0, songs.length)];
const lostSong = document.getElementById('lostSong');

const map = new Map(MAP_DATA, WIDTH, HEIGTH);

const player = new Player(28, 1, map);

const stars = [
    new Star(11, 10, map, 10, 20, "Amarela"),
    new Star(11, 14, map, 5, 10, "Azul"),
    new Star(11, 13, map, 1, 5, "Cobre"),
    new Star(11, 12, map, 10, 10, "Rosa"),
    new Star(11, 11, map, 10, 10, "Roxo"),
]

const inteligentEnemy = new InteligentEnemy(14, 14, map);

const enemies = [
    new Enemy(1, 1, map),
    new Enemy(1, 26, map),
    new Enemy(29, 26, map),
]

let bestValue = knapsack(55, stars);
let maxWeight = 50;
let score = 0;
let gameUpdate;
let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

function start() {
    renderValuesTable();
    renderHighscore();
    map.render();
    gameUpdate = setInterval(() => {
        update();
        render();
    }, TIMEOUT);
}

function update() {
    enemies.forEach(j => j.update());
    player.update();
    inteligentEnemy.update(player);
    stars.forEach(function (star) {
        if (star.collide(player)) {
            star.updatePosition();
            score += star.value;
            player.sack += star.weight;
        }
    });

    if (isGameOver()) {
        endGame();
    }
}

function render() {
    renderHeader();
    map.render();
    stars.forEach(star => star.render());
    player.render();
    enemies.forEach(j => j.render());
    inteligentEnemy.render()
}

function endGame() {
    window.document.querySelector("#lost").classList.add("actived")
    music.pause();
    lostSong.volume = VOLUME;
    lostSong.play();
    clearInterval(gameUpdate);
    setHighscore();
    renderHighscore();
}

function isGameOver() {
    return enemies.find(e => e.collide(player))
        || inteligentEnemy.collide(player)
        || player.sack > maxWeight;
}

function setHighscore() {
    if (highscores.length < 5 || score > highscores[highscores.length - 1].score) {
        if (highscores.length == 5)
            highscores.pop();

        const playerName = window.prompt(`Insira seu nome:`);

        highscores.push({ score: score, player: playerName });
        highscores.sort((a, b) => a.score > b.score ? -1 : 1);
        localStorage.setItem('highscores', JSON.stringify(highscores));
    }
}

function renderHeader() {
    window.document.querySelector("#score").innerHTML = score;
    window.document.querySelector("#valorOtimo").innerHTML = bestValue;
    window.document.querySelector("#espacoGastoMochila").innerHTML = player.sack;
    window.document.querySelector("#espacoTotalMochila").innerHTML = maxWeight;
}

function renderValuesTable() {
    var html = `<caption>Tabela de Valores</caption>
                <tr>
                    <th>Estrela</th>
                    <th>Peso</th>
                    <th>Valor</th>
                </tr>`;
    stars.forEach(function (star) {
        html += `<tr>
                    <td><img src="src/images/star${star.color}.gif"/></td>
                    <td>${star.weight}</td>
                    <td>${star.value}</td>
                </tr>`
    });

    window.document.querySelector("#tabelaValores").innerHTML = html;
}

function renderHighscore() {
    var html = `<caption>Melhores Pontuacoes</caption>
                <tr>
                    <th>Jogador</th>
                    <th>Pontuacao</th>
                </tr>`;

    highscores.forEach(function (points) {
        html += `<tr>
                    <td>${points.player}</td>
                    <td>${points.score}</td>
                </tr>`
    });
    window.document.querySelector("#highscore").innerHTML = html;
}

function startGame() {
    let btn = document.querySelector('#initialScreen');

    btn.onclick = (event) => {
        window.document.querySelector("#initialScreen").classList.remove("actived")
        window.document.querySelector("#initialScreen").classList.add("disabled")
        music.volume = VOLUME;
        music.play();
        start();
    };
}

startGame()