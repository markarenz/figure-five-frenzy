import React from 'react';
import css from "../css/modules/card.module.scss";

const TargetCard = ({value, calcReady, handleTargetCardClick, cardHighlightRun}) => {

    return (
        <div className={css.cardWrap}>
            <div className={`${css.card} ${css.targetCard} ${calcReady ? css.targetCardEnabled : ''}`} onClick={handleTargetCardClick}>
                <div>
                    <h2>{value > 0 ? value : ""}</h2>
                    <div
                        className={`${css.highlight} ${
                            cardHighlightRun ? css.highlightActive : ""
                        }`}
                    />
                </div>
            </div>
        </div>
    )
};

export default TargetCard;
