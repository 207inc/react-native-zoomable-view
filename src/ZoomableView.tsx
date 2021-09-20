import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  PanGestureHandlerGestureEvent,
  RotationGestureHandler,
  RotationGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

type ZoomableViewProps = {};

export const ZoomableView: React.FC<ZoomableViewProps> = ({ children }) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const transitionX = useSharedValue(0);
  const transitionY = useSharedValue(0);
  const { width } = useWindowDimensions();

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
    });

  const roteteHandler =
    useAnimatedGestureHandler<RotationGestureHandlerGestureEvent>({
      onActive: (event) => {
        rotate.value = event.rotation * 180;
      },
    });

  const panHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      transitionX.value = -event.translationX;
      transitionY.value = -event.translationY;
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: focalX.value },
      { translateY: focalY.value },
      { translateX: -100 },
      { translateY: -100 },
      { scale: scale.value },
      { translateX: -focalX.value },
      { translateY: -focalY.value },
      { translateX: 100 },
      { translateY: 100 },
      { rotate: `${rotate.value}deg` },
      { translateX: -transitionX.value },
      { translateY: -transitionY.value },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
      <Animated.View>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.View style={{ width }}>
            <RotationGestureHandler onGestureEvent={roteteHandler}>
              <Animated.View
                style={[styles.container, rStyle]}
                collapsable={false}
              >
                {children}
              </Animated.View>
            </RotationGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};
