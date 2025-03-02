async function insertionSort(barContainer, delay) {
    for (let i = 1; i < barContainer.getSize(); i++) {
        let j = i;

        while (j > 0 && barContainer.getBarByIndex(j - 1).getHeight() > barContainer.getBarByIndex(j).getHeight()) {
            barContainer.swap(j - 1, j);
            j--;
            barContainer.render();
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
