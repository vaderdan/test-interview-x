const React = require('react');
const {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AppState
} = require('react-native');
const { Component } = React;

import _ from 'lodash'





class AppStateHelper extends React.Component {
    constructor(props) {
		super(props)
	}

    static defaultProps = {
        becomeActive: () => { },
        becomeInactive: () => { }
    }

    state = {
        appState: AppState.currentState
	}

    //MARK: app state

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

        requestIdleCallback(() => this.props.becomeActive())
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            setTimeout(() => requestIdleCallback(() => this.props.becomeActive()), 300)
        }

        if (this.state.appState == 'active' && nextAppState.match(/inactive|background/)) {
            this.props.becomeInactive()
        }

        this.setState({appState: nextAppState});
    }

    render() {
        return null
    }
}

export default AppStateHelper