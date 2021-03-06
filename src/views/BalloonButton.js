import _ from 'lodash'
import globalVariables from '../config/styles.config'
import PropTypes from 'prop-types'

const React = require('react')
const {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} = require('react-native')

import Icon from 'react-native-vector-icons/FontAwesome'
import * as Animatable from 'react-native-animatable'

const radius = 60

class BalloonButton extends React.Component {

    static propTypes = {
        backgroundColor: PropTypes.string,
        disabledColor: PropTypes.string,
        color: PropTypes.string,
        disabled: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.string,
        style: PropTypes.object,
        onPress: PropTypes.func,
    }

    static defaultProps = {
        backgroundColor: globalVariables.green,
        disabledColor: globalVariables.grayDark2,
        color: globalVariables.white,
        disabled: false,
        title: 'Money',
        icon: 'plus',
        style: {},
        onPress: () => {}
    }

    render() {
        const backgroundColor = this.props.disabled ? this.props.disabledColor : this.props.backgroundColor

        return <Animatable.View useNativeDriver transition="translateY" style={[styles.containerMain, {transform: [{translateY: !this.props.disabled ? 30 : 0 }]}, this.props.style]}>
            <View style={[styles.ballon1, {backgroundColor: backgroundColor}]}></View>
            <View style={[styles.ballon2, {backgroundColor: backgroundColor}]}></View>
            <TouchableHighlight activeOpacity={0.5} underlayColor={backgroundColor} style={[styles.buttonContainer, {backgroundColor: backgroundColor}]} onPress={this.props.onPress}>
                <Icon name={this.props.icon} size={20} color={globalVariables.white} />   
            </TouchableHighlight>
            <Text style={styles.buttonText}>{this.props.title}</Text>
        </Animatable.View>
    }
}

const styles = StyleSheet.create({
    containerMain: {
        position: 'relative',
        alignItems: 'center',
        paddingTop: 16
    },
    buttonContainer: {
        borderRadius: radius,
        width: radius,
        height: radius,
        backgroundColor: globalVariables.green,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
    },
    ballon1: {
        position:'absolute', width: 8, height: 8, borderRadius: 8, top: 6, left: radius/2, backgroundColor: globalVariables.green
    },
    ballon2: {
        position:'absolute', width: 4, height: 4, borderRadius: 4, top: 0, left: radius/2+5, backgroundColor: globalVariables.green
    },
    buttonText: {
        color: globalVariables.white,
        fontSize: 12,
        marginBottom: 5
    }
})


export default BalloonButton