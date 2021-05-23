import React from 'react';
import css from "../css/modules/start.module.scss";
import Celebration from "../components/Celebration";

const TestScreen = ({navPage}) => {
    const [confettiBlast, setConfettiBlast] = React.useState(false);
    const launchConfetti = () => {
        setConfettiBlast(true);
        setTimeout(() => {
            setConfettiBlast(false);
        }, 500);
    };
    const handleClickOne = () => {
        launchConfetti();
    };
    return(
        <div className={css.root} style={{backgroundColor: 'orange'}}>
            <h1>Test</h1>
            <button onClick={()=>navPage('start')}>Start</button>
            <button onClick={()=>handleClickOne()}>Confetti</button>
            <Celebration confettiBlast={confettiBlast} />
        </div>
    )
};
export default TestScreen;
