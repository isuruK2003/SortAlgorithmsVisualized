class Bar {
    constructor(height) {
        this.height = height;
        this.barElem = document.createElement("div");
        this.barElem.className = "bar";
        this.barElem.style.height = `${height}%`;
    }

    getBarElem() {
        return this.barElem;
    }

    getHeight() {
        return this.height;
    }
}

class BarContainer {
    constructor(id, totalBars) {
        this.id = id;
        this.totalBars = totalBars;
        this.barContainerElem = document.getElementById(id);
        this.bars = [];
        this.init();
        this.render();
        this.shuffle();
    }

    init() {
        for (let i = 0; i < this.totalBars; i++) {
            const height = Math.round(((i + 1) / this.totalBars) * 100);
            const newBar = new Bar(height);
            this.bars.push(newBar);
        }
    }

    render() {
        this.barContainerElem.innerHTML = "";
        this.bars.forEach((bar) => {
            this.barContainerElem.appendChild(
                bar.getBarElem()
            );
        });
    }

    shuffle() {
        this.bars.sort(() => {
            return Math.random() - 0.5;
        });
        this.render();
    }

    swap(i, j) {
        const temp = this.bars[i];
        this.bars[i] = this.bars[j];
        this.bars[j] = temp;
        this.render();
    }

    getSize() {
        return this.bars.length;
    }

    getBarByIndex(i) {
        return this.bars[i];
    }

    setBarByIndex(i, bar) {
        this.bars[i] = bar;
    }
}