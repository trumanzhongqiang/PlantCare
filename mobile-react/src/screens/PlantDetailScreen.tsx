import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, TextInput, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GlossyCard } from '../components/GlossyCard';
import { COLORS, CONSTANTS, SPACING } from '../theme';
import { ArrowLeft, Send, MoreVertical, Wifi } from 'lucide-react-native';
import { Message } from '../data/mock';
import { EmotionalAvatar } from '../components/EmotionalAvatar';
import { BackgroundEffect } from '../components/BackgroundEffect';

export const PlantDetailScreen = ({ route, navigation }: any) => {
    const { plant } = route.params;
    const [messages, setMessages] = useState<Message[]>(plant.chatHistory || []);
    const [inputText, setInputText] = useState('');
    const [showSensorModal, setShowSensorModal] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');

        // Mock AI Response
        setTimeout(() => {
            const responses = [
                "I'm feeling much better, thanks! 🌱",
                "Could use a bit more sun if possible.",
                "Did you know I originate from tropical forests? 🌴",
                "I love this spot!",
                "Water level looking good."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newPlantMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: 'plant',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, newPlantMsg]);
        }, 1000);
    };

    useEffect(() => {
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, [messages]);

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.msgContainer, isUser ? styles.msgRight : styles.msgLeft]}>
                {!isUser && (
                    <View style={styles.avatarSmall}>
                        <Text>🌿</Text>
                    </View>
                )}
                <View style={[
                    styles.bubble,
                    isUser ? styles.bubbleRight : styles.bubbleLeft
                ]}>
                    <Text style={[styles.msgText, isUser ? styles.textWhite : styles.textDark]}>
                        {item.text}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                style={styles.container}
            >
                <StatusBar barStyle="light-content" />

                {/* Dynamic Header */}
                <View style={styles.headerContainer}>
                    {/* Atmospheric Lottie Effect */}
                    <BackgroundEffect status={plant.status} />

                    <Image source={{ uri: plant.image }} style={styles.headerBg} blurRadius={10} />
                    <LinearGradient colors={['rgba(0,0,0,0.3)', COLORS.sky.light]} style={styles.headerGradient} />

                    <SafeAreaView style={styles.safeHeader}>
                        <View style={styles.navBar}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                                <ArrowLeft color="white" size={24} />
                            </TouchableOpacity>
                            <View style={styles.headerTitle}>
                                <Text style={styles.headerName}>{plant.name}</Text>
                                <Text style={styles.headerStatus}>{plant.status} • {plant.waterLevel}% Water</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.iconBtn}
                                onPress={() => setShowSensorModal(true)}
                            >
                                <Wifi color="white" size={22} />
                            </TouchableOpacity>
                        </View>

                        {/* Plant Avatar Circle */}
                        <View style={styles.plantAvatarContainer}>
                            <EmotionalAvatar image={plant.image} status={plant.status} />
                        </View>
                    </SafeAreaView>
                </View>

                {/* Chat Area */}
                <View style={styles.chatArea}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.chatContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Message typical plant..."
                        value={inputText}
                        onChangeText={setInputText}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                        <Send color="white" size={20} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {/* Hardware Link Modal */}
            {showSensorModal && (
                <View style={styles.modalOverlay}>
                    <GlossyCard style={styles.modalCard}>
                        <View style={styles.modalIcon}>
                            <Wifi color={COLORS.teal.primary} size={40} />
                        </View>
                        <Text style={styles.modalTitle}>RootMate Sensor</Text>
                        <Text style={styles.modalBadge}>COMING SOON</Text>
                        <Text style={styles.modalDesc}>
                            We are building a smart sensor that tracks soil moisture, light, and temperature in real-time.
                        </Text>
                        <Text style={styles.modalDesc}>
                            Your plant will be able to text you before it gets thirsty!
                        </Text>
                        <TouchableOpacity
                            style={styles.modalBtn}
                            onPress={() => setShowSensorModal(false)}
                        >
                            <Text style={styles.modalBtnText}>Can't Wait!</Text>
                        </TouchableOpacity>
                    </GlossyCard>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.sky.light,
    },
    headerContainer: {
        height: 220,
        width: '100%',
        position: 'relative',
    },
    headerBg: {
        ...StyleSheet.absoluteFillObject,
    },
    headerGradient: {
        ...StyleSheet.absoluteFillObject,
    },
    safeHeader: {
        flex: 1,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.m,
        paddingTop: SPACING.s,
    },
    iconBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
    },
    headerTitle: {
        alignItems: 'center',
    },
    headerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    headerStatus: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
    },
    plantAvatarContainer: {
        position: 'absolute',
        bottom: -40,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    statusDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: COLORS.sky.light,
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
    chatArea: {
        flex: 1,
        marginTop: 50, // Space for avatar
    },
    chatContent: {
        padding: SPACING.m,
        paddingBottom: SPACING.m,
    },
    msgContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.m,
        alignItems: 'flex-end',
    },
    msgLeft: {
        alignSelf: 'flex-start',
    },
    msgRight: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    avatarSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.teal.light,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        maxWidth: '75%',
    },
    bubbleLeft: {
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 4,
    },
    bubbleRight: {
        backgroundColor: COLORS.teal.primary,
        borderBottomRightRadius: 4,
    },
    msgText: {
        fontSize: 15,
    },
    textWhite: {
        color: 'white',
    },
    textDark: {
        color: COLORS.text.primary,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: SPACING.m,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        paddingBottom: Platform.OS === 'ios' ? 40 : SPACING.m,
    },
    input: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: SPACING.m,
        fontSize: 16,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.teal.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // New Modal Styles
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.l,
        zIndex: 100,
    },
    modalCard: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: SPACING.xl,
        alignItems: 'center',
        width: '100%',
    },
    modalIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0F2F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.m,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.teal.dark,
        marginBottom: 4,
    },
    modalBadge: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.teal.primary,
        backgroundColor: 'rgba(0,128,128,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginBottom: SPACING.m,
    },
    modalDesc: {
        textAlign: 'center',
        color: COLORS.text.secondary,
        marginBottom: SPACING.m,
        lineHeight: 20,
    },
    modalBtn: {
        backgroundColor: COLORS.teal.primary,
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: SPACING.s,
    },
    modalBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
