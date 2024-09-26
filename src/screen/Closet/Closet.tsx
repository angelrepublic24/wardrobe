import React, { useState } from 'react';
import { Control } from '../../components/controlPanel/control';
import { WardrobeCloset } from '../../components/wardrobeCloset/WardrobeCloset';

export const Closet = () => {
  const [sizeOption, setSizeOption] = useState("8 ft");
  const [lengthSideOption, setLengthSideOption] = useState("");
  const [slotTopOption, setSlotTopOption] = useState("");
  const [slotBottomOption, setSlotBottomOption] = useState("")


  const handleSizeChange = (e) => {
    setSizeOption(e.target.value);
  };

  const handleLengthSizeChange = (e) => {
    setLengthSideOption(e.target.value);
  };

  const handleSlotTopOptionChange = (e) => {
    setSlotTopOption(e.target.value);
  };

  const handleSlotBottomOptionChange = (e) => {
    setSlotBottomOption(e.target.value);
  };

  return (
    <div className='flex flex-col flex-col md:flex-row'>
      <div className='relative w-full md:w-3/4 h-[55vh] md:h-[80vh]'>
      <WardrobeCloset
        sizeOption={sizeOption}
        lengthSideOption={lengthSideOption}
        slotTopOption={slotTopOption}
        slotBottomOption={slotBottomOption}
      />
      </div>
        <Control
          sizeOption={sizeOption}
          lengthSideOption={lengthSideOption}
          slotTopOption={slotTopOption}
          slotBottomOption={slotBottomOption}
          onSizeChange={handleSizeChange}
          onLengthSizeChange={handleLengthSizeChange}
          onSlotTopChange={handleSlotTopOptionChange}
          onSlotBottomChange={handleSlotBottomOptionChange}
        />
      
    </div>
  );
};
