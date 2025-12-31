import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlossyCard } from '../components/GlossyCard';
import { COLORS, CONSTANTS, SPACING } from '../theme';
import { Droplets, Sun, Wind, ArrowLeft, MessageCircle } from 'lucide-react-native';

export const PlantDetailScreen = ({ route, navigation }: any) => {
    const { plant } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Image source={{ uri: plant.image }} style={styles.headerImage} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.imageOverlay}
            />

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <ArrowLeft color="white" size={24} />
            </TouchableOpacity>

            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.name}>{plant.name}</Text>
                    <Text style={styles.species}>{plant.species}</Text>
                </View>

                {/* The "Roommate" Chat Bubble */}
                <GlossyCard style={styles.chatBubble}>
                    <View style={styles.chatRow}>
                        <View style={styles.avatarPlaceholder}>
                            <Text style={{ fontSize: 20 }}>🌿</Text>
                        </View>
                        <View style={styles.bubbleText}>
                            <Text style={styles.messageText}>
                                {plant.status === 'Thirsty'
                                    ? "Hey roomie! I'm kinda parched over here. Can I get a drink? 🥤"
                                    : "Living my best life right now. Thanks for checking in! ✨"}
                            </Text>
                            <Text style={styles.timestamp}>Just now</Text>
                        </View>
                    </View>
                </GlossyCard>

                <View style={styles.statsGrid}>
                    <GlossyCard style={styles.statCard}>
                        <Droplets color={COLORS.teal.primary} size={24} />
                        <Text style={styles.statValue}>{plant.waterLevel}%</Text>
                        <Text style={styles.statLabel}>Water</Text>
                    </GlossyCard>

                    <GlossyCard style={styles.statCard}>
                        <Sun color="#FFD700" size={24} />
                        <Text style={styles.statValue}>High</Text>
                        <Text style={styles.statLabel}>Light</Text>
                    </GlossyCard>

                    <GlossyCard style={styles.statCard}>
                        <Wind color={COLORS.sky.blue} size={24} />
                        <Text style={styles.statValue}>22°C</Text>
                        <Text style={styles.statLabel}>Temp</Text>
                    </GlossyCard>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.teal.primary }]}>
                        <Text style={styles.actionBtnText}>Water Me</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.white }]}>
                        <Text style={[styles.actionBtnText, { color: COLORS.teal.dark }]}>Chat</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 400,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flex: 1,
        marginTop: -50,
        backgroundColor: COLORS.sky.light,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: SPACING.l,
    },
    header: {
        marginBottom: SPACING.l,
        alignItems: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    species: {
        fontSize: 16,
        color: COLORS.text.secondary,
        fontStyle: 'italic',
    },
    chatBubble: {
        marginBottom: SPACING.l,
        backgroundColor: 'rgba(255,255,255,0.8)',
    },
    chatRow: {
        flexDirection: 'row',
        gap: SPACING.m,
    },
    avatarPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.teal.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubbleText: {
        flex: 1,
    },
    messageText: {
        fontSize: 14,
        color: COLORS.text.primary,
        lineHeight: 20,
    },
    timestamp: {
        fontSize: 10,
        color: COLORS.text.secondary,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.m,
        marginBottom: SPACING.xl,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: SPACING.m,
        height: 100,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginVertical: 4,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.text.secondary,
    },
    actions: {
        flexDirection: 'row',
        gap: SPACING.m,
    },
    actionBtn: {
        flex: 1,
        padding: 16,
        borderRadius: CONSTANTS.BORDER_RADIUS.l,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    actionBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
});
