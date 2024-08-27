import React from "react";
import { BaseSizeOption } from "./baseSizeOption";
import { Louvers } from "./louvers";
import { Drainage } from "./drainage";
import { CanopySupport } from "./canopySupport";
import { ColorOptions } from "./colorOptions";
import { GlassRoom } from "./glassRoom";
import { RoofingOptions } from "./roofingOptions";
import { SlotOptions } from "./slotOptions";

export const Control = () => {
  return (
    <div className="relative flex flex-col w-[700px] h-[600px] border rounded-3xl bg-white overflow-hidden box-content mr-2">
      <div className="color bg-black p-1">
        <p className="text-white ">
          Color <span>WHITE</span>
        </p>
      </div>
      <div className="bg-gray-100 my-4 w-full h-[100%]] mt-1 border border-gray-300 shadow-lg  overflow-y-auto">
        <BaseSizeOption/>
        <Louvers />
        <Drainage />
        <CanopySupport />
        <ColorOptions />
        <GlassRoom />
        <RoofingOptions />
        <SlotOptions />

      </div>

      
    </div>
  );
};
