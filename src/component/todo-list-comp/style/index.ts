import { StyleSheet } from 'react-native';

export const watchListStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
    },
    shadowView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: '#00000',
        width: '85%',
    },
});
