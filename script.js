let buyBtn = document.getElementById("buy-btn");
let ticketType = document.getElementById("ticket-type");
let everythingOption = document.getElementById("push-everything");
let otherOptions = document.querySelectorAll('input[name="includeAll"]:not(#push-everything)');

// Add event listener to the ticket-type dropdown
ticketType.addEventListener("change", updateButton);

// Function to calculate the total price
function calculatePrice(adults, children, includeAll) {
    let adultPrice = 15; // Base price for adults
    let bikePrice = 35;
    let lunchPrice = 7.5;
    let hotspotsPrice = 5;
    let fullAdultPrice = 62.5; // Discounted price for all-inclusive adults (-5)

    let childBusPrice = 7.5;
    let childBikePrice = 20;
    let fullChildPrice = 27.5; // All-inclusive children

    let totalPrice = 0;

    // Calculate adult price
    if (includeAll) {
        totalPrice += adults * fullAdultPrice;
    } else {
        totalPrice += adults * (adultPrice + bikePrice + lunchPrice + hotspotsPrice);
    }

    // Calculate child price
    if (includeAll) {
        totalPrice += children * fullChildPrice;
    } else {
        totalPrice += children * (childBusPrice + childBikePrice);
    }

    return totalPrice.toFixed(2); // Return price with two decimal places
}

// Function to update the button text dynamically
function updateButton() {
    // Determine the number of adults and children based on the selected ticket type
    let ticketValue = ticketType.value;
    let adults = ticketValue === "1x Adult (30 to 64)" ? 1 : 0;
    let children = ticketValue === "1x Child (4 to 12)" ? 1 : 0;

    // Check if the "all-inclusive" option is selected
    let includeAll = everythingOption.checked;

    // Calculate the final price
    let finalPrice = calculatePrice(adults, children, includeAll);

    // Update the button text
    buyBtn.textContent = `BUY (${finalPrice}€)`;
}

function getSelectedOption(){
    let
}

// Initial button update
updateButton();