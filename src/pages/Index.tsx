
import React from 'react';
import RedCanaryForm from '@/components/RedCanaryForm';
import RedCanaryLogo from '@/components/RedCanaryLogo';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white max-w-6xl mx-auto">
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
        <div className="mb-8">
          <RedCanaryLogo />
        </div>
        
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-6">
            See Red Canary in action
          </h1>
          <p className="text-lg mb-8">
            In your 30-minute personal demo, find out how Red Canary:
          </p>
          
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-redcanary mr-3">■</span>
              <span>
                Connects to your environment, with our security experts monitoring it 24×7
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-redcanary mr-3">■</span>
              <span>
                Provides actionable threat intelligence to help you prioritize resources
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-redcanary mr-3">■</span>
              <span>
                Delivers customer-validated 99% threat accuracy, saving you time wasted on false positives
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-redcanary mr-3">■</span>
              <span>
                Acts as an extension of your team, finding and stopping threats before they cause harm
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex items-center">
        <RedCanaryForm />
      </div>
      
      <div className="absolute bottom-0 right-0 opacity-40 pointer-events-none">
        <img 
          src="https://redcanary.com/wp-content/uploads/2024/05/CanariesInFlight_RedCanary-demo2.png" 
          alt="Red Canary Birds" 
          className="w-[48rem]"
        />
      </div>
    </div>
  );
};

export default Index;
