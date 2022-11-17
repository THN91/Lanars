import React, {useEffect, useState} from 'react';

import Card from '../Card';
import {generateCardList} from '../helpers';
import {MAX_SELECTED_CARD} from '../../constants/constants';
import {ICardType, ISelectedType} from '../types';

import './styles.css';

function Cards() {
    const [cards, setCards] = useState<Record<string, ICardType>>({});
    const [selected, setSelected] = useState<Array<ISelectedType>>([]);

    useEffect(() => {
        setCards(generateCardList())
        setTimeout(() => {
            setCards((cards: Record<string, ICardType>) => {
                return Object.values(cards).reduce((acc: object, item: ICardType, index: number) => ({
                    ...acc,
                    [index]: {
                        ...item,
                        isOpen: false
                    }
                }), {})
            })
        }, 5000);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (selected.length === MAX_SELECTED_CARD) {
                const [{id: firstId}, {id: secondId}] = selected;
                if (selected[0].num === selected[1].num) {
                    cards[firstId].active = false;
                    cards[secondId].active = false;
                    cards[firstId].guessed = true;
                    cards[secondId].guessed = true;
                } else {
                    cards[firstId].active = false;
                    cards[firstId].isOpen = false;
                    cards[secondId].active = false;
                    cards[secondId].isOpen = false;
                }
                setCards(cards);
                setSelected([]);
            }
        }, 1000);
    }, [cards, selected]);

    const openCard = (cardId: number) => {
        if (selected.length < MAX_SELECTED_CARD) {
            const currentCard: ICardType = cards[cardId];
            currentCard.isOpen = true;
            currentCard.active = true;
            setCards(cards);
            setSelected([...selected, {id: cardId, num: currentCard.num}]);
        }
    };

    return (
        <div className="container">
            {Object.values(cards).map((card: ICardType) => <Card
                key={card.id}
                data={card}
                onClick={openCard}
            />)}
        </div>
    );
}

export default Cards;
