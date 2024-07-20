const maxBarHeight = 100;
const minBarHeight = 0;
const barsElem = document.getElementsByClassName("bars")[0];
const maxSleepTimeMillis = 1000; // 1 second

var nBars;
var barHeights = []

function loadBarHeights() {
    barHeights = [];
    nBars = parseInt(document.getElementById("no-of-elements").value);
    console.log("No. of elements: " + nBars);
    for (let n = 0; n < nBars; n++) {
        let height = Math.floor(Math.random() * (maxBarHeight + 1)) + minBarHeight;
        barHeights.push(height);
    }
}

function makeBars() {
    barsElem.innerHTML = '';
    barsElem.style['grid-template-columns'] = `repeat(${nBars}, 1fr)`;
    for (let i = 0; i < barHeights.length; i++) {
        heightPercentage = parseInt((barHeights[i] / (maxBarHeight - minBarHeight)) * 100);
        // heightPercentage = parseInt((i / barHeights.length) * 100);
        heightPercentageString = heightPercentage + "%";
        let newBarElement = document.createElement("div");
        newBarElement.style.height = heightPercentageString;
        newBarElement.className = "bar";
        barsElem.appendChild(newBarElement);
    }
}

async function sleep(sleepTimeMillis) {
    await new Promise((resolve) => setTimeout(resolve, sleepTimeMillis));
}

async function BubbleSortVisualized(sleepTimeMillis) {
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
            }
            await sleep(sleepTimeMillis)
        }
    }
}

async function selectionSortVisualized(sleepTimeMillis) {
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

function refresh() {
    loadBarHeights();
    makeBars();
}

function sortBySelectedAlgorithm() {
    let sort_algo = document.getElementById("sort-algo").value;
    let sort_speed = document.getElementById("sort-speed").value;
    let sleepTimeMillis = parseInt(maxSleepTimeMillis / sort_speed);

    switch (sort_algo) {
        case "bubble-sort":
            BubbleSortVisualized(sleepTimeMillis);
            break;

        case "selection-sort":
            selectionSortVisualized(sleepTimeMillis);
            break;
        case "bogo-sort":
            window.location.href = "https://youtu.be/dQw4w9WgXcQ";
    }
}

function main() {
    loadBarHeights();
    // Addjust bar width
    makeBars();
    console.log(barHeights);

    document.getElementById("sort-button").addEventListener(
        "click",
        sortBySelectedAlgorithm
    );

    document.getElementById("refresh").addEventListener(
        "click",
        refresh
    );

    document.getElementById("sort-algo").addEventListener(
        "change",
        refresh
    );

    document.getElementById("no-of-elements").addEventListener(
        "change",
        refresh
    );
}

document.addEventListener("DOMContentLoaded", main())