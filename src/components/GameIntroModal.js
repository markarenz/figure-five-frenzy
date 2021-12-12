import React from 'react';
import css from '../css/modules/gameIntroModal.module.scss';
import { Button } from '@material-ui/core';
import { PlayCircleFilledOutlined as IconPlay } from '@material-ui/icons';

const GameIntroModal = ({ initRound }) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleStartClick = () => {
    setIsClicked(true);
    // delay initround for 0.5s
    initRound();
  };
  return (
    <div className={`${css.root} ${isClicked ? css.exitRoot : null}`}>
      <div className={`${css.stage} ${isClicked ? css.exitStage : null}`}>
        <div className={css.stageInner}>
          <h2>Ready?</h2>
          <div className={css.btnGeneralWrap}>
            <Button className={css.btnGeneral} onClick={handleStartClick}>
              <IconPlay className={css.btnIcon} />
              <span>Start</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameIntroModal;
