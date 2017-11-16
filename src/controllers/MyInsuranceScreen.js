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

class MyInsuranceScreen extends React.Component {

    render() {
        return <View style={styles.containerMain}>
            <Text style={styles.mainTitle}>This Month you save <Text style={styles.mainTitleBold}>$98.00</Text></Text>
            <Image style={styles.mainImage} resizeMode="contain" source={require('../images/front_image.png')}/>
        </View>
    }
}

var styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    mainImage: {
        height: 150,
        width: width - 20,
        marginBottom: 10
    },
    mainTitle: {
        color: globalVariables.white,
        marginBottom: 10
    },
    mainTitleBold: {
        fontWeight: '700'
    }
})


export default MyInsuranceScreen