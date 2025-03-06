
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  showBackButton: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  onBack,
  showBackButton,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        {showBackButton ? (
          <button 
            onClick={onBack}
            className="flex items-center text-white opacity-80 hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </button>
        ) : (
          <div></div>
        )}
        <div className="text-white text-sm">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-redcanary transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
