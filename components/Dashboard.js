import React, {Component} from 'react'
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { blue, gray } from '../utils/colors'

class Dashboard extends Component {
    navigateToDeckView = (deckTitle) => {
        const {navigation} = this.props;
        navigation.navigate('Deck', {
            deckTitle
        })
    }


    render() {
        const {arrayOfDecks} = this.props
        return (
            <ScrollView contentContainerStyle={styles.scroll}>
                {arrayOfDecks.map((deck) => {
                    return (
                        <TouchableOpacity  
                            style ={styles.container} 
                            key={deck.title} 
                            onPress={() => this.navigateToDeckView(deck.title)}>
                            <Text style={styles.heading}>{ deck.title}</Text>
                            <Text style={styles.text}>{(deck.questions.length > 1) ? `${deck.questions.length} cards` : `${deck.questions.length} card`}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            
        )
    }
}

function mapStateToProps(state){
    const keys = Object.keys(state)
    const arrayOfDecks = keys.map((key) => state[key])
    return {
        arrayOfDecks
    }
}

const styles =  StyleSheet.create({
    scroll: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    container: {
        marginVertical: 15,
        borderBottomColor: gray,
        borderBottomWidth: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
    },
    text: {
        fontSize: 18,
        fontWeight: 400,
        padding: 5,
        margin:5
    }
})
export default connect(mapStateToProps)(Dashboard)