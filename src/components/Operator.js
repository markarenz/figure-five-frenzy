import React from 'react';
import css from "../css/modules/operator.module.scss";

const Operator = ({ index, operation, onOperatorClick, operatorLabels, isSorting}) => {
    const positions = [
        '22vw', '48vw', '74vw'
    ];
    return (
        <div className={`${css.operator} ${isSorting ? css.operatorBelowCards : ''}`} style={{ left: positions[index]}} onClick={() => onOperatorClick(index, operation)}>
            <span>{operatorLabels[operation]}</span>
        </div>
    )
};

export default Operator;
