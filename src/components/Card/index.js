import React from 'react';
import classNames from 'classnames';
import {bool, shape, number, func} from 'prop-types';

import './styles.css';

function Card(props) {
    const {data, onClick} = props;
    const {num, isOpen, active, id, guessed} = data;

    return (
        <div
            onClick={() => !isOpen && onClick(id)}
            className={classNames('card', {show: guessed, active})}
        >
            <span className={classNames({textHide: !isOpen})}>{num}</span>
        </div>
    );
}

Card.propTypes = {
    data: shape({
        id: number,
        num: number,
        isOpen: bool,
        active: bool,
    }).isRequired,
    onClick: func.isRequired,
};

export default Card;
