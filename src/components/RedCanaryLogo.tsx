
import React from 'react';

interface LogoProps {
  className?: string;
}

const RedCanaryLogo: React.FC<LogoProps> = ({ className = "h-12" }) => {
  return (
    <div className={className}>
      <img 
        src="/lovable-uploads/6e65c754-d058-4978-90e9-a135d10df71a.png" 
        alt="Red Canary" 
        className="h-full"
      />
    </div>
  );
};

export default RedCanaryLogo;
