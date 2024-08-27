import React from 'react'
import { Control } from '../../components/controlPanel/control'
import {WardrobleCloset} from '../../components/wardrobeCloset/WardrobeCloset'

export const Closet = () => {
  return (
    <div className='flex'>
      <Control />
      <WardrobleCloset />
    </div>
  )
}
