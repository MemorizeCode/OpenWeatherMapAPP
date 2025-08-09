import { useEffect } from 'react'
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
      <h2>Tg app</h2>
      <button onClick={onClose}>Close App</button>
    </div>
  )
}

export default App
