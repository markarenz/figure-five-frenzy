import React from 'react';
import css from '../css/modules/gameOverModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';

import { CheckCircleOutline as IconBack } from '@material-ui/icons';

const GameOverModal = ({ score, localHighScore }) => {
  const defaultName = localStorage.getItem('hsname');
  const [scoresLoading, setScoresLoading] = React.useState(false);
  const [hsName, setHsName] = React.useState(defaultName || 'AAA');
  const [gameOver, setGameOver] = React.useState(false);
  const [highscoreEligible, setHighscoreEligible] = React.useState(false);
  const navigate = useNavigate();

  const submitScore = () => {
    setHighscoreEligible(false);
    setScoresLoading(true);
    localStorage.setItem('hsname', hsName);
    if ((hsName !== '') & (score > 0)) {
      const url = process.env.REACT_APP__MMS_SCORES_URL;
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'content-type': 'application/json',
          'x-api-key': process.env.REACT_APP__MMS_SCORES_API_KEY,
        },
        body: JSON.stringify({
          name: hsName,
          score: score,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // data saved
          navigate('/');
        });
    }
  };

  const getScores = () => {
    setScoresLoading(true);
    const url = process.env.REACT_APP__MMS_SCORES_URL;
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.REACT_APP__MMS_SCORES_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setScoresLoading(false);
        const scores = data.scores;
        const lowestScore = scores[scores.length - 1].score;
        if (score > 0 && (score > lowestScore || data.length < 25)) {
          setHighscoreEligible(true);
        }
      });
  };

  React.useEffect(() => {
    if (score > 0) {
      if (score > localHighScore) {
        localStorage.setItem('localHighScore', score);
      }
      getScores();
    }
    setTimeout(() => {
      setGameOver(true);
    }, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartClick = () => {
    if (highscoreEligible && hsName !== '') {
      submitScore();
    } else {
      navigate('/');
    }
  };
  const handleChangeName = (e) => {
    const val = e.target.value.toUpperCase();
    setHsName(val);
  };

  return (
    <div className={`${css.root} ${gameOver ? css.active : ''}`}>
      <div className={`${css.stage} ${gameOver ? css.active : ''}`}>
        <div className={css.stageInner}>
          <h2>Game Over</h2>

          <div
            className={`${css.scoresLoading} ${
              scoresLoading && css.scoresLoadingActive
            }`}
          >
            <CircularProgress className={css.progress} />
          </div>

          <div
            className={`${css.hsForm} ${highscoreEligible && css.hsFormActive}`}
          >
            You made it to the high scores table!
            <br />
            Enter your initials(*):
            <br />
            <input onChange={handleChangeName} maxLength={3} value={hsName} />
          </div>
          <div className={css.btnGeneralWrap}>
            <Button className={css.btnGeneral} onClick={handleStartClick}>
              <IconBack className={css.btnIcon} />
              <span>OK</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
