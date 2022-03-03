
const TIMEOUT = 300;
const VOLUME = 0.1;

const songs = [document.getElementById('music2'), document.getElementById('music3')];
const music = songs[getRandomInt(0, 2)];
const lostSong = document.getElementById('lostSong');

let score = 0;
let gameUpdate;

const map = new Map(MAP_DATA, WIDTH, HEIGTH);

const player = new Player(28, 1, map);

const coin = new Coin(11, 10, map);

const inteligentEnemy = new InteligentEnemy(14, 14, map);


const enemies = [
    new Enemy(1, 1, map),
    new Enemy(1, 26, map),
    new Enemy(29, 26, map),
]

function start(hasStarted) {
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

    if (coin.collide(player)) {
        coin.updatePosition();
        score++;
    }

    if (isGameOver()) {
        endGame();
    }
}

function render() {
    renderScore();
    map.render();
    coin.render();
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
}

function isGameOver() {
    return enemies.find(e => e.collide(player))
        || inteligentEnemy.collide(player);
}

function renderScore() {
    window.document.querySelector("#score").innerHTML = score;
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