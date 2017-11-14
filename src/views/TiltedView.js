import _ from 'lodash'

const React = require('react')
const {
    View,
    StyleSheet
} = require('react-native')

import { width } from '../config/dimensions.config'

class TiltedView extends React.Component {

    render() {
        var style_width = _.toPlainObject(this.props.style).width || width
        var style_height = _.toPlainObject(this.props.style).height || 20

        

        return <View pointerEvents="none"  style={{position: 'relative', width: style_width, height: style_height+20, overflow: 'hidden'}}>
            <View pointerEvents="none"  style={[styles.triangleCorner, this.props.style, {
                borderRightWidth: style_height,
                borderTopWidth: style_width,
                transform: [
                    {rotate: '90deg'},
                    {translateY: -style_width/2+style_height/2 },
                    {translateX: -style_width/2+style_height/2 }
                ]
            }]} />
        </View>
    }
}

var styles = StyleSheet.create({
    triangleCorner: {
        position: 'absolute',
        top: 0, 
        left: 0,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightColor: 'transparent',
        borderTopColor: 'red',


        shadowOffset:{  width: 8,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowRadius: 10,
    }
})


export default TiltedView