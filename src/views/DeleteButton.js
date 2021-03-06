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

class InsuranceCell extends React.Component {

    static propTypes = {
        onPress: PropTypes.func
    }

    static defaultProps = {
        onPress: () => {}
    }

    render() {
        return <TouchableHighlight activeOpacity={0.5} underlayColor="#39414E" style={styles.deleteContainer} onPress={this.props.onPress}>
            <Icon name="trash" size={20} color={globalVariables.white} />
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    deleteContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default InsuranceCell