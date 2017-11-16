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

import Icon from 'react-native-vector-icons/FontAwesome'

class AddScreen extends React.Component {

    render() {
        return <View style={styles.containerMain}>
            
        </View>
    }
}

var styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        justifyContent: 'flex-end'
    },
})


export default AddScreen