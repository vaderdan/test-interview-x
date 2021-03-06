import _ from 'lodash'
import globalVariables from '../config/styles.config'
import { width, height } from '../config/dimensions.config'
import PropTypes from 'prop-types'
import {observer} from 'mobx-react/native'

const React = require('react')
const {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} = require('react-native')

import FlatList from '../lib/FlatList'
import SeparatorCell from '../views/SeparatorCell'
import InsuranceCell from '../views/InsuranceCell'
import EmptyStateCell from '../views/EmptyStateCell'

import Pagination from '../lib/Pagination'
import InsuranceService from '../services/InsuranceService'



@observer class ListInsuranceScreen extends React.Component {

    static propTypes = { 
        insurancePagination: Pagination,
        screenProps: PropTypes.object
    }

    static defaultProps = {
        insurancePagination: new Pagination(),
    }

    constructor(props) {
        super(props)

        
        this.props.insurancePagination.delegate.fetchResults = (page, start, finish) => {
            start()

            InsuranceService.fetchInsurances(page, finish)
        }

        this.props.insurancePagination.delegate.fetchNextResults = (page, start, finish) => {
            start()
            
            InsuranceService.fetchInsurances(page, finish)
        }
    }

    componentDidMount() {
        this.props.insurancePagination.startFetchingResults()
    }

    renderItem = ({item, index}) => {
        return <InsuranceCell item={item} onDelete={this.props.screenProps.onDelete}/>
    }

    renderSeparator = () => {
        return <SeparatorCell/>
    }

    renderEmpty = () => {
        return <EmptyStateCell/>
    }

    render() {
        return <View style={styles.containerMain}>
            <FlatList
                data={this.props.insurancePagination.results.slice()}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
                ListEmptyComponent={this.renderEmpty}
                keyExtractor={(item) => item.id}
                onEndReached={this.props.insurancePagination.startFetchingNextResults}
                keyboardShouldPersistTaps='never'
                style={styles.container}
            />
        </View>
    }
}

const styles = StyleSheet.create({
    containerMain: {
        height: height/2.8-15
    },
    container: {
        flex: 1
    },
})


export default ListInsuranceScreen