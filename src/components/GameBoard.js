import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import Card from "./Card";
import Operator from "./Operator";
import TargetCard from "./TargetCard";
import Header from "./Header";
import GameIntroModal from "./GameIntroModal";
import GameOverModal from "./GameOverModal";
import Celebration from "./Celebration";
import { Button } from '@material-ui/core';
import { ExitToApp as IconQuit } from '@material-ui/icons';

import playableRounds from "../data/playableRounds";
import { mathCalculateFromUI } from "../common/commonFunctions";

import css from "../css/modules/gameBoard.module.scss";

const SortableItem = SortableElement(
  ({ val, idx, activeItem, initRoundComplete, cardHighlightRun }) => (
    <Card
      val={val}
      idx={idx}
      activeItem={activeItem}
      initRoundComplete={initRoundComplete}
      cardHighlightRun={cardHighlightRun}
    />
  )
);

const GameBoardMainContainer = SortableContainer(
  ({ items, activeItem, initRoundComplete, cardHighlightRun }) => (
    <div className={css.sortabnleContainer}>
      {items.map(({ id, val }, index) => (
        <SortableItem
          key={id}
          index={index}
          idx={index}
          pressDelay={1000}
          activeItem={activeItem}
          val={val}
          cardHighlightRun={cardHighlightRun}
          initRoundComplete={initRoundComplete}
        />
      ))}
    </div>
  )
);

const GameBoardMain = () => {

  const operatorLabels = ["?", "+", "−", "×", "÷"];
  const [calcReady, setCalcReady] = React.useState(false);
  const [initRoundComplete, setInitRoundComplete] = React.useState(false);
  const [gameBegun, setGameBegun] = React.useState(false);
  const [currentCalc, setCurrentCalc] = React.useState(0);
  const [operatorVals, setOperatorVals] = React.useState([0, 0, 0]);
  const [parensBtnVals, setParensBtnVals] = React.useState([
    false,
    false,
    false,
    false,
    false
  ]);
  const [activeItem, setActiveItem] = useState(-1);
  const [isSorting, setIsSorting] = useState(false);
  const [items, setItems] = useState([
    { id: "1", val: 0 },
    { id: "2", val: 0 },
    { id: "3", val: 0 },
    { id: "4", val: 0 }
  ]);
  const [targetVal, setTargetVal] = React.useState(-1);
  const [roundNum, setRoundNum] = React.useState(2);
  const [score, setScore] = React.useState(100);
  const [roundTimerActive, setRoundTimerActive] = React.useState(false);
  const [roundTimer, setRoundTimer] = React.useState(45);
  const [confettiBlast, setConfettiBlast] = React.useState(false);
  const [cardHighlightRun, setCardHighlightRun] = React.useState(false);
  const localHighScore = localStorage.getItem('localHighScore');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (roundTimerActive){
        if (roundTimer>0){
          setRoundTimer(roundTimer-1);
        }
        if (roundTimer<1){
          // end game
          console.log('game over');
        }
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const triggerCardHighlight = () => {
    setCardHighlightRun(true);
    setTimeout(() => {
      setCardHighlightRun(false);
    }, 700);
  };

  const launchConfetti = () => {
    setConfettiBlast(true);
    setTimeout(() => {
      setConfettiBlast(false);
    }, 500);
  };

  const nextRound = () => {
    triggerCardHighlight();
    launchConfetti();
    const timeToAdd = (roundNum<20) ? 5+(20-roundNum) : 5;
    const bonus = Math.min(roundTimer,50);
    setScore(score + 10 + bonus);
    setRoundTimer(roundTimer + timeToAdd);
    setRoundNum(roundNum + 1);
    initRound();
  };

  const initGame = () => {
    setRoundNum(1);
    setScore(0);
  };

  React.useEffect(() => {
    initGame();
  }, []);

  const initRound = () => {
    setRoundTimerActive(true);
    setInitRoundComplete(false);
    setTimeout(() => {
      setInitRoundComplete(true);
    }, 250);

    const idx = Math.floor(Math.random() * playableRounds.length);
    const thisRound = playableRounds[idx].split(",");
    const idx_shuffled = shuffleArray([0,1,2,3]).join('');
    setItems([
      { id: "1", val: thisRound[idx_shuffled[0]] },
      { id: "2", val: thisRound[idx_shuffled[1]] },
      { id: "3", val: thisRound[idx_shuffled[2]] },
      { id: "4", val: thisRound[idx_shuffled[3]] }
    ]);
    setOperatorVals([0, 0, 0]);
    setParensBtnVals([false, false, false, false, false]);
    setTargetVal(thisRound[4] * 1);
    setGameBegun(true);
  };

  React.useEffect(() => {
    calculateUserAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleOperatorClick = (index, operation) => {
    let tmpArr = operatorVals;
    // increment
    operation++;
    if (operation > 4) {
      operation = 1;
    }
    operatorVals[index] = operation;
    setOperatorVals([...tmpArr]);
    calculateUserAnswer();
  };

  const calculateUserAnswer = () => {
    setCalcReady(!operatorVals.includes(0));
    setCurrentCalc(mathCalculateFromUI(items, parensBtnVals, operatorVals));
  };

  const handleParensClick = idx => {
    const tmpParens = parensBtnVals;
    tmpParens[idx] = !parensBtnVals[idx];
    // RULES
    if (idx < 3 && tmpParens[idx]) {
      // for 2-groupings, 3-groupings MUST be false
      // if idx <3 then 3 and 4 MUST be false
      tmpParens[3] = false;
      tmpParens[4] = false;
      if (idx === 1) {
        tmpParens[0] = false;
        tmpParens[2] = false;
      } else {
        tmpParens[1] = false;
      }
    }
    if (idx >= 3 && tmpParens[idx]) {
      // for 3-groupings, 2-groupings MUST be false
      // if idx >=3 then 0, 1, 2 MUST be false
      tmpParens[0] = false;
      tmpParens[1] = false;
      tmpParens[2] = false;
      if (idx === 3) {
        tmpParens[4] = false;
      } else {
        tmpParens[3] = false;
      }
    }
    setParensBtnVals([...tmpParens]);
    // display
    calculateUserAnswer();
  };

  const onSortStart = ({ index }) => {
    setIsSorting(true);
    setActiveItem(index);
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setIsSorting(false);
    setActiveItem(-1);
    setItems(items => arrayMove(items, oldIndex, newIndex));
    // we do not call calculate here since the set state function
    // is delayed. We put this in useffect with items as a dependency
  };

  const parensDisp = ["2a", "2b", "2c", "3a", "3b"].map((lbl, i) => (
    <div
      key={i}
      className={`${css[`parensBtn${lbl}`]} ${parensBtnVals[i] &&
        css.parensBtnAvtive}`}
      onClick={() => {
        handleParensClick(i);
      }}
    />
  ));
  const operatorsDisp = [0, 1, 2].map(i => (
    <Operator
      key={i}
      index={i}
      isSorting={isSorting}
      operation={operatorVals[i]}
      onOperatorClick={handleOperatorClick}
      operatorLabels={operatorLabels}
    />
  ));
  const handleTargetCardClick = () => {
    if (currentCalc === targetVal) {
      // YEAH!
      // set score
      nextRound();
    } else {
      // NOPE
      // console.log("No.");
    }
  };

  return (
    <div className={`${css.gameBoard} ${isSorting && css.isSorting}`}>
      <Header score={score} roundNum={roundNum} roundTimer={roundTimer} />
      <div className={css.upperTray}>
        <div
          className={`${css.targetCardWrap} ${
            targetVal < 1 ? css.flipped : ""
          }`}
        >
          <TargetCard
            cardHighlightRun={cardHighlightRun}
            value={targetVal}
            calcReady={calcReady}
            handleTargetCardClick={handleTargetCardClick}
          />
        </div>
      </div>
      <div className={css.parensDisplay}>
        <div
          className={`${css.parens2a1} ${(parensBtnVals[0] ||
            parensBtnVals[3]) &&
            css.parensActive}`}
        >
          (
        </div>
        <div
          className={`${css.parens2b1} ${(parensBtnVals[1] ||
            parensBtnVals[4]) &&
            css.parensActive}`}
        >
          (
        </div>
        <div
          className={`${css.parens2b2} ${parensBtnVals[0] && css.parensActive}`}
        >
          )
        </div>
        <div
          className={`${css.parens2c1} ${parensBtnVals[2] && css.parensActive}`}
        >
          (
        </div>
        <div
          className={`${css.parens2c2} ${(parensBtnVals[1] ||
            parensBtnVals[3]) &&
            css.parensActive}`}
        >
          )
        </div>
        <div
          className={`${css.parens2d2} ${(parensBtnVals[2] ||
            parensBtnVals[4]) &&
            css.parensActive}`}
        >
          )
        </div>
      </div>
      {operatorsDisp}
      <GameBoardMainContainer
        items={items}
        distance={1}
        cardHighlightRun={cardHighlightRun}
        updateBeforeSortStart={onSortStart}
        onSortEnd={onSortEnd}
        useDragHandle={false}
        activeItem={activeItem}
        initRoundComplete={initRoundComplete}
        axis="x"
      />
      <div className={css.parensButtons}>{parensDisp}</div>
      <div className={css.lowerTray}>

        <div className={css.btnGeneralWrap}>
          <Button className={css.btnGeneral} onClick={()=>{setRoundTimer(0)}}>
            <IconQuit className={css.btnIcon} />
            <span>Quit</span>
          </Button>
        </div>
      </div>
      {/*<button onClick={nextRound}>Next</button>*/}

      <Celebration confettiBlast={confettiBlast} />
      <GameIntroModal gameBegun={gameBegun} initRound={initRound} />
      {
        (roundTimer<1) &&
        <GameOverModal score={score} localHighScore={localHighScore}/>
      }
    </div>
  );
};

const GameBoard = () => {
  return (
    <div className={css.root}>
      <GameBoardMain />
    </div>
  );
};
export default GameBoard;
