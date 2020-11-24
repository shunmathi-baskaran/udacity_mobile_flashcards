import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'


export const DECK_STORAGE_KEY = 'MobileFlashcards:decks'
export const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function formatDeckDetails(results) {
   return (results === null || results === undefined) ? setDummyData() : JSON.parse(results) 
}

function setDummyData() {
    const dummyData = {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
      }
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData));
      return dummyData;
}

export function addCardToDeck(decks, deckTitle, card){
  const res = JSON.parse(decks);
  res[deckTitle] = {
    title: deckTitle,
    questions: res[deckTitle].questions.concat([card])
  }
    return res
}

export function calculatePercentage(crtAns, totalQns) {
  return ((crtAns / totalQns)*100).toFixed(2);
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
  return {
    title: 'Take your quiz',
    body: "Don't forgot to take your quiz today",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}


export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}