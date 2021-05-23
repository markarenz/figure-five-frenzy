import React from "react";
import css from "../../css/modules/howToScreen.module.scss";

const HowToParens = () => {
  return (
    <div className={css.figureRoot}>
      <div className={css.parensRoot}>
        <span className={css.parensPairA}>(</span>1 + 2
        <span className={css.parensPairA}>)</span>+{" "}
        <span className={css.parensPairB}>(</span>3 + 4
        <span className={css.parensPairB}>)</span>
        <div className={css.parensBtnA} />
        <div className={css.parensBtnB} />
      </div>
    </div>
  );
};
export default HowToParens;
