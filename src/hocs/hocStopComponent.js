import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    PixelRatio,
    Image,
    TouchableOpacity,
    NativeModules,
    Alert,
    Easing,
    Animated
} from 'react-native';
import _ from 'lodash'
import PropTypes from 'prop-types'
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'


const hocStopComponent = (OldComponent) => {

    const NewComponent = class extends React.Component {

        static propTypes = { 
            navigation: PropTypes.object
        }

        shouldComponentUpdate(nextProps) {
            return false
        }

        render() {
            return (
                <OldComponent {...this.props} />
            )
        }
    }
    NewComponent.displayName = OldComponent.displayName
    NewComponent.navigationOptions = OldComponent.navigationOptions

    return NewComponent
}

export default hocStopComponent