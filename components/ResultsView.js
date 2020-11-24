import React, {Component} from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { calculatePercentage } from '../utils/helpers'
import { connect } from 'react-redux'
import { blue, white, lightPurp } from '../utils/colors'


class ResultsView extends Component {

    navigateToQuiz = (deckTitle) => {
        const { navigation } = this.props;
        navigation.navigate('Quiz', {
            deckTitle
        })  
    }

    navigateToDeckView = (deckTitle) => {
        const {navigation} = this.props;
        navigation.navigate('Deck', {
            deckTitle
        })
    }

    render() {
        const {crtAns, wrongAns, totalQns, deckTitle} = this.props.route.params;
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Your Score
                </Text>
                <Text style={styles.text}>
                    {`Total Questions: ${totalQns}`}
                </Text>
                <Text style={styles.text}>
                    {`Correctly Answered: ${crtAns}`}
                </Text>
                <Text style={styles.text}>
                    {`Wrongly Answered: ${wrongAns}`}
                </Text>
                <Text style={styles.text}>
                    {`Percentage: ${calculatePercentage(crtAns,totalQns)}`}
                </Text>

                <TouchableOpacity 
                    onPress={() => this.navigateToQuiz(deckTitle)}
                    style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                            {marginBottom: 30, padding:15, backgroundColor: lightPurp}]}>
                    <Text style={styles.submitBtnText}>
                        Restart Quiz
                    </Text>
                </TouchableOpacity> 
    
                <TouchableOpacity 
                    onPress={()=>this.navigateToDeckView(deckTitle)}
                    style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn,
                            {marginBottom: 30, padding:15}]}>
                    <Text style={styles.submitBtnText}>
                        Back to Deck
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
    
}

const styles =  StyleSheet.create({
    container: {
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
    },
    text: {
        fontSize: 18,
        fontWeight: 'normal',
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

export default connect()(ResultsView)