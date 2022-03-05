function setup() {
    let btn = document.querySelector('#initialScreen');

    btn.onclick = (event) => {
        window.document.querySelector("#initialScreen").classList.remove("actived")
        window.document.querySelector("#initialScreen").classList.add("disabled")
        start();
    };
}

function start(){
    const timeout = 300;
    const volume = 0.1;

    const map = new Map(MAP_DATA, WIDTH, HEIGTH);
    const playerCoord = new Coord(28, 1);
    const coinCoord = new Coord(11, 10);
    const inteligentEnemyCoord = new Coord(14, 14);
    const enemiesCoords = [
        new Coord(1, 1),
        new Coord(1, 26),
        new Coord(29, 26),
    ]

    const freeGame = new FreeGame(
        timeout, map, volume, playerCoord, coinCoord, inteligentEnemyCoord, enemiesCoords
    )

    freeGame.start();
}

setup()