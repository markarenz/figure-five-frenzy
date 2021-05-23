import React from "react";
import css from "../css/modules/card.module.scss";

const Card = ({ val, idx, activeItem, initRoundComplete, cardHighlightRun}) => {
  return (
    <div
      className={`${css.cardFlipWrap} ${
        initRoundComplete ? css.flipComplete : ""
      } ${val < 1 ? css.flipped : ""}`}
    >
      <div
        className={`${css.cardWrap} ${
          activeItem === idx ? css.draggingWrap : ""
        }`}
      >
        <div
          className={`${css.card} ${activeItem === idx ? css.dragging : null}`}
        >
          <div>
            <h2>{val > 0 ? val : ""}</h2>
            <div
              className={`${css.highlight} ${
                cardHighlightRun ? css.highlightActive : ""
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
