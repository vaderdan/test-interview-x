import MainScreen from '../controllers/MainScreen'
import MyInsuranceScreen from '../controllers/MyInsuranceScreen'
import ListInsuranceScreen from '../controllers/ListInsuranceScreen'
import AddScreen from '../controllers/AddScreen'
import DefaultScreen from '../controllers/DefaultScreen'
import StatsScreen from '../controllers/StatsScreen'


const React = require('react');
const { Component } = React;

import hocStopComponent from '../hocs/hocStopComponent'
import hocPropsComponent from '../hocs/hocPropsComponent'

let routes = {
    MainScreen: { screen: hocStopComponent(hocPropsComponent(MainScreen)) },
    MyInsuranceScreen: { screen: hocStopComponent(hocPropsComponent(MyInsuranceScreen)) },
    ListInsuranceScreen: { screen: hocStopComponent(hocPropsComponent(ListInsuranceScreen)) },
    AddScreen: { screen: hocStopComponent(hocPropsComponent(AddScreen)) },
    DefaultScreen: { screen: hocStopComponent(hocPropsComponent(DefaultScreen)) },
    StatsScreen: { screen: hocStopComponent(hocPropsComponent(StatsScreen)) },
}

export default routes