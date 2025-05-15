document.addEventListener('DOMContentLoaded', function () {
    const ticketSelect = document.getElementById('ticket-type');
    const buyBtn = document.getElementById('buy-btn');
    const everythingCheckbox = document.getElementById('push-everything');

    const addOnCheckboxes = {
      "rental-bike": document.getElementById('rental-bike'),
      "lunch": document.getElementById('lunch'),
      "trip-to-hotspots": document.getElementById('trip-to-hotspots')
    };

    const pricingTable = {
      adult: {
        base: 15,
        "rental-bike": 35,
        "lunch": 7.5,
        "trip-to-hotspots": 5,
        all: -5  // discount if all options are selected
      },
      young: {
        base: 15,
        "rental-bike": 22.5,
        "lunch": 7.5,
        "trip-to-hotspots": 5,
        all: -5
      },
      child: {
        base: 7.5,
        "rental-bike": 20,
        "lunch": 0,
        "trip-to-hotspots": 0,
        all: -5
      }
    };

    function getSelectedTicketType() {
      return ticketSelect.options[ticketSelect.selectedIndex].id;
    }

    function calculateTotal() {
      const ticketType = getSelectedTicketType();
      const ticketPricing = pricingTable[ticketType];
      let total = ticketPricing.base;
      let allSelected = true;

      for (const [key, checkbox] of Object.entries(addOnCheckboxes)) {
        if (checkbox.checked) {
          total += ticketPricing[key] || 0;
        } else {
          allSelected = false;
        }
      }

      if (allSelected) {
        total += ticketPricing.all || 0;
      }

      return total;
    }

    function updatePriceDisplay() {
      const total = calculateTotal();
      buyBtn.textContent = `BUY - €${total}`;
    }

    // "Everything" checkbox logic
    everythingCheckbox.addEventListener('change', () => {
      const check = everythingCheckbox.checked;
      Object.values(addOnCheckboxes).forEach(cb => cb.checked = check);
      updatePriceDisplay();
    });

    // Sync "Everything" checkbox if individual add-ons change
    Object.values(addOnCheckboxes).forEach(cb => {
      cb.addEventListener('change', () => {
        const allChecked = Object.values(addOnCheckboxes).every(cb => cb.checked);
        everythingCheckbox.checked = allChecked;
        updatePriceDisplay();
      });
    });

    ticketSelect.addEventListener('change', updatePriceDisplay);

    updatePriceDisplay();
  });
