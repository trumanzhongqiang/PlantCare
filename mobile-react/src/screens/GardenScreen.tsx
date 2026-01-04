import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_PLANTS, Plant } from '../data/mock';
import { GlossyCard } from '../components/GlossyCard';
import { COLORS, SPACING } from '../theme';
import { Plus, LayoutGrid, List, Droplets, Thermometer, Sun, ArrowLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Status Map for new Actionable Logic
const STATUS_CONFIG: Record<string, { emoji: string, color: string, actionLabel: string, icon: any }> = {
    'Happy': { emoji: '🌿', color: COLORS.status.good, actionLabel: '', icon: null },
    'Thirsty': { emoji: '🥺', color: COLORS.status.warning, actionLabel: 'Water', icon: Droplets },
    'Sick': { emoji: '🤒', color: COLORS.status.critical, actionLabel: 'Diagnose', icon: Thermometer },
    'Hungry': { emoji: '🥣', color: '#FFB74D', actionLabel: 'Fertilize', icon: Sparkles },
    'Cold': { emoji: '🥶', color: '#4FC3F7', actionLabel: 'Warm Up', icon: Thermometer },
    'Hot': { emoji: '🥵', color: '#FF8A65', actionLabel: 'Cool Down', icon: Sun },
    'Dark': { emoji: '🌑', color: '#90A4AE', actionLabel: 'More Light', icon: Sun },
};

import { Sparkles } from 'lucide-react-native';

export const GardenScreen = ({ navigation }: any) => {
    const [isGridLayout, setIsGridLayout] = useState(false);
    const [plants, setPlants] = useState(MOCK_PLANTS);

    // Grid View Render
    const renderGridItem = ({ item }: { item: Plant }) => {
        const statusConfig = STATUS_CONFIG[item.status] || STATUS_CONFIG['Happy'];

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={styles.gridCardContainer}
                onPress={() => navigation.navigate('PlantDetail', { plant: item })}
            >
                <GlossyCard style={styles.gridCard}>
                    <Image source={{ uri: item.image }} style={styles.gridImage} />
                    <View style={styles.gridContent}>
                        <Text style={styles.gridName} numberOfLines={1}>{item.name}</Text>
                        <View style={styles.gridStatus}>
                            <Text style={styles.emoji}>{statusConfig.emoji}</Text>
                            <Text style={[styles.gridStatusText, { color: statusConfig.color }]}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                </GlossyCard>
            </TouchableOpacity>
        );
    };

    // Stream (List) View Render
    const renderStreamItem = ({ item }: { item: Plant }) => {
        const statusConfig = STATUS_CONFIG[item.status] || STATUS_CONFIG['Happy'];

        return (
            <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => navigation.navigate('PlantDetail', { plant: item })}
                style={styles.streamContainer}
            >
                <GlossyCard style={styles.streamCard}>
                    <Image source={{ uri: item.image }} style={styles.streamImage} />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
                        style={styles.streamGradient}
                    >
                        <View style={styles.streamContent}>
                            <View style={styles.streamHeader}>
                                <Text style={styles.streamName}>{item.name}</Text>
                                <Text style={styles.streamSpecies}>{item.species}</Text>
                            </View>
                            <View style={styles.streamStats}>
                                <View style={[styles.tag, { borderColor: statusConfig.color }]}>
                                    <Text style={{ marginRight: 4 }}>{statusConfig.emoji}</Text>
                                    <Text style={[styles.tagText, { color: statusConfig.color }]}>{item.status}</Text>
                                </View>
                                {statusConfig.actionLabel ? (
                                    <View style={[styles.actionBadge, { backgroundColor: statusConfig.color }]}>
                                        <Text style={styles.actionText}>Needs: {statusConfig.actionLabel}</Text>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    </LinearGradient>
                </GlossyCard>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[COLORS.teal.primary, '#E0F7FA', '#F0F4C3']}
                style={styles.background}
            />

            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {/* Back Button */}
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => navigation.goBack()}
                        >
                            <ArrowLeft size={24} color="white" />
                        </TouchableOpacity>

                        <View style={{ marginLeft: 12 }}>
                            <Text style={styles.greeting}>Truman's</Text>
                            <Text style={styles.title}>Garden</Text>
                        </View>
                    </View>

                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={[styles.iconBtn, { marginLeft: 12 }]}
                            onPress={() => setIsGridLayout(prev => !prev)}
                        >
                            {isGridLayout ?
                                <List size={24} color="white" /> :
                                <LayoutGrid size={24} color="white" />
                            }
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.iconBtn, { marginLeft: 12, backgroundColor: 'rgba(255,255,255,0.3)' }]}
                            onPress={() => navigation.navigate('AddPlant')}
                        >
                            <Plus size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Plant List/Grid */}
                <FlatList
                    key={isGridLayout ? 'grid' : 'list'}
                    data={plants}
                    renderItem={isGridLayout ? renderGridItem : renderStreamItem}
                    keyExtractor={item => item.id}
                    numColumns={isGridLayout ? 2 : 1}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={isGridLayout ? styles.columnWrapper : undefined}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <Text style={styles.sectionTitle}>
                            My Collection
                        </Text>
                    }
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        paddingTop: SPACING.m,
        paddingBottom: SPACING.l,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.white,
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            web: {
                backdropFilter: 'blur(10px)',
            } as any,
            default: {}
        }),
    },
    listContent: {
        paddingHorizontal: SPACING.m,
        paddingBottom: 100,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.teal.dark,
        marginBottom: SPACING.m,
        marginLeft: SPACING.xs,
        opacity: 0.8,
    },
    // Stream layout styles
    streamContainer: { marginBottom: SPACING.l },
    streamCard: { padding: 0, borderRadius: 24, overflow: 'hidden', height: undefined, aspectRatio: 3 / 4 },
    streamImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    streamGradient: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', justifyContent: 'flex-end', padding: SPACING.l },
    streamContent: { marginBottom: SPACING.s },
    streamHeader: { marginBottom: 8 },
    streamName: { fontSize: 28, fontWeight: 'bold', color: 'white', textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
    streamSpecies: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' },
    streamStats: { flexDirection: 'row', alignItems: 'center' },
    tag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
    tagText: { color: 'white', fontSize: 12, fontWeight: '600' },
    actionBadge: { marginLeft: 8, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    actionText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
    // Grid layout styles
    gridCardContainer: { width: (width - SPACING.m * 2 - SPACING.m) / 2, marginBottom: SPACING.m },
    gridCard: { padding: 0, borderRadius: 20, height: 220, overflow: 'hidden' },
    gridImage: { width: '100%', height: 150, resizeMode: 'cover' },
    gridContent: { padding: SPACING.s, justifyContent: 'center' },
    gridName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text.primary, marginBottom: 4 },
    gridStatus: { flexDirection: 'row', alignItems: 'center' },
    emoji: { fontSize: 14, marginRight: 4 },
    gridStatusText: { fontSize: 12, fontWeight: '600' },
});
