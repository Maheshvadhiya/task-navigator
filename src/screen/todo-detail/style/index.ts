import { theme } from "../../../constant/theme";
import { StyleSheet } from "react-native";

export const todoDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    color: theme.WHITE_COLOR,
    backgroundColor: theme.PRIMARY_COLOR,
    padding: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    color: '#424242',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  meta: {
    fontSize: 12,
    color: '#616161',
  },
});
