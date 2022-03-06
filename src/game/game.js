
class Game {
    constructor(timeout, map, volume) {
        this.timeout = timeout;
        this.map = map;
        this.objects = [this.map]
        this.gameUpdate = 0;
        this.volume = volume;
        this.playRandomSong();
    }

    start() {
        this.gameUpdate = setInterval(() => {
            this.update();
            this.render();
        }, this.timeout);
    }

    update() {
        this.objects.forEach(o => o.update());
    }

    render() {
        this.objects.forEach(o => o.render());
    }

    end() {
        this.stopSong();
        this.playSong('lost');
        this.stop();
    }

    stop(){
        clearInterval(this.gameUpdate);
    }

    playSong(songID) {
        this.stopSong();
        this.song = window.document.querySelector(`#song`)
        this.song.src = `assets/music/${songID}.mp3`;
        this.song.volume = this.volume;
        this.song.play();
    }

    stopSong() {
        if (this.song) {
            console.log(this.song);
            this.song.pause();
        }
    }

    playRandomSong() {
        const songs = 3;
        this.playSong(`music${getRandomInt(1, songs + 1)}`)
    }
}