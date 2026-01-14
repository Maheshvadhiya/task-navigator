import { StyleSheet } from 'react-native';
import { theme } from '../../../../src/constant/theme';

export const primaryBtnStyle = StyleSheet.create({
  container: {
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: theme.WHITE_COLOR,
    fontSize: 18,
    textAlign: 'center',
    paddingVertical:12
  },
  backIconView: {
    position: 'absolute',
    right: 35,
  },
});
