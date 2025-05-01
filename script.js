document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiStepForm');
    const steps = document.querySelectorAll('.form-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submit-button');

    let currentStep = 1;

    // Form data object to store all form values
    const formData = {
        email: '',
        firstName: '',
        lastName: '',
        businessEmail: '',
        country: '',
        phoneNumber: '',
        companyWebsite: '',
        productInterest: '',
        monthlySpend: '',
        usagePlan: '',
        hearAbout: '',
        marketingConsent: false
    };

    // Phone number validation
    const phoneInput = document.getElementById('phoneNumber');
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9+\-\s]/g, '');
        validateField(e.target);
    });

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // URL validation - now accepts domain-like strings
    function isValidURL(str) {
        // Remove any protocol if exists
        str = str.replace(/^(https?:\/\/)?(www\.)?/, '');
        // Check if it has at least one dot and valid characters
        return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/.test(str);
    }

    // Validate individual field
    function validateField(field) {
        let isValid = true;
        let errorMessage = '';

        // Remove existing error message if any
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        if (field.required && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (field.id === 'companyWebsite' && field.value.trim()) {
            // Remove any protocol and www if exists
            const websiteValue = field.value.replace(/^(https?:\/\/)?(www\.)?/, '');
            if (!isValidURL(websiteValue)) {
                isValid = false;
                errorMessage = 'Please enter a valid website domain';
            } else {
                // Update the field value without protocol
                field.value = websiteValue;
            }
        } else if (field.type === 'tel' && field.value.trim()) {
            const phoneDigits = field.value.replace(/[^0-9]/g, '');
            if (phoneDigits.length < 6) {
                isValid = false;
                errorMessage = 'Phone number must have at least 6 digits';
            } else if (!/^[0-9+\-\s]+$/.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        if (!isValid) {
            field.classList.add('error');
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentElement.appendChild(errorDiv);
        } else {
            field.classList.remove('error');
        }

        return isValid;
    }

    // Add validation listeners to all form fields
    function addValidationListeners() {
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => validateField(field));
            field.addEventListener('change', () => validateField(field));
        });
    }

    // Validate current step
    function validateStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const fields = currentStepElement.querySelectorAll('input, select, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
                field.focus();
            }
        });

        return isValid;
    }

    // Show current step
    function showStep(stepNumber) {
        steps.forEach(step => {
            if (parseInt(step.dataset.step) === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update button visibility
        if (currentStep === 3) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }

        if (currentStep === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }
    }

    // Save form data
    function saveFormData() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                formData[input.name] = input.checked;
            } else {
                formData[input.name] = input.value;
            }
        });
    }

    // Show thank you message
    function showThankYouMessage() {
        const container = document.querySelector('.container');
        const formContainer = document.querySelector('.form-container');
        
        formContainer.classList.add('fade-out');
        
        setTimeout(() => {
            container.innerHTML = `
                <div class="thank-you-container">
                    <h1>Thank you.</h1>
                    <p>We've received your request and one of our experts will be in touch shortly.</p>
                </div>
            `;
        }, 400);
    }

    // Next button click handler
    nextBtn.addEventListener('click', () => {
        if (validateStep()) {
            saveFormData();
            currentStep++;
            showStep(currentStep);
            updateStepIndicators();
        }
    });

    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        saveFormData();
        currentStep--;
        showStep(currentStep);
        updateStepIndicators();
    });

    // Submit button click handler
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateStep()) {
            saveFormData();
            console.log('Form data:', formData);
            showThankYouMessage();
        }
    });

    // Initialize the form
    addValidationListeners();
    showStep(currentStep);
    updateStepIndicators();
}); 