import _ from 'lodash'
import globalVariables from '../config/styles.config'
import { width, height } from '../config/dimensions.config'
import accounting from 'accounting'
import {observer} from 'mobx-react/native'

import InsuranceService from '../services/InsuranceService'

const React = require('react')
const {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} = require('react-native')

import Pagination from '../lib/Pagination'

@observer class MyInsuranceScreen extends React.Component {

    render() {
        //this hack is needed so to observe insurance list
        this.props.insurancePagination.results.length

        return <View style={styles.containerMain}>
            <Text style={styles.mainTitle}> Your current balance <Text style={styles.mainTitleBold}>{accounting.formatMoney(_.toNumber(InsuranceService.sumInsurances()), 'CHF ', 0)}</Text></Text>
            <Image style={styles.mainImage} resizeMode="contain" source={require('../images/front_image.png')}/>
        </View>
    }
}

var styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        justifyContent: 'flex-end'
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


export default MyInsuranceScreen