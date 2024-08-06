const maxBarHeight = 100;
const minBarHeight = 0;
const barsElem = document.getElementsByClassName("bars")[0];

var sleepTimeMillis = parseInt(document.getElementById("sort-delay").value);
var nBars;
var barHeights = []

function shuffle() { 
    for (let i = barHeights.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [barHeights[i], barHeights[j]] = [barHeights[j], barHeights[i]]; 
    } 
    return barHeights; 
}

function loadBarHeights() {
    barHeights = [];
    nBars = parseInt(document.getElementById("no-of-elements").value);
    console.log("No. of elements: " + nBars);
    for (let n = 0; n < nBars; n++) {
        let height = Math.floor((n / nBars) * (maxBarHeight - minBarHeight));
        barHeights.push(height);
    }
    shuffle();
}

function makeBars() {
    barsElem.innerHTML = '';
    barsElem.style['grid-template-columns'] = `repeat(${nBars}, 1fr)`;
    for (let i = 0; i < barHeights.length; i++) {
        let heightPercentage = parseInt((barHeights[i] / (maxBarHeight - minBarHeight)) * 100);
        let heightPercentageString = heightPercentage + "%";
        let newBarElement = document.createElement("div");
        newBarElement.style.height = heightPercentageString;
        newBarElement.className = "bar";
        barsElem.appendChild(newBarElement);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function partition(start, end) {
    let i = start - 1;

    for (let j = start; j <= end; j++) {
        if (barHeights[j] < barHeights[end] || j == end) {
            i++;
            let temp = barHeights[j];
            barHeights[j] = barHeights[i];
            barHeights[i] = temp;
            makeBars();
            await sleep(sleepTimeMillis);
        }
    }

    return i;
}

async function QuickSortVisualized(start, end) {
    if (end <= start) return;

    let pivot = await partition(start, end);
    await QuickSortVisualized(start, pivot - 1);
    await QuickSortVisualized(pivot + 1, end);
}

async function BubbleSortVisualized() {
    let isSorted = false;
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < barHeights.length - 1; i++) {
            if (barHeights[i] > barHeights[i + 1]) {
                isSorted = false;
                let temp = barHeights[i + 1];
                barHeights[i + 1] = barHeights[i];
                barHeights[i] = temp;
                makeBars();
                await sleep(sleepTimeMillis);
            }
        }
    }
}

async function selectionSortVisualized() {
    for (let i = 0; i < barHeights.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < barHeights.length; j++) {
            if (barHeights[j] < barHeights[minIndex]) {
                minIndex = j;
            }
        }
        let temp = barHeights[i];
        barHeights[i] = barHeights[minIndex];
        barHeights[minIndex] = temp;
        makeBars();
        await sleep(sleepTimeMillis);
    }
}

async function bubbleSort2Visualized() {
    for (let i = 0; i < barHeights.length - 1; i++) {
        for (let j = 0; j < barHeights.length - i - 1; j++) {
            if (barHeights[j] > barHeights[j + 1]) {
                let temp = barHeights[j + 1];
                barHeights[j + 1] = barHeights[j];
                barHeights[j] = temp;
            }
        }
        makeBars();
        await sleep(sleepTimeMillis);
    }
}

async function insertionSort() {
    for (let i = 1; i < barHeights.length; i++) {
        let j = i;
        while (j > 0 && barHeights[j - 1] > barHeights[j]) {
            let temp = barHeights[j - 1];
            barHeights[j - 1] = barHeights[j];
            barHeights[j] = temp;
            j--;
        }
        makeBars();
        await sleep(sleepTimeMillis);
    }
}

function refresh() {
    loadBarHeights();
    makeBars();
}

function sortBySelectedAlgorithm() {
    let sort_algo = document.getElementById("sort-algo").value;
    document.getElementById('sort-button').disabled = true;
    document.getElementById('refresh').disabled = true;
    switch (sort_algo) {
        case "bubble-sort":
            // BubbleSortVisualized();
            bubbleSort2Visualized();
            break;

        case "selection-sort":
            selectionSortVisualized();
            break;
        
        case "insertion-sort":
            insertionSort();
            break;
        
        case "quick-sort":
            QuickSortVisualized(0, barHeights.length - 1);
            break;
        
        case "bogo-sort":
            window.location.href = "https://youtu.be/dQw4w9WgXcQ";
    }
    document.getElementById('sort-button').disabled = false;
    document.getElementById('refresh').disabled = false;
}

function main() {
    loadBarHeights();
    makeBars();

    document.getElementById("delay-disp").innerHTML = document.getElementById("sort-delay").value;
    document.getElementById("no-of-elements-disp").innerHTML = document.getElementById("no-of-elements").value;

    document.getElementById("sort-button").addEventListener("click", sortBySelectedAlgorithm);
    document.getElementById("refresh").addEventListener("click", refresh);
    document.getElementById("sort-algo").addEventListener("change", refresh);

    document.getElementById("no-of-elements").addEventListener("change", function () {
        document.getElementById("no-of-elements-disp").innerHTML = document.getElementById("no-of-elements").value;
        refresh();
    });

    document.getElementById("sort-delay").addEventListener("change", function () {
        sleepTimeMillis = parseInt(document.getElementById("sort-delay").value);
        document.getElementById("delay-disp").innerHTML = sleepTimeMillis;
    });
}

document.addEventListener("DOMContentLoaded", main);
