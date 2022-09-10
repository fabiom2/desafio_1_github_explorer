import React, { useEffect } from "react";
import { useWindowDimensions, ViewProps } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AnimationContainer } from "./styles";

interface CardAnimationProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAnimation({ children, ...rest }: CardAnimationProps) {
  const { width: displayWidth } = useWindowDimensions();
  const cardOpacity = useSharedValue(0);
  const cardOffset = useSharedValue(0.25 * displayWidth);
  const DURATION_ONE_THOUSAND_MS = 1000;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
      transform: [{ translateX: cardOffset.value }],
    };
  });

  useEffect(() => {
    cardOpacity.value = withTiming(
      1, {
      duration: DURATION_ONE_THOUSAND_MS,
    });
    cardOffset.value = withTiming(
      0, {
      duration: DURATION_ONE_THOUSAND_MS,
    });
  }, []);

  return (
    <AnimationContainer {...rest} style={animatedStyle}>
      {children}
    </AnimationContainer>
  );
}
