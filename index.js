import { registerRootComponent } from 'expo';
import React from 'react'
import { Provider } from 'react-redux'
import middleware from './middlewares'
import reducers from './reducers'
import {View} from 'react-native'
import { createStore } from 'redux'


import AppComponent from './App';

const store = createStore(reducers,middleware);
const App = () => {
    return (
        <Provider store={store}>
            <View style={{flex:1}}> 
                <AppComponent />
            </View>
        </Provider>
    )
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
