import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

export const RoofingOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightingOpen, setIsLightingOpen] = useState<boolean>(false);
  const [isLightingSubOpen, setIsLightingSubOpen] = useState<string | null>(null);

  const labels = [
    { value: "Single Roof", name: "sRoof" },
    { value: "Double Roof", name: "dRoof" },
  ];

  const subLabels = [
    "No Lighting",
    "Lighting",
  ];

  const lightingOptions = ["Down Lights"];

  return (
    <div className="options flex flex-col p-3 box-content">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-sm">
            Roofing Options
          </p>
        </div>
        <div>
          {!isOpen ? (
            <button onClick={() => setIsOpen(prev => !prev)} className="">
              <MdKeyboardArrowRight />
            </button>
          ) : (
            <button onClick={() => setIsOpen(prev => !prev)} className="">
              <MdKeyboardArrowDown />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="transition-all">
          {labels.map((label, index) => (
            <div key={index} className="col py-2">
              <input className="mr-2" type="radio" name={label.name} id={label.name} />
              <label className="text-sm" htmlFor={label.name}>
                {label.value}
              </label>
              {label.name === "dRoof" && (
                <>
                  <button onClick={() => setIsLightingOpen(prev => !prev)} className="ml-2">
                    {isLightingOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                  </button>
                  {isLightingOpen && (
                    <div className="pl-4 mt-2">
                      {subLabels.map((subLabel, index) => (
                        <div key={index} className="py-1">
                          <input className="mr-2" type="radio" name="lighting" id={subLabel} />
                          <label className="text-sm" htmlFor={subLabel}>
                            {subLabel}
                          </label>
                          {subLabel === "Lighting" && (
                            <>
                              <button onClick={() => setIsLightingSubOpen(prev => prev === "Lighting" ? null : "Lighting")} className="ml-2">
                                {isLightingSubOpen === "Lighting" ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                              </button>
                              {isLightingSubOpen === "Lighting" && (
                                <div className="pl-4 mt-2">
                                  {lightingOptions.map((option, index) => (
                                    <div key={index} className="py-1">
                                      <input className="mr-2" type="radio" name="lightingOptions" id={option} />
                                      <label className="text-sm" htmlFor={option}>
                                        {option}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {label.name === "sRoof" && (
                // Puedes agregar lógica similar si es necesario para "Single Roof"
                <></>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="border-b-2 border-b-gray-300 mt-1"></div>
    </div>
  );
};
