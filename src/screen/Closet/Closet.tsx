import React, { useState } from 'react';
import { Control } from '../../components/controlPanel/control';
import { WardrobeCloset } from '../../components/wardrobeCloset/WardrobeCloset';

export const Closet = () => {
  const [sizeOption, setSizeOption] = useState("8 ft");
  const [lengthSideOption, setLengthSideOption] = useState("");
  const [slotTopOption, setSlotTopOption] = useState("");
  const [slotBottomOption, setSlotBottomOption] = useState("")
  const [roofOption, setRoofOption] = useState("")
  const [louversOption, setLouverOption] = useState("")
  const [louverSizeOption, setLouverSizeOption] = useState("")




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
  const handleRoofOptionChange = (e) => {
    setRoofOption(e.target.value);
  };
  const handleLouversOptionChange = (e) => {
    setLouverOption(e.target.value);
  };
  const handleLouverSizeOptionChange = (e) => {
    setLouverSizeOption(e.target.value);
  };

  return (
    <div className='flex flex-col flex-col md:flex-row'>
      <div className='relative w-full md:w-3/4 h-[55vh] md:h-[80vh]'>
      <WardrobeCloset
        sizeOption={sizeOption}
        lengthSideOption={lengthSideOption}
        slotTopOption={slotTopOption}
        slotBottomOption={slotBottomOption}
        roofOption={roofOption}
        louversOption={louversOption}
        louverSizeOption={louverSizeOption}
      />
      </div>
        <Control
          sizeOption={sizeOption}
          lengthSideOption={lengthSideOption}
          slotTopOption={slotTopOption}
          slotBottomOption={slotBottomOption}
          roofOption={roofOption}
          louversOption={louversOption}
          louverSizeOption={louverSizeOption}
          onSizeChange={handleSizeChange}
          onLengthSizeChange={handleLengthSizeChange}
          onSlotTopChange={handleSlotTopOptionChange}
          onSlotBottomChange={handleSlotBottomOptionChange}
          onRoofOptionChange={handleRoofOptionChange}
          onLouverOptionChange={handleLouversOptionChange}
          onLouverSizeOptionChange={handleLouverSizeOptionChange}
        />
      
    </div>
  );
};
