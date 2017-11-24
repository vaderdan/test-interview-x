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

import * as Animatable from 'react-native-animatable'
import { Card, Button } from 'react-native-elements'

class AlertPopup extends React.Component {

    static propTypes = { 
        visible: PropTypes.bool,
        onYes: PropTypes.func,
        onNo: PropTypes.func
    }

    static defaultProps = {
        visible: false,
        onYes: () => {},
        onNo: () => {}
    }

    render() {
        return <View pointerEvents={this.props.visible ? 'auto': 'none'} style={[styles.container, this.props.visible && styles.containerTintedShadow]}>
            {this.props.visible && <Animatable.View useNativeDriver animation="bounceIn" duration={200} easing="ease-in" style={styles.containerAnimated}>
                <Card title='Confirm?' containerStyle={styles.card}>
                    <Text style={styles.titleText}>
                        Please confirm that you really want to delete the item 
                    </Text>
                    <View  style={styles.containerButtons}>
                        <Button icon={{name: 'check', type: 'font-awesome'}} backgroundColor='#03A9F4' buttonStyle={styles.button} containerViewStyle={[styles.buttonContainer, styles.buttonContainerLeft]} borderRadius={4} onPress={this.props.onYes} title='Yes' />
                        <Button icon={{name: 'times', type: 'font-awesome'}} backgroundColor='red' buttonStyle={styles.button} containerViewStyle={[styles.buttonContainer, styles.buttonContainerRight]} borderRadius={4} onPress={this.props.onNo} title='No' />
                    </View>
                </Card>
            </Animatable.View>}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    containerAnimated: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTintedShadow: {
        backgroundColor: globalVariables.semitransparent
    },
    button: {
        marginLeft: 0, marginRight: 0, marginBottom: 0
    },
    buttonContainer: {
        borderRadius: 4,
        flex: 1
    },
    buttonContainerLeft: {
        marginLeft: 0
    },
    buttonContainerRight: {
        marginRight: 0
    },
    card: {
        borderRadius: 4, 
        borderWidth: 0
    },
    titleText: {
        marginBottom: 10
    },
    containerButtons: {
        flexDirection: 'row'
    }
})


export default AlertPopup