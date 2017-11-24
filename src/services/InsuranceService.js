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
            .catch(() => {})
    }

    static saveCategories(data) {
        data = data || {}
        data.query = data.query || {}
        data.query.categorymembers = data.query.categorymembers || []

        if(realm.instance.objects('insurance_category').length > 0) {
            return
        }

        try {
            realm.instance.write(() => {
                _.each(data.query.categorymembers, (item) => {
                    item.title = _.toString(item.title).replace(/^Category:/i, '')

                    realm.instance.create('insurance_category', item, true)
                })
            })
        } catch (error) {
            //continue regardless
        }
    }

    static fetchCategories() {
        return _.map(realm.instance.objects('insurance_category'), (item) => item.toObject())
    }

    static fetchInsurances(page, completion) {
        page = _.toInteger(page)
        completion = completion || (() => {})


        let results = realm.instance.objects('insurance').sorted('id').slice(page*20, (page+1)*20)
        results = _.map(results, (item) => item.toObject())
        const hasMore = results.length >= 20

        completion(null, results, hasMore)
    }

    static sumInsurances() {
        return realm.instance.objects('insurance').sum('premium_yearly')
    }
}

export default InsuranceService