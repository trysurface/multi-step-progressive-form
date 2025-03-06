
document.addEventListener('DOMContentLoaded', function() {
  // Form elements
  const form = document.getElementById('demo-form');
  const step1 = document.getElementById('step-1');
  const step2 = document.getElementById('step-2');
  const step3 = document.getElementById('step-3');
  const step1Next = document.getElementById('step-1-next');
  const step2Next = document.getElementById('step-2-next');
  const backButton = document.getElementById('back-button');
  const submitButton = document.getElementById('submit-button');
  const currentStepDisplay = document.getElementById('current-step');
  const progressFill = document.getElementById('progress-fill');
  const toast = document.getElementById('toast');
  
  // Form data
  let formData = {
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    state: '',
    country: ''
  };
  
  let currentStep = 1;
  const totalSteps = 3;
  
  // Update progress bar
  function updateProgress() {
    currentStepDisplay.textContent = currentStep;
    progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;
    
    // Show/hide back button
    if (currentStep > 1) {
      backButton.style.display = 'flex';
    } else {
      backButton.style.display = 'none';
    }
  }
  
  // Show toast notification
  function showToast(title, description, isError = false) {
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    if (isError) {
      toast.classList.add('error');
    } else {
      toast.classList.remove('error');
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // Go to next step
  function goToStep(step) {
    // Hide all steps
    step1.classList.remove('active');
    step2.classList.remove('active');
    step3.classList.remove('active');
    
    // Show the current step
    if (step === 1) {
      step1.classList.add('active');
    } else if (step === 2) {
      step2.classList.add('active');
    } else if (step === 3) {
      step3.classList.add('active');
    }
    
    currentStep = step;
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Validate step 1
  function validateStep1() {
    const email = document.getElementById('email').value;
    
    if (!email) {
      showToast('Email is required', 'Please enter your email address to continue.', true);
      return false;
    }
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Invalid email', 'Please enter a valid email address.', true);
      return false;
    }
    
    formData.email = email;
    return true;
  }
  
  // Validate step 2
  function validateStep2() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const company = document.getElementById('company').value;
    
    if (!firstName || !lastName || !company) {
      showToast('All fields are required', 'Please fill in all the required fields to continue.', true);
      return false;
    }
    
    formData.firstName = firstName;
    formData.lastName = lastName;
    formData.company = company;
    return true;
  }
  
  // Validate step 3
  function validateStep3() {
    const phone = document.getElementById('phone').value;
    const state = document.getElementById('state').value;
    const country = document.getElementById('country').value;
    
    if (!phone || !state || !country) {
      showToast('All fields are required', 'Please fill in all the required fields to continue.', true);
      return false;
    }
    
    formData.phone = phone;
    formData.state = state;
    formData.country = country;
    return true;
  }
  
  // Event listeners
  step1Next.addEventListener('click', function() {
    if (validateStep1()) {
      goToStep(2);
    }
  });
  
  step2Next.addEventListener('click', function() {
    if (validateStep2()) {
      goToStep(3);
    }
  });
  
  backButton.addEventListener('click', function() {
    goToStep(currentStep - 1);
  });
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (validateStep3()) {
      console.log('Form submitted:', formData);
      
      showToast('Form submitted', 'Thank you for your interest in Red Canary.');
      
      // Redirect after 1 second
      setTimeout(() => {
        window.location.href = 'https://redcanary.com/thank-you-demo/';
      }, 1000);
    }
  });
  
  // Initialize
  updateProgress();
});
