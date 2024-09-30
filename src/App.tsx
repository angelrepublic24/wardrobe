import { useState } from 'react'
import './App.css'
import { Closet } from './screen/Closet/Closet'
import { SpeedInsights } from '@vercel/speed-insights/react'



function App() {

  return (
    <div className='w-full container mx-auto'>
      <Closet />
      <SpeedInsights />
    </div>
  )
}

export default App
