import _ from 'lodash'
import globalVariables from '../config/styles.config'
import {observer} from 'mobx-react/native'
import accounting from 'accounting'

const React = require('react')
const {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} = require('react-native')

import Icon from 'react-native-vector-icons/FontAwesome'

import DeleteButton from './DeleteButton'

@observer class InsuranceCell extends React.Component {

    static defaultProps = {
        item: {}
    }

    render() {
        return <View style={styles.cellContainer}>
            <Text style={styles.currencyText}>CHF</Text> 
            <Image style={styles.currencyImage} source={require('../images/ch.png')}/>
            <View style={styles.container}>
                <Text numberOfLines={1} style={styles.titleText}>{accounting.formatMoney(_.toNumber(this.props.item.premium_yearly))}</Text> 
                <Text numberOfLines={1} style={styles.subtitleText}>{_.toString(this.props.item.title)}</Text> 
            </View>
            <DeleteButton/>
        </View>
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cellContainer: {
        height: 74,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    currencyText: {
        color: globalVariables.white, 
        marginRight: 10
    },
    currencyImage: {
        width: 20, 
        height: 20, 
        marginRight: 10
    },
    titleText: {
        color: globalVariables.white,
        fontWeight: '700'
    },
    subtitleText: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 20,
        height: 20,
        color: globalVariables.white,
        fontSize: 12,
        color: globalVariables.grayDark
    }
})


export default InsuranceCell