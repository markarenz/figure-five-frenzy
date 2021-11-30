import React, { useEffect } from "react";
import "./css/app.scss";
import css from "./css/modules/app.module.scss";
import { Routes, Route, useLocation } from 'react-router-dom';
import GameBoard from "./components/GameBoard";
// import Footer from "./components/Footer";
import StartScreen from "./components/StartScreen";
import ScoresScreen from "./components/ScoresScreen";
import HowToScreen from "./components/HowToScreen";

function App() {
    const location = useLocation();
    function scrollToTop() {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        scrollToTop();
    }, [location])
    return (
        <div className={css.app}>
            <Routes>
                <Route path="/" element={<StartScreen />} />
                <Route path="/game" element={<GameBoard />} />
                <Route path="/scores" element={<ScoresScreen />} />
                <Route path="/howto" element={<HowToScreen />} />
            </Routes>
        </div>
    );
}

export default App;
