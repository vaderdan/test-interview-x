import _ from 'lodash'
import globalVariables from '../config/styles.config'

const React = require('react')
const {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} = require('react-native')

import BalloonButton from './BalloonButton'

class MiddleTabbar extends React.Component {

    static defaultProps = {
        onChange: (index) => {}
    }

    state = {
        selected: 0
    }

    onChange = (selected) => {
        this.setState({selected})

        this.props.onChange(selected)
    }

    render() {
        return <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: -60, height: 125, zIndex: -1}}>
            <BalloonButton onPress={() => this.onChange(0)} disabled={this.state.selected != 0} title="Account" icon="money" backgroundColor={globalVariables.green}/>
            <BalloonButton onPress={() => this.onChange(1)} disabled={this.state.selected != 1} title="Statistics" icon="area-chart" backgroundColor={globalVariables.pink}/>
            <BalloonButton onPress={() => this.onChange(2)} disabled={this.state.selected != 2} title="Add" icon="plus" backgroundColor={globalVariables.blue}/>
        </View>
    }
}

var styles = StyleSheet.create({
    
})


export default MiddleTabbar