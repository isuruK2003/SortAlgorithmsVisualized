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

function main() {
    const sortButton = new UIElement("sort");
    const shuffleButton = new UIElement("shuffle");
    const algorithmSelector = new UIElement("sort-algo");
    const noOfBarsSelector = new UIElement("no-of-bars");
    const noOfBarsDisplay = new UIElement("no-of-bars-display");
    const delaySelector = new UIElement("delay");
    const delayDisplay = new UIElement("delay-display");

    let isSorting = false;
    let delay = 100; // ms
    let barContainer = new BarContainer("bars", 10);

    const algorithms = [
        { name: "Bubble Sort", algorithm: bubbleSort },
        { name: "Selection Sort", algorithm: selectionSort },
        { name: "Insertion Sort", algorithm: insertionSort }
    ];

    algorithmSelector.setInnerHTML(
        algorithms.map(algo => `<option value="${algo.name}">${algo.name}</option>`).join("")
    );

    sortButton.addEventListener("click", async () => {
        if (!isSorting) {
            isSorting = true;
            const selectedAlgorithm = algorithmSelector.elem.value;
            const algorithm = algorithms.find(algo => algo.name === selectedAlgorithm)?.algorithm;
            if (algorithm) {
                await algorithm(barContainer, delay);
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

    noOfBarsSelector.addEventListener("change", () => {
        if (!isSorting) {
            const noOfBarsSelected = noOfBarsSelector.elem.value;
            if (noOfBarsSelected) {
                barContainer = new BarContainer("bars", noOfBarsSelected);
                noOfBarsDisplay.setInnerHTML(noOfBarsSelected);
            }
        }
    });

    delaySelector.addEventListener("change", () => {
        const delaySelected = delaySelector.elem.value;
        if (delaySelected) {
            delay = delaySelected;
            delayDisplay.setInnerHTML(delaySelected);
        }
    });
}

document.addEventListener("DOMContentLoaded", main);
