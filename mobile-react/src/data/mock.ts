export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'plant';
    timestamp: Date;
}

export interface Plant {
    id: string;
    name: string;
    species: string;
    room: string;
    status: 'Happy' | 'Thirsty' | 'Sad';
    waterLevel: number; // 0-100
    image: string;
    lastWatered: string;
    personality: string;
    chatHistory: Message[]; // New: Chat history
}

export const MOCK_PLANTS: Plant[] = [
    {
        id: '1',
        name: 'Monstera Mike',
        species: 'Monstera Deliciosa',
        room: 'Living Room',
        status: 'Happy',
        waterLevel: 85,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=600',
        lastWatered: '2 days ago',
        personality: 'Chill Guy',
        chatHistory: [
            { id: '1', text: "Morning! Sun feels great today. ☀️", sender: 'plant', timestamp: new Date(Date.now() - 10000000) },
        ]
    },
    {
        id: '2',
        name: 'Sassy Snake',
        species: 'Sansevieria',
        room: 'Bedroom',
        status: 'Thirsty',
        waterLevel: 20,
        // Updated image URL to a more reliable one
        image: 'https://images.unsplash.com/photo-1572688484238-80e29b1c863a?auto=format&fit=crop&q=80&w=600',
        lastWatered: '2 weeks ago',
        personality: 'Independent Queen',
        chatHistory: [
            { id: '1', text: "I'm parched. Do I have to beg? 💅", sender: 'plant', timestamp: new Date(Date.now() - 5000) },
        ]
    }
];
