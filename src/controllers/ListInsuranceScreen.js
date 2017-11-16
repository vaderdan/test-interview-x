import _ from 'lodash'
import globalVariables from '../config/styles.config'
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

import Pagination from '../lib/Pagination'

@observer class ListInsuranceScreen extends React.Component {

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
        return <View style={styles.containerMain}>
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
    }
}

var styles = StyleSheet.create({
    containerMain: {
        height: 250
    },
    container: {
        flex: 1
    },
})


export default ListInsuranceScreen