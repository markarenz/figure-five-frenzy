import React from 'react';
import { AccessAlarm as IconClock } from "@material-ui/icons";
import css from "../../css/modules/howToScreen.module.scss";
const HowToClock = () => {
    return(
        <div className={css.figureRoot}>
            <IconClock className={css.clockAnim}/>
        </div>
    )
};
export default HowToClock;
