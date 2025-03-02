async function bubbleSort(barContainer, delay) {
    let isSorted = false;
    for (let i = barContainer.getSize() - 1; i >= 0 || !isSorted; i--) {
        for (let j = 0; j < i; j++) {
            isSorted = true;

            const firstBar = barContainer.getBarByIndex(j);
            const secondBar = barContainer.getBarByIndex(j + 1);

            if (firstBar.getHeight() > secondBar.getHeight()) {
                isSorted = false;
                barContainer.swap(j, j + 1);
            }

            barContainer.render();
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}