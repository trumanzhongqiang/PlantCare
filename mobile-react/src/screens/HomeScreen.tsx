import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_PLANTS, Plant } from '../data/mock';
import { GlossyCard } from '../components/GlossyCard';
import { COLORS, CONSTANTS, SPACING } from '../theme';
import { Droplets, Sun, Heart } from 'lucide-react-native';

export const HomeScreen = ({ navigation }: any) => {
    const renderPlantItem = ({ item }: { item: Plant }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('PlantDetail', { plant: item })}
        >
            <GlossyCard style={styles.card}>
                <View style={styles.cardContent}>
                    <Image source={{ uri: item.image }} style={styles.plantImage} />

                    <View style={styles.plantInfo}>
                        <View style={styles.headerRow}>
                            <Text style={styles.plantName}>{item.name}</Text>
                            <View style={[styles.statusBadge, { backgroundColor: item.status === 'Happy' ? COLORS.status.good : COLORS.status.warning }]}>
                                <Text style={styles.statusText}>{item.status}</Text>
                            </View>
                        </View>

                        <Text style={styles.plantSpecies}>{item.species}</Text>

                        <View style={styles.statsRow}>
                            <View style={styles.stat}>
                                <Droplets size={16} color={COLORS.teal.dark} />
                                <Text style={styles.statText}>{item.waterLevel}%</Text>
                            </View>
                            <View style={styles.stat}>
                                <Sun size={16} color={COLORS.teal.dark} />
                                <Text style={styles.statText}>Bright</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </GlossyCard>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[COLORS.teal.primary, COLORS.sky.light]} // Frutiger Aero Gradient
                style={styles.background}
            />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Dorm</Text>
                    <Text style={styles.subtitle}>Your green roommates are chilling.</Text>
                </View>

                <FlatList
                    data={MOCK_PLANTS}
                    renderItem={renderPlantItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />

                {/* FAB for Add Plant */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => navigation.navigate('AddPlant')}
                >
                    <Text style={styles.fabText}>+</Text>
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
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        padding: SPACING.l,
        paddingTop: SPACING.xl,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginTop: SPACING.xs,
    },
    listContent: {
        padding: SPACING.m,
        paddingBottom: 100,
    },
    card: {
        marginBottom: SPACING.m,
        height: 120,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    plantImage: {
        width: 80,
        height: 80,
        borderRadius: CONSTANTS.BORDER_RADIUS.m,
        marginRight: SPACING.m,
    },
    plantInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.xs,
    },
    plantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    plantSpecies: {
        fontSize: 14,
        color: COLORS.text.secondary,
        fontStyle: 'italic',
        marginBottom: SPACING.s,
    },
    statusBadge: {
        paddingHorizontal: SPACING.s,
        paddingVertical: 2,
        borderRadius: CONSTANTS.BORDER_RADIUS.round,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    statsRow: {
        flexDirection: 'row',
        gap: SPACING.m,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 12,
        color: COLORS.text.secondary,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.teal.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    fabText: {
        fontSize: 32,
        color: 'white',
        marginTop: -4,
    }
});
