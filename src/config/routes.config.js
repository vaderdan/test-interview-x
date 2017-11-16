import MainScreen from '../controllers/MainScreen'
import MyInsuranceScreen from '../controllers/MyInsuranceScreen'
import ListInsuranceScreen from '../controllers/ListInsuranceScreen'


const React = require('react');
const { Component } = React;

import hocStopComponent from '../hocs/hocStopComponent'
import hocPropsComponent from '../hocs/hocPropsComponent'

let routes = {
    MainScreen: { screen: hocStopComponent(hocPropsComponent(MainScreen)) },
    MyInsuranceScreen: { screen: hocStopComponent(hocPropsComponent(MyInsuranceScreen)) },
    ListInsuranceScreen: { screen: hocStopComponent(hocPropsComponent(ListInsuranceScreen)) },
}

export default routes