import { Link, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Canvas from "./pages/Canvas";
import './Nav.css'

const App = () => {
  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/canvas" element={<Canvas />} />
        </Routes>
      </div>
      <nav className="bottom-nav">
        <Link to={'/'}>Clicker</Link>
        <Link to={'/canvas'}>Canvas</Link>
      </nav>
    </div>
  )
}

export default App;