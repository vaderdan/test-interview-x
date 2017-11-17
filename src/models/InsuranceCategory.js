import Realm from 'realm'
import { observable } from 'mobx'
import _ from 'lodash'



class InsuranceCategory extends Realm.Object {
    static schema = {
        name: 'insurance_category',
        primaryKey: 'pageid',
        properties: {
            pageid: { type: 'int', optional: true}, 
            title: { type: 'string', optional: true},
        }
    }

    toObject() {
        return _.assign({}, this.isValid() ? this : {})
    }
}


export default InsuranceCategory