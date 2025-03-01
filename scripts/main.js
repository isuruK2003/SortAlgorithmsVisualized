class UIElement {
    constructor(id) {
        this.elem = document.getElementById(id);
    }

    addEventListener(eventName, func) {
        this.elem.addEventListener(eventName, func);
    }

    setInnerHTML(content) {
        this.elem.innerHTML = content;
    }
}

const sortButton = new UIElement("sort");
const shuffleButton = new UIElement("shuffle");
const sortingAlgorithm = new UIElement("sort-algo");


function main() {
    let isSorting = false;
    let barContainer = new BarContainer("bars", 10);

    const sortingAlgorithms = [
        { name: "Bubble Sort", algorithm: bubbleSort },
        { name: "Selection Sort", algorithm: selectionSort }
    ];

    sortingAlgorithm.setInnerHTML(
        sortingAlgorithms.map(algo => `<option value="${algo.name}">${algo.name}</option>`).join("")
    );

    sortButton.addEventListener("click", async () => {
        if (!isSorting) {
            isSorting = true;
            const selectedAlgorithm = sortingAlgorithm.elem.value;
            const algorithm = sortingAlgorithms.find(algo => algo.name === selectedAlgorithm)?.algorithm;
            if (algorithm) {
                await algorithm(barContainer, 100);
            }
            isSorting = false;
        } else {
            alert("Wait until the sorted")
        }
    });

    shuffleButton.addEventListener("click", () => {
        if (!isSorting) {
            barContainer.shuffle();
        }
    });
}

document.addEventListener("DOMContentLoaded", main);
