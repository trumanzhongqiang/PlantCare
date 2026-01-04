import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image, Dimensions, Platform, Modal, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING } from '../theme';
import { Send, Sparkles, Camera, Leaf, MessageCircle, Menu, Sprout, Plus, X, History } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Mock Messages for Demo
const WELCOME_MESSAGE = {
    id: '1',
    text: "Hi! I'm Flora, your personal botanical expert. 🌱\n\nI can help you rescue a dying plant, or just help you build your dream indoor garden. How can I help today?",
    sender: 'ai',
    timestamp: new Date(),
};

// Mock History Data
const HISTORY_ITEMS = [
    { id: '1', title: 'Monstera Leaves Yellowing', date: 'Today' },
    { id: '2', title: 'New Succulent Care', date: 'Yesterday' },
    { id: '3', title: 'Identify Mystery Plant', date: 'Last Week' },
];

export const ChatScreen = ({ navigation }: any) => {
    const [messages, setMessages] = useState([WELCOME_MESSAGE]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Mock "Wow Moment" visual state
    const [showWowDemo, setShowWowDemo] = useState(false);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newUserMsg = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputText('');
        setIsTyping(true);

        // Simple Mock Response Logic
        setTimeout(() => {
            let replyText = "I see! Could you snap a photo of the plant so I can take a closer look at the leaves?";

            if (inputText.toLowerCase().includes('dead') || inputText.toLowerCase().includes('dying') || inputText.toLowerCase().includes('help')) {
                replyText = "Oh no! 🍂 Don't panic. The yellowing leaves often mean overwatering. Let's create a recovery plan. Shall I set up a 'Critical Care' schedule for this little one?";
            } else if (inputText.toLowerCase().includes('wow') || inputText.toLowerCase().includes('demo')) {
                // Trigger Wow Moment
                setShowWowDemo(true);
                replyText = "Check this out! ✨ I can instantly analyze your space and recommend the perfect plants. (This is a demo of the visual ID feature!)";
            }

            const newAiMsg = {
                id: (Date.now() + 1).toString(),
                text: replyText,
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleNewChat = () => {
        setMessages([WELCOME_MESSAGE]);
        setIsMenuOpen(false);
        setShowWowDemo(false);
    };

    const QuickAction = ({ icon: Icon, label, onPress }: any) => (
        <TouchableOpacity style={styles.quickActionBtn} onPress={onPress}>
            <View style={styles.quickActionIcon}>
                <Icon size={20} color={COLORS.teal.primary} />
            </View>
            <Text style={styles.quickActionText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#E0F7FA', '#F1F8E9', '#FFFFFF']}
                style={styles.background}
            />

            <SafeAreaView style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => setIsMenuOpen(true)}
                    >
                        <Menu size={24} color={COLORS.text.primary} />
                    </TouchableOpacity>

                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>Flora</Text>
                    </View>

                    {/* Garden Pill Button */}
                    <TouchableOpacity
                        style={styles.gardenPill}
                        onPress={() => navigation.navigate('Garden')}
                    >
                        <Sprout size={16} color={COLORS.teal.dark} />
                        <Text style={styles.gardenPillText}>Garden</Text>
                    </TouchableOpacity>
                </View>

                {/* Chat Area */}
                <ScrollView
                    style={styles.chatContainer}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.welcomeBanner}>
                        <View style={styles.aiAvatarContainer}>
                            <Image
                                source={{ uri: 'https://ui-avatars.com/api/?name=Flora&background=0D9488&color=fff&size=128' }}
                                style={styles.aiAvatar}
                            />
                            <View style={styles.onlineDot} />
                        </View>
                        <Text style={styles.welcomeText}>Hi! I'm Flora.</Text>
                        <Text style={styles.welcomeSubText}>Your Personal Botanical Expert</Text>
                    </View>

                    {messages.map((msg: any) => (
                        <View key={msg.id} style={[
                            styles.messageBubble,
                            msg.sender === 'user' ? styles.userBubble : styles.aiBubble
                        ]}>
                            <Text style={[
                                styles.messageText,
                                msg.sender === 'user' ? styles.userText : styles.aiText
                            ]}>{msg.text}</Text>
                        </View>
                    ))}
                    {isTyping && (
                        <View style={styles.typingIndicator}>
                            <Text style={styles.typingText}>Flora is thinking...</Text>
                        </View>
                    )}

                    {showWowDemo && (
                        <View style={styles.wowCard}>
                            <LinearGradient
                                colors={[COLORS.teal.primary, COLORS.teal.dark]}
                                style={styles.wowGradient}
                            >
                                <Sparkles size={32} color="white" style={{ marginBottom: 8 }} />
                                <Text style={styles.wowTitle}>Magic ID Activated!</Text>
                                <Text style={styles.wowSubtitle}>Analyzed 3 plants in your living room.</Text>
                                <TouchableOpacity style={styles.wowBtn} onPress={() => navigation.navigate('Garden')}>
                                    <Text style={styles.wowBtnText}>Add to Garden</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    )}
                </ScrollView>

                {/* Input Area - Just above bottom now */}
                <View style={styles.inputWrapper}>
                    {!inputText && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
                            <QuickAction icon={Camera} label="Identify" onPress={() => setInputText("Identify this plant")} />
                            <QuickAction icon={Leaf} label="Sick Plant" onPress={() => setInputText("My plant is dying!")} />
                            <QuickAction icon={MessageCircle} label="Just Chat" onPress={() => setInputText("Hello Flora!")} />
                        </ScrollView>
                    )}

                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.attachBtn}>
                            <Camera size={24} color={COLORS.teal.primary} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Ask Flora anything..."
                            placeholderTextColor={COLORS.text.secondary}
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={handleSend}
                        />
                        <TouchableOpacity
                            style={[styles.sendBtn, !inputText && { backgroundColor: '#E0E0E0' }]}
                            onPress={handleSend}
                            disabled={!inputText}
                        >
                            <Send size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

            {/* Custom Sidebar / Menu Modal */}
            <Modal
                visible={isMenuOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsMenuOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    {/* Backdrop Tap to Close */}
                    <Pressable style={styles.backdrop} onPress={() => setIsMenuOpen(false)} />

                    {/* Sidebar Content */}
                    <View style={styles.sidebar}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <View style={styles.sidebarHeader}>
                                <Text style={styles.sidebarTitle}>Flora</Text>
                                <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                                    <X size={24} color={COLORS.text.secondary} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.newChatBtn} onPress={handleNewChat}>
                                <Plus size={20} color="white" />
                                <Text style={styles.newChatText}>New Chat</Text>
                            </TouchableOpacity>

                            <Text style={styles.sectionHeader}>History</Text>
                            <ScrollView style={styles.historyList}>
                                {HISTORY_ITEMS.map((item) => (
                                    <TouchableOpacity key={item.id} style={styles.historyItem}>
                                        <History size={16} color={COLORS.text.secondary} />
                                        <Text style={styles.historyTitle} numberOfLines={1}>{item.title}</Text>
                                        <Text style={styles.historyDate}>{item.date}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <View style={styles.sidebarFooter}>
                                <Text style={styles.versionText}>v1.0.0 (MVP)</Text>
                            </View>
                        </SafeAreaView>
                    </View>
                </View>
            </Modal>
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
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
        paddingTop: Platform.OS === 'android' ? 40 : SPACING.m,
        paddingBottom: SPACING.m,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.0)',
    },
    iconBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flex: 1,
        paddingLeft: SPACING.l,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.text.primary,
    },
    gardenPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E0F2F1',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    gardenPillText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.teal.dark,
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: SPACING.m,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
    },
    aiBubble: {
        backgroundColor: 'white',
        borderTopLeftRadius: 4,
        alignSelf: 'flex-start',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    userBubble: {
        backgroundColor: COLORS.teal.primary,
        borderBottomRightRadius: 4,
        alignSelf: 'flex-end',
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    aiText: {
        color: COLORS.text.primary,
    },
    userText: {
        color: 'white',
    },
    typingIndicator: {
        marginLeft: SPACING.s,
        marginBottom: SPACING.m,
    },
    typingText: {
        fontSize: 12,
        color: COLORS.text.secondary,
        fontStyle: 'italic',
    },
    // Input Area
    inputWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING.m,
        paddingBottom: Platform.OS === 'ios' ? 20 : SPACING.m, // Safe area for iPhone home bar
        backgroundColor: 'transparent',
    },
    quickActions: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    quickActionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        marginRight: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    quickActionIcon: {
        marginRight: 6,
    },
    quickActionText: {
        fontSize: 13,
        color: COLORS.teal.dark,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 24,
        paddingHorizontal: 6,
        paddingVertical: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    attachBtn: {
        padding: 8,
    },
    input: {
        flex: 1,
        marginHorizontal: 8,
        fontSize: 16,
        color: COLORS.text.primary,
        paddingVertical: 8,
    },
    sendBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.teal.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Welcome Banner
    welcomeBanner: {
        alignItems: 'center',
        marginTop: SPACING.l,
        marginBottom: SPACING.xl,
    },
    aiAvatarContainer: {
        marginBottom: SPACING.m,
        position: 'relative',
    },
    aiAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.teal.light,
    },
    onlineDot: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
        borderWidth: 4,
        borderColor: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text.primary,
        marginBottom: 4,
    },
    welcomeSubText: {
        fontSize: 16,
        color: COLORS.text.secondary,
    },
    wowCard: {
        marginVertical: 16,
        borderRadius: 20,
        overflow: 'hidden',
        width: '100%',
    },
    wowGradient: {
        padding: 20,
        alignItems: 'center',
    },
    wowTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    wowSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 16,
        textAlign: 'center',
    },
    wowBtn: {
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
    },
    wowBtnText: {
        color: COLORS.teal.dark,
        fontWeight: 'bold',
    },

    // Sidebar Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    sidebar: {
        width: '80%',
        maxWidth: 320,
        backgroundColor: '#F5F7F8',
        height: '100%',
        padding: SPACING.m,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    sidebarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.l,
        paddingTop: SPACING.s,
    },
    sidebarTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.text.primary,
    },
    newChatBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.teal.primary,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: SPACING.xl,
    },
    newChatText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    sectionHeader: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: SPACING.s,
    },
    historyList: {
        flex: 1,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 12,
        backgroundColor: 'white',
        marginBottom: 8,
    },
    historyTitle: {
        flex: 1,
        fontSize: 14,
        color: COLORS.text.primary,
        marginLeft: 12,
    },
    historyDate: {
        fontSize: 12,
        color: COLORS.text.secondary,
    },
    sidebarFooter: {
        paddingTop: SPACING.m,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        alignItems: 'center',
    },
    versionText: {
        color: COLORS.text.secondary,
        fontSize: 12,
    },
});
