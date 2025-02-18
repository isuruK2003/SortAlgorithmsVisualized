const maxBarHeight = 100;
const minBarHeight = 0;
const barsElem = document.getElementsByClassName("bars")[0];
let sleepTimeMillis = parseInt(document.getElementById("sort-delay").value);
let nBars;
let barHeights = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadBarHeights() {
    barHeights = [];
    nBars = parseInt(document.getElementById("no-of-elements").value);
    console.log("No. of elements: " + nBars);
    for (let n = 0; n < nBars; n++) {
        let height = Math.floor((n / nBars) * (maxBarHeight - minBarHeight));
        barHeights.push(height);
    }
    shuffle(barHeights);
}

function makeBars() {
    barsElem.innerHTML = '';
    barsElem.style['grid-template-columns'] = `repeat(${nBars}, 1fr)`;

    barHeights.forEach(height => {
        let newBarElement = document.createElement("div");
        newBarElement.style.height = `${(height / (maxBarHeight - minBarHeight)) * 100}%`;
        newBarElement.className = "bar";
        barsElem.appendChild(newBarElement);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function partition(start, end) {
    let i = start - 1;

    for (let j = start; j <= end; j++) {
        if (barHeights[j] < barHeights[end] || j === end) {
            i++;
            [barHeights[j], barHeights[i]] = [barHeights[i], barHeights[j]];
            makeBars();
            await sleep(sleepTimeMillis);
        }
    }
    return i;
}

async function quickSort(start, end) {
    if (end <= start) return;
    let pivot = await partition(start, end);
    await quickSort(start, pivot - 1);
    await quickSort(pivot + 1, end);
}

async function bubbleSort() {
    let isSorted = false;
    while (!isSorted) {
        isSorted = true;
        for (let i = 0; i < barHeights.length - 1; i++) {
            if (barHeights[i] > barHeights[i + 1]) {
                isSorted = false;
                [barHeights[i], barHeights[i + 1]] = [barHeights[i + 1], barHeights[i]];
                makeBars();
                await sleep(sleepTimeMillis);
            }
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < barHeights.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < barHeights.length; j++) {
            if (barHeights[j] < barHeights[minIndex]) {
                minIndex = j;
            }
        }
        [barHeights[i], barHeights[minIndex]] = [barHeights[minIndex], barHeights[i]];
        makeBars();
        await sleep(sleepTimeMillis);
    }
}

async function insertionSort() {
    for (let i = 1; i < barHeights.length; i++) {
        let j = i;
        while (j > 0 && barHeights[j - 1] > barHeights[j]) {
            [barHeights[j - 1], barHeights[j]] = [barHeights[j], barHeights[j - 1]];
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
    const sortAlgo = document.getElementById("sort-algo").value;
    document.getElementById('sort-button').disabled = true;
    document.getElementById('refresh').disabled = true;

    switch (sortAlgo) {
        case "bubble-sort":
            bubbleSort();
            break;
        case "selection-sort":
            selectionSort();
            break;
        case "insertion-sort":
            insertionSort();
            break;
        case "quick-sort":
            quickSort(0, barHeights.length - 1);
            break;
        case "bogo-sort":
            window.location.href = "https://youtu.be/dQw4w9WgXcQ";
            break;
    }

    document.getElementById('sort-button').disabled = false;
    document.getElementById('refresh').disabled = false;
}

function initialize() {
    loadBarHeights();
    makeBars();
    document.getElementById("delay-disp").innerHTML = sleepTimeMillis;
    document.getElementById("no-of-elements-disp").innerHTML = nBars;

    document.getElementById("sort-button").addEventListener("click", sortBySelectedAlgorithm);
    document.getElementById("refresh").addEventListener("click", refresh);
    document.getElementById("sort-algo").addEventListener("change", refresh);

    document.getElementById("no-of-elements").addEventListener("change", function () {
        nBars = parseInt(document.getElementById("no-of-elements").value);
        document.getElementById("no-of-elements-disp").innerHTML = nBars;
        refresh();
    });

    document.getElementById("sort-delay").addEventListener("change", function () {
        sleepTimeMillis = parseInt(document.getElementById("sort-delay").value);
        document.getElementById("delay-disp").innerHTML = sleepTimeMillis;
    });
}

document.addEventListener("DOMContentLoaded", initialize);
