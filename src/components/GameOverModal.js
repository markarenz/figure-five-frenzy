import React from 'react';
import css from "../css/modules/gameOverModal.module.scss";
import {Button, CircularProgress} from "@material-ui/core";

import {CheckCircleOutline as IconBack} from "@material-ui/icons";

const GameOverModal = ({navPage, score, localHighScore}) => {
    const [scoresLoading, setScoresLoading] = React.useState(false);
    const [hsName, setHsName] = React.useState('AAA');
    const [gameOver, setGameOver] = React.useState(false);
    const [highscoreEligible, setHighscoreEligible] = React.useState(false);

    const submitScore = () => {
        setHighscoreEligible(false);
        setScoresLoading(true);
        if ((hsName!=='') & (score>0)){
            const url = process.env.REACT_APP__RESTDBIO_URL;
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(
                    {
                        "game": "figurefive",
                        "name": hsName,
                        "score": score,
                    }
                ),
                headers: {
                    "content-type": "application/json",
                    "x-apikey": process.env.REACT_APP__RESTDBIO_API_KEY,
                    "cache-control": "no-cache"
                }
            }).then( res => res.json()).then( data => {
                // data saved
                navPage('start');
            });
        }
    }


    const getScores = () => {
        setScoresLoading(true);
        console.log('getscores');
        const url = process.env.REACT_APP__RESTDBIO_URL + '?q={"game":"figurefive"}&h={"$orderby":{"score":-1}}';
        console.log(url);
        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "content-type": "application/json",
                "x-apikey": process.env.REACT_APP__RESTDBIO_API_KEY,
                "cache-control": "no-cache"
            }
        }).then( res => res.json()).then( data => {
            setScoresLoading(false);
            console.log(data);
            const lowestScore = data[(data.length-1)].score;
            console.log(score, lowestScore);
            if (score>0 && (score>lowestScore || data.length<25)){
                setHighscoreEligible(true);
            }
        });
    };

    React.useEffect( () => {
        if (score>localHighScore){
            localStorage.setItem('localHighScore', score);
        }
        getScores();
        setTimeout(() => {
            setGameOver(true);
        }, 10);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStartClick = () => {
        if (highscoreEligible && hsName!==''){
            submitScore();
        } else {
            navPage('start');
        }
    };
    const handleChangeName = (e) => {
        setHsName(e.target.value);
    };

    return (
        <div className={`${css.root} ${ gameOver ? css.active : ''}`}>
            <div className={`${css.stage} ${ gameOver ? css.active : ''}`}>
                <div className={css.stageInner}>
                    <h2>Game Over</h2>

                    <div className={`${css.scoresLoading} ${scoresLoading && css.scoresLoadingActive}`}>
                        <CircularProgress className={css.progress}/>
                    </div>

                    <div className={`${css.hsForm} ${highscoreEligible && css.hsFormActive}`}>
                        You made it to the high scores table!<br />
                        Enter your initials:<br />
                        <input onChange={handleChangeName} maxlength={3} value={hsName} />
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
    )
};

export default GameOverModal;
