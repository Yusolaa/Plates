import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet,
} from "react-native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const SWIPE_THRESHOLD = -100;

interface Step {
  id: number;
  title: string;
  description: string;
  bgColor: string;
}

const initialSteps: Step[] = [
  {
    id: 1,
    title: "Point Camera",
    description: "Aim camera at the license plate",
    bgColor: "#e0301e",
  },
  {
    id: 2,
    title: "Auto Recognition",
    description: "Read the plate number instantly",
    bgColor: "#8c9e75",
  },
  {
    id: 3,
    title: "Save & Manage",
    description: "Access history anytime",
    bgColor: "#8c9e75",
  },
];

export default function StackCards() {
  const [cards, setCards] = useState<Step[]>(initialSteps);
  const position = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        // Only allow upward movement
        if (gesture.dy < 0) {
          position.setValue({ x: 0, y: gesture.dy });

          // Gradually fade and scale down as card moves up
          const progress = Math.min(Math.abs(gesture.dy) / 200, 1);
          opacity.setValue(1 - progress * 0.5);
          scale.setValue(1 - progress * 0.2);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        // Swipe up (move card to back)
        if (gesture.dy < SWIPE_THRESHOLD) {
          // Animate card going up and behind
          Animated.parallel([
            Animated.timing(position, {
              toValue: { x: 0, y: -SCREEN_HEIGHT },
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(scale, {
              toValue: 0.8,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start(() => {
            // Move first card to the back of the array
            setCards((prevCards) => {
              const newCards = [...prevCards];
              const firstCard = newCards.shift()!;
              newCards.push(firstCard);
              return newCards;
            });

            // Reset animation values
            position.setValue({ x: 0, y: 0 });
            opacity.setValue(1);
            scale.setValue(1);
          });
        }
        // Reset position if swipe wasn't far enough
        else {
          Animated.parallel([
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
              friction: 8,
            }),
            Animated.spring(opacity, {
              toValue: 1,
              useNativeDriver: false,
              friction: 8,
            }),
            Animated.spring(scale, {
              toValue: 1,
              useNativeDriver: false,
              friction: 8,
            }),
          ]).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {/* Card Stack Container */}
      <View style={styles.cardContainer}>
        {cards.map((step, index) => {
          const isActive = index === 0;

          // Calculate stacking effect
          const offset = index * 12;
          const cardScale = 1 - index * 0.05;
          const cardOpacity = 1 - index * 0.2;

          // Active card (top card with gestures)
          if (isActive) {
            return (
              <Animated.View
                key={`${step.id}-${index}`}
                {...panResponder.panHandlers}
                style={[
                  styles.card,
                  {
                    transform: [{ translateY: position.y }, { scale: scale }],
                    opacity: opacity,
                    zIndex: cards.length - index,
                  },
                ]}
              >
                <View className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                  <View className="flex-row items-start">
                    <View
                      className="w-12 h-12 rounded-bl-2xl rounded-tr-2xl items-center justify-center mr-4"
                      style={{ backgroundColor: step.bgColor }}
                    >
                      <Text className="text-white font-bold text-lg">
                        {step.id}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="font-alan-medium text-xl text-gray-900 mb-2">
                        {step.title}
                      </Text>
                      <Text className="font-suse text-base text-gray-600">
                        {step.description}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.bottomIndicator} />
              </Animated.View>
            );
          }

          // Background stacked cards (static, behind the active card)
          if (index <= 2) {
            return (
              <View
                key={`${step.id}-${index}`}
                style={[
                  styles.card,
                  {
                    transform: [{ translateY: offset }, { scale: cardScale }],
                    opacity: cardOpacity,
                    zIndex: cards.length - index,
                  },
                ]}
              >
                <View className="bg-white p-6 rounded-2xl border border-gray-200">
                  <View className="flex-row items-start">
                    <View
                      className="w-12 h-12 rounded-bl-2xl rounded-tr-2xl items-center justify-center mr-4"
                      style={{ backgroundColor: step.bgColor }}
                    >
                      <Text className="text-white font-bold text-lg">
                        {step.id}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="font-alan-medium text-xl text-gray-900 mb-2">
                        {step.title}
                      </Text>
                      <Text className="font-suse text-base text-gray-600">
                        {step.description}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.bottomIndicator} />
              </View>
            );
          }

          return null;
        })}
      </View>

      <Text className="text-center text-sm text-gray-500 mt-6">
        Swipe up to see next step
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  cardContainer: {
    height: 220,
    position: "relative",
    paddingHorizontal: 24,
  },
  card: {
    position: "absolute",
    width: SCREEN_WIDTH - 48,
    left: 0,
  },
  bottomIndicator: {
    position: "absolute",
    bottom: -8,
    left: 24,
    right: 24,
    height: 8,
    backgroundColor: "#FCD34D",
    borderRadius: 4,
  },
});
