import React, {useCallback} from 'react';
import classNames from 'classnames';

import './styles.css';
import {ICardPropsType} from '../types';

function Card(props: ICardPropsType): JSX.Element {
    const {data, onClick} = props;
    const {id, num, isOpen, active, guessed} = data;
    const click = useCallback((): boolean | void => !isOpen && onClick(id), [id, isOpen, onClick])

    return (
        <div
            onClick={click}
            className={classNames('card', {show: guessed, active, disable: isOpen})}
        >
            <span className={classNames({textHide: !isOpen})}>{num}</span>
        </div>
    );
}

export default Card;
