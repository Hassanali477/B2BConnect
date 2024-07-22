import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, StyleSheet, Animated, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const CustomScrollView = ({children, style, horizontal}) => {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const [contentSize, setContentSize] = useState({height: 0, width: 0});
  const [scrollViewSize, setScrollViewSize] = useState({
    height: height * 0.4,
    width: width * 0.9,
  });

  useEffect(() => {
    scrollValue.addListener(({value}) => {
      if (horizontal) {
        if (contentSize.width > scrollViewSize.width) {
          const scrollIndicatorPosition =
            (value / contentSize.width) * scrollViewSize.width;
          scrollIndicatorTranslate.setValue(scrollIndicatorPosition);
        }
      } else {
        if (contentSize.height > scrollViewSize.height) {
          const scrollIndicatorPosition =
            (value / contentSize.height) * scrollViewSize.height;
          scrollIndicatorTranslate.setValue(scrollIndicatorPosition);
        }
      }
    });

    return () => {
      scrollValue.removeAllListeners();
    };
  }, [contentSize, scrollViewSize, horizontal]);

  const scrollIndicatorTranslate = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={horizontal}
        onContentSizeChange={(contentWidth, contentHeight) =>
          setContentSize({width: contentWidth, height: contentHeight})
        }
        onLayout={event =>
          setScrollViewSize({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          })
        }
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: horizontal ? {x: scrollValue} : {y: scrollValue},
              },
            },
          ],
          {useNativeDriver: false},
        )}
        style={[styles.scrollView, style]}>
        {children}
      </ScrollView>
      {horizontal
        ? contentSize.width > scrollViewSize.width && (
            <View style={styles.horizontalScrollIndicatorContainer}>
              <Animated.View
                style={[
                  styles.scrollIndicator,
                  styles.horizontalScrollIndicator,
                  {transform: [{translateX: scrollIndicatorTranslate}]},
                ]}
              />
            </View>
          )
        : contentSize.height > scrollViewSize.height && (
            <View style={styles.verticalScrollIndicatorContainer}>
              <Animated.View
                style={[
                  styles.scrollIndicator,
                  styles.verticalScrollIndicator,
                  {transform: [{translateY: scrollIndicatorTranslate}]},
                ]}
              />
            </View>
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  verticalScrollIndicatorContainer: {
    position: 'absolute',
    right: 2,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  horizontalScrollIndicatorContainer: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  scrollIndicator: {
    backgroundColor: 'blue',
    borderRadius: 2,
  },
  verticalScrollIndicator: {
    width: 4,
  },
  horizontalScrollIndicator: {
    height: 4,
  },
});

export default CustomScrollView;
