import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import Card from './Card';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  dot: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const ScrollCard = ({data}) => {
  const scrollX = new Animated.Value(0);
  if (data && data.length) {
    return (
      <View style={{flex: 1, marginTop: -160}}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'key' + index}
          vertical
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={(item) => {
            return <Card item={item.item} />;
          }}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false}
          )}
        />
      </View>
    );
  }
  return null;
};

export default ScrollCard;