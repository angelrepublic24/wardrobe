import React, { useState } from 'react';
import { Control } from '../../components/controlPanel/control';
import { WardrobeCloset } from '../../components/wardrobeCloset/WardrobeCloset';

export const Closet = () => {
  const [sizeOption, setSizeOption] = useState("8 ft");
  const [lengthSideOption, setLengthSideOption] = useState("");

  const handleSizeChange = (e) => {
    setSizeOption(e.target.value);
  };

  const handleLengthSizeChange = (e) => {
    setLengthSideOption(e.target.value);
  };

  return (
    <div className='flex'>
      <Control
        sizeOption={sizeOption}
        lengthSideOption={lengthSideOption}
        onSizeChange={handleSizeChange}
        onLengthSizeChange={handleLengthSizeChange}
      />
      <WardrobeCloset
        sizeOption={sizeOption}
        lengthSideOption={lengthSideOption}
      />
    </div>
  );
};
