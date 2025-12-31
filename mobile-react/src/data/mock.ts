export interface Plant {
    id: string;
    name: string; // Nickname e.g., "Leafy Boi"
    species: string;
    room: string;
    status: 'Happy' | 'Thirsty' | 'Sad';
    waterLevel: number; // 0-100
    image: string; // URL or local asset key
    lastWatered: string;
    personality: string; // e.g., "Sassy", "Zen"
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
        personality: 'Chill Guy'
    },
    {
        id: '2',
        name: 'Sassy Snake',
        species: 'Sansevieria',
        room: 'Bedroom',
        status: 'Thirsty',
        waterLevel: 20,
        image: 'https://images.unsplash.com/photo-1599598425947-d3527e02e862?auto=format&fit=crop&q=80&w=600',
        lastWatered: '2 weeks ago',
        personality: 'Independent Queen'
    }
];
