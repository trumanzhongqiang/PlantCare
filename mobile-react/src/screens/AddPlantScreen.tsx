import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, SafeAreaView, Dimensions } from 'react-native';
import { COLORS, CONSTANTS, SPACING } from '../theme';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Image as ImageIcon, Check, X, Smartphone } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlossyCard } from '../components/GlossyCard';

const { width } = Dimensions.get('window');

export const AddPlantScreen = ({ navigation }: any) => {
    const [image, setImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'We need access to your camera to identify plants!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleAnalyze = () => {
        if (!image) return;
        setAnalyzing(true);

        // Simulate AI Identification
        setTimeout(() => {
            setAnalyzing(false);
            Alert.alert(
                "Identified!",
                "It looks like a **Ficus Lyrata** (Fiddle Leaf Fig).",
                [
                    { text: "Add to Garden", onPress: () => navigation.goBack() }
                ]
            );
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                {/* Header with Top-Left Cancel */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <X color={COLORS.text.primary} size={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>New Roommate</Text>
                    <View style={{ width: 40 }} /> {/* Spacer for centering */}
                </View>

                <View style={styles.content}>
                    {!image ? (
                        <>
                            <Text style={styles.subtitle}>How do you want to add your plant?</Text>

                            <View style={styles.optionsContainer}>
                                {/* Camera Option */}
                                <TouchableOpacity style={styles.optionCardBtn} onPress={takePhoto} activeOpacity={0.9}>
                                    <GlossyCard style={styles.optionCard}>
                                        <View style={[styles.iconCircle, { backgroundColor: COLORS.teal.light }]}>
                                            <Camera color={COLORS.teal.dark} size={32} />
                                        </View>
                                        <Text style={styles.optionTitle}>Snap a Photo</Text>
                                        <Text style={styles.optionDesc}>Use camera to identify</Text>
                                    </GlossyCard>
                                </TouchableOpacity>

                                {/* Gallery Option */}
                                <TouchableOpacity style={styles.optionCardBtn} onPress={pickImage} activeOpacity={0.9}>
                                    <GlossyCard style={styles.optionCard}>
                                        <View style={[styles.iconCircle, { backgroundColor: COLORS.sky.blue }]}>
                                            <ImageIcon color="white" size={32} />
                                        </View>
                                        <Text style={styles.optionTitle}>Upload Image</Text>
                                        <Text style={styles.optionDesc}>Pick from gallery</Text>
                                    </GlossyCard>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        /* Preview State */
                        <View style={styles.previewContainer}>
                            <Image source={{ uri: image }} style={styles.previewImage} />
                            <View style={styles.previewOverlay}>
                                <TouchableOpacity style={styles.retakeBtn} onPress={() => setImage(null)}>
                                    <X color="white" size={20} />
                                    <Text style={styles.retakeText}>Retake</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Analyze Action */}
                    {image && (
                        <View style={styles.bottomAction}>
                            <TouchableOpacity
                                style={styles.analyzeBtn}
                                onPress={handleAnalyze}
                                disabled={analyzing}
                            >
                                <LinearGradient
                                    colors={[COLORS.teal.primary, COLORS.teal.dark]}
                                    style={styles.analyzeGradient}
                                >
                                    {analyzing ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <>
                                            <View>
                                                <Text style={styles.analyzeTitle}>Identify Plant</Text>
                                                <Text style={styles.analyzeSubtitle}>AI will find the match</Text>
                                            </View>
                                            <View style={styles.arrowCircle}>
                                                <Check color={COLORS.teal.primary} size={20} />
                                            </View>
                                        </>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.m,
        paddingVertical: SPACING.m,
    },
    closeBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text.primary,
    },
    content: {
        flex: 1,
        padding: SPACING.l,
        justifyContent: 'center',
    },
    subtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: SPACING.xl,
        textAlign: 'center',
    },
    optionsContainer: {
        gap: SPACING.l,
    },
    optionCardBtn: {
        width: '100%',
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.l,
        borderRadius: CONSTANTS.BORDER_RADIUS.l,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    optionDesc: {
        fontSize: 14,
        color: COLORS.text.secondary,
    },
    previewContainer: {
        flex: 1,
        borderRadius: CONSTANTS.BORDER_RADIUS.xl,
        overflow: 'hidden',
        marginBottom: SPACING.xl,
        backgroundColor: 'black',
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    previewOverlay: {
        position: 'absolute',
        top: SPACING.m,
        right: SPACING.m,
    },
    retakeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 4,
    },
    retakeText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    bottomAction: {
        marginBottom: SPACING.l,
    },
    analyzeBtn: {
        width: '100%',
        shadowColor: COLORS.teal.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    analyzeGradient: {
        padding: SPACING.m,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    analyzeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    analyzeSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
    },
    arrowCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
