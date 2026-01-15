import { StyleSheet } from "react-native";
import { theme } from "../../../constant/theme";

export const homeStyle = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#FFFFFF', gap: 10,
  },
  flatlistContainer: {
    gap: 5, backgroundColor: '#FFFFFF', paddingBottom: 10
  },
  headerView: {
    backgroundColor: theme.PRIMARY_COLOR,
    padding: 20,
  },
  headerText: {
    textAlign: 'center', fontSize: 20, color: theme.WHITE_COLOR,
  },
  notAvalilable: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.WHITE_COLOR }
})