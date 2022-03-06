const COLORS = ['#0D0E14', 'lightgray', '#FFEA47', '#FF621F', '#FF2921', '#3D3BD9', '#943BD9', '#52ff6c', 'pink']
const SLOW_TIME = [2, 5, 10]

class Map {
    constructor(mapData) {
        this.data = mapData.data;
        this.width = mapData.width;
        this.height = mapData.height;
    }

    isBlockFree(x, y) {
        return this.getBlock(x, y) > 0;
    }

    hasBlockSlow(x, y) {
        return this.getBlock(x, y) > 1;
    }

    isWithinBounds(x, y) {
        return x >= 0 && x < this.height && y >= 0 && y < this.width
    }

    update(){}

    render() {
        let html = ''
        for (let row = 0; row < this.height; row++) {
            html += '<tr>'
            for (let column = 0; column < this.width; column++) {
                let color = COLORS[this.getBlock(row, column)];
                html += `<td id="${this.getID(row, column)}" class="celula"style="background-color: ${color}"></td>`
            }
            html += '</tr>'
        }
        window.document.querySelector("#game").innerHTML = html;
    }

    getBlock(x, y) {
        return this.data[x][y];
    }

    getID(x, y) {
        return `block-${x}-${y}`;
    }

    getColor(value) {
        return COLORS[value];
    }

    getCellElement(x, y){
        return window.document.querySelector(`#${this.getID(x, y)}`);
    }

    setColor(x, y, color) {
        const cell = this.getCellElement(x, y);
        cell.style.backgroundColor = this.getColor(color);
    }

    setImage(x, y, type) {
        const cell = this.getCellElement(x, y);
        cell.innerHTML = `<img src="assets/images/${type}.gif" />`;
    }

    getSlow(x, y) {
        if (this.data[x][y] == 1)
            return 1;
        return SLOW_TIME[this.getBlock(x, y) - 2];
    }

}