import React from "react";
import { BaseSizeOption, LengthSideOption, SlotBottomOptions, SlotTopOptions } from "./baseSizeOption";
import { Louvers } from "./louvers";
import { Drainage } from "./drainage";
import { CanopySupport } from "./canopySupport";
import { ColorOptions } from "./colorOptions";
import { GlassRoom } from "./glassRoom";
import { RoofingOptions } from "./roofingOptions";

export const Control = ({ sizeOption, lengthSideOption, onSizeChange, onLengthSizeChange, slotTopOption, onSlotTopChange, slotBottomOption, onSlotBottomChange }) => {
  return (
    <div className="relative flex flex-col w-100  md:w-[700px] md:h-[600px] border rounded-3xl bg-white overflow-hidden box-content mr-2">
      <div className="color bg-black p-1">
        <p className="text-white">
          Color <span>WHITE</span>
        </p>
      </div>
      <div className="bg-gray-100 my-4 w-full h-[100%] mt-1 border border-gray-300 shadow-lg overflow-y-auto">
        <BaseSizeOption sizeOption={sizeOption} onSizeChange={onSizeChange} />
        <LengthSideOption lengthSideOption={lengthSideOption} onLengthSizeChange={onLengthSizeChange} />
        <SlotTopOptions slotTopOption={slotTopOption} onSlotTopChange={onSlotTopChange}/>
        <SlotBottomOptions slotBottomOption={slotBottomOption} onSlotBottomChange={onSlotBottomChange} />
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
