import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import MemList from "./components/MemList";
import AddMeme from "./components/AddMeme";
import styles from "./App.module.css";
import StartPage from "./components/StartPage";

function App() {
  return (
    <BrowserRouter future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true 
    }}>
      <div className={styles.app}>
        <Navigation />

        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/hot" element={<MemList />} />
            <Route path="/regular" element={<MemList />} />
            <Route path="/favourites" element={<MemList />} />
            <Route path="/add" element={<AddMeme />} />
            <Route path="*" element={<StartPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
