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
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'


const hocStopComponent = (OldComponent) => {

    const NewComponent = class extends React.Component {

        shouldComponentUpdate(nextProps) {
            return false
        }

        render() {
            return (
                <OldComponent {...this.props} />
            )
        }
    }

    NewComponent.navigationOptions = OldComponent.navigationOptions

    return NewComponent
}

export default hocStopComponent