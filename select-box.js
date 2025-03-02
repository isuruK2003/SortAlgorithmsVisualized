class CustomSelect {
    constructor(selectClassName) {
        this.selectElements = document.getElementsByClassName(selectClassName);
        this.init();
    }

    init() {
        for (let i = 0; i < this.selectElements.length; i++) {
            const selectElement = this.selectElements[i];
            // Check if the select element exists before proceeding
            if (selectElement) {
                this.createCustomSelectFor(selectElement);
            }
        }
        document.addEventListener("click", this.closeAllSelect.bind(this));
    }

    createCustomSelectFor(selectContainer) {
        // Make sure there's a select element inside
        const originalSelect = selectContainer.getElementsByTagName("select")[0];
        if (!originalSelect) {
            console.error("No select element found inside container:", selectContainer);
            return;
        }
        
        const optionsCount = originalSelect.length;
        
        // Create selected item display
        const selectedDisplay = document.createElement("DIV");
        selectedDisplay.setAttribute("class", "select-selected");
        selectedDisplay.innerHTML = originalSelect.options[originalSelect.selectedIndex].innerHTML;
        selectContainer.appendChild(selectedDisplay);
        
        // Create options container
        const optionsContainer = document.createElement("DIV");
        optionsContainer.setAttribute("class", "select-items select-hide");
        
        // Create option items
        for (let j = 1; j < optionsCount; j++) {
            const optionItem = document.createElement("DIV");
            optionItem.innerHTML = originalSelect.options[j].innerHTML;
            optionItem.addEventListener("click", (e) => this.handleOptionClick(e, optionItem));
            optionsContainer.appendChild(optionItem);
        }
        
        selectContainer.appendChild(optionsContainer);
        
        // Add click event to selected display
        selectedDisplay.addEventListener("click", (e) => {
            e.stopPropagation();
            this.closeAllSelect(selectedDisplay);
            optionsContainer.classList.toggle("select-hide");
            selectedDisplay.classList.toggle("select-arrow-active");
        });
    }
    
    handleOptionClick(e, optionItem) {
        const parentContainer = optionItem.parentNode.parentNode;
        const originalSelect = parentContainer.getElementsByTagName("select")[0];
        const selectedDisplay = optionItem.parentNode.previousSibling;
        
        // Update original select and display
        for (let i = 0; i < originalSelect.length; i++) {
            if (originalSelect.options[i].innerHTML === optionItem.innerHTML) {
                originalSelect.selectedIndex = i;
                selectedDisplay.innerHTML = optionItem.innerHTML;
                
                // Update selected class
                const selectedItems = optionItem.parentNode.getElementsByClassName("same-as-selected");
                for (let k = 0; k < selectedItems.length; k++) {
                    selectedItems[k].removeAttribute("class");
                }
                optionItem.setAttribute("class", "same-as-selected");
                break;
            }
        }
        
        selectedDisplay.click();
    }
    
    closeAllSelect(elmnt) {
        const optionsContainers = document.getElementsByClassName("select-items");
        const selectedDisplays = document.getElementsByClassName("select-selected");
        const selectedIndexes = [];
        
        // Determine which select to keep open
        for (let i = 0; i < selectedDisplays.length; i++) {
            if (elmnt === selectedDisplays[i]) {
                selectedIndexes.push(i);
            } else {
                selectedDisplays[i].classList.remove("select-arrow-active");
            }
        }
        
        // Hide all other select option containers
        for (let i = 0; i < optionsContainers.length; i++) {
            if (selectedIndexes.indexOf(i) === -1) { // Fixed condition here
                optionsContainers[i].classList.add("select-hide");
            }
        }
    }
}

function main() {
    const customSelect = new CustomSelect("custom-select");
}

document.addEventListener("DOMContentLoaded", main);