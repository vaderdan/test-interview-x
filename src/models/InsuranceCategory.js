import { observable } from 'mobx'
import _ from 'lodash'



class InsuranceCategory {
    static schema = {
        name: 'insurance_category',
        primaryKey: 'pageid',
        properties: {
            pageid: { type: 'int', optional: true}, 
            title: { type: 'string', optional: true},
        }
    }

    toObject() {
        return _.assign({}, this)
    }
}


export default InsuranceCategory