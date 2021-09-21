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
  withSpring,
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
  const imagePinch = React.createRef();
  const imageRotation = React.createRef();
  const imagePan = React.createRef();

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = 1;
      },
    });

  const roteteHandler =
    useAnimatedGestureHandler<RotationGestureHandlerGestureEvent>({
      onActive: (event) => {
        rotate.value = event.rotation * 90;
      },
      onEnd: () => {
        rotate.value = withSpring(0);
      },
    });

  const panHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      transitionX.value = -event.translationX;
      transitionY.value = -event.translationY;
    },
    onEnd: () => {
      transitionX.value = withSpring(0);
      transitionY.value = withSpring(0);
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
    <PanGestureHandler
      simultaneousHandlers={[imagePinch, imageRotation]}
      onGestureEvent={panHandler}
      ref={imagePan}
    >
      <Animated.View>
        <PinchGestureHandler
          ref={imagePinch}
          simultaneousHandlers={[imagePan, imageRotation]}
          onGestureEvent={pinchHandler}
        >
          <Animated.View style={{ width }}>
            <RotationGestureHandler
              ref={imageRotation}
              simultaneousHandlers={[imagePan, imagePinch]}
              onGestureEvent={roteteHandler}
            >
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
