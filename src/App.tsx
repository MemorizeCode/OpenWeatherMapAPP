import { Link, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Canvas from "./pages/Canvas";
import './Nav.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
      <nav>
        <Link to={'/'}>Clicker</Link>
        <Link to={'/canvas'}>Canvas</Link>
      </nav>
    </>
  )
}

export default App;