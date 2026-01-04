import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Platform, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlossyCard } from '../components/GlossyCard';
import { COLORS, SPACING } from '../theme';
import { ArrowLeft, Droplets, Thermometer, Sun, Wind, CheckCircle } from 'lucide-react-native';
import { BackgroundEffect } from '../components/BackgroundEffect';

// Map status to action specs
const ACTION_MAP: Record<string, { label: string, icon: any, color: string, successMsg: string }> = {
    'Thirsty': { label: 'Water Plant', icon: Droplets, color: COLORS.teal.primary, successMsg: 'Thirst quenched! 💧' },
    'Sick': { label: 'Start Diagnosis', icon: Thermometer, color: COLORS.status.bad, successMsg: 'Diagnosis started...' },
    'Hungry': { label: 'Add Fertilizer', icon: Sparkles, color: '#FFB74D', successMsg: 'Yummy! 🥣' },
    'Cold': { label: 'Find Warmer Spot', icon: Thermometer, color: '#4FC3F7', successMsg: 'Warming up...' },
    'Hot': { label: 'Find Cooler Spot', icon: Sun, color: '#FF8A65', successMsg: 'Cooling down...' },
    'Dark': { label: 'Move to Light', icon: Sun, color: '#90A4AE', successMsg: 'Let there be light! ☀️' },
    'Happy': { label: 'All Good', icon: CheckCircle, color: COLORS.status.good, successMsg: 'Just chilling! 🌿' },
};

import { Sparkles } from 'lucide-react-native'; // Import locally

export const PlantDetailScreen = ({ route, navigation }: any) => {
    const { plant } = route.params;
    const [status, setStatus] = useState(plant.status);

    // Status Config
    const currentAction = ACTION_MAP[status] || ACTION_MAP['Happy'];
    const isHappy = status === 'Happy';

    const handleAction = () => {
        if (isHappy) return;

        Alert.alert(
            currentAction.label,
            `Do you want to ${currentAction.label.toLowerCase()}?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes, Done!",
                    onPress: () => {
                        // Optimistic Update
                        setStatus('Happy');
                        Alert.alert("Great Job!", currentAction.successMsg);
                        // In a real app, we would update the backend/store here
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Background Image & Overlay */}
            <View style={styles.bgContainer}>
                <Image source={{ uri: plant.image }} style={styles.bgImage} blurRadius={Platform.OS === 'ios' ? 20 : 10} />
                <LinearGradient
                    colors={['rgba(0,0,0,0.3)', COLORS.sky.light]}
                    style={styles.bgGradient}
                />
            </View>

            {/* Animation Effect */}
            <BackgroundEffect status={status} />

            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.screenTitle}>Plant Monitor</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>

                    {/* Main Status Appearance (The "Character") */}
                    <View style={styles.characterContainer}>
                        <View style={styles.imageRing}>
                            <Image source={{ uri: plant.image }} style={styles.mainImage} />
                            {/* Emoji Badge Overlay */}
                            <View style={styles.emojiBadge}>
                                <Text style={styles.emojiText}>
                                    {status === 'Happy' ? '🌿' :
                                        status === 'Thirsty' ? '🥺' :
                                            status === 'Sick' ? '🤒' :
                                                status === 'Hungry' ? '🥣' :
                                                    status === 'Cold' ? '🥶' :
                                                        status === 'Hot' ? '🥵' : '🌑'}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.plantName}>{plant.name}</Text>
                        <Text style={styles.plantSpecies}>{plant.species}</Text>
                    </View>

                    {/* Status Dashboard */}
                    <GlossyCard style={styles.statusCard}>
                        <View style={styles.statusHeader}>
                            <Text style={styles.statusLabel}>Current Mood</Text>
                            <Text style={[styles.statusValue, { color: currentAction.color }]}>{status}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.metricsRow}>
                            <View style={styles.metric}>
                                <Droplets size={20} color={COLORS.teal.primary} />
                                <Text style={styles.metricVal}>{plant.waterLevel}%</Text>
                                <Text style={styles.metricLabel}>Water</Text>
                            </View>
                            <View style={styles.metric}>
                                <Sun size={20} color="#FFB74D" />
                                <Text style={styles.metricVal}>High</Text>
                                <Text style={styles.metricLabel}>Light</Text>
                            </View>
                            <View style={styles.metric}>
                                <Thermometer size={20} color="#FF8A65" />
                                <Text style={styles.metricVal}>24°C</Text>
                                <Text style={styles.metricLabel}>Temp</Text>
                            </View>
                        </View>
                    </GlossyCard>

                    {/* Action Button */}
                    {!isHappy && (
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: currentAction.color }]}
                            onPress={handleAction}
                            activeOpacity={0.8}
                        >
                            <currentAction.icon color="white" size={24} style={{ marginRight: 8 }} />
                            <Text style={styles.actionBtnText}>{currentAction.label}</Text>
                        </TouchableOpacity>
                    )}

                    {/* Happy State Message */}
                    {isHappy && (
                        <View style={styles.happyState}>
                            <Text style={styles.happyText}>All systems normal! Next check in 2 days.</Text>
                        </View>
                    )}

                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.sky.light,
    },
    bgContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    bgGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.m,
        marginBottom: SPACING.l,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },
    content: {
        paddingHorizontal: SPACING.l,
        alignItems: 'center',
    },

    // Character Visuals
    characterContainer: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    imageRing: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.8)',
        padding: 4,
        marginBottom: SPACING.m,
        position: 'relative',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        resizeMode: 'cover',
    },
    emojiBadge: {
        position: 'absolute',
        bottom: 0,
        right: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    emojiText: {
        fontSize: 32,
    },
    plantName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    plantSpecies: {
        fontSize: 16,
        color: COLORS.text.secondary,
        fontStyle: 'italic',
    },

    // Status Card
    statusCard: {
        width: '100%',
        padding: SPACING.l,
        marginBottom: SPACING.xl,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    statusLabel: {
        fontSize: 14,
        color: COLORS.text.secondary,
        fontWeight: '600',
    },
    statusValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginBottom: SPACING.m,
    },
    metricsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metric: {
        alignItems: 'center',
    },
    metricVal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginTop: 4,
    },
    metricLabel: {
        fontSize: 12,
        color: COLORS.text.secondary,
    },

    // Action Button
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    actionBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // Happy State
    happyState: {
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: SPACING.m,
        borderRadius: 16,
    },
    happyText: {
        color: COLORS.teal.dark,
        fontWeight: '500',
    },
});
