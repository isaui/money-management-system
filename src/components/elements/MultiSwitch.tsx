import { useState } from "react";
import { IMultiSwitch } from "./interface/IMultiSwitch";

const MultiSwitch: React.FC<IMultiSwitch> = ({ onCallback, initialValue, values }) => {
    const [selectedValue, setSelectedValue] = useState(initialValue);
  
    const handleClick = (value: string) => {
      setSelectedValue(value);
      onCallback(value);
    };
  
    return (
      <div className="flex space-y-2 flex-wrap items-center">
        <div></div>
        {values.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(value)}
            className={`mr-2 px-4 text-sm py-2 rounded-xl focus:outline-none ${
              selectedValue === value ? 'bg-pink-700 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    );
  };

  export default MultiSwitch