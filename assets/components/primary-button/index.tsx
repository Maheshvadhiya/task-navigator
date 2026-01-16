import { ActivityIndicator, ButtonProps, Platform, Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import React, { JSX } from 'react';
import { theme } from '../../../src/constant/theme';
import { primaryBtnStyle } from './style';
interface PrimaryButtonProps extends ButtonProps {
  containerStyle?: ViewStyle;
  style?: TextStyle;
  dontShow?: boolean;
  loading?: boolean;
  icon?: JSX.Element;
  testID?: string;
}

//This component is for all buttons
const PrimaryButton = (props: PrimaryButtonProps) => {
  const { containerStyle, style, title, loading, disabled, testID, ...rest } = props;
  return (
    <Pressable
      testID={testID}
      style={[
        Platform.OS === 'web' && { alignSelf: 'center' },
        props.disabled && { opacity: 0.7 },
        containerStyle,
      ]}
      disabled={disabled || loading}
      {...rest}
    >
      <View
        style={[
          primaryBtnStyle.container,
        ]}
      >
        {props.icon && <Text>{props.icon}</Text>}
        {props.loading ? (
          <ActivityIndicator color={theme.WHITE_COLOR} size={'small'} style={{ paddingVertical: 18 }} />
        ) : (
          <Text style={[primaryBtnStyle.buttonText, style]}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default PrimaryButton;
