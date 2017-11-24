import _ from 'lodash'
import globalVariables from '../config/styles.config'
import { width, height } from '../config/dimensions.config'

const React = require('react')
const {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} = require('react-native')

import { Button } from 'react-native-elements'

class DefaultEmptyScreen extends React.Component {

    render() {
        return <View style={styles.containerMain}>
        </View>
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1
    },
})


export default DefaultEmptyScreen