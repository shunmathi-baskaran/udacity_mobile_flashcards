import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import NewDeck from './components/NewDeck';
import { fetchDecksFromStorage } from './utils/api'
import { getDecks } from './actions'
import { connect } from 'react-redux';
import Dashboard from './components/Dashboard'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard';
import QuizView from './components/QuizView'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import {Ionicons, Entypo, FontAwesome} from 'react-native-vector-icons';
import { blue } from './utils/colors'
import ResultsView from './components/ResultsView';
import { setLocalNotification } from './utils/helpers'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: blue },
      }}
    >
      <Stack.Screen name="Home" component={Dashboard}
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen name="AddCard" component={AddCard}
        options={{
          title: 'Add New Card',
        }}
      />
      <Stack.Screen name="Deck" component={DeckView}
        options={{
          title: 'Deck',
        }}
      />
        <Stack.Screen name="NewDeck" component={NewDeck}
        options={{
          title: 'New Deck',
        }}
      />
      <Stack.Screen name="Quiz" component={QuizView}
        options={{
          title: 'Quiz',
        }}
      />
      <Stack.Screen name="Results" component={ResultsView}
        options={{
          title: 'Results',
        }}
      />
    </Stack.Navigator>
  );
}

export class App extends Component {
  
  componentDidMount() {
    fetchDecksFromStorage()
    .then(results=> {
      this.props.dispatch(getDecks(results))
    })
    setLocalNotification()
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Tab.Navigator 
          tabBarOptions={{
            activeTintColor: blue,
            inactiveTintColor: 'gray',
          }}
        >
            <Tab.Screen name="Home" component={StackNav} 
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" color={color} size={size} />
              ) }} />

            <Tab.Screen name="AddNewDeck" component={NewDeck} 
              options={{
                tabBarLabel: 'New Deck',
                tabBarIcon: ({ color, size }) => (
                  <Entypo name="add-to-list" color={color} size={size} />
                ) }}/>
          </Tab.Navigator>
        </NavigationContainer> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default connect()(App)