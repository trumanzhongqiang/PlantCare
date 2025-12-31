import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
    // Frutiger Aero Palette
    teal: {
        primary: '#008080',   // Traditional Core Teal
        light: '#40E0D0',     // Turquoise
        dark: '#006666',
        glass: 'rgba(0, 128, 128, 0.15)',
    },
    sky: {
        blue: '#87CEFA',
        light: '#E0F7FA',
    },
    white: '#FFFFFF',
    glass: {
        medium: 'rgba(255, 255, 255, 0.75)',
        strong: 'rgba(255, 255, 255, 0.90)',
        border: 'rgba(255, 255, 255, 0.5)',
    },
    text: {
        primary: '#1A3333',
        secondary: '#507575',
        light: '#F0F0F0',
    },
    status: {
        good: '#90EE90', // Light green
        warning: '#FFD700', // Gold
        bad: '#FF6B6B', // Soft red
    }
};

export const SPACING = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
};

export const CONSTANTS = {
    SCREEN_WIDTH: width,
    BORDER_RADIUS: {
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        round: 999,
    }
};
