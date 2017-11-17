import globalVariables from '../config/styles.config'
import { width, height } from '../config/dimensions.config'
import {observer} from 'mobx-react/native'
import realm from '../config/realm.config'
import _ from 'lodash'

const React = require('react')
const {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    StatusBar,
    TextInput,
    Animated,
    Platform
} = require('react-native')

import TiltedView from '../views/TiltedView'
import BalloonButton from '../views/BalloonButton'
import MiddleTabbar from '../views/MiddleTabbar'
import AlertPopup from '../views/AlertPopup'

import InsuranceService from '../services/InsuranceService'

import { NavigationActions, StackNavigator, TabNavigator } from 'react-navigation'

var animatedPosition = new Animated.Value(0)
var animatedColor = new Animated.Value(0)

@observer class MainScreen extends React.Component {

    static navigationOptions = () => ({
        title: 'My insurance',
        headerStyle: headerStyles.headerStyle,
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerTintColor: globalVariables.white
    })

    state = {
        alertVisible: false,
        item: null
    }

    componentDidMount() {
        InsuranceService.refreshCategories()
    }

    changeSelected = (selected) => {
        if (selected == 0) {
            let navigateAction = NavigationActions.navigate({ routeName: 'MyInsuranceScreen' })
            this.navigationTop.dispatch(navigateAction)   
            
            let navigateAction2 = NavigationActions.navigate({ routeName: 'ListInsuranceScreen' })
            this.navigationBottom.dispatch(navigateAction2)

            Animated.timing(
                animatedPosition,
                { toValue: 0, duration: 200, useNativeDriver: true },
            ).start()
            Animated.timing(
                animatedColor,
                { toValue: 0, duration: 200, useNativeDriver: false },
            ).start()
        }
        else if (selected == 1) {
            let navigateAction = NavigationActions.navigate({ routeName: 'StatsScreen' })
            this.navigationTop.dispatch(navigateAction)   
            
            let navigateAction2 = NavigationActions.navigate({ routeName: 'DefaultScreen' })
            this.navigationBottom.dispatch(navigateAction2) 

            Animated.timing(
                animatedPosition,
                { toValue: 1, duration: 200, useNativeDriver: true },
            ).start()
            Animated.timing(
                animatedColor,
                { toValue: 1, duration: 200, useNativeDriver: false },
            ).start()
        }
        else {
            let navigateAction = NavigationActions.navigate({ routeName: 'AddScreen' })
            this.navigationTop.dispatch(navigateAction)     
            
            let navigateAction2 = NavigationActions.navigate({ routeName: 'DefaultEmptyScreen' })
            this.navigationBottom.dispatch(navigateAction2)   

            Animated.timing(
                animatedPosition,
                { toValue: 2, duration: 200, useNativeDriver: true },
            ).start()
            Animated.timing(
                animatedColor,
                { toValue: 2, duration: 200, useNativeDriver: false },
            ).start()
        }
    }

    transformInterpolate = () => {
        return animatedPosition.interpolate({inputRange: [0, 1, 2], outputRange: [0, 80, 160], extrapolate: 'clamp'})
    }

    colorInterpolate = () => {
        return animatedColor.interpolate({inputRange: [0, 1, 2], outputRange: ['rgba(87, 217, 164, 1)', 'rgba(241, 121, 171, 1)', 'rgba(130, 120, 243, 1)'], extrapolate: 'clamp'})
    }

    onDelete = (item) => {
        this.setState({alertVisible: true, item: item})
    }

    onDeleteConfirm = () => {
        this.setState({alertVisible: false, item: null})

        realm.instance.write(() => {
            var insurance = realm.instance.objectForPrimaryKey('insurance', _.toPlainObject(this.state.item).id)
            realm.instance.delete(insurance)
        })

        this.props.insurancePagination.startFetchingResults()
    }

    onDeleteCancel = () => {
        this.setState({alertVisible: false, item: null})
    }
  
    render() {
        return (
            <View style={[styles.containerOuter, Platform.OS == 'android' && { marginTop: -56, paddingTop: 56 }]}>
                <StatusBar barStyle="light-content"/>
                <Animated.View style={[styles.container, styles.containerMain, { transform: [{translateY: this.transformInterpolate() }] }]}>
                    <Animated.View style={[styles.containerTop, {backgroundColor: this.colorInterpolate()}]}>
                        { this.props.screenProps && <this.props.screenProps.NavigationTop ref={(ref) => { this.navigationTop = ref }}/>}
                    </Animated.View>
                    <TiltedView style={[styles.containerTiledTop, {borderTopColor: this.colorInterpolate()}]}/>
                    <MiddleTabbar onChange={this.changeSelected}/>
                    <View style={styles.containerBottom}>
                        { this.props.screenProps && <this.props.screenProps.NavigationBottom screenProps={{onDelete:this.onDelete}} ref={(ref) => { this.navigationBottom = ref }}/>}
                    </View>
                </Animated.View>
                <AlertPopup visible={this.state.alertVisible} onYes={this.onDeleteConfirm} onNo={this.onDeleteCancel}/>
            </View>
        )
    }
}

var headerStyles = { 
    headerStyle: {
        backgroundColor: globalVariables.transparent,
        shadowOpacity: 0,
        shadowOpacity: 0,
        shadowOffset: {
            height: 0,
        },
        borderBottomWidth: 0,
        elevation: 0,
    },
    headerTitleStyle: {
        color: globalVariables.white
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