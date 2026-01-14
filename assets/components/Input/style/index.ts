import { StyleSheet } from 'react-native';
import { theme } from '../../../../src/constant/theme';

const inputStyle = StyleSheet.create({
    inputContainer: {
        width: '100%',
        height: 45,
        alignItems: 'center',
        backgroundColor: theme.WHITE_COLOR,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: theme.BORDER_COLOR,
        paddingHorizontal:15
    },
    container: {
        gap: 6,
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: theme.LABEL_COLOR,
    },
    inputField: {
        height: 50,
        alignItems: 'flex-start',
        fontSize: 14,
        width: '100%',
        color: theme.DARK_BLACK_COLOR,
        lineHeight: 19,
    },
});

export default inputStyle;
