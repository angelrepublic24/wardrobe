import React, { useRef, useState } from "react";
import { BaseSizeOption, LengthSideOption, LouverSizeOption, LouversOption, RoofOption, SlotBottomOptions, SlotTopOptions } from "./baseSizeOption";
import { Louvers } from "./louvers";
import { Drainage } from "./drainage";
import { CanopySupport } from "./canopySupport";
import { ColorOptions } from "./colorOptions";
import { GlassRoom } from "./glassRoom";
import { RoofingOptions } from "./roofingOptions";

export const Control = ({
  sizeOption,
  lengthSideOption,
  onSizeChange,
  onLengthSizeChange,
  slotTopOption,
  onSlotTopChange,
  slotBottomOption,
  onSlotBottomChange,
  roofOption,
  onRoofOptionChange,
  louversOption,
  onLouverOptionChange,
  louverSizeOption,
  onLouverSizeOptionChange
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showLengthSide, setShowLengthSide] = useState(false); // Estado para mostrar LengthSideOption
  const [showSlotTop, setShowSlotTop] = useState(false);
  const [showBottomTop, setShowBottomTop] = useState(false);
  const [showRoofOption, setShowRoofOption] = useState(false);
  const [showLouversOption, setShowLouversOption] = useState(false);
  const [showLouverSizeOption, setShowLouverSizeOption] = useState(false);




  const baseSizeRef = useRef(null);
  const lengthSideRef = useRef(null);
  const slotTopRef = useRef(null)
  const slotBottomRef = useRef(null)
  const roofOptionRef = useRef(null)
  const loversOptionRef = useRef(null)
  const loverSizeOptionRef = useRef(null)

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  const handleNextStep = (refToShow, setShowFunc, setShowBottom) => {
    // Cerrar otras opciones
    if (refToShow === lengthSideRef) {
      setShowLengthSide(true);
      setShowSlotTop(false); // Cerrar SlotTopOptions
    } else if (refToShow === slotTopRef) {
      setShowSlotTop(true);
    } else if (refToShow === slotBottomRef) {
      setShowBottomTop(true);
    }else if(refToShow === roofOptionRef){
      setShowRoofOption(true)
    }else if (refToShow === loversOptionRef){
      setShowLouversOption(true)
    }else if (refToShow = loverSizeOptionRef){
      setShowLouverSizeOption(true)
    }
    
    setTimeout(() => {
      if (refToShow.current) {
        window.scrollTo({
          top: refToShow.current.offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <div className=" flex flex-col w-100 md:w-[25%] h-[40%] md:h-[25%] md:h-800px  overflow-hidden box-content mr-2 justify-end">

      <div className=" relative my-4 w-full h-[100%] mt-1  overflow-y-auto flex  flex-col">
        <BaseSizeOption
          sizeOption={sizeOption}
          onSizeChange={onSizeChange}
          handleNextStep={() => handleNextStep(lengthSideRef)}
        />
        {showLengthSide && (
          <LengthSideOption
            ref={lengthSideRef} 
            lengthSideOption={lengthSideOption}
            onLengthSizeChange={onLengthSizeChange}
            handleNextStep={() => handleNextStep(slotTopRef)}
          />
        )}
        {showSlotTop && (
          <SlotTopOptions
            ref={slotTopRef}
            slotTopOption={slotTopOption}
            onSlotTopChange={onSlotTopChange}
            handleNextStep={() => handleNextStep(slotBottomRef)}
          />
        )}
        {showBottomTop && (
          <SlotBottomOptions
          ref={slotBottomRef}
          slotBottomOption={slotBottomOption}
          onSlotBottomChange={onSlotBottomChange}
          handleNextStep={() => handleNextStep(roofOptionRef)}
        />
        )}
        {showRoofOption &&(
          <RoofOption 
          ref={roofOptionRef}
          roofOption={roofOption}
          onRoofOptionChange={onRoofOptionChange}
          handleNextStep={() => handleNextStep(loversOptionRef)}

          />
        )}
        {showLouversOption &&(
          <LouversOption 
          ref={loversOptionRef}
          louversOption={louversOption}
          onLouverOptionChange={onLouverOptionChange}
          handleNextStep={() => handleNextStep(loverSizeOptionRef)}

          />
        )}
        {showLouverSizeOption &&(
          <LouverSizeOption 
          ref={loverSizeOptionRef}
          louverSizeOption={louverSizeOption}
          onLouverSizeOptionChange={onLouverSizeOptionChange}
          
          />
        )}
        
        {/* <Louvers />
        <Drainage />
        <CanopySupport />
        <ColorOptions />
        <GlassRoom />
        <RoofingOptions />
        <SlotOptions /> */}
      </div>
    </div>
  );
};
