import globalVariables from '../config/styles.config'
import { width } from '../config/dimensions.config'
import {observer} from 'mobx-react/native'

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

    constructor(props) {
        super(props)

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
                <FlatList
                    data={this.pagination.results.slice()}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    keyExtractor={(item) => item.id}
                    onEndReached={this.pagination.startFetchingNextResults}
                    keyboardShouldPersistTaps='never'
                    style={styles.container}
                />
                <Button onPress={this.onNav} title="Nav next"/>
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