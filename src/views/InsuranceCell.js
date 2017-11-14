import _ from 'lodash'
import globalVariables from '../config/styles.config'

const React = require('react')
const {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} = require('react-native')

import Icon from 'react-native-vector-icons/FontAwesome'

import DeleteButton from './DeleteButton'

class InsuranceCell extends React.Component {

    

    render() {
        return <View style={styles.cellContainer}>
            <Text style={styles.currencyText}>CHF</Text> 
            <Image style={styles.currencyImage} source={require('../images/ch.png')}/>
            <View style={styles.container}>
                <Text style={styles.titleText}>100,00</Text> 
                <Text style={styles.subtitleText}>Yearly premium 1</Text> 
            </View>
            <DeleteButton/>
        </View>
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cellContainer: {
        height: 74,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    currencyText: {
        color: globalVariables.white, 
        marginRight: 10
    },
    currencyImage: {
        width: 20, 
        height: 20, 
        marginRight: 10
    },
    titleText: {
        color: globalVariables.white,
        fontWeight: '700'
    },
    subtitleText: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 20,
        height: 20,
        color: globalVariables.white,
        fontSize: 12,
        color: globalVariables.grayDark
    }
})


export default InsuranceCell