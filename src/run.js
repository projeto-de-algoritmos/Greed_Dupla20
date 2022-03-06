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
    const starCoord = new Coord(11, 10);
    const inteligentEnemyCoord = new Coord(14, 14);
    const enemiesCoords = [
        new Coord(1, 1),
        new Coord(1, 26),
        new Coord(29, 26),
    ]

    const freeGame = new FreeGame(
        timeout, map, volume, playerCoord, starCoord, inteligentEnemyCoord, enemiesCoords
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
        { coord: new Coord(11, 10), value: 10, weight: 20, color: "starAmarela" },
        { coord: new Coord(11, 11), value: 5, weight: 10, color: "starAzul" },
        { coord: new Coord(11, 12), value: 1, weight: 5, color: "starCobre" },
        { coord: new Coord(11, 13), value: 10, weight: 10, color: "starRosa" },
        { coord: new Coord(11, 14), value: 10, weight: 10, color: "starRoxo" },
    ]
    const totalSpace = 55;

    const freeGame = new CollectGame(
        timeout, map, volume, playerCoord, inteligentEnemyCoord, enemiesCoords, starsAttributes, totalSpace
    )

    freeGame.start();
}

function disableInitialScreen() {
    window.document.querySelector("#initialScreen").classList.remove("actived")
    window.document.querySelector("#initialScreen").classList.add("disabled")
}