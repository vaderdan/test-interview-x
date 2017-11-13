import Realm from 'realm'
import { observable } from 'mobx'
import _ from 'lodash'



class Insurance extends Realm.Object {
    static schema = {
        name: 'insurance',
        properties: {
            title: { type: 'string', optional: true},
            premium_yearly: { type: 'float', default: 0},
            category: { type: 'string', optional: true},
        }
    }

    toObject() {
        return _.assign({}, this.isValid() ? this : {})
    }
}


export default Insurance