// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(event) {
  // prevent default behavior of form
  event.preventDefault();

  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
});

// Calculate results
function calculateResults() {
  // grab UI elements
  const amount = document.getElementById('amount'),
        interest = document.getElementById('interest'),
        years = document.getElementById('years'),
        monthlyPayment = document.getElementById('monthly-payment'),
        totalPayment = document.getElementById('total-payment'),
        totalInterest = document.getElementById('total-interest');

  // grab input values
  const principal = parseFloat(amount.value); // original sum invented or lent
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // computation for monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x - 1);

  // results verification
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);  
    // hide loader and show results
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'block';
  } else {
    // hide loader and show error
    document.getElementById('loading').style.display = 'none';
    showError('Please check your numbers');
  }
}

// Display error message
function showError(errorText) {
  // show error
  const errorDiv = document.querySelector('.error-msg');
  errorDiv.textContent = errorText;
  errorDiv.classList.add('error-msg--show');

  // hide error after 3s
  setTimeout(() => {
    errorDiv.classList.remove('error-msg--show');
  }, 3000);
}