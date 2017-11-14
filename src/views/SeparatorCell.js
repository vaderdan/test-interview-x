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

class InsuranceCell extends React.Component {

    render() {
        return <View style={styles.separator}></View>
    }
}

var styles = StyleSheet.create({
    separator: {
        position: 'absolute', height: 2, left: 30, right: 15, bottom: 0, backgroundColor: '#4E5565'
    }
})


export default InsuranceCell