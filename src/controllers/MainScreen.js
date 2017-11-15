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
import FlatList from '../lib/FlatList'
import TiltedView from '../views/TiltedView'
import BalloonButton from '../views/BalloonButton'

import Pagination from '../lib/Pagination'

import SeparatorCell from '../views/SeparatorCell'
import InsuranceCell from '../views/InsuranceCell'

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

    changeSelected(selected) {
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

        this.animatedPosition = new Animated.Value(1),

        this.pagination = new Pagination()

        this.pagination.delegate.fetchResults = (page, start, finish) => {
            start()

            finish(null, [{id: 'text'}, {id:'text2'}, {id:'text3'}], false)
        }

        this.pagination.delegate.fetchNextResults = (page, start, finish) => {
            start()
            
            finish(null, [{id: 'text'}, {id:'text2'}], false)
        }
    }

    componentDidMount() {
        this.pagination.startFetchingResults()
    }

    renderItem = ({item, index}) => {
        return <InsuranceCell/>
    }

    renderSeparator = () => {
        return <SeparatorCell/>
    }
  
    render() {
        return (
            <View style={styles.containerOuter}>
                <StatusBar barStyle="light-content"/>
                <Animated.View style={[styles.container, styles.containerMain, { transform: [{translateY: this.transformInterpolate() }] }]}>
                    <View style={styles.containerTop}>
                        <View>
                            <Text style={styles.mainTitle}>This Month you save <Text style={styles.mainTitleBold}>$98.00</Text></Text>
                            <Image style={styles.mainImage} resizeMode="contain" source={require('../images/front_image.png')}/>
                        </View>
                    </View>
                    <TiltedView style={styles.containerTiledTop}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: -40, zIndex: -1}}>
                        <BalloonButton onPress={() => this.changeSelected(0)} title="Add" icon="plus"/>
                        <BalloonButton onPress={() => this.changeSelected(1)} disabled title="Account" icon="money"/>
                        <BalloonButton onPress={() => this.changeSelected(2)} disabled title="Statistics" icon="area-chart"/>
                    </View>
                    <View style={styles.containerBottom}>
                        <View style={{height: 250}}>
                            <FlatList
                                data={this.pagination.results.slice()}
                                renderItem={this.renderItem}
                                ItemSeparatorComponent={this.renderSeparator}
                                keyExtractor={(item) => item.id}
                                onEndReached={this.pagination.startFetchingNextResults}
                                keyboardShouldPersistTaps='never'
                                style={styles.container}
                            />
                        </View>
                        <Button onPress={this.onNav} title="Nav next"/>
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