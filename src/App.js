import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Blogs from "./screens/Blogs"
import DescoveryCall from "./screens/DescoveryCall"

import './App.css';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Blogs />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/descoverycall" element={<DescoveryCall />} />
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
