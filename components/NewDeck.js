import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native'
import { blue, white } from '../utils/colors'
import { addDeck } from '../utils/api'
import { saveDeck } from '../actions'
import { connect } from 'react-redux'


class NewDeck extends Component {
    state = {
        inputValue: ''
    }

    onChange =(text) => {
        this.setState({
            inputValue: text
        }
    )
    }

    submitDeckTitle =() => {
        const {inputValue} = this.state;
        const {navigation} = this.props
        if(inputValue !== '') {
            addDeck(inputValue).then(
                this.props.dispatch(saveDeck(inputValue))
            ).then(()=> navigation.navigate('Deck', {deckTitle: inputValue}))
            .then(() => this.setState({
                inputValue: ''
            }))
        }
        else {
            alert('Blank is not a valid value')
        }
    }
    render() {
        return (
            <View style={{margin: 20}}>
                <Text style ={ styles.headingText}> What is the title of your new component? </Text>
                <TextInput style= { styles.textInput} placeholder="Deck Title" value={this.state.inputValue}
                            onChangeText = {(text) => this.onChange(text)} />
                <TouchableOpacity 
                    onPress={this.submitDeckTitle}
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
        padding: 5
      },
      headingText : {
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center"
      }
})

export default connect()(NewDeck)