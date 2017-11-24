import _ from 'lodash'
import globalVariables from '../config/styles.config'
import { width, height } from '../config/dimensions.config'
import realm from '../config/realm.config'
import moment from 'moment'

const React = require('react')
const {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Keyboard,
    Alert
} = require('react-native')

import validator from 'validator'

import PremiumCategoryButton from '../views/PremiumCategoryButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import Picker from 'react-native-picker'
import InsuranceService from '../services/InsuranceService'
import Pagination from '../lib/Pagination'

class AddScreen extends React.Component {

    static propTypes = { 
        insurancePagination: Pagination,
    }

    state = {
        title: '',
        premium: null,
        category: null,
        categoryIndex: -1
    }

    categories = InsuranceService.fetchCategories()

    onSelectCategory = () => {
        this.categories = _.isEmpty(this.categories) ? InsuranceService.fetchCategories() : this.categories
        let categoriesTitle = _.map(this.categories, (category) => category.title)
        categoriesTitle = _.isEmpty(categoriesTitle) ? ['No categories'] : categoriesTitle

        Picker.init({
            pickerData: categoriesTitle,
            selectedValue: [this.state.category],
            pickerTitleText: 'Select category',
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            onPickerConfirm: (pickedValue, pickedIndex) => {
                if(!_.isEmpty(this.categories)) {
                    this.setState({category: _.first(_.toArray(pickedValue)), categoryIndex: _.first(_.toArray(pickedIndex))})
                }
            }
        })
        Picker.show()
    }

    onFocus = () => {
        Picker.hide()
    }

    onDone = () => {
        Keyboard.dismiss()
        

        //error validation
        let errors = ''
        
        errors += (!this.isValid('title') ? 'Enter insurance title\n' : '')
        errors += (!this.isValid('premium') ? 'Enter positive premium amount\n' : '')
        
        if(errors != '') {
            return Alert.alert('Error', 'Please fix form errors: \n\n'+errors)
        }

        //save in database

        realm.instance.write(() => {
            const category = this.categories[this.state.categoryIndex]
            realm.instance.create('insurance', {id: this.randomId(), title: this.state.title, premium_yearly: _.toNumber(this.state.premium), category:category }, true)
        })

        this.resetForm()

        this.props.insurancePagination.startFetchingResults()
    }

    randomId = () => {
        return _.toString(moment().unix()+'_'+_.random(0, 100000))
    }

    isValid = (key) => {
        switch (key) {
        case 'title': return validator.isLength(_.toString(this.state.title), {min: 1})
        case 'premium': return validator.isFloat(_.toString(this.state.premium), {min: 1})
        default: return false;
        }
    }

    resetForm = () => {
        this.setState({
            title: '',
            premium: null,
            category: null,
            categoryIndex: -1
        })
    }


    render() {
        const categoryTitle = !_.isNil(this.state.category) ? 'Selected: '+this.state.category : 'Select category'


        return <View style={styles.containerMain}>
            <View style={styles.formContainer}>
                <KeyboardAwareScrollView style={styles.container} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} keyboardOpeningTime={0} extraScrollHeight={-100} enableOnAndroid>
                    <View style={styles.formContainerContainer}>
                        <View style={styles.formBlock}>
                            <FormLabel labelStyle={styles.formLabel}>title</FormLabel>
                            <View style={styles.formRow}>
                                <Icon containerStyle={styles.formIcon} color={globalVariables.black} type='font-awesome' name='id-badge' size={15} />
                                <FormInput 
                                    onFocus={this.onFocus}
                                    onSubmitEditing={() => this.onDone() }
                                    placeholder='your premium title' 
                                    value={this.state.title}
                                    onChangeText={(text) => { this.setState({title: text}) }}
                                    autoCorrect={false} autoCapitalize='none' containerStyle={styles.formInput} inputStyle={styles.formInputTitle} returnKeyType='done' keyboardType='email-address' underlineColorAndroid='transparent'/>
                            </View>
                        </View>
                        <View style={styles.formBlock}>
                            <FormLabel labelStyle={styles.formLabel}>yearly premium (in chf)</FormLabel>
                            <View style={styles.formRowPremium}>
                                <Icon containerStyle={styles.formIcon} color={globalVariables.black} type='font-awesome' name='usd' size={15} />
                                <FormInput 
                                    onFocus={this.onFocus}
                                    onSubmitEditing={() => this.onDone() }
                                    placeholder='0' 
                                    value={this.state.premium}
                                    onChangeText={(text) => { this.setState({premium: text}) }}
                                    autoCorrect={false} autoCapitalize='none' containerStyle={styles.formInputPremium} inputStyle={styles.formInputPremiumTitle} returnKeyType='done' keyboardType='numeric' underlineColorAndroid='transparent'/>
                            </View>
                        </View>
                        <View style={styles.formBlock}>
                            <FormLabel labelStyle={styles.formLabel}>category</FormLabel>
                            <View style={[styles.formRowCategory]}>
                                <Icon containerStyle={styles.formIcon} color={globalVariables.black} type='font-awesome' name='list' size={15} />
                                <PremiumCategoryButton title={categoryTitle} onPress={this.onSelectCategory}/>
                            </View>
                        </View>
                        <Button borderRadius={4} icon={{name: 'check', type: 'font-awesome'}} buttonStyle={styles.formButton} backgroundColor={globalVariables.background} onPress={this.onDone} title='Add premium' />
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.containerImage}>
                    <Image pointerEvents="none" style={styles.mainImage} resizeMode="cover" source={require('../images/front_image2.png')}/>
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerMain: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    formContainer: {
        height: height/2.8+150,
        minHeight: 380,
    },
    formContainerContainer: {
        flex: 1, flexDirection: 'column', justifyContent: 'flex-end'
    },
    formBlock: {
        backgroundColor: globalVariables.transparent, marginLeft: 15, marginRight: 15, marginBottom: 0, paddingBottom: 0
    },
    formLabel: {
        color: globalVariables.black, marginLeft: 10
    },
    formInput: {
        flex: 1, borderBottomWidth: 0, height: 36, justifyContent: 'center'
    },
    formInputTitle: {
        color:globalVariables.white
    },
    formRow: {
        flexDirection: 'row', height: 36
    },
    formInputPremium: {
        height: 60, borderBottomWidth: 0, height: 36, justifyContent: 'center'
    },
    formRowPremium: {
        flexDirection: 'row', height: 60, alignItems: 'center'
    },
    formRowCategory: {
        flexDirection: 'row', height: 36, marginBottom: 10
    },
    formInputPremiumTitle: {
        width: width-100 ,color:globalVariables.white, fontSize: 35, height: 60, textAlign: 'right'
    },
    formIcon: {
        paddingLeft: 10, paddingTop: 0, margin: 0, width: 33,
    },
    formButton: {
        marginTop: 0,
        marginBottom: 0
    },
    mainImage: {
        height: 90,
        width: 110
    },
    containerImage: {
        alignItems: 'flex-end'
    }
})


export default AddScreen