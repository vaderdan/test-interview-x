import 'react-native';
import _ from 'lodash'
import InsuranceService from '../src/services/InsuranceService'
import realm from '../src/config/realm.config'



const data = {
    "batchcomplete": "",
    "continue": {
        "cmcontinue": "subcat|4d4927512f3d0437414b4f4927412b2f0114018f13|53075414",
        "continue": "-||"
    },
    "query": {
        "categorymembers": [{
            "pageid": 34182415,
            "ns": 14,
            "title": "Category:Agricultural insurance"
        },
        {
            "pageid": 53075320,
            "ns": 14,
            "title": "Category:Deposit insurance"
        },
        {
            "pageid": 55176392,
            "ns": 14,
            "title": "Category:Flood insurance"
        },
        {
            "pageid": 23120838,
            "ns": 14,
            "title": "Category:Health insurance"
        },
        {
            "pageid": 51923062,
            "ns": 14,
            "title": "Category:Liability insurance"
        },
        {
            "pageid": 23037626,
            "ns": 14,
            "title": "Category:Life insurance"
        },
        {
            "pageid": 45634815,
            "ns": 14,
            "title": "Category:Mortgage insurance"
        },
        {
            "pageid": 51782206,
            "ns": 14,
            "title": "Category:Property insurance"
        },
        {
            "pageid": 37317809,
            "ns": 14,
            "title": "Category:Reinsurance"
        },
        {
            "pageid": 14832424,
            "ns": 14,
            "title": "Category:Self insurance"
        }
        ]
    }
}


test('test to save insurance categories', () => {
    //tear down
    realm.instance.write(() => {
        realm.instance.delete(realm.instance.objects('insurance_category'))
    })


    InsuranceService.saveCategories(data)

    expect(realm.instance.objects('insurance_category').length).toEqual(10)
})


test('test insurance categories fetch', () => {
    //tear down
    realm.instance.write(() => {
        realm.instance.delete(realm.instance.objects('insurance_category'))
    })

    InsuranceService.saveCategories(data)

    expect(InsuranceService.fetchCategories().length).toEqual(10)
})


test('test insurance fetch', () => {
    //tear down
    realm.instance.write(() => {
        realm.instance.delete(realm.instance.objects('insurance'))
    })

    realm.instance.write(() => {
        for (let i = 0; i < 30; i++) {
            realm.instance.create('insurance', {
                id: i + 'test',
                title: 'test'
            }, true)
        }
    })


    InsuranceService.fetchInsurances(0, (error, results, haveMore) => {
        expect(results.length).toEqual(20)
        expect(haveMore).toEqual(true)
    })

    InsuranceService.fetchInsurances(1, (error, results, haveMore) => {
        expect(results.length).toEqual(10)
        expect(haveMore).toEqual(false)
    })
})


test('test insurance fetch < 10 page', () => {
    //tear down
    realm.instance.write(() => {
        realm.instance.delete(realm.instance.objects('insurance'))
    })

    realm.instance.write(() => {
        for (let i = 0; i < 10; i++) {
            realm.instance.create('insurance', {
                id: i + 'test',
                title: 'test'
            }, true)
        }
    })


    InsuranceService.fetchInsurances(0, (error, results, haveMore) => {
        expect(results.length).toEqual(10)
        expect(haveMore).toEqual(false)
    })
})




test('test insurance sum', () => {
    //tear down
    realm.instance.write(() => {
        realm.instance.delete(realm.instance.objects('insurance'))
    })

    realm.instance.write(() => {
        for (let i = 0; i < 9; i++) {
            realm.instance.create('insurance', {
                id: i + 'test',
                title: 'test',
                premium_yearly: 3
            }, true)
        }
    })


    expect(InsuranceService.sumInsurances()).toEqual(27)
})