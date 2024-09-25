import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

// export const BaseSizeOption = ({ sizeOption, onSizeChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
  
//   // Function to handle dropdown toggle
//   const toggleDropdown = () => {
//     setIsOpen(prev => !prev);
//   };

//   return (
//     <div className='border rounded-xl bg-white'>
//       <div className="options flex flex-col p-3 box-content">
//         <div className="flex justify-between">
//           <div>
//             <p className="font-bold text-sm">Base Size</p>
//           </div>
//           <div>
//             {!isOpen ? (
//               <button onClick={toggleDropdown}>
//                 <MdKeyboardArrowRight />
//               </button>
//             ) : (
//               <button onClick={toggleDropdown}>
//                 <MdKeyboardArrowDown />
//               </button>
//             )}
//           </div>
//         </div>

//         {isOpen && (
//           <div className="transition-all">
//             {["20 ft", "18 ft","16 ft", "14 ft", "12 ft", "10 ft", "8 ft", "6 ft", "4 ft", "2 ft"].map((size) => (
//               <div key={size} className="col py-2">
//                 <input
//                   className="mr-2"
//                   type="radio"
//                   name="baseSize"
//                   value={size}
//                   checked={sizeOption === size}
//                   onChange={onSizeChange}
//                 />
//                 <label className="text-sm" htmlFor={size}>{size}</label>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="border-b-2 border-b-gray-300 mt-1"></div>
//       </div>
//     </div>
//   );
// };

// export const LengthSideOption = ({ lengthSideOption, onLengthSizeChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(prev => !prev);
//   };

//   return (
//     <div className='border rounded-3xl bg-white'>
//       <div className="options flex flex-col p-3 box-content">
//         <div className="flex justify-between">
//           <div>
//             <p className="font-bold text-sm">Length Side</p>
//           </div>
//           <div>
//             {!isOpen ? (
//               <button onClick={toggleDropdown}>
//                 <MdKeyboardArrowRight />
//               </button>
//             ) : (
//               <button onClick={toggleDropdown}>
//                 <MdKeyboardArrowDown />
//               </button>
//             )}
//           </div>
//         </div>

//         {isOpen && (
//           <div className="transition-all">
//             {["10 ft", "8 ft", "6 ft", "4 ft", "2 ft"].map((size) => (
//               <div key={size} className="col py-2">
//                 <input
//                   className="mr-2"
//                   type="radio"
//                   name="lengthSide"
//                   value={size}
//                   checked={lengthSideOption === size}
//                   onChange={onLengthSizeChange}
//                 />
//                 <label className="text-sm" htmlFor={size}>{size}</label>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="border-b-2 border-b-gray-300 mt-1"></div>
//       </div>
//     </div>
//   );
// };

// export const SlotTopOptions = ({ slotTopOption, onSlotTopChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(prev => !prev);
//   };

//   return (
//     <div className="border rounded-3xl bg-white">
//       <div className="options flex flex-col p-3 box-content">
//         <div className="flex justify-between">
//           <div>
//             <p className="font-bold text-sm">Slot Top</p>
//           </div>
//           <div>
//             {!isOpen ? (
//               <button onClick={toggleDropdown}>
//                 <MdKeyboardArrowRight />
//               </button>
//             ) : (
//               <button onClick={toggleDropdown}>
//                 <MdKeyboardArrowDown />
//               </button>
//             )}
//           </div>
//         </div>

//         {isOpen && (
//           <div className="transition-all">
//             {["Tube", "Channel", "Crown", "None"].map((slot) => (
//               <div key={slot} className="col py-2">
//                 <input
//                   className="mr-2"
//                   type="radio"
//                   name="slotTop"
//                   value={slot}
//                   checked={slotTopOption === slot}
//                   onChange={onSlotTopChange} // Actualizar el estado slotOption
//                 />
//                 <label className="text-sm" htmlFor={slot}>
//                   {slot}
//                 </label>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="border-b-2 border-b-gray-300 mt-1"></div>
//       </div>
//     </div>
//   );
// };

// export const SlotBottomOptions = ({ slotBottomOption, onSlotBottomChange }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(prev => !prev);
//   };

//   return (
//     <div className="border rounded-3xl bg-white">
//       <div className="options flex flex-col p-3 box-content">
//         <div className="flex justify-between">
//           <div>
//             <p className="font-bold text-sm">Slot Bottom</p>
//           </div>
//           <div>
//             {!isOpen ? (
//               <button onClick={toggleDropdown}>
//                 <MdKeyboardArrowRight />
//               </button>
//             ) : (
//               <button onClick={toggleDropdown}>
//                 <MdKeyboardArrowDown />
//               </button>
//             )}
//           </div>
//         </div>

//         {isOpen && (
//           <div className="transition-all">
//             {["Tube", "Channel", "Crown", "None"].map((slot) => (
//               <div key={slot} className="col py-2">
//                 <input
//                   className="mr-2"
//                   type="radio"
//                   name="slotBottom"
//                   value={slot}
//                   checked={slotBottomOption === slot}
//                   onChange={onSlotBottomChange} // Actualizar el estado slotOption
//                 />
//                 <label className="text-sm" htmlFor={slot}>
//                   {slot}
//                 </label>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="border-b-2 border-b-gray-300 mt-1"></div>
//       </div>
//     </div>
//   );
// };




export const BaseSizeOption = ({ sizeOption, onSizeChange, isOpen, toggleDropdown }) => {
  return (
    <div className='border rounded-xl bg-white'>
      <div className="options flex flex-col p-3 box-content">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-sm">Base Size</p>
          </div>
          <div>
            <button onClick={toggleDropdown}>
              {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="transition-all">
            {["20 ft", "18 ft","16 ft", "14 ft", "12 ft", "10 ft", "8 ft", "6 ft", "4 ft", "2 ft"].map((size) => (
              <div key={size} className="col py-2">
                <input
                  className="mr-2"
                  type="radio"
                  name="baseSize"
                  value={size}
                  checked={sizeOption === size}
                  onChange={onSizeChange}
                />
                <label className="text-sm" htmlFor={size}>{size}</label>
              </div>
            ))}
          </div>
        )}
        <div className="border-b-2 border-b-gray-300 mt-1"></div>
      </div>
    </div>
  );
};
export const LengthSideOption = ({ lengthSideOption, onLengthSizeChange, isOpen, toggleDropdown }) => {
  return (
    <div className='border rounded-3xl bg-white'>
      <div className="options flex flex-col p-3 box-content">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-sm">Length Side</p>
          </div>
          <div>
            <button onClick={toggleDropdown}>
              {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="transition-all">
            {["10 ft", "8 ft", "6 ft", "4 ft", "2 ft"].map((size) => (
              <div key={size} className="col py-2">
                <input
                  className="mr-2"
                  type="radio"
                  name="lengthSide"
                  value={size}
                  checked={lengthSideOption === size}
                  onChange={onLengthSizeChange}
                />
                <label className="text-sm" htmlFor={size}>{size}</label>
              </div>
            ))}
          </div>
        )}
        <div className="border-b-2 border-b-gray-300 mt-1"></div>
      </div>
    </div>
  );
};

export const SlotTopOptions = ({ slotTopOption, onSlotTopChange, isOpen, toggleDropdown }) => {
  return (
    <div className="border rounded-3xl bg-white">
      <div className="options flex flex-col p-3 box-content">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-sm">Slot Top</p>
          </div>
          <div>
            <button onClick={toggleDropdown}>
              {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="transition-all">
            {["Tube", "Channel", "Crown", "None"].map((slot) => (
              <div key={slot} className="col py-2">
                <input
                  className="mr-2"
                  type="radio"
                  name="slotTop"
                  value={slot}
                  checked={slotTopOption === slot}
                  onChange={onSlotTopChange}
                />
                <label className="text-sm" htmlFor={slot}>
                  {slot}
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="border-b-2 border-b-gray-300 mt-1"></div>
      </div>
    </div>
  );
};
export const SlotBottomOptions = ({ slotBottomOption, onSlotBottomChange, isOpen, toggleDropdown }) => {
  return (
    <div className="border rounded-3xl bg-white">
      <div className="options flex flex-col p-3 box-content">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-sm">Slot Bottom</p>
          </div>
          <div>
            <button onClick={toggleDropdown}>
              {isOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="transition-all">
            {["Tube", "Channel", "Crown", "None"].map((slot) => (
              <div key={slot} className="col py-2">
                <input
                  className="mr-2"
                  type="radio"
                  name="slotBottom"
                  value={slot}
                  checked={slotBottomOption === slot}
                  onChange={onSlotBottomChange}
                />
                <label className="text-sm" htmlFor={slot}>
                  {slot}
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="border-b-2 border-b-gray-300 mt-1"></div>
      </div>
    </div>
  );
};