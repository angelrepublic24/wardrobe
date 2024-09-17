import React, { useState } from 'react'
import { Control } from '../../components/controlPanel/control'
import {WardrobeCloset} from '../../components/wardrobeCloset/WardrobeCloset'

export const Closet = () => {
  const [sizeOption, setSizeOption] = useState('6 Inch');

  const handleSizeChange = (event) => {
    setSizeOption(event.target.value)
  }

  return (
    <div className='flex'>
      <Control sizeOption={sizeOption} onSizeChange={handleSizeChange} />
      <WardrobeCloset sizeOption={sizeOption} />
    </div>
  )
}
