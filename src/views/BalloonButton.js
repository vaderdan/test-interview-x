import _ from 'lodash'
import globalVariables from '../config/styles.config'

const React = require('react')
const {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} = require('react-native')

import Icon from 'react-native-vector-icons/FontAwesome'

const radius = 60

class BalloonButton extends React.Component {

    static defaultProps = {
        backgroundColor: globalVariables.green,
        disabledColor: globalVariables.grayDark2,
        color: globalVariables.white,
        disabled: false,
        title: 'Money',
        icon: 'plus',
        onPress: () => {}
    }

    render() {
        var backgroundColor = this.props.disabled ? this.props.disabledColor : this.props.backgroundColor

        return <View style={{position: 'relative', alignItems: 'center'}}>
            <View style={[styles.ballon1, {backgroundColor: backgroundColor}]}></View>
            <View style={[styles.ballon2, {backgroundColor: backgroundColor}]}></View>
            <TouchableHighlight activeOpacity={0.5} underlayColor={backgroundColor} style={[styles.buttonContainer, {backgroundColor: backgroundColor}]} onPress={this.props.onPress}>
                <Icon name={this.props.icon} size={20} color={globalVariables.white} />   
            </TouchableHighlight>
            <Text style={styles.buttonText}>{this.props.title}</Text>
        </View>
    }
}

var styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: radius,
        width: radius,
        height: radius,
        backgroundColor: globalVariables.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    button: {
        borderRadius: radius,
        width: radius,
        height: radius,
        backgroundColor: globalVariables.green
    },
    ballon1: {
        position:'absolute', width: 8, height: 8, borderRadius: 8, top: -12, left: radius/2, backgroundColor: globalVariables.green
    },
    ballon2: {
        position:'absolute', width: 4, height: 4, borderRadius: 4, top: -20, left: radius/2+5, backgroundColor: globalVariables.green
    },
    buttonText: {
        color: globalVariables.white,
        fontSize: 12,
        marginBottom: 5
    }
})


export default BalloonButton