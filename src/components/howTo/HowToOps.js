import React from 'react';
import css from "../../css/modules/howToScreen.module.scss";

const HowToOps = () => {
    const operatorLabels = ["+", "−", "×", "÷"];
    const [idx, setIdx] = React.useState(0);
    const incrementIdx = () => {
        const nextIdx = (idx===(operatorLabels.length-1)) ? 0 : idx+1;
        setIdx(nextIdx);
    };
    React.useEffect(() => {
        const timer = setTimeout(() => {
            incrementIdx();
        }, 1000);
        return () => clearTimeout(timer);
    });
    return(
        <div className={css.figureRoot}>
            <div className={css.opsWrap}>
                <span className={css.opsTxt}>
                    {operatorLabels[idx]}
                </span>
            </div>
        </div>
    )
};
export default HowToOps;
