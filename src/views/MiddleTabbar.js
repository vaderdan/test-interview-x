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

import BalloonButton from './BalloonButton'

class MiddleTabbar extends React.Component {

    static propTypes = {
        onChange: PropTypes.func,
        selected: PropTypes.number
    }

    static defaultProps = {
        onChange: (index) => {}
    }

    render() {
        return <View style={styles.containerMiddle}>
            <BalloonButton onPress={() => this.props.onChange(0)} disabled={this.props.selected != 0} title="Account" icon="money" backgroundColor={globalVariables.green}/>
            <BalloonButton onPress={() => this.props.onChange(1)} disabled={this.props.selected != 1} title="Statistics" icon="area-chart" backgroundColor={globalVariables.pink}/>
            <BalloonButton onPress={() => this.props.onChange(2)} disabled={this.props.selected != 2} title="Add" icon="plus" backgroundColor={globalVariables.blue}/>
        </View>
    }
}

const styles = StyleSheet.create({
    containerMiddle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: -60,
        height: 125,
        zIndex: -1
    }
})


export default MiddleTabbar