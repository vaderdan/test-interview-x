import React from 'react';
import { 
  SectionList,
  Platform
} from 'react-native';


class SectionListOptimized extends React.Component  {
    static defaultProps = {
        listref: () => {},
        listkey: 0
    }

    render() {
        return <SectionList
                pageSize={14}
                initialNumToRender={1}
                onEndReachedThreshold={5}
                windowSize={14}
                viewabilityConfig={{ minimumViewTime: 0, viewAreaCoveragePercentThreshold: 200, waitForInteraction: false }}
                removeClippedSubviews={Platform.OS == 'android'}
                ref={this.props.listref}
                key={this.props.listkey}
                {...this.props}
                /> 
    }
}

export default SectionListOptimized