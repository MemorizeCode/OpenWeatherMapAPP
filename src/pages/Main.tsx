import { useEffect, useState } from 'react';
import '../App.css';
import '../Shop.css';

interface Boost {
  id: number;
  title: string;
  price: number;
  value: number;
  description: string;
  active: boolean;
}


declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        showAlert: (message: string) => void;
      };
    };
  }
}

const tg = window.Telegram.WebApp;

function Main() {
  const [click, setClick] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [listBoost] = useState<Boost[]>([
    {
      id: 1,
      title: "+5 clicks",
      price: 30,
      value: 5,
      description: "Basic boost - adds 5 clicks per tap",
      active: false
    },
    {
      id: 2,
      title: "+10 clicks",
      price: 120,
      value: 10,
      description: "Medium boost - adds 10 clicks per tap",
      active: false
    },
    {
      id: 3,
      title: "+25 clicks",
      price: 300,
      value: 25,
      description: "Advanced boost - adds 25 clicks per tap",
      active: false
    },
    {
      id: 4,
      title: "+50 clicks",
      price: 1000,
      value: 50,
      description: "Super boost - adds 50 clicks per tap",
      active: false
    }
  ]);
  const [activeBoost, setActiveBoost] = useState<Boost[]>([]);
  const [clickPlus, setClickPlus] = useState<number>(1);

  useEffect(() => {
    tg.ready();
    // Раскрыть WebApp на весь экран
    // tg.expand() 
  }, []);

  const handleClick = () => {
    setClick(prev => prev + clickPlus);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const buyBoost = (price: number, plusClick: number, id: number, boost: Boost) => {
    const findBoost = activeBoost.find((el) => el.id === id);
    
    if (findBoost?.active) {
      tg.showAlert(`Такой буст уже есть!`);
    }
    else {
      if (price > click) {
        tg.showAlert(`Мало кликов!`);
      }
      else {
        setClick((prev) => prev - price);
        setClickPlus((prev) => prev + plusClick);
        setActiveBoost([...activeBoost, { ...boost, active: true }]);
      }
    }
  };

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
      </main>

      <div className="shop-container">
        <h2>Boost Shop</h2>

        <div className="boosts-grid">
          {listBoost.map(boost => {
            const canBuy = activeBoost.some(e => e.id === boost.id && e.active);

            return (
              <div
                key={boost.id}
                className={`boost-card`}
              >
                <h3>{boost.title}</h3>
                <p>{boost.description}</p>
                <div className="boost-footer">
                  <span className="price">{boost.price} clicks</span>
                  <button
                    disabled={canBuy}
                    onClick={() => buyBoost(boost.price, boost.value, boost.id, boost)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Main;