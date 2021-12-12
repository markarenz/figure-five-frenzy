import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import css from '../css/modules/scoresScreen.module.scss';
import { Button, CircularProgress, Grid } from '@material-ui/core';
import {
  CheckCircleOutline as IconBack,
  Refresh as IconRefresh,
  GetApp as IconLoadMore,
} from '@material-ui/icons';

const ScoresScreen = () => {
  const [reachedResultsEnd, setReachedReasultsEnd] = useState(false);
  const [fetchKey, setFetchKey] = useState(null);
  const [scoresLoading, setScoresLoading] = useState(false);
  const [scores, setScores] = useState([]);
  const getScores = (mode) => {
    console.log('getScores');
    let thisFetchKey = fetchKey;
    if (mode === 'refresh') {
      setFetchKey(null);
      thisFetchKey = null;
      setReachedReasultsEnd(false);
    }
    setScoresLoading(true);
    const url = process.env.REACT_APP__MMS_SCORES_URL;
    const apiKey = process.env.REACT_APP__MMS_SCORES_API_KEY;
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'x-last-fetch-key': thisFetchKey ? JSON.stringify(thisFetchKey) : null,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setScoresLoading(false);
        if (mode === 'append') {
          setScores([...scores, ...data.scores]);
        } else {
          setScores(data.scores);
        }
        if (data.nextFetchKey) {
          setFetchKey(data.nextFetchKey);
        } else {
          setReachedReasultsEnd(true);
        }
      });
  };
  const handleRefreshClick = () => {
    getScores('refresh');
  };
  const handleLoadMore = () => {
    getScores('append');
  };
  const scoresDisp = scores
    ? scores?.map((item, idx) => (
        <li className={css.scoresRow} key={idx}>
          <span className={css.scoresRowIdx}>{idx + 1}</span>
          <span className={css.scoresRowName}>
            {item?.name?.substr(0, 3).toUpperCase()}
          </span>
          <span className={css.scoresRowScore}>{item.score}</span>
        </li>
      ))
    : null;
  React.useEffect(() => {
    getScores('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.root}>
      <div className={`${css.title} ${css.title1}`}>High Scores</div>
      <div className={css.scoresStage}>
        {scoresLoading && (
          <div className={css.progressWrap}>
            <CircularProgress className={css.progress} />
          </div>
        )}
        {scores && (
          <ul
            className={`${css.scoresUl} ${
              scoresLoading ? css.scoresUlLoading : ''
            }`}
          >
            {scoresDisp}
          </ul>
        )}
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} align="center">
          <div className={css.btnGeneralWrap}>
            <Link to="/">
              <Button className={css.btnGeneral}>
                <IconBack className={css.btnIcon} />
                <span>Back</span>
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} sm={4} align="center">
          <div className={css.btnGeneralWrap}>
            {!reachedResultsEnd && (
              <Button className={css.btnGeneral} onClick={handleLoadMore}>
                <IconLoadMore className={css.btnIcon} />
                <span>Load More</span>
              </Button>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={4} align="center">
          <div className={css.btnGeneralWrap}>
            <Button
              className={css.btnGeneral}
              onClick={() => handleRefreshClick()}
            >
              <IconRefresh className={css.btnIcon} />
              <span>Refresh</span>
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default ScoresScreen;
