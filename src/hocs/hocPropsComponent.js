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


const hocPropsComponent = (OldComponent) => {

    const NewComponent = class extends React.Component {

        render() {
            const {navigation: {state: {params}}} = this.props

            return (
                <OldComponent {...params} {...this.props} />
            )
        }
    }

    NewComponent.navigationOptions = OldComponent.navigationOptions

    return NewComponent
}

export default hocPropsComponent