import React, { JSX } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import inputStyle from './style';
import { theme } from '../../../src/constant/theme';
interface InputProps extends TextInputProps {
  style?: object;
  styleContainer?: object;
  icon?: JSX.Element;
  iconLeft?: JSX.Element;
  iconLeftStyle?: object;
  onIconLeftPress?: () => void;
  onIconPress?: () => void;
  inputRef?: any;
  disableded?: boolean;
  label?: string;
  starRequired?: boolean;
}

//This is component input which is common input used in all forms
const InputComp: React.FC<InputProps> = props => {
  const isReadOnly = props.readOnly === true;
  const isDisabled = props.disableded === true;
  return (
    <View style={inputStyle.container}>
      {props.label && (
        <Text style={inputStyle.label}>
          {props.label}{' '}
          {props.starRequired && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
      )}
      <View
        style={[
          inputStyle.inputContainer,
          props.icon && { padding: 15 },
          { ...props.styleContainer },
          isReadOnly &&
            isDisabled && { backgroundColor: '#f2f2f2', opacity: 0.6 },
        ]}
      >
        {props.iconLeft && (
          <Pressable
            onPress={props.onIconLeftPress}
            style={[{ paddingLeft: 0 }, props.iconLeftStyle]}
          >
            {props.iconLeft}
          </Pressable>
        )}
        <TextInput
          placeholderTextColor={theme.PLACE_HOLDER_COLOR}
          style={[
            inputStyle.inputField,
            { ...props.style },
            props.icon && { paddingRight: 5 },
          ]}
          {...props}
          ref={props.inputRef}
          editable={!isReadOnly}
          allowFontScaling={false}
        />
        {props.icon && (
          <Pressable onPress={props.onIconPress}>{props.icon}</Pressable>
        )}
      </View>
    </View>
  );
};

export default InputComp;
