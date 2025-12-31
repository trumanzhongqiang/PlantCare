import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

interface BackgroundEffectProps {
    status: string;
}

export const BackgroundEffect = ({ status }: BackgroundEffectProps) => {
    let animationSource = null;
    // Use remote URIs for MVP to avoid local asset resolution issues
    const SUN_ANIMATION = 'https://lottie.host/56a2f300-3330-466d-9104-644788390b39/H3zPz5sJ4F.json';
    const RAIN_ANIMATION = 'https://lottie.host/98c50587-09ba-4700-911a-500b6cd68685/u6Z8gQ8g0J.json';

    // Select animation based on status
    switch (status) {
        case 'Happy':
        case 'Bright':
            // Sun/Sunny animation
            animationSource = { uri: SUN_ANIMATION };
            break;

        case 'Thirsty':
        case 'Sad':
            // Water/Rain for thirsty/sad/sick
            animationSource = { uri: RAIN_ANIMATION };
            break;

        case 'Sick':
            animationSource = { uri: RAIN_ANIMATION };
            break;

        default:
            return null;
    }

    if (!animationSource) return null;

    return (
        <View style={styles.container} pointerEvents="none">
            <LottieView
                source={animationSource}
                autoPlay
                loop
                style={styles.animation}
                resizeMode="cover"
                speed={0.8}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0, // Behind content
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.3, // Subtle effect
    },
    animation: {
        width: width,
        height: height,
    },
});
