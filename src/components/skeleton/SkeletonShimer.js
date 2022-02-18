import React, {useEffect,createRef} from 'react'
import {View,Animated, Dimensions} from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
 
const {width, height} = Dimensions.get('window');

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const SkeletonShimer = ({visible}) => {
 
  // Handle animation
  const avatarRef = createRef()
  const firstLineRef = createRef()
  const secondLineRef = createRef()
 
  useEffect(() => {
    const facebookAnimated = Animated.stagger(
      400,
      [
        avatarRef.current.getAnimated(),
        Animated.parallel([
          firstLineRef.current.getAnimated(),
          secondLineRef.current.getAnimated(),
        ])
      ]
    );
    Animated.loop(facebookAnimated).start();
  }, [])
 
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <ShimmerPlaceholder
          ref={avatarRef}
          stopAutoRun
          visible={visible}
          height= {120}
          width= {width/3}
        />
        <View style={{ justifyContent: "flex-start",alignItems: 'center', flexDirection: "row" }}>
          <ShimmerPlaceholder
            ref={firstLineRef}
            stopAutoRun
            visible={visible}
            width= {width/20}
            height= {20}
            style={{borderRadius: 10}}
           ></ShimmerPlaceholder> 
          <ShimmerPlaceholder
            ref={secondLineRef}
            stopAutoRun
            visible={visible}
            height= {120}
            width= {width/1.8}
            style={{borderRadius: 20}}
          />
        </View>
      </View>
    </View>
  )
}

export default SkeletonShimer;