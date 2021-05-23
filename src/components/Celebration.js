import React from 'react';
import Confetti from 'react-dom-confetti';

const Celebration = ({confettiBlast}) => {
    const confettiConfig = {
        angle: 10,
        spread: 45,
        startVelocity: 45,
        elementCount: 150,
        dragFriction: 0.1,
        duration: 3000,
        stagger: 0,
        width: "10px",
        height: "10px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };
    const confettiConfigTL = {
        ...confettiConfig
    };
    const confettiConfigTR = {
        ...confettiConfig,
        angle: 170
    };
    const confettiConfigBL = {
        ...confettiConfig,
        angle: 45
    };
    const confettiConfigBR = {
        ...confettiConfig,
        angle: 135
    };
    const confettiConfigT = {
        ...confettiConfig,
        angle: 270
    };
    return (
        <div style={{position:"absolute", zIndex:5, width:"100vw", height:"100vh", top:0, left: 0, pointerEvents: "none"}}>
            <div style={{position:"absolute", left:0, top:"10vh"}}>
                <Confetti active={ confettiBlast } config={ confettiConfigTL }/>
            </div>
            <div style={{position:"absolute", right:0, top:"10vh"}}>
                <Confetti active={ confettiBlast } config={ confettiConfigTR }/>
            </div>
            <div style={{position:"absolute", left:0, bottom:"10vh"}}>
                <Confetti active={ confettiBlast } config={ confettiConfigBL }/>
            </div>
            <div style={{position:"absolute", right:0, bottom:"10vh"}}>
                <Confetti active={ confettiBlast } config={ confettiConfigBR }/>
            </div>
            <div style={{position:"absolute", left:"50vw", top:0}}>
                <Confetti active={ confettiBlast } config={ confettiConfigT }/>
            </div>
        </div>

    )
};
export default Celebration;
