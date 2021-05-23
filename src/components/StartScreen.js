import React from "react";
import css from "../css/modules/start.module.scss";
import { Button } from "@material-ui/core";
import { PlayCircleFilledOutlined as IconPlay, HelpOutline as IconHelp, EmojiEvents as IconScores } from "@material-ui/icons";

const StartScreen = ({ navPage }) => {
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
        <Button className={css.btnGeneral} onClick={() => navPage("game")}>
          <IconPlay className={css.btnIcon} />
          <span>Play</span>
        </Button>
      </div>

      <div className={css.localHighScoreWrap}>
        {
          (localHighScore && localHighScore>0) &&
          <h3>Your high score: {localHighScore}</h3>
        }
      </div>
      <div className={css.lowerButtons}>
        <div className={css.btnGeneralWrap}>
          <Button className={css.btnGeneralOutline} onClick={() => navPage("scores")}>
            <IconScores className={css.btnIcon} />
            <span>Scores</span>
          </Button>
        </div>


        <div className={css.btnGeneralWrap}>
          <Button className={css.btnGeneralOutline} onClick={() => navPage("howTo")}>
            <IconHelp className={css.btnIcon} />
            <span>Help</span>
          </Button>
        </div>
      </div>

    </div>
  );
};
export default StartScreen;
