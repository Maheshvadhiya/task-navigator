import { StyleSheet } from 'react-native';
import { theme } from '../../../constant/theme';

export const validationStyle = StyleSheet.create({
  errorView: {
    width: '100%',
    marginLeft: 4,
  },
  errorText: {
    color: theme.RED_COLOR,
    fontSize: theme.SMALL_FONT,
    fontFamily: theme.INTER_REGULAR,
  },
});
