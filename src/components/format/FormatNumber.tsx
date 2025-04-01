import React from 'react';

interface FormatNumberProps {
  value: string | number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
  className?: string;
  textBack?: string;
  textFront?: string
}

export const FormatNumber: React.FC<FormatNumberProps> = ({
  value,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  locale = 'en-US',
  className = '',
  textBack,
  textFront
}) => {
  const formatValue = (val: string | number) => {
    try {
      const cleanValue = typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) : val;
      
      if (isNaN(cleanValue)) {
        return '0.00';
      }

      return new Intl.NumberFormat(locale, {
        minimumFractionDigits,
        maximumFractionDigits
      }).format(cleanValue);
    } catch (error) {
      console.error('Error formatting number:', error);
      return '0.00';
    }
  };

  return (
    <span className={`${className} flex gap-1`}>
     {textFront} {formatValue(value)} {textBack}
    </span>
  );
};

