import { useState } from 'react'
import './App.css'
import { Closet } from './screen/Closet/Closet'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full'>
      <Closet />
    </div>
  )
}

export default App
