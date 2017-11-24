import _ from 'lodash'
import globalVariables from '../config/styles.config'

const React = require('react')
const {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image
} = require('react-native')

import Icon from 'react-native-vector-icons/FontAwesome'

class EmptyStateCell extends React.Component {

    render() {
        return <View style={styles.container}>
            <Icon name="exclamation-circle" size={30} color={globalVariables.white} style={styles.icon} />
            <Text style={[styles.titleText, styles.titleTextBold]}>No items found</Text>
            <Text style={styles.titleText}>You can go to add more from Add Screen</Text>
            
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    titleText: {
        color: globalVariables.white,
        margin: 3,
        opacity: 0.8
    },
    titleTextBold: {
        fontWeight: '700'
    },
    icon: {
        marginBottom: 20,
        opacity: 0.5
    }
})


export default EmptyStateCell