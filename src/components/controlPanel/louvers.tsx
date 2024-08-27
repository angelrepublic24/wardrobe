import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

export const Louvers = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRoundedOpen, setIsRoundedOpen] = useState<boolean>(false);
  const [isLightingOpen, setIsLightingOpen] = useState<boolean>(false);
  const [isTopBottomOpen, setIsTopBottomOpen] = useState<string | null>(null);
  const [is1x3Open, setIs1x3Open] = useState<boolean>(false);
  const [isLighting1x3Open, setIsLighting1x3Open] = useState<boolean>(false);
  const [is2x3Open, setIs2x3Open] = useState<boolean>(false);
  const [isLighting2x3Open, setIsLighting2x3Open] = useState<boolean>(false);

  const labels = [
    {
      value: "Rounded",
      name: "rounded",
    },
    {
      value: `1" x 3"`,
      name: "1x3",
    },
    {
      value: `2" x 3"`,
      name: "2x3",
    },
  ];

  const subLabels = [
    "No Lighting",
    "Lighting",
  ];

  const lightingOptions = [
    "LED Tap Strip",
    "Louver Light Extension",
  ];

  const topBottomOptions = ["Top", "Bottom"];

  return (
    <div className="options flex flex-col bottom-1 p-2 box-content">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-sm">
            Louvers
            {/* <span className="underline font-normal"> 2 Shelves</span> */}
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
        <div>
          {labels.map((label, index) => (
            <div key={index} className="col py-2">
              <input className="mr-2" type="radio" name={label.name} id={label.name} />
              <label className="text-sm" htmlFor={label.name}>
                {label.value}
              </label>
              {label.name === "rounded" && (
                <>
                  <button onClick={() => setIsRoundedOpen(prev => !prev)} className="ml-2">
                    {isRoundedOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                  </button>
                  {isRoundedOpen && (
                    <div className="pl-4 mt-2">
                      {subLabels.map((subLabel, index) => (
                        <div key={index} className="py-1">
                          <input className="mr-2" type="radio" name="lighting" id={subLabel} />
                          <label className="text-sm" htmlFor={subLabel}>
                            {subLabel}
                          </label>
                          {subLabel === "Lighting" && (
                            <>
                              <button onClick={() => setIsLightingOpen(prev => !prev)} className="ml-2">
                                {isLightingOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                              </button>
                              {isLightingOpen && (
                                <div className="pl-4 mt-2">
                                  {lightingOptions.map((option, index) => (
                                    <div key={index} className="py-1">
                                      <input className="mr-2" type="radio" name="lightingOptions" id={option} />
                                      <label className="text-sm" htmlFor={option}>
                                        {option}
                                      </label>
                                      {(option === "LED Tap Strip" || option === "Louver Light Extension") && (
                                        <>
                                          <button 
                                            onClick={() => setIsTopBottomOpen(prev => prev === option ? null : option)}
                                            className="ml-2"
                                          >
                                            {isTopBottomOpen === option ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                                          </button>
                                          {isTopBottomOpen === option && (
                                            <div className="pl-4 mt-2">
                                              {topBottomOptions.map((topBottom, index) => (
                                                <div key={index} className="py-1">
                                                  <input className="mr-2" type="radio" name={`${option}-top-bottom`} id={topBottom} />
                                                  <label className="text-sm" htmlFor={topBottom}>
                                                    {topBottom}
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
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {label.name === "1x3" && (
                <>
                  <button onClick={() => setIs1x3Open(prev => !prev)} className="ml-2">
                    {is1x3Open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                  </button>
                  {is1x3Open && (
                    <div className="pl-4 mt-2">
                      {subLabels.map((subLabel, index) => (
                        <div key={index} className="py-1">
                          <input className="mr-2" type="radio" name="lighting" id={subLabel} />
                          <label className="text-sm" htmlFor={subLabel}>
                            {subLabel}
                          </label>
                          {subLabel === "Lighting" && (
                            <>
                              <button onClick={() => setIsLighting1x3Open(prev => !prev)} className="ml-2">
                                {isLighting1x3Open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                              </button>
                              {isLighting1x3Open && (
                                <div className="pl-4 mt-2">
                                  {lightingOptions.map((option, index) => (
                                    <div key={index} className="py-1">
                                      <input className="mr-2" type="radio" name="lightingOptions1x3" id={option} />
                                      <label className="text-sm" htmlFor={option}>
                                        {option}
                                      </label>
                                      {(option === "LED Tap Strip" || option === "Louver Light Extension") && (
                                        <>
                                          <button 
                                            onClick={() => setIsTopBottomOpen(prev => prev === option ? null : option)}
                                            className="ml-2"
                                          >
                                            {isTopBottomOpen === option ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                                          </button>
                                          {isTopBottomOpen === option && (
                                            <div className="pl-4 mt-2">
                                              {topBottomOptions.map((topBottom, index) => (
                                                <div key={index} className="py-1">
                                                  <input className="mr-2" type="radio" name={`${option}-top-bottom`} id={topBottom} />
                                                  <label className="text-sm" htmlFor={topBottom}>
                                                    {topBottom}
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
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {label.name === "2x3" && (
                <>
                  <button onClick={() => setIs2x3Open(prev => !prev)} className="ml-2">
                    {is2x3Open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                  </button>
                  {is2x3Open && (
                    <div className="pl-4 mt-2">
                      {subLabels.map((subLabel, index) => (
                        <div key={index} className="py-1">
                          <input className="mr-2" type="radio" name="lighting2x3" id={subLabel} />
                          <label className="text-sm" htmlFor={subLabel}>
                            {subLabel}
                          </label>
                          {subLabel === "Lighting" && (
                            <>
                              <button onClick={() => setIsLighting2x3Open(prev => !prev)} className="ml-2">
                                {isLighting2x3Open ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                              </button>
                              {isLighting2x3Open && (
                                <div className="pl-4 mt-2">
                                  {lightingOptions.map((option, index) => (
                                    <div key={index} className="py-1">
                                      <input className="mr-2" type="radio" name="lightingOptions2x3" id={option} />
                                      <label className="text-sm" htmlFor={option}>
                                        {option}
                                      </label>
                                      {(option === "LED Tap Strip" || option === "Louver Light Extension") && (
                                        <>
                                          <button 
                                            onClick={() => setIsTopBottomOpen(prev => prev === option ? null : option)}
                                            className="ml-2"
                                          >
                                            {isTopBottomOpen === option ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
                                          </button>
                                          {isTopBottomOpen === option && (
                                            <div className="pl-4 mt-2">
                                              {topBottomOptions.map((topBottom, index) => (
                                                <div key={index} className="py-1">
                                                  <input className="mr-2" type="radio" name={`${option}-top-bottom`} id={topBottom} />
                                                  <label className="text-sm" htmlFor={topBottom}>
                                                    {topBottom}
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
      <div className="border-b-2 border-b-gray-300"></div>
    </div>
  );
};
