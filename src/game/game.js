
class Game {
    constructor(timeout, map, volume, introDuration) {
        this.timeout = timeout;
        this.map = map;
        this.objects = [this.map]
        this.gameUpdate = 0;
        this.volume = volume;
        this.introDuration = introDuration;
        this.running = false;
        this.kill = false;
        
        this.playRandomSong();
        this.listenKeys();
    }

    start(){
        this.running = true;
        this.render();
        this.startAnimation();
        setTimeout(() => this.run(), this.introDuration*1000);
    }

    run() {
        this.running = true;
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
        this.pause();
        this.kill = true;
    }

    pause(){
        this.running = false;
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
            this.song.pause();
        }
    }

    playRandomSong() {
        const songs = 3;
        this.playSong(`music${getRandomInt(1, songs + 1)}`)
    }

    focusAnimation(objects){
        objects.forEach(o => {
            const cell = this.map.getCellElement(o.x, o.y);
            cell.classList.add("focusAnimation");
            cell.style.animationDuration = `${this.introDuration}s`;
        });
    }

    startAnimation(){}

    listenKeys(){
        document.addEventListener('keyup', (event) => {
            if(this.kill) return;
            if(event.code == "KeyP"){
                this.pause();
            }
            if(event.code == "Space" && !this.running){
                this.run();
            }
        }, false);
    }
}