export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const SAVE_DECK = 'SAVE_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const DELETE_DECK = 'DELETE_DECK'

export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}


export function getDeck(deck) {
    return {
        type: GET_DECK,
        deck
    }
}


export function saveDeck(deckTitle) {
    return {
        type: SAVE_DECK,
        deckTitle
    }
}

export function addCardToDeck(deckTitle, card) {
    return {
        type: ADD_CARD_TO_DECK,
        deckTitle,
        card
    }
}

export function deleteDeckFromState(deckTitle) {
    return {
        type: DELETE_DECK,
        deckTitle
    }
}