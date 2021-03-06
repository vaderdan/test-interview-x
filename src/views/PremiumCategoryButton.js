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

class SeparatorCell extends React.Component {

    static propTypes = {
        onPress: PropTypes.func,
        title: PropTypes.string
    }

    static defaultProps = {
        title: '',
        onPress: () => {}
    }

    render() {
        return <TouchableHighlight underlayColor={globalVariables.blue} style={styles.buttonContainer} onPress={this.props.onPress}><Text numberOfLines={1} style={styles.button}>{this.props.title}</Text></TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10
    },
    button: {
        color: globalVariables.blue2, fontWeight: '700'
    }
})


export default SeparatorCell