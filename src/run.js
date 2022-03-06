const timeout = 300;
const volume = 0.1;

function onFreeGame() {
    disableInitialScreen()
    runFreeGame();
}

function onCollectGame() {
    disableInitialScreen()
    runCollectGame();
}

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

function runCollectGame() {
    const map = new Map(randomMapData());
    const playerCoord = new Coord(28, 1);
    const inteligentEnemyCoord = new Coord(14, 14);
    const enemiesCoords = [
        new Coord(1, 1),
        new Coord(1, 26),
        new Coord(29, 26),
    ]
    const starsAttributes = [
        { value: 10, weight: 20, color: "starAmarela" },
        { value: 5, weight: 10, color: "starAzul" },
        { value: 1, weight: 5, color: "starCobre" },
        { value: 10, weight: 10, color: "starRosa" },
        { value: 10, weight: 10, color: "starRoxo" },
    ]
    const starsCount = 10;
    const totalSpace = 55;
    const introDuration = 8;

    const freeGame = new CollectGame(
        timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords, starsAttributes, starsCount, totalSpace, introDuration
    )

    freeGame.start();
}

function disableInitialScreen() {
    window.document.querySelector("#initialScreen").classList.remove("actived")
    window.document.querySelector("#initialScreen").classList.add("disabled")
}