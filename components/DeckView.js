import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, lightPurp } from '../utils/colors'
import { deleteDeck } from '../utils/api'
import { deleteDeckFromState } from '../actions'
import {setLocalNotification, clearLocalNotification } from '../utils/helpers'


class DeckView extends Component {
    deleteDeck = () => {
        const {deck, navigation} = this.props;
        this.props.dispatch(deleteDeckFromState(deck.title));
        deleteDeck(deck.title)
        .then(() =>navigation.navigate('Home'))
    }

    navigateToAddCard = (deckTitle) => {
        const {navigation} = this.props;
        navigation.navigate('AddCard', {
            deckTitle
        })
    }

    navigateToQuiz = (deckTitle) => {
        const { navigation } = this.props;
        clearLocalNotification().then(setLocalNotification)
        navigation.navigate('Quiz', {
            deckTitle
        })
    }

    render() {
        const { deck } = this.props;
        return (
            (deck !== undefined) ? (
                <View style ={styles.container}>
                    <View style={styles.firstContainer}>
                        <Text style={styles.heading}>{ deck.title}</Text>
                        <Text style={styles.text}>{(deck.questions.length > 1) ? `${deck.questions.length} cards` : `${deck.questions.length} card`}</Text>
                    </View>

                    <View style={[styles.secondContainer]}>
                        <TouchableOpacity 
                            onPress={() => this.navigateToAddCard(deck.title)}
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                                    {marginBottom: 30, padding:15, backgroundColor: lightPurp}]}>
                            <Text style={styles.submitBtnText}>
                                Add Card
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={()=>this.navigateToQuiz(deck.title)}
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                                    {marginBottom: 30, padding:15}]}>
                            <Text style={styles.submitBtnText}>
                                Start Quiz
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => this.deleteDeck()}
                            style={[Platform.OS === 'ios' ? styles.deleteBtn : styles.deleteBtn,
                                    {marginBottom: 30}]}>
                            <Text style={styles.deleteBtnTxt}>
                                Delete Deck
                            </Text>
                        </TouchableOpacity>
                    </View>
            </View>
            ) : (<View><Text>Requested deck is not found</Text></View>)
        )
    }
}

function mapStateToProps(state, props){
    const {deckTitle} = props.route.params;
    const deck = state[deckTitle];
    return {
        deck
    }
}

const styles =  StyleSheet.create({
    container: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
    },
    text: {
        fontSize: 18,
        fontWeight: "400",
        padding: 5,
        margin:5
    },
    iosSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
    },
    AndroidSubmitBtn: {
        backgroundColor: blue,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    firstContainer: {
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }, 
    secondContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    deleteBtn: {
        backgroundColor: white,
        padding: 0
    },
    deleteBtnTxt: {
        textDecorationStyle: 'solid',
        color: blue,
        fontSize: 20
    }
})

export default connect(mapStateToProps)(DeckView)