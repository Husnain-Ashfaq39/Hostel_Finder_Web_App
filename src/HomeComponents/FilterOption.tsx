import React, { useState } from 'react';

function FilterOption() {
  const [selectedValue, setSelectedValue] = useState('');

  // Function to handle change in dropdown selection
  const handleDropdownChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {

    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="flex items-center justify-center mt-8">
    <select
      className="block w-full px-4 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:border-blue-700"
      value={selectedValue}
      onChange={handleDropdownChange}
    >
      <option value="" disabled hidden>Select Filter Option</option>
      <option value="price">Sort by Price</option>
      <option value="rating">Sort by Rating</option>
     
    </select>
      {/* <p>Selected value: {selectedValue}</p> */}
  </div>
  );
}

export default FilterOption;
