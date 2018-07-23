// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// Calculate results
function calculateResults(event) {
  // prevent default behavior of form
  event.preventDefault();

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
  } else {
    showError('Please check your numbers');
  }
}

// Display error message
function showError(errorText) {
  const errorDiv = document.querySelector('.error-msg');
  errorDiv.textContent = errorText;
  errorDiv.classList.add('error-msg--show');

  setTimeout(() => {
    errorDiv.classList.remove('error-msg--show');
  }, 3000);
}