import React from 'react';
import css from "../../css/modules/howToScreen.module.scss";

const HowToSwap = () => {
  return(
      <div className={css.figureRoot}>
          <div className={`${css.htCard} ${css.htCardOne}`}>1</div>
          <div className={`${css.htCard} ${css.htCardTwo}`}>2</div>
          <div className={`${css.htCard} ${css.htCardThree}`}>3</div>
      </div>
  )
};
export default HowToSwap;
