import React, {useEffect, useState} from 'react';
import Card from '../Card';
import {generateCardList} from '../helpers/index';
import './styles.css';

const MAX_SELECTED_CARD = 2;

function Cards() {
    const [cards, setCards] = useState({});
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        setCards(generateCardList())
        setTimeout(() => {
            setCards((cards) => {
                return {
                    ...Object.values(cards).map((item) => ({
                        ...item,
                        isOpen: false,
                    }))
                }
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
                } else {
                    cards[firstId].active = false;
                    cards[firstId].isOpen = false;
                    cards[secondId].active = false;
                    cards[secondId].isOpen = false;
                }
                setCards(cards);
                setSelected([]);
            }
        }, 800);
    }, [cards, selected]);

    const openCard = (cardId) => {
        if (selected.length < MAX_SELECTED_CARD) {
            const currentCard = cards[cardId];
            currentCard.isOpen = true;
            currentCard.active = true;
            setCards(cards);
            setSelected([...selected, {id: cardId, num: currentCard.num}]);
        }
    };

    return (
        <div className="container">
            {Object.values(cards).map((card) => <Card key={card.id} data={card} onClick={openCard}/>)}
        </div>
    );
}

export default Cards;
