import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import { validationStyle } from './style';
interface ValidationProps {
  title: string | undefined;
  style?: ViewStyle;
  textStyle?: TextStyle;
}
//This component for validation error messages
const ValidationComp: React.FC<ValidationProps> = ({
  title,
  style,
  textStyle,
}) => {
  return (
    <View style={[validationStyle.errorView, { ...style }]}>
      <Text style={[validationStyle.errorText, { ...textStyle }]}>{title}</Text>
    </View>
  );
};

export default ValidationComp;
