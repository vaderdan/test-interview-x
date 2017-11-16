import globalVariables from '../config/styles.config'
import { width, height } from '../config/dimensions.config'
import {observer} from 'mobx-react/native'

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
    Animated
} = require('react-native')

import { Button } from 'react-native-elements'
import TiltedView from '../views/TiltedView'
import BalloonButton from '../views/BalloonButton'

import MiddleTabbar from '../views/MiddleTabbar'

@observer class MainScreen extends React.Component {

    static navigationOptions = () => ({
        title: 'My insurance',
        headerStyle: headerStyles.headerStyle,
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerTintColor: globalVariables.white
    })

    onNav = () => {
        this.props.navigation.navigate('MainScreen')
    }

    changeSelected = (selected) => {
        if (selected == 0) {
            Animated.timing(
                this.animatedPosition,
                { toValue: -1, duration: 200, useNativeDriver: true },
            ).start()
        }
        else if (selected == 1) {
            Animated.timing(
                this.animatedPosition,
                { toValue: 1, duration: 200, useNativeDriver: true },
            ).start()
        }
        else {
            Animated.timing(
                this.animatedPosition,
                { toValue: 2, duration: 200, useNativeDriver: true },
            ).start()
        }
    }

    transformInterpolate = () => {
        return this.animatedPosition.interpolate({inputRange: [0, 1, 2], outputRange: [-100, 0, 100], extrapolate: 'clamp'})
    }

    constructor(props) {
        super(props)

        this.animatedPosition = new Animated.Value(1)
    }
  
    render() {
        return (
            <View style={styles.containerOuter}>
                <StatusBar barStyle="light-content"/>
                <Animated.View style={[styles.container, styles.containerMain, { transform: [{translateY: this.transformInterpolate() }] }]}>
                    <View style={styles.containerTop}>
                        { this.props.screenProps && <this.props.screenProps.NavigationTop/>}
                    </View>
                    <TiltedView style={styles.containerTiledTop}/>
                    <MiddleTabbar onChange={this.changeSelected}/>
                    <View style={styles.containerBottom}>
                        <Button onPress={this.onNav} title="Nav next"/>
                        { this.props.screenProps && <this.props.screenProps.NavigationBottom/>}
                    </View>
                </Animated.View>
            </View>
        )
    }
}

var headerStyles = { 
    headerStyle: {
        backgroundColor: globalVariables.green,
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
    },
    containerTop: {
        height: height/2.8+300,
        marginTop: -300,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: globalVariables.green,
        padding: 10,
    },
    containerBottom: {
        flex: 1,
        backgroundColor: globalVariables.background,
        marginBottom: -300,
        justifyContent: 'flex-start',
    },
    containerTiledTop: {
        borderTopColor: globalVariables.green, 
        height: 20,
    },
})

export default MainScreen