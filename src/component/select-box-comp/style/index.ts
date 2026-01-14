import { StyleSheet } from 'react-native';
import { theme } from '../../../constant/theme';

export const selectBoxStyle = StyleSheet.create({
  container: {
    width: '100%',
    gap: 6,
  },
  label: {
    fontSize: 16,
    color: theme.LABEL_COLOR,
  },
  selectBox: {
    width: '100%',
    height: 45,
    backgroundColor: theme.WHITE_COLOR,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: theme.BORDER_COLOR,
  },
  selectBoxTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectBoxText: {
    fontSize: 14,
    color: theme.DARK_BLACK_COLOR,
    lineHeight: 19,
  },
  itemList: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  itemListText: {
    fontSize: 14,
    color: theme.BLACK_COLOR,
  },
});
