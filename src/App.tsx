import "./styles/App.css";
import "dotenv";

import Home from "./Home";
import History from "./History";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import { AppProvider } from "./store/AppContext";
import Modal from "./store/Modal";

function App() {


  return (
    <AppProvider>
      <NavBar />
      <Modal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
