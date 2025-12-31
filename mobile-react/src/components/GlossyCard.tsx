import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, CONSTANTS, SPACING } from '../theme';

interface GlossyCardProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    variant?: 'light' | 'teal';
}

export const GlossyCard: React.FC<GlossyCardProps> = ({ children, style, variant = 'light' }) => {
    const gradientColors = variant === 'light'
        ? ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.6)']
        : ['rgba(0,128,128,0.8)', 'rgba(64,224,208,0.6)'];

    const borderColor = variant === 'light' ? COLORS.glass.border : 'rgba(255,255,255,0.3)';

    return (
        <View style={[styles.container, style]}>
            <LinearGradient
                colors={gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={[styles.content, { borderColor }]}>
                    {children}
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: CONSTANTS.BORDER_RADIUS.l,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    gradient: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: SPACING.m,
        borderWidth: 1,
        borderRadius: CONSTANTS.BORDER_RADIUS.l,
        width: '100%',
    }
});
