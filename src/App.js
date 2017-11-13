import _ from 'lodash'

import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import LazyView from './lib/LazyView'


import globalVariables from './config/styles.config'
import routes from './config/routes.config'



const defaultNavigationOptions = (navigation) => {
    return {
        headerTintColor: globalVariables.backgroundSecondaryContrast,
        headerStyle: [styles.navBar, {
            backgroundColor: globalVariables.background
        }]
    }
}

const AppNavigation = StackNavigator({
    ...routes
}, {
    initialRouteName: 'MainScreen',
    navigationOptions: (navigation) => {
        return _.extend(defaultNavigationOptions(navigation), {})
    }
})







export default class myapp extends React.Component {
    render() {
        return (
            <LazyView style={styles.container}>
                <AppNavigation/>
            </LazyView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})