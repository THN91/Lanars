export interface ICardType {
    id: number,
    num: number,
    isOpen: boolean,
    active: boolean,
    guessed: boolean,
}

export interface ICardPropsType {
    data: ICardType,
    onClick: (id: number) => void
}

export interface ISelectedType {
    id: number,
    num: number
}