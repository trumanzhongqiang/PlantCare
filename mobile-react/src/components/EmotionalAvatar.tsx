import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS } from '../theme';

interface EmotionalAvatarProps {
    image: string;
    status: 'Happy' | 'Thirsty' | 'Sad' | 'Sick' | string;
    size?: number;
}

export const EmotionalAvatar = ({ image, status, size = 100 }: EmotionalAvatarProps) => {
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    // Determine colors based on status
    const getStatusColor = () => {
        switch (status) {
            case 'Happy': return 'rgba(144, 238, 144, 0.6)'; // Green
            case 'Thirsty': return 'rgba(33, 150, 243, 0.6)'; // Blue
            case 'Sad': return 'rgba(120, 144, 156, 0.6)'; // Grey-Blue
            case 'Sick': return 'rgba(239, 83, 80, 0.6)'; // Red
            default: return 'rgba(255, 255, 255, 0.5)';
        }
    };

    useEffect(() => {
        // Pulse Animation
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.15,
                    duration: 1500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
            ])
        );

        // Rotate Animation for "Active" feeling (very subtle)
        const rotate = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true,
                easing: Easing.linear
            })
        );

        pulse.start();
        rotate.start();

        return () => {
            pulse.stop();
            rotate.stop();
        };
    }, [status]);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <View style={[styles.container, { width: size + 20, height: size + 20 }]}>
            {/* Outer Glow (Pulsing) */}
            <Animated.View
                style={[
                    styles.glow,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: getStatusColor(),
                        transform: [{ scale: pulseAnim }],
                        opacity: 0.6
                    },
                ]}
            />

            {/* Inner Rotating Ring */}
            <Animated.View
                style={[
                    styles.ring,
                    {
                        width: size + 10,
                        height: size + 10,
                        borderRadius: (size + 10) / 2,
                        borderColor: getStatusColor(),
                        transform: [{ rotate: spin }]
                    }
                ]}
            />

            {/* Main Avatar */}
            <Image
                source={{ uri: image }}
                style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
            />

            {/* Status Icon Overlay */}
            <View style={[styles.statusDot, { backgroundColor: status === 'Happy' ? COLORS.status.good : COLORS.status.warning, borderColor: COLORS.sky.light }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    glow: {
        position: 'absolute',
    },
    ring: {
        position: 'absolute',
        borderWidth: 2,
        borderStyle: 'dashed',
        opacity: 0.5,
    },
    image: {
        borderWidth: 4,
        borderColor: COLORS.sky.light,
    },
    statusDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 3,
        position: 'absolute',
        bottom: 5,
        right: 5,
    }
});
