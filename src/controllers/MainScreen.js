import globalVariables from '../config/styles.config'
import { width } from '../config/dimensions.config'

const React = require('react')
const {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TextInput
} = require('react-native')

import { Button } from 'react-native-elements'
import FlatList from '../lib/FlatList'
import TiltedView from '../views/TiltedView'
import BalloonButton from '../views/BalloonButton'

class MainScreen extends React.Component {

    static navigationOptions = () => ({
        title: 'My insurance',
        headerStyle: headerStyles.headerStyle,
        headerTitleStyle: headerStyles.headerTitleStyle,
        headerTintColor: globalVariables.white
    })

    onNav = () => {
        this.props.navigation.navigate('MainScreen')
    }
  
    render() {
        return (
            <View style={[styles.container, styles.containerBackground]}>
                <View style={styles.containerTop}>
                    <Text style={styles.mainTitle}>This Month you save <Text style={styles.mainTitleBold}>$98.00</Text></Text>
                    <Image style={styles.mainImage} resizeMode="contain" source={require('../images/front_image.png')}/>
                </View>
                <TiltedView style={styles.containerTiledTop}/>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: -40, zIndex: -1}}>
                    <BalloonButton title="Add" icon="plus"/>
                    <BalloonButton disabled title="Account" icon="money"/>
                    <BalloonButton disabled title="Statistics" icon="area-chart"/>
                </View>
                <View>
                    <Button onPress={this.onNav} title="Nav next"/>
                </View>
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
        flex: 1,
        position: 'relative',
        justifyContent: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    containerBackground: {
        backgroundColor: '#39414E'
    },
    containerTop: {
        height: 200,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: globalVariables.green,
        padding: 10,
    },
    containerTiledTop: {
        borderTopColor: globalVariables.green, 
        height: 20,
    },
    mainImage: {
        height: 150,
        width: width - 20,
        marginBottom: 10
    },
    mainTitle: {
        color: globalVariables.white,
        marginBottom: 10
    },
    mainTitleBold: {
        fontWeight: '700'
    }
})

export default MainScreen