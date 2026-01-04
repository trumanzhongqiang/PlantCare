export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai'; // Changed from 'plant' to 'ai' for global chat
    timestamp: Date;
}

// Updated Status Type
export type PlantStatus = 'Happy' | 'Thirsty' | 'Sick' | 'Hungry' | 'Cold' | 'Hot' | 'Dark';

export interface Plant {
    id: string;
    name: string;
    species: string;
    room: string;
    status: PlantStatus;
    waterLevel: number; // 0-100
    image: string;
    lastWatered: string;
    personality: string;
    // Removed specific chatHistory, as we now use emoji statuses
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
    },
    {
        id: '2',
        name: 'Sassy Snake',
        species: 'Sansevieria',
        room: 'Bedroom',
        status: 'Thirsty',
        waterLevel: 20,
        image: 'https://images.unsplash.com/photo-1572688484238-80e29b1c863a?auto=format&fit=crop&q=80&w=600',
        lastWatered: '2 weeks ago',
        personality: 'Independent Queen',
    },
    {
        id: '3',
        name: 'Dr. Fiddle',
        species: 'Ficus Lyrata',
        room: 'Study',
        status: 'Sick', // Action: Diagnose
        waterLevel: 45,
        image: 'https://images.unsplash.com/photo-1627734187019-33b006830744?auto=format&fit=crop&q=80&w=600',
        lastWatered: '5 days ago',
        personality: 'Professor',
    },
    {
        id: '4',
        name: 'Baby Pothos',
        species: 'Epipremnum aureum',
        room: 'Kitchen',
        status: 'Hungry', // Action: Fertilize
        waterLevel: 60,
        image: 'https://images.unsplash.com/photo-1596724857543-9563a880c1d6?auto=format&fit=crop&q=80&w=600',
        lastWatered: '1 week ago',
        personality: 'Gamer',
    }
];

