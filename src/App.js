import _ from 'lodash'

import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import LazyView from './lib/LazyView'
import Pagination from './lib/Pagination'
import hocPropsInjectComponent from './hocs/hocPropsInjectComponent'
import hocStopComponent from './hocs/hocStopComponent'

import routes_ from './config/routes.config'
import globalVariables from './config/styles.config'

var insurancePagination = new Pagination()
var routes = routes_
routes = _.mapValues(routes, (route) => { return { ...route, screen: hocStopComponent(hocPropsInjectComponent({insurancePagination: insurancePagination}, route.screen))} })




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


const NavigationTop = TabNavigator({
    ..._.pick(routes, ['MyInsuranceScreen', 'AddScreen', 'StatsScreen'])
}, {
    initialRouteName: 'MyInsuranceScreen',
    navigationOptions: (navigation) => ({tabBarVisible: false}),
    animationEnabled: false,
    swipeEnabled: false
})

const NavigationBottom = TabNavigator({
    ..._.pick(routes, ['ListInsuranceScreen', 'DefaultScreen', 'DefaultEmptyScreen'])
}, {
    initialRouteName: 'ListInsuranceScreen',
    navigationOptions: (navigation) => ({tabBarVisible: false}),
    animationEnabled: false,
    swipeEnabled: false
})




export default class myapp extends React.Component {
    render() {
        return (
            <LazyView style={styles.container}>
                <AppNavigation screenProps={{NavigationTop, NavigationBottom}} />
            </LazyView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})