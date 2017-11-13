import MainScreen from '../controllers/MainScreen'


const React = require('react');
const { Component } = React;

import hocStopComponent from '../hocs/hocStopComponent'
import hocPropsComponent from '../hocs/hocPropsComponent'

let routes = {
    MainScreen: { screen: hocStopComponent(hocPropsComponent(MainScreen)) }
}

export default routes