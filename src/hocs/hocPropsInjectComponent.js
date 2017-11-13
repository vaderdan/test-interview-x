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



const hocPropsInjectComponent = (newprops, OldComponent) => {
	newprops = _.toPlainObject(newprops)

    const NewComponent = class extends React.Component {
        render() {
			return (
                <OldComponent {...newprops} {...this.props} />
            )
        }
    }

    NewComponent.navigationOptions = OldComponent.navigationOptions

    return NewComponent
}

export default hocPropsInjectComponent