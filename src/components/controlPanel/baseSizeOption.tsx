import React, { forwardRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

export const BaseSizeOption = forwardRef(
  ({ sizeOption, onSizeChange, handleNextStep }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white rounded-xl p-5 w-full md:h-screen flex items-center"
      >
        <div className="options flex flex-col h-full justify-center items-center w-full">
          <div className="flex justify-center items-center mb-4 =">
            <div>
              <p className="font-bold text-lg">Pick your base size</p>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-4 w-full">
            {[
              "20 ft",
              "18 ft",
              "16 ft",
              "14 ft",
              "12 ft",
              "10 ft",
              "8 ft",
              "6 ft",
              "4 ft",
              "2 ft",
            ].map((size) => (
              <div key={size} className="py-2">
                <button
                  className={`w-full py-3 text-sm rounded-lg 
                    ${
                      sizeOption === size
                      ? "button-selected" // Estilo cuando está seleccionado
                      : "bg-white" // 
                      
                    }`}
                  onClick={() => onSizeChange({ target: { value: size } })}
                >
                  {size}
                </button>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center md:justify-end items-end">
            <button
              onClick={handleNextStep}
              className="btn h-14 px-4 rounded-md "
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    );
  }
);
export const LengthSideOption = forwardRef(
  ({ lengthSideOption, onLengthSizeChange, handleNextStep }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white rounded-xl p-5 w-full h-screen flex md:items-center"
      >
        <div className="options flex flex-col h-[40%] md:h-full justify-center items-center w-full">
          <div className="flex justify-center items-center mb-4 =">
            <div>
              <span>
                Choose your{" "}
                <p className="font-bold text-md inline-block">Length Side:</p>{" "}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mb-4 w-full">
            {["10 ft", "8 ft", "6 ft", "4 ft", "2 ft"].map((size) => (
              <div key={size} className="py-2">
                <button
                  className={`w-full py-3 text-sm rounded-lg 
                    ${
                      lengthSideOption === size
                      ? "button-selected" // Estilo cuando está seleccionado
                      : "bg-white" // 
                    }`}
                  onClick={() =>
                    onLengthSizeChange({ target: { value: size } })
                  }
                >
                  {size}
                </button>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center md:justify-end items-end">
            <button
              onClick={handleNextStep}
              className="btn h-14 px-4 rounded-md"

            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export const SlotTopOptions = forwardRef(
  ({ slotTopOption, onSlotTopChange, handleNextStep }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white rounded-xl p-5 w-full h-screen flex md:items-center"
      >
        <div className="options flex flex-col h-[40%] md:h-full justify-center items-center w-full">
          <div className="flex justify-center items-center mb-4 =">
            <div>
              <span>
                Choose your{" "}
                <p className="font-bold text-md inline-block">Slot Top:</p>{" "}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4 w-full">
            {["Tube", "Channel", "Crown", "None"].map((slot) => (
              <div key={slot} className="py-2">
                <button
                  className={`w-full py-3 rounded-lg 
                   ${
                     slotTopOption === slot
                     ? "button-selected" // Estilo cuando está seleccionado
                      : "bg-white" // 
                   }`}
                  onClick={() => onSlotTopChange({ target: { value: slot } })}
                >
                  {slot}
                </button>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center md:justify-end items-end">
            <button
              onClick={handleNextStep}
              className="btn h-14 px-4 rounded-m"

            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    );
  }
);
export const SlotBottomOptions = forwardRef(
  ({ slotBottomOption, onSlotBottomChange }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-white rounded-xl p-5 w-full h-screen flex md:items-center"
      >
        <div className="options flex flex-col h-[40%] md:h-full justify-center items-center w-full">
          <div className="flex justify-center items-center mb-4 =">
            <div>
              <span>
                Choose your{" "}
                <p className="font-bold text-md inline-block">Slot Bottom:</p>{" "}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4 w-full">
            {["Tube", "Channel", "Crown", "None"].map((slot) => (
              <div key={slot} className="py-2">
                <button
                  className={`w-full py-3 text-sm rounded-lg 
                   ${
                     slotBottomOption === slot
                     ? ".button-selected"
                     : "bg-white"
                   }`}
                  onClick={() =>
                    onSlotBottomChange({ target: { value: slot } })
                  }
                >
                  {slot}
                </button>
              </div>
            ))}
          </div>
          <button
            className="btn h-14 px-4 rounded-md  "
          >
            Next Step
          </button>
        </div>
      </div>
    );
  }
);
