async function selectionSort(barContainer, delay) {
    for (let i = 0; i < barContainer.getSize(); i++) {
        let minBarIndex = i;
        for (let j = i + 1; j < barContainer.getSize(); j++) {
            const minBar = barContainer.getBarByIndex(minBarIndex);
            const bar = barContainer.getBarByIndex(j);
            if (bar.getHeight() < minBar.getHeight()) {
                minBarIndex = j;
            }
        }
        if (minBarIndex !== i) {
            barContainer.swap(i, minBarIndex);
        }
        barContainer.render();
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}