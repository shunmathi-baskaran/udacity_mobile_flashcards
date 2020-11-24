import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { blue, white, lightPurp } from '../utils/colors'
import DeckView from './DeckView'
import CardFlip from 'react-native-card-flip';


class QuizView extends Component {
    state = {
        qnIndex : 0,
        correctAns: 0,
        wrongAns: 0
    }

    navigateToAddCard = (deckTitle) => {
        const {navigation} = this.props;
        navigation.navigate('AddCard', {
            deckTitle
        })
    }

    selectCorrectAnswer = () => {
        this.setState((state) => {
                return {
                    correctAns: state.correctAns + 1,
                    qnIndex: state.qnIndex + 1
                };
         });  
    }

    selectWrongAnswer = () => {
        this.setState((state) => {
            return {
            wrongAns: state.wrongAns + 1,
            qnIndex: state.qnIndex + 1
            };
        });  
    }
 
    navToResults = (crtAns, wrongAns, totalQns, deckTitle) => {
        const {navigation} = this.props;
        navigation.navigate('Results', {
            crtAns, wrongAns, totalQns, deckTitle
        })
    }
    render() {
        const { deck } = this.props;
        
        const {correctAns, qnIndex, wrongAns} = this.state;
        if(deck === undefined) {
            return <DeckView />
        }
        const {questions} = deck;

        if(qnIndex >= questions.length && questions.length !==0){
            this.navToResults(correctAns, wrongAns , questions.length, deck.title)
            this.setState({
                qnIndex : 0,
                correctAns: 0,
                wrongAns: 0
            })
            return null;
        }
        
        return (
            (questions.length === 0) ? (
                <View style={{flex: 1,justifyContent:'center', alignItems: 'center', marginVertical:10}}>
                    <Text style={[styles.heading, {textAlign: 'center'}]}>
                        There are no questions in this deck
                    </Text>
                    
                    <TouchableOpacity 
                            onPress={() => this.navigateToAddCard(deck.title)}
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                                    {marginBottom: 30, padding:15}]}>
                            <Text style={styles.submitBtnText}>
                                Click to add new question
                            </Text>
                        </TouchableOpacity>
                </View>
            )
            : (
            <CardFlip style ={styles.cardContainer} ref={(card) => this.card = card}>
                <View style ={styles.container}>
                <Text style={{alignSelf: 'flex-start'}}>{`${qnIndex+1}/${questions.length}`}</Text>
                    <View>
                        <Text style={styles.heading}>{questions[qnIndex].question}</Text>
                        <TouchableOpacity onPress={() => this.card.flip()}
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                                    {marginBottom: 30, padding:15, backgroundColor: lightPurp}]}>
                            <Text style={styles.submitBtnText}>
                                Show Answer
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity 
                            onPress={() => this.selectCorrectAnswer()}
                        style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                                    {marginBottom: 30, padding:15, backgroundColor: lightPurp}]}>
                            <Text style={styles.submitBtnText}>
                                Correct
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => this.selectWrongAnswer()}
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                                    {marginBottom: 30, padding:15}]}>
                            <Text style={styles.submitBtnText}>
                                Wrong
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style ={styles.container}>
                    <Text>{`${qnIndex+1}/${questions.length}`}</Text>
                    <View>
                        <Text style={styles.heading}>{questions[qnIndex].answer}</Text>
                        <TouchableOpacity onPress={() => this.card.flip()}
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                                    {marginBottom: 30, padding:15, backgroundColor: lightPurp}]}>
                            <Text style={styles.submitBtnText}>
                                Question
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity 
                            onPress={() => {this.card.flip();
                                this.selectCorrectAnswer()
                            }}
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                                    {marginBottom: 30, padding:15, backgroundColor: lightPurp}]}>
                            <Text style={styles.submitBtnText}>
                                Correct
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={() => {this.card.flip();
                                this.selectWrongAnswer();
                            }}
                            style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                                    {marginBottom: 30, padding:15}]}>
                            <Text style={styles.submitBtnText}>
                                Wrong
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CardFlip>
            ) 
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
    cardContainer : {
        flex: 1,
        alignSelf: 'stretch',
    },
    container: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
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
    }
})

export default connect(mapStateToProps)(QuizView)