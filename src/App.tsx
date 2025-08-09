import { useEffect, useState } from 'react'
import './App.css'

const tg = window.Telegram.WebApp

function App() {
  const [click, setClick] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [activatedBoosts, setActivatedBoosts] = useState([])
  const [clickPlus, setClickPlus] = useState(1)

  useEffect(() => {
    tg.ready()
    // Раскрыть WebApp на весь экран
    // tg.expand() 
  }, [])

  const handleClick = () => {
    setClick(prev => prev + clickPlus)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const byBoost = (price: number, plusClick: number, id: number) => {
    const findBoost = activatedBoosts.find((el: any) => el.id == id)
    if (findBoost) {
      // @ts-ignore
      tg.WebApp.showAlert("Такой буст уже есть");
    }
    else {
      if (price > click) {
        // @ts-ignore
        tg.WebApp.showAlert("Мало кликов!");
      }
      else {
        setClick((prev) => prev - price)
        setClickPlus((prev) => prev + plusClick)
        // @ts-ignore
        setActivatedBoosts([...activatedBoosts, { id: id, title: `+${plusClick} clicks` }])

      }
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>React Clicker</h1>
        <p>Cool react clicker</p>
      </header>

      <main className="main-content">
        <p>In one click: {clickPlus}</p>
        <div className={`click-display ${isAnimating ? 'pulse' : ''}`}>
          <h2>Your clicks:</h2>
          <div className="counter">{click}</div>
        </div>

        <button
          className="click-button"
          onClick={handleClick}
        >
          CLICK ME!
        </button>


        <p>Shop</p>
        <div className="shop">
          <button onClick={() => byBoost(30, 5, 1)}>+5 clicks - 30 click</button>
          <button onClick={() => byBoost(120, 10, 2)}>+10 clicks - 120 click</button>
        </div>

        <div className='boost'>
          <p>Activated boosters</p>
          {
            activatedBoosts.length > 0 ?
              activatedBoosts.map((el: any) => {
                return (<p key={el.id}>{el.title}</p>)
              })
              :
              <p>! Нету бустов !</p>
          }
        </div>
      </main>

      <footer className="footer">
        <p>:)</p>
      </footer>
    </div>
  )
}

export default App