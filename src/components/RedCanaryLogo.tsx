
import React from 'react';

interface LogoProps {
  className?: string;
}

const RedCanaryLogo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={className}>
      <img 
        src="https://redcanary.com/wp-content/uploads/2024/05/Red-Canary-Logo-2024-reverse.png" 
        alt="Red Canary" 
        className="h-full"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
    </div>
  );
};

export default RedCanaryLogo;
