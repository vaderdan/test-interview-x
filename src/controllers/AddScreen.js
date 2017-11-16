import _ from 'lodash'
import globalVariables from '../config/styles.config'
import { width, height } from '../config/dimensions.config'

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

import PremiumCategoryButton from '../views/PremiumCategoryButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements'
import Picker from 'react-native-picker'


class AddScreen extends React.Component {

    state = {
        title: '',
        premium: '',
        category: null
    }

    onSelectCategory = () => {
        Picker.init({
            pickerData: [1,2,3,4],
            selectedValue: [this.state.category],
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            onPickerConfirm: (pickedValue, pickedIndex) => {
                this.setState({category: _.first(pickedValue)})
            }
        })
        Picker.show()
    }

    onFocus = () => {
        Picker.hide()
    }

    onDone = () => {
        Keyboard.dismiss()
    }



    render() {
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
                                    blurOnSubmit={false} autoCorrect={false} autoCapitalize='none' containerStyle={styles.formInput} inputStyle={styles.formInputTitle} returnKeyType='done' keyboardType='email-address' 
                                    />
                            </View>
                        </View>
                        <View style={styles.formBlock}>
                            <FormLabel labelStyle={styles.formLabel}>yearly premium (in chf)</FormLabel>
                            <View style={[styles.formRow, {marginTop: 20, marginBottom: 20}]}>
                                <Icon containerStyle={[styles.formIcon, {marginTop: 10}]} color={globalVariables.black} type='font-awesome' name='usd' size={15} />
                                <FormInput 
                                    onFocus={this.onFocus}
                                    onSubmitEditing={() => this.onDone() }
                                    placeholder='0' 
                                    value={this.state.premium}
                                    onChangeText={(text) => { this.setState({premium: text}) }}
                                    blurOnSubmit={false} autoCorrect={false} autoCapitalize='none' containerStyle={styles.formInput} inputStyle={styles.formInputPremium} returnKeyType='done' keyboardType='decimal-pad' 
                                    />
                            </View>
                        </View>
                        <View style={styles.formBlock}>
                            <FormLabel labelStyle={styles.formLabel}>category</FormLabel>
                            <View style={[styles.formRow, {marginBottom: 20}]}>
                                <Icon containerStyle={styles.formIcon} color={globalVariables.black} type='font-awesome' name='list' size={15} />
                                <PremiumCategoryButton title={this.state.category || "Select category"} onPress={this.onSelectCategory}/>
                            </View>
                        </View>
                        <Button borderRadius={4} icon={{name: 'check', type: 'font-awesome'}} buttonStyle={styles.formButton} backgroundColor={globalVariables.background} onPress={this.loginAction} title='Add premium' />
                    </View>
                </KeyboardAwareScrollView>
                <View style={styles.containerImage}>
                    <Image pointerEvents="none" style={styles.mainImage} resizeMode="cover" source={require('../images/front_image2.png')}/>
                </View>
            </View>
        </View>
    }
}

var styles = StyleSheet.create({
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
        flex: 1, borderBottomWidth: 0, height: 36
    },
    formInputTitle: {
        color:globalVariables.white
    },
    formInputPremium: {
        width: width-100 ,color:globalVariables.white, fontSize: 40, textAlign: 'right'
    },
    formRow: {
        flexDirection: 'row', height: 30
    },
    formIcon: {
        paddingLeft: 10, paddingTop: 5, margin: 0, width: 33,
    },
    formButton: {
        marginBottom: 8
    },
    formOk: {
        margin: 0, marginRight: 10, marginTop: 10,  width: 20, height: 20, borderRadius: 10
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