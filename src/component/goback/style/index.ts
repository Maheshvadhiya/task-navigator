import { StyleSheet } from 'react-native';
import { theme } from '../../../constant/theme';

export const goBackStyle = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: theme.PRIMARY_COLOR,
        padding: 5,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent:'space-between',
        zIndex: 999,
    },
    goBackTitle: {
        color: theme.WHITE_COLOR,
        fontSize: 20,
    },
});
