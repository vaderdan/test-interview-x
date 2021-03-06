import globalVariables from '../config/styles.config'
import { height } from '../config/dimensions.config'
import {observer} from 'mobx-react/native'
import realm from '../config/realm.config'
import PropTypes from 'prop-types'
import _ from 'lodash'

import React from 'react'
import {
    StyleSheet,
    View,
    StatusBar,
    Animated,
    Platform
} from 'react-native'

import TiltedView from '../views/TiltedView'
import MiddleTabbar from '../views/MiddleTabbar'
import AlertPopup from '../views/AlertPopup'
import AppStateHelper from '../views/AppStateHelper'
import Pagination from '../lib/Pagination'

import InsuranceService from '../services/InsuranceService'

import { NavigationActions } from 'react-navigation'

const animatedPosition = new Animated.Value(0)
const animatedColor = new Animated.Value(0)

@observer class MainScreen extends React.Component {

    static propTypes = { 
        insurancePagination: Pagination, 
        screenProps: PropTypes.object,
        navigation: PropTypes.object
    }

    static navigationOptions = () => ({
        title: 'My insurance',
        headerStyle: headerStyles.headerStyle,
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerTintColor: globalVariables.white
    })

    state = {
        alertVisible: false,
        item: null,
        selected: 0
    }

    componentDidMount() {
        InsuranceService.refreshCategories()
    }

    becomeActive = () => {
        const navigateAction = NavigationActions.navigate({ routeName: 'MyInsuranceScreen' })
        this.navigationTop.dispatch(navigateAction)   
        
        const navigateAction2 = NavigationActions.navigate({ routeName: 'ListInsuranceScreen' })
        this.navigationBottom.dispatch(navigateAction2)

        animatedPosition.setValue(0)
        animatedColor.setValue(0)

        setTimeout(() => this.setState({selected:0}), 0)
    }

    changeSelected = (selected) => {
        if (selected == 0) {
            const navigateAction = NavigationActions.navigate({ routeName: 'MyInsuranceScreen' })
            this.navigationTop.dispatch(navigateAction)   
            
            const navigateAction2 = NavigationActions.navigate({ routeName: 'ListInsuranceScreen' })
            this.navigationBottom.dispatch(navigateAction2)

            Animated.timing(
                animatedPosition,
                { toValue: 0, duration: 200, useNativeDriver: true },
            ).start()

            animatedColor.setValue(0)
        }
        else if (selected == 1) {
            const navigateAction = NavigationActions.navigate({ routeName: 'StatsScreen' })
            this.navigationTop.dispatch(navigateAction)   
            
            const navigateAction2 = NavigationActions.navigate({ routeName: 'DefaultScreen' })
            this.navigationBottom.dispatch(navigateAction2) 

            Animated.timing(
                animatedPosition,
                { toValue: 1, duration: 200, useNativeDriver: true },
            ).start()

            animatedColor.setValue(1)
        }
        else {
            const navigateAction = NavigationActions.navigate({ routeName: 'AddScreen' })
            this.navigationTop.dispatch(navigateAction)     
            
            const navigateAction2 = NavigationActions.navigate({ routeName: 'DefaultEmptyScreen' })
            this.navigationBottom.dispatch(navigateAction2)   

            Animated.timing(
                animatedPosition,
                { toValue: 2, duration: 200, useNativeDriver: true },
            ).start()

            animatedColor.setValue(2)
        }

        setTimeout(() => this.setState({selected}), 0)
    }

    transformInterpolate = () => {
        return animatedPosition.interpolate({inputRange: [0, 1, 2], outputRange: [0, 80, 160], extrapolate: 'clamp'})
    }

    colorInterpolate = () => {
        if(this.state.selected == 0) {
            return globalVariables.green
        }
        else if(this.state.selected == 1){
            return globalVariables.pink
        }
        else {
            return globalVariables.blue
        }
    }

    onDelete = (item) => {
        this.setState({alertVisible: true, item: item})
    }

    onDeleteConfirm = () => {
        this.setState({alertVisible: false, item: null})

        realm.instance.write(() => {
            const insurance = realm.instance.objectForPrimaryKey('insurance', _.toPlainObject(this.state.item).id)
            realm.instance.delete(insurance)
        })

        this.props.insurancePagination.startFetchingResults()
    }

    onDeleteCancel = () => {
        this.setState({alertVisible: false, item: null})
    }
  
    render() {
        return (
            <View style={[styles.containerOuter, Platform.OS == 'android' && headerStyles.androidNavbarNegativeHack]}>
                <StatusBar barStyle="light-content"/>
                <AppStateHelper becomeActive={this.becomeActive}/>
                <Animated.View style={[styles.container, styles.containerMain, { transform: [{translateY: this.transformInterpolate() }] }]}>
                    <Animated.View style={[styles.containerTop, {backgroundColor: this.colorInterpolate()}]}>
                        { this.props.screenProps && <this.props.screenProps.NavigationTop ref={(ref) => { this.navigationTop = ref }}/>}
                    </Animated.View>
                    <TiltedView style={[styles.containerTiledTop, {borderTopColor: this.colorInterpolate()}]}/>
                    <MiddleTabbar selected={this.state.selected} onChange={ this.changeSelected }/>
                    <View style={styles.containerBottom}>
                        { this.props.screenProps && <this.props.screenProps.NavigationBottom screenProps={{onDelete:this.onDelete}} ref={(ref) => { this.navigationBottom = ref }}/>}
                    </View>
                </Animated.View>
                <AlertPopup visible={this.state.alertVisible} onYes={this.onDeleteConfirm} onNo={this.onDeleteCancel}/>
            </View>
        )
    }
}

const headerStyles = { 
    headerStyle: {
        backgroundColor: globalVariables.transparent,
        shadowOpacity: 0,
        shadowOffset: {
            height: 0,
        },
        borderBottomWidth: 0,
        elevation: 0,
    },
    headerTitleStyle: {
        color: globalVariables.white
    },
    androidNavbarNegativeHack: {
        marginTop: -56, 
        paddingTop: 56
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerOuter: {
        flex: 1,
        backgroundColor: globalVariables.green,
    },
    containerMain: {
        backgroundColor: globalVariables.background,
        marginTop: -300,
        marginBottom: -300,
    },
    containerTop: {
        height: height/2.8+300,
        
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: globalVariables.green,
        padding: 10,
    },
    containerBottom: {
        flex: 1,
        backgroundColor: globalVariables.background,
        
        justifyContent: 'flex-start',
    },
    containerTiledTop: {
        borderTopColor: globalVariables.green, 
        height: 20,
    },
})

export default MainScreen