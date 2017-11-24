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

class DefaultScreen extends React.Component {

    render() {
        return <View style={styles.containerMain}>
            <Text style={styles.mainTitle}>Yes, We will help you make better investments and make most of your money. Figure out what suits you best and gives you best return</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1
    },
    mainTitle: {
        color: globalVariables.white,
        padding: 15,
        marginBottom: 10
    },
})


export default DefaultScreen