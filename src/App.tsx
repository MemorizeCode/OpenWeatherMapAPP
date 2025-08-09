import { useEffect, useState } from 'react'
import './App.css'

const tg = window.Telegram.WebApp 

function App() {
  
  const onClose = () => {
    tg.close()
  }

  useEffect(()=>{
    tg.ready()
  },[])

  return (
    <div>
      <button onClick={onClose}>Close App</button>
    </div>
  )
}

export default App
