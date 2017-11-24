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

const hocPropsComponent = (OldComponent) => {

    const NewComponent = class extends React.Component {

        static propTypes = { 
            navigation: PropTypes.object
        }

        render() {
            const {navigation: {state: {params}}} = this.props

            return (
                <OldComponent {...params} {...this.props} />
            )
        }
    }
    NewComponent.displayName = OldComponent.displayName
    NewComponent.navigationOptions = OldComponent.navigationOptions

    return NewComponent
}

export default hocPropsComponent