const timeout = 300;
const volume = 0.1;

function onFreeGame() {
    disableInitialScreen()
    runFreeGame();
}

function onCollectGame() {
    playerName = window.prompt(`Insira seu nome:`).toUpperCase();
    disableInitialScreen()
    runCollectGame();
}

// Modo Livre

function runFreeGame() {
    const map = new Map(randomMapData());
    const playerCoord = new Coord(28, 1);
    const inteligentEnemyCoord = new Coord(14, 14);
    const enemiesCoords = [
        new Coord(1, 1),
        new Coord(1, 26),
        new Coord(29, 26),
    ]
    const introDuration = 4;

    const freeGame = new FreeGame(
        timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords, introDuration
    )

    freeGame.start();
}


// Modo Coletor

let playerName;
let accumulateScore = {
    value: 0,
}
let starsCount = 9;
let totalSpace = 50;
let collectGame;

const STARS_ATTRIBUTES = [
    { value: 15, weight: 1, color: "starRoxo" },
    { value: 1, weight: 5, color: "starCobre" },
    { value: 5, weight: 10, color: "starAzul" },
    { value: 25, weight: 15, color: "starRosa" },
    { value: 10, weight: 20, color: "starAmarela" },
]

function runCollectGame() {
    totalSpace += 10;
    starsCount += 1;

    createCollectGame(playerName, accumulateScore, STARS_ATTRIBUTES, starsCount, totalSpace).start();
}

function createCollectGame(playerName, accumulateScore, starsAttributes, starsCount, totalSpace) {
    const map = new Map(nextMap());
    const playerCoord = new Coord(28, 1);
    const inteligentEnemyCoord = new Coord(14, 14);
    const enemiesCoords = [
        new Coord(1, 1),
        new Coord(1, 26),
        new Coord(29, 26),
    ]

    const introDuration = 8;

    return new CollectGame(
        playerName, accumulateScore, timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords, starsAttributes, starsCount, totalSpace, introDuration
    )
}

function disableInitialScreen() {
    window.document.querySelector("#initialScreen").classList.remove("actived")
    window.document.querySelector("#initialScreen").classList.add("disabled")
}