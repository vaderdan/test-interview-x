import _ from 'lodash'
import globalVariables from '../config/styles.config'

const React = require('react')
const {
    View,
    StyleSheet,
    Animated
} = require('react-native')

import { width } from '../config/dimensions.config'

class TiltedView extends React.Component {

    static propTypes = {
        style: View.propTypes.style
    }

    render() {
        const style_width = _.toPlainObject(this.props.style).width || width
        const style_height = _.toPlainObject(this.props.style).height || 20

        

        return <View pointerEvents="none"  style={[styles.container, {width: style_width, height: style_height+20}]}>
            <Animated.View pointerEvents="none"  style={[styles.triangleCorner, this.props.style, {
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

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        overflow: 'hidden'
    },
    triangleCorner: {
        position: 'absolute',
        top: 0, 
        left: 0,
        width: 0,
        height: 0,
        backgroundColor: globalVariables.transparent,
        borderStyle: 'solid',
        borderRightColor: globalVariables.transparent,
        shadowOffset:{  width: 8,  height: 0,  },
        shadowColor: globalVariables.black,
        shadowOpacity: 1.0,
        shadowRadius: 10,
    }
})


export default TiltedView