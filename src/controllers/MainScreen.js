import globalVariables from '../config/styles.config'


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
const { Component } = React

import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import FlatList from '../lib/FlatList'


class MainScreen extends React.Component {

    static navigationOptions = {
        title: 'Home',
    }

    onNav = () => {
        this.props.navigation.navigate('MainScreen')
    }
  
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.onNav} title="Nav next"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    menuText: {
        flex: 1,
        marginRight: 5,
        padding: 10
    },
})

export default MainScreen