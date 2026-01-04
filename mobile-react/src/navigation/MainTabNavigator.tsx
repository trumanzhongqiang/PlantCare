import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { ChatScreen } from '../screens/ChatScreen';
import { GardenScreen } from '../screens/GardenScreen';
import { Sprout, MessageCircleMore } from 'lucide-react-native';
import { COLORS } from '../theme';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: true,
                tabBarActiveTintColor: COLORS.teal.primary,
                tabBarInactiveTintColor: COLORS.text.secondary,
                tabBarLabelStyle: styles.tabLabel,
                tabBarBackground: () => (
                    Platform.OS === 'ios' ?
                        <BlurView tint="light" intensity={80} style={StyleSheet.absoluteFill} /> :
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.9)' }]} />
                ),
            }}
        >
            <Tab.Screen
                name="Ask"
                component={ChatScreen}
                options={{
                    tabBarLabel: 'Ask Flora',
                    tabBarIcon: ({ color, size }) => (
                        <MessageCircleMore color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Garden"
                component={GardenScreen}
                options={{
                    tabBarLabel: 'My Garden',
                    tabBarIcon: ({ color, size }) => (
                        <Sprout color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,
        height: 80, // Taller tab bar
        paddingBottom: 20,
        backgroundColor: 'transparent', // Handled by TabBackground
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '600',
    },
});
