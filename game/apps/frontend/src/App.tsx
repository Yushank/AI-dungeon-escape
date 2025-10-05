import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/home";
import { Game } from "./pages/game";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <>
      <GameProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden py-8">
            <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30 z-50"></div>
            <div className="container mx-auto px-4 py-4 relative z-10 max-w-4xl">
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </GameProvider>
    </>
  );
}

export default App;
