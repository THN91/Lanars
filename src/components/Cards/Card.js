import React, {useEffect, useState} from "react";
import "./Card.css";

const Cards = () => {
    const card = shuffle(isPrime().map(num => num)
        .concat(isPrime().map(num => num))).reduce((acc, item, index) => {
        return {
            ...acc,
            [index]: {id: index, num: item, isOpen: true, guessed: false}
        }
    }, {})

    const [cards, setCards] = useState(card)
    const [selected, setSelected] = useState([])

    function isPrime() {
        let array = [2, 3];
        for (let i = 5; i <= 58; i += 2) {
            if (array.every(function (p) {
                return i % p;
            })) {
                array.push(i);
            }
        }
        return array
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array

    }

    function openCard(cardId) {
        if (selected.length < 2) {
            const currentCard = cards[cardId]
            setCards({
                ...cards,
                [cardId]: {
                    ...currentCard,
                    isOpen: true
                }
            })
            setSelected([...selected, {id: cardId, num: currentCard.num}])
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setCards(Object.values(cards).map((item, index) => {
                return {
                    ...item,
                    isOpen: false
                }
            }))
        }, 5000)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            if (selected.length === 2) {
                if (selected[0].num === selected[1].num) {
                    const [{id: firstId}, {id: secondId}] = selected
                    setCards({
                        ...cards,
                        [firstId]: {
                            ...cards[firstId],
                            guessed: true
                        },
                        [secondId]: {
                            ...cards[secondId],
                            guessed: true
                        }
                    })
                } else {
                    const [{id: firstId}, {id: secondId}] = selected
                    setCards({
                        ...cards,
                        [firstId]: {
                            ...cards[firstId],
                            isOpen: false
                        },
                        [secondId]: {
                            ...cards[secondId],
                            isOpen: false
                        }
                    })
                }
                setSelected([])
            }
            if (selected.length > 2) {
                setSelected([])
            }
        }, 1000)
    }, [cards, selected])

    return (
        <div className="container">
            {Object.values(cards).map((card, index) => (
                <div
                    key={index}
                    onClick={() => !card.isOpen && openCard(card.id)}
                    className={`card ${card.guessed ? 'guessed' : ''}`}
                ><span className={card.isOpen ? 'show' : ''}>{card.num}</span></div>
            ))}
        </div>
    );
}

export default Cards;
