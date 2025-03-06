import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ProgressIndicator from './ProgressIndicator';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  state: string;
  country: string;
}

const RedCanaryForm: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    state: '',
    country: '',
  });

  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address to continue.",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && (!formData.firstName || !formData.lastName || !formData.company)) {
      toast({
        title: "All fields are required",
        description: "Please fill in all the required fields to continue.",
        variant: "destructive",
      });
      return;
    }

    if (step < totalSteps) {
      setStep(prev => prev + 1);
      // Scroll to top of form when advancing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      // Scroll to top of form when going back
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone || !formData.state || !formData.country) {
      toast({
        title: "All fields are required",
        description: "Please fill in all the required fields to continue.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to an API
    console.log('Form submitted:', formData);
    
    toast({
      title: "Form submitted",
      description: "Thank you for your interest in Red Canary.",
    });
    
    // Redirect to the thank you page after a short delay
    setTimeout(() => {
      window.location.href = 'https://redcanary.com/thank-you-demo/';
    }, 1000); // 1 second delay to allow the toast to be seen
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <ProgressIndicator 
        currentStep={step} 
        totalSteps={totalSteps} 
        onBack={prevStep} 
        showBackButton={step > 1}
      />
      
      <form onSubmit={handleSubmit} className="animate-fade-in">
        {step === 1 && (
          <div className="mb-6">
            <label htmlFor="email" className="block text-white mb-2">
              <span className="text-redcanary">*</span> Email Address:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Business Email Address"
              className="input-field"
              required
            />
          </div>
        )}

        {step === 2 && (
          <>
            <div className="mb-6">
              <label htmlFor="firstName" className="block text-white mb-2">
                <span className="text-redcanary">*</span> First Name:
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="input-field"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="lastName" className="block text-white mb-2">
                <span className="text-redcanary">*</span> Last Name:
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="input-field"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="company" className="block text-white mb-2">
                <span className="text-redcanary">*</span> Company Name:
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="input-field"
                required
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-6">
              <label htmlFor="phone" className="block text-white mb-2">
                <span className="text-redcanary">*</span> Phone Number:
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input-field"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="state" className="block text-white mb-2">
                <span className="text-redcanary">*</span> State:
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="">Select State...</option>
                <option value="AK">AK</option>
                <option value="AL">AL</option>
                <option value="AR">AR</option>
                <option value="AZ">AZ</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="IA">IA</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="MA">MA</option>
                <option value="MD">MD</option>
                <option value="ME">ME</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MO">MO</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="NE">NE</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NV">NV</option>
                <option value="NY">NY</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VA">VA</option>
                <option value="VT">VT</option>
                <option value="WA">WA</option>
                <option value="WI">WI</option>
                <option value="WV">WV</option>
                <option value="WY">WY</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="country" className="block text-white mb-2">
                <span className="text-redcanary">*</span> Country:
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="select-field"
                required
              >
                <option value="">Select Country...</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="India">India</option>
                <option value="China">China</option>
                <option value="Brazil">Brazil</option>
                {/* More countries would be added here */}
              </select>
            </div>
            <div className="text-xs text-gray-400 mb-6">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" className="text-redcanary hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" className="text-redcanary hover:underline">
                Terms of Service
              </a>{" "}
              apply.
            </div>
          </>
        )}

        <div className="mt-8">
          {step < totalSteps ? (
            <button 
              type="button" 
              onClick={nextStep} 
              className="form-button w-full"
            >
              Continue
            </button>
          ) : (
            <button 
              type="submit" 
              className="form-button w-full"
            >
              Get A Demo
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RedCanaryForm;
