import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Game } from "./pages/game";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </>
  );
}

export default App;
