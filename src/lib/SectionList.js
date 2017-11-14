import React from 'react';
import { 
  SectionList,
  Platform
} from 'react-native';


class SectionListOptimized extends SectionList {
    static defaultProps = _.extend(FlatList.defaultProps, {
        pageSize: 14,
        initialNumToRender: 1,
        onEndReachedThreshold: 5,
        windowSize: 14,
        viewabilityConfig: { minimumViewTime: 0, viewAreaCoveragePercentThreshold: 200, waitForInteraction: false },
        removeClippedSubviews: Platform.OS == 'android'
    })
}

export default SectionListOptimized