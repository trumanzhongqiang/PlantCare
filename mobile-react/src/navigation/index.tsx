import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatScreen } from '../screens/ChatScreen';
import { GardenScreen } from '../screens/GardenScreen';
import { PlantDetailScreen } from '../screens/PlantDetailScreen';
import { AddPlantScreen } from '../screens/AddPlantScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Chat"
                screenOptions={{
                    headerShown: false,
                    presentation: 'card',
                }}
            >
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Garden" component={GardenScreen} />
                <Stack.Screen name="PlantDetail" component={PlantDetailScreen} />
                <Stack.Screen
                    name="AddPlant"
                    component={AddPlantScreen}
                    options={{ presentation: 'modal' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
