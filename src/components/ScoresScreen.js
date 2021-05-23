import React from "react";
import css from "../css/modules/scoresScreen.module.scss";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import {
  CheckCircleOutline as IconBack,
  Refresh as IconRefresh
} from "@material-ui/icons";

const ScoresScreen = ({ navPage }) => {
  const [scoresLoading, setScoresLoading] = React.useState(false);
  const [scores, setScores] = React.useState([]);
  const getScores = () => {
    setScoresLoading(true);
    const url =
      process.env.REACT_APP__RESTDBIO_URL +
      '?q={"game":"figurefive"}&h={"$orderby":{"score":-1}}';
    console.log(url);
    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        "x-apikey": process.env.REACT_APP__RESTDBIO_API_KEY,
        "cache-control": "no-cache"
      }
    })
      .then(res => res.json())
      .then(data => {
        setScoresLoading(false);
        setScores(data);
      });
  };
  const handleRefreshClick = () => {
    getScores();
  };
  const scoresDisp = scores
    ? scores.map((item, idx) => (
        <li className={css.scoresRow} key={idx}>
          <span className={css.scoresRowIdx}>{idx + 1}</span>
          <span className={css.scoresRowName}>
            {item.name.substr(0, 3).toUpperCase()}
          </span>
          <span className={css.scoresRowScore}>{item.score}</span>
        </li>
      ))
    : null;
  React.useEffect(() => {
    getScores();
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
              scoresLoading ? css.scoresUlLoading : ""
            }`}
          >
            {scoresDisp}
          </ul>
        )}
      </div>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6} align="center">
              <div className={css.btnGeneralWrap}>
                  <Button className={css.btnGeneral} onClick={() => navPage("start")}>
                      <IconBack className={css.btnIcon} />
                      <span>Back</span>
                  </Button>
              </div>
          </Grid>
          <Grid item xs={12} sm={6} align="center">
              <div className={css.btnGeneralWrap}>
                  <Button className={css.btnGeneral} onClick={() => handleRefreshClick()}>
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
