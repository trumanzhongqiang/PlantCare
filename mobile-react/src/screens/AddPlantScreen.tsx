import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme';

export const AddPlantScreen = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add a New Roommate</Text>
            <Text style={styles.subtext}>Scan a plant or enter details manually.</Text>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.sky.light,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.teal.dark,
        marginBottom: 10,
    },
    subtext: {
        fontSize: 16,
        color: COLORS.text.secondary,
        marginBottom: 30,
    },
    btn: {
        padding: 15,
        backgroundColor: COLORS.teal.primary,
        borderRadius: 20,
        width: 150,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    }
});
