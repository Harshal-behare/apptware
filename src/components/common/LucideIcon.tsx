import React from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconProps {
  name: string;
  className?: string;
}

const LucideIcon: React.FC<LucideIconProps> = ({ name, className }) => {
  const Icon = (LucideIcons as any)[name];
  
  if (!Icon) {
    console.warn(`Icon ${name} not found`);
    return null;
  }

  return <Icon className={className} />;
};

export default LucideIcon; 