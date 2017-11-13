import _ from 'lodash'
import React from 'react';
import {
	View
} from 'react-native';

class LazyView extends React.PureComponent {

    state = {
        initialized: false
    }

    static defaultProps = {
        timeout: 0
    }

    componentDidMount() {
        if(this.props.timeout) {
            this.timeout = setTimeout(() => {
                if(this._mounted !== false){
                    this.setState({initialized: true})
                }
            }, this.props.timeout)
            return
        }

        (async () => {
            await this.nextFrame()

            if(this._mounted !== false){
                this.setState({initialized: true})
            }
        })()
    }

    nextFrame() {
        return new Promise(function(resolve, reject) {
            requestAnimationFrame(function() { resolve(); });
        })
    }

    componentWillUnmount() {
        this._mounted = false
        clearTimeout(this.timeout)
    }

	render() {
        if(!this.state.initialized){
            return <View {..._.omit(this.props, ['children'])}></View>
        }

        return <View {...this.props}>{this.props.children}</View>
	}
}

export default LazyView