import React from "react";
import css from "../css/modules/header.module.scss";
import { AccessAlarm as IconClock } from "@material-ui/icons";

const Header = ({ score, roundNum, roundTimer }) => {
  return (
    <div className={css.header}>
      <h2>Round: {roundNum}</h2>
      <h2>
        <IconClock className={css.timerIcon}/> {roundTimer}
      </h2>
      <h2>Score: {score}</h2>
    </div>
  );
};
export default Header;
