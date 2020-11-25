import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatDeckDetails, DECK_STORAGE_KEY, addCardToDeck } from './helpers'


export const addDeck = async (deckTitle) => {
    try {
        const decksInStorage= await AsyncStorage.getItem(DECK_STORAGE_KEY);
        const parsedDeck = JSON.parse(decksInStorage)
        parsedDeck[deckTitle] = {
            title: deckTitle,
            questions: []
        }
        return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(parsedDeck));
    } catch(error) {
        console.log('error', error)
    } 
}

export const  addCard = async (deckTitle,card) =>  {
    try{
        const decksInStorage= await AsyncStorage.getItem(DECK_STORAGE_KEY);
        const newDeck = addCardToDeck(decksInStorage, deckTitle, card);
        return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck));
    }catch(error) {
        console.log('error', error)
    } 
}

export const deleteDeck = async (deckTitle) => {
    try {
        const decksInStorage= await AsyncStorage.getItem(DECK_STORAGE_KEY);
        const parsedDeck = JSON.parse(decksInStorage)
        delete parsedDeck[deckTitle];
        return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(parsedDeck));
    } catch(error) {
        console.log('error', error)
    } 
}


export async function fetchDecksFromStorage(){
    return await AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => JSON.parse(results))
        .then((parsedData) => formatDeckDetails(parsedData))
}


