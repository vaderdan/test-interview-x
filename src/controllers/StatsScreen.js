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

class StatsScreen extends React.Component {

    render() {
        return <View style={styles.containerMain}>
            <Image style={styles.mainImage} resizeMode="contain" source={require('../images/front_image3.png')}/>
        </View>
    }
}

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    mainImage: {
        height: 250,
        width: width - 20,
        marginBottom: 10
    },
})


export default StatsScreen