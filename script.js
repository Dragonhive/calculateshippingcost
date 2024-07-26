document.getElementById('shippingForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const destination = document.getElementById('destination').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const priority = document.getElementById('priority').value;
  
  const shippingCost = calculateShippingCost(destination, weight, priority);
  
  document.getElementById('result').innerText = `Calculated Shipping Cost: ${shippingCost}`;
});

function calculateShippingCost(destination, weight, priority) {
  // Validasi input
  if (destination !== 'domestic' && destination !== 'international') {
      return "Invalid destination";
  }
  if (typeof weight !== 'number' || weight <= 0 || isNaN(weight)) {
      return "Invalid weight";
  }
  if (priority !== 'standard' && priority !== 'express' && priority !== 'priority') {
      return "Invalid priority";
  }

  let costPerKg;
  let additionalCost = 0;

  // Menghitung biaya pengiriman berdasarkan tujuan dan prioritas
  if (destination === 'domestic') {
      switch (priority) {
          case 'standard':
              costPerKg = 5;
              break;
          case 'express':
              costPerKg = 10;
              break;
          case 'priority':
              costPerKg = 20;
              break;
      }
      if (weight > 10) {
          additionalCost = 10;
      }
  } else if (destination === 'international') {
      switch (priority) {
          case 'standard':
              costPerKg = 15;
              break;
          case 'express':
              costPerKg = 25;
              break;
          case 'priority':
              costPerKg = 50;
              break;
      }
      if (weight > 5) {
          additionalCost = 50;
      }
  }

  const shippingCost = (costPerKg * weight) + additionalCost;
  return shippingCost;
}
