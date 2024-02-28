// components/Dropdown.tsx
import { useState } from 'react';
import { IDropdown } from './interface/IDropdown';
import { IDropdownOption } from './interface/IDropdownOption';


const Dropdown: React.FC<IDropdown> = ({ options, onSelect, initialValue }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IDropdownOption | null>(initialValue);
  
    const handleSelect = (option: IDropdownOption) => {
      setSelectedOption(option);
      onSelect(option);
      setIsOpen(false); // Close dropdown after selection
    };
  
    return (
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="purple-to-pink border border-gray-700 text-white py-3 px-4 rounded cursor-pointer flex items-center"
        >
            {selectedOption ? (
          <span className='mr-2'>{selectedOption.label}</span>
        ) : (
          <span className="text-gray-400">Pilih Opsi</span>
        )}
         <svg
          className={`fill-current h-4 w-4 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 12l-6-6 1.414-1.414L10 9.172l4.586-4.586L16 6l-6 6z"
            clipRule="evenodd"
          />
        </svg>
        </div>
        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-pink-800 border border-gray-700 rounded">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                className={`py-2 px-4 cursor-pointer ${
                  selectedOption?.value === option.value ? 'bg-purple-700 text-white' : 'hover:bg-pink-500'
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Dropdown;
