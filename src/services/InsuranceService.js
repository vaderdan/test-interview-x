import axios from 'axios'
import realm from '../config/realm.config'
import _ from 'lodash'

//when there is no category - show in list no category 

class InsuranceService {
    static refreshCategories() {
        axios.get('https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Types_of_insurance&cmtype=subcat&format=json&origin=*')
        .then((result) => {
            this.saveCategories(result.data)
        })
        .catch((err) => {})
    }

    static saveCategories(data) {
        data = data || {}
        data.query = data.query || {}
        data.query.categorymembers = data.query.categorymembers || []

        if(realm.instance.objects('insurance_category').length > 0) {
            return
        }

        realm.instance.write(() => {
            _.each(data.query.categorymembers, (item) => {
                try {
                    item.title = _.toString(item.title).replace(/^Category:/i, '')

                    realm.instance.create('insurance_category', item, true)
                } catch (error) {}
            })
        })
    }

    static fetchCategories() {
        return _.map(realm.instance.objects('insurance_category'), (item) => item.toObject())
    }
}

export default InsuranceService