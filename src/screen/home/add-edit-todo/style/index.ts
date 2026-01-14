import { StyleSheet } from "react-native";
import { theme } from "../../../../constant/theme";

export const addStyle = StyleSheet.create({
    scrollView: { backgroundColor: theme.WHITE_COLOR },
    container: {
        flex: 1,
        backgroundColor: theme.WHITE_COLOR,
        gap: 20,
    },
    inputMainView: {
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    inputContainer: {
        gap: 20,
    },
})