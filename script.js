$(document).ready(function() {
    // Hide error icons by default
    $('.error-icon').hide();
  
    $('#taxForm').submit(function(e) {
      e.preventDefault();
  
      // Reset error styles
      $('.form-control').removeClass('is-invalid');
      $('.error-icon').hide();
  
      // Get input values
      var grossIncome = parseFloat($('#grossIncome').val());
      var extraIncome = parseFloat($('#extraIncome').val());
      var deductions = parseFloat($('#deductions').val());
      var age = $('#age').val();
  
      // Validation
      var isValid = true;
      if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
        isValid = false;
        $('.form-control').addClass('is-invalid');
        $('.error-icon').show();
      }
  
      if (isValid) {
        var taxableIncome = grossIncome + extraIncome - deductions;
        var taxRate = 0;
        if (taxableIncome > 8) {
          if (age == "<40") {
            taxRate = 0.3;
          } else if (age == ">=40&<60") {
            taxRate = 0.4;
          } else if (age == ">=60") {
            taxRate = 0.1;
          }
        }
        var taxAmount = taxRate * (taxableIncome - 8);
        $('#modalBody').html(`<p>Taxable Income: ${taxableIncome} Lakhs</p><p>Tax Amount: ${taxAmount} Lakhs</p>`);
        $('#resultModal').modal('show');
      }
    });
  });
  