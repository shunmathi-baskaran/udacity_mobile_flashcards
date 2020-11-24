import { GET_DECKS, GET_DECK, SAVE_DECK, ADD_CARD_TO_DECK, DELETE_DECK } from '../actions'

export default function reducers(state={}, action) {
    switch(action.type) {
        case GET_DECKS: return {
            ...state,
            ...action.decks
        }
        case GET_DECK: return {
            ...state,
            ...action.deck
        }
        case SAVE_DECK: return {
            ...state,
            [action.deckTitle]: {
                title: action.deckTitle,
                questions : []
            }
        }
        case ADD_CARD_TO_DECK: 
       
        return {
            ...state,
            [action.deckTitle] : {
                title: action.deckTitle,
                questions: state[action.deckTitle].questions.concat([action.card])
            }
        }
        case DELETE_DECK: 
            const newState = delete state[action.deckTitle];
        return {
            ...state
        }
        default : return state
    }
}