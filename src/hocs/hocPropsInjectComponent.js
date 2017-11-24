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

const hocPropsInjectComponent = (newprops, OldComponent) => {
    newprops = _.toPlainObject(newprops)

    const NewComponent = class extends React.Component {
        static propTypes = { 
            navigation: PropTypes.object
        }

        render() {
            return (
                <OldComponent {...newprops} {...this.props} />
            )
        }
    }
    NewComponent.displayName = OldComponent.displayName
    NewComponent.navigationOptions = OldComponent.navigationOptions

    return NewComponent
}

export default hocPropsInjectComponent