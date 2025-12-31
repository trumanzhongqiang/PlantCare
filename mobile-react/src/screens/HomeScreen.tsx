import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_PLANTS, Plant } from '../data/mock';
import { GlossyCard } from '../components/GlossyCard';
import { COLORS, SPACING } from '../theme';
import { Plus, Droplets, Sun, LayoutGrid, List, Bell } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const HomeScreen = ({ navigation }: any) => {
    const [isGridLayout, setIsGridLayout] = useState(false);

    // Grid View Render
    const renderGridItem = ({ item }: { item: Plant }) => (
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
                        <View style={[styles.statusDot, { backgroundColor: item.status === 'Happy' ? COLORS.status.good : COLORS.status.warning }]} />
                        <Text style={styles.gridStatusText}>{item.status}</Text>
                    </View>
                </View>
            </GlossyCard>
        </TouchableOpacity>
    );

    // Stream (List) View Render
    const renderStreamItem = ({ item }: { item: Plant }) => (
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
                            <View style={styles.tag}>
                                <Droplets size={12} color="white" />
                                <Text style={styles.tagText}>{item.waterLevel}%</Text>
                            </View>
                            <View style={[styles.tag, { marginLeft: 8 }]}>
                                <Text style={styles.tagText}>{item.status}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </GlossyCard>
        </TouchableOpacity>
    );

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
                    <View>
                        <Text style={styles.greeting}>Good Morning,</Text>
                        <Text style={styles.title}>Truman</Text>
                    </View>

                    <View style={styles.headerActions}>
                        {/* Notification Bell */}
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => {
                                const needyPlant = MOCK_PLANTS.find(p => p.status === 'Thirsty' || p.status === 'Sad');
                                if (needyPlant) navigation.navigate('PlantDetail', { plant: needyPlant });
                            }}
                        >
                            <Bell size={24} color="white" />
                            <View style={styles.redDot} />
                        </TouchableOpacity>

                        {/* Layout Toggle */}
                        <TouchableOpacity
                            style={[styles.iconBtn, { marginLeft: 12 }]}
                            onPress={() => setIsGridLayout(prev => !prev)}
                        >
                            {isGridLayout ?
                                <List size={24} color="white" /> :
                                <LayoutGrid size={24} color="white" />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Plant List/Grid */}
                <FlatList
                    key={isGridLayout ? 'grid' : 'list'} // Force re-render on toggle
                    data={MOCK_PLANTS}
                    renderItem={isGridLayout ? renderGridItem : renderStreamItem}
                    keyExtractor={item => item.id}
                    numColumns={isGridLayout ? 2 : 1}
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={isGridLayout ? styles.columnWrapper : undefined}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <Text style={styles.sectionTitle}>
                            {isGridLayout ? 'All Roommates' : 'Your Green Feed'}
                        </Text>
                    }
                />

                {/* Floating Add Button - Bottom Right */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.navigate('AddPlant')}
                >
                    <LinearGradient
                        colors={[COLORS.teal.light, COLORS.teal.primary]}
                        style={styles.fabGradient}
                    >
                        <Plus color="white" size={32} />
                    </LinearGradient>
                </TouchableOpacity>
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
            } as any, // Cast to any to avoid TS error for web-only prop
            default: {}
        }),
    },
    redDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#FF5252',
        borderWidth: 2,
        borderColor: COLORS.teal.primary,
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

    // Stream (List) Styles
    streamContainer: {
        marginBottom: SPACING.l,
    },
    streamCard: {
        padding: 0,
        borderRadius: 24,
        overflow: 'hidden',
        height: undefined,
        aspectRatio: 3 / 4, // Optimized layout
    },
    streamImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    streamGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '40%',
        justifyContent: 'flex-end',
        padding: SPACING.l,
    },
    streamContent: {
        marginBottom: SPACING.s,
    },
    streamHeader: {
        marginBottom: 8,
    },
    streamName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    streamSpecies: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        fontStyle: 'italic',
    },
    streamStats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    tagText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },

    // Grid Styles
    gridCardContainer: {
        width: (width - SPACING.m * 2 - SPACING.m) / 2, // 2 columns width
        marginBottom: SPACING.m,
    },
    gridCard: {
        padding: 0,
        borderRadius: 20,
        height: 220,
        overflow: 'hidden',
    },
    gridImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    gridContent: {
        padding: SPACING.s,
        justifyContent: 'center',
    },
    gridName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    gridStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    gridStatusText: {
        fontSize: 12,
        color: COLORS.text.secondary,
    },

    // FAB
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30, // Bottom Right
        shadowColor: COLORS.teal.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    fabGradient: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
