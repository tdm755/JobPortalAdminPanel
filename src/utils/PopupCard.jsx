// PopupCard.jsx
import React, { useRef, useEffect } from 'react';

const PopupCard = ({
  icon,
  heading,
  description,
  buttons,
  onClose,
  bgColor = 'bg-white',
  headingColor = 'text-gray-800',
  headingHoverColor = 'hover:text-indigo-600',
  descriptionColor = 'text-gray-600',
  descriptionHoverOpacity = 'hover:opacity-80',
  primaryButtonColor = 'bg-indigo-500',
  primaryButtonHoverColor = 'hover:bg-indigo-600',
  primaryButtonFocusRingColor = 'focus:ring-indigo-500',
  secondaryButtonColor = 'bg-gray-200',
  secondaryButtonTextColor = 'text-gray-700',
  secondaryButtonHoverColor = 'hover:bg-gray-300',
  secondaryButtonFocusRingColor = 'focus:ring-gray-400',
}) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 animate-fadeIn">
      <div
        ref={cardRef}
        className={`w-80 ${bgColor} flex flex-col items-center justify-center p-6 gap-3 overflow-hidden shadow-lg rounded-lg z-50 transition-all duration-300 ease-in-out hover:shadow-xl transform hover:-translate-y-1 animate-slideIn`}
      >
        <div className="w-12 h-12 animate-bounce">
          {icon}
        </div>
        <p className={`text-xl font-extrabold ${headingColor} transition-colors duration-200 ${headingHoverColor} animate-fadeIn`}>
          {heading}
        </p>
        <p className={`text-sm font-semibold ${descriptionColor} text-center transition-opacity duration-200 ${descriptionHoverOpacity} animate-fadeIn delay-100`}>
          {description}
        </p>
        <div className="flex gap-5 flex-row animate-fadeIn delay-200">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`auto px-4 py-2 transition-all duration-200 border-none cursor-pointer font-semibold rounded-full transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${button.primary
                  ? `${primaryButtonColor} text-white ${primaryButtonHoverColor} ${primaryButtonFocusRingColor}`
                  : `${secondaryButtonColor} ${secondaryButtonTextColor} ${secondaryButtonHoverColor} ${secondaryButtonFocusRingColor}`
                } hover:shadow-md active:scale-95`}
              onClick={() => {
                button.onClick();
                onClose();
              }}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupCard;