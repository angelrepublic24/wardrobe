import React from "react";
import { TopOption } from "./topOption";
import { BottomOption } from "./bottomOption";
import { DoorOption } from "./doorOption";

export const Control = () => {
  return (
    <div className="relative flex flex-col w-[700px] h-[600px] border rounded-3xl bg-white overflow-hidden box-content mr-2">
      <div className="color bg-black p-1">
        <p className="text-white ">
          Color <span>WHITE</span>
        </p>
      </div>
      <div className="bg-gray-100 my-4 w-full h-[100%]] mt-1 border border-gray-300 shadow-lg  overflow-y-auto">
        <TopOption/>
        <BottomOption />
        <DoorOption />
      </div>

      
    </div>
  );
};
