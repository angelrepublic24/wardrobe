import React, { useState } from 'react';
import { Control } from '../../components/controlPanel/control';
import { WardrobeCloset } from '../../components/wardrobeCloset/WardrobeCloset';

export const Closet = () => {
  const [sizeOption, setSizeOption] = useState("8 ft");
  const [lengthSideOption, setLengthSideOption] = useState("");
  const [slotTopOption, setSlotTopOption] = useState("")

  const handleSizeChange = (e) => {
    setSizeOption(e.target.value);
  };

  const handleLengthSizeChange = (e) => {
    setLengthSideOption(e.target.value);
  };

  const handleSlotTopOptionChange = (e) => {
    setSlotTopOption(e.target.value);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <Control
        sizeOption={sizeOption}
        lengthSideOption={lengthSideOption}
        slotTopOption={slotTopOption}
        onSizeChange={handleSizeChange}
        onLengthSizeChange={handleLengthSizeChange}
        onSlotTopChange={handleSlotTopOptionChange}
      />
      <WardrobeCloset
        sizeOption={sizeOption}
        lengthSideOption={lengthSideOption}
        slotTopOption={slotTopOption}
      />
    </div>
  );
};
