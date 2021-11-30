import React from "react";
import css from "../css/modules/start.module.scss";
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import { PlayCircleFilledOutlined as IconPlay, HelpOutline as IconHelp, EmojiEvents as IconScores } from "@material-ui/icons";

const StartScreen = () => {
  const [animationTriggered, setanimationTriggered] = React.useState(false);
  const localHighScore = localStorage.getItem('localHighScore');
  const initAnimation = () => {
    setTimeout(() => {
      setanimationTriggered(true);
    }, 250);
  };
  React.useEffect(() => {
    initAnimation();
  }, []);

  return (
    <div
      className={`${css.root} ${animationTriggered ? css.introAnimate : ""}`}
    >
      <div className={`${css.title} ${css.title1}`}>Figure</div>
      <div className={`${css.title} ${css.title2}`}>Five</div>
      <div className={`${css.title} ${css.title3}`}>Frenzy</div>
      <div className={css.explainer}>A game for those who &lt;3 math.</div>
      <div className={css.btnGeneralWrap}>
        <Link to="/game">
          <Button className={css.btnGeneral}>
            <IconPlay className={css.btnIcon} />
            <span>Play</span>
          </Button>
        </Link>
      </div>

      <div className={css.localHighScoreWrap}>
        {
          (localHighScore && localHighScore>0) &&
          <h3>Your high score: {localHighScore}</h3>
        }
      </div>
      <div className={css.lowerButtons}>
        <div className={css.btnGeneralWrap}>
          <Link to="/scores">
            <Button className={css.btnGeneralOutline}>
              <IconScores className={css.btnIcon} />
              <span>Scores</span>
            </Button>
          </Link>
        </div>


        <div className={css.btnGeneralWrap}>
          <Link to="/howto">
            <Button className={css.btnGeneralOutline}>
              <IconHelp className={css.btnIcon} />
              <span>Help</span>
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};
export default StartScreen;
