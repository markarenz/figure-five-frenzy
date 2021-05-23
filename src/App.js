import React from "react";
import "./css/app.scss";
import css from "./css/modules/app.module.scss";
import GameBoard from "./components/GameBoard";
// import Footer from "./components/Footer";
import StartScreen from "./components/StartScreen";
import ScoresScreen from "./components/ScoresScreen";
import HowToScreen from "./components/HowToScreen";

function App() {
  const [currentView, setCurrentView] = React.useState("start");

  function scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
      }, 15);
  }

  const navPage = slug => {
    scrollToTop(250);
    setCurrentView(slug);
  };

  return (
    <div className={css.app}>
      <div
        className={`${css.page} ${
          currentView === "game" ? css.activePage : null
        }`}
      >
        {currentView === "game" ? <GameBoard navPage={navPage} /> : null}
      </div>

      <div
        className={`${css.page} ${
          currentView === "start" ? css.activePage : null
        }`}
      >
        <StartScreen navPage={navPage} />
      </div>

      <div
        className={`${css.page} ${
          currentView === "scores" ? css.activePage : null
        }`}
      >
        <ScoresScreen navPage={navPage} />
      </div>

        <div
            className={`${css.page} ${
                currentView === "howTo" ? css.activePage : null
            }`}
        >
            <HowToScreen navPage={navPage} />
        </div>


    </div>
  );
}

export default App;
