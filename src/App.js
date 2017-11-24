import _ from 'lodash'

import React from 'react';
import {
    StyleSheet,
} from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import LazyView from './lib/LazyView'
import Pagination from './lib/Pagination'
import hocPropsInjectComponent from './hocs/hocPropsInjectComponent'
import hocStopComponent from './hocs/hocStopComponent'

import routes_ from './config/routes.config'
import globalVariables from './config/styles.config'

const insurancePagination = new Pagination()
let routes = routes_
routes = _.mapValues(routes, (route) => { return { ...route, screen: hocStopComponent(hocPropsInjectComponent({insurancePagination: insurancePagination}, route.screen))} })




const defaultNavigationOptions = () => {
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
    navigationOptions: () => ({tabBarVisible: false}),
    animationEnabled: false,
    swipeEnabled: false,
    backBehavior: 'none'
})

const NavigationBottom = TabNavigator({
    ..._.pick(routes, ['ListInsuranceScreen', 'DefaultScreen', 'DefaultEmptyScreen'])
}, {
    initialRouteName: 'ListInsuranceScreen',
    navigationOptions: () => ({tabBarVisible: false}),
    animationEnabled: false,
    swipeEnabled: false,
    backBehavior: 'none'
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