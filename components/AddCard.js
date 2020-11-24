import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native'
import { blue, white } from '../utils/colors'
import { addCard } from '../utils/api'
import { addCardToDeck } from '../actions'
import { connect } from 'react-redux'


class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    onQuestionChange =(text) => {
        this.setState({
            question: text
        })
    }
    
    onAnswerChange =(text) => {
        this.setState({
            answer: text
        })
    }

    submitCard =() => {
        const {question, answer} = this.state;
        const {deckTitle} = this.props.route.params;
        const { navigation } = this.props;
        if(question !== '' && answer !== '') {
            addCard(deckTitle, {
                question, answer
            }).then(
                this.props.dispatch(addCardToDeck(deckTitle, {
                    question, answer
                }))
            ).then(() => this.setState({
                question: '',
                answer: ''
            })).then(()=> navigation.navigate('Deck',{deckTitle}))
        }
        else {
            alert('Blank is not a valid value')
        }
    }
    render() {
        return (
            <View style={{margin: 20}}>
                <TextInput style= { styles.textInput} placeholder="Question" value={this.state.question}
                            onChangeText = {(text) => this.onQuestionChange(text)}
                            name="question" />
                <TextInput style= { styles.textInput} placeholder="Answer" value={this.state.answer}
                            onChangeText = {(text) => this.onAnswerChange(text)}
                            name="answer" />
                <TouchableOpacity 
                    onPress={this.submitCard}
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}>
                    <Text style={styles.submitBtnText}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
      },
      AndroidSubmitBtn: {
        backgroundColor: blue,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
      },
      textInput: {
        backgroundColor: white,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 0,
        marginVertical: 20,
        borderWidth : 2,
        borderColor: blue,
        borderRadius: 5,
        padding: 5,
        width: 200
      }
})

export default connect()(AddCard)