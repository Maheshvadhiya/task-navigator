
// import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native"
// import styles from "./style";

// type PrimaryButtonProps = {
//     title: string;
//     onPress?: () => void;
//     Lefticon?: any;
//     Righticon?: any;
//     containerStyle?: ViewStyle;
//     viewContainer?:ViewStyle;
//     textStyle?: TextStyle;
// }
// const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, Lefticon, Righticon, onPress, containerStyle, viewContainer ,textStyle }) => {
//     return (
//         <View style={[styles.viewContainer , viewContainer]}>
//             <Pressable style={[styles.container, containerStyle]} onPress={onPress}>
//                 {Lefticon && Lefticon}
//                 <Text style={[styles.text, textStyle]}> {title} </Text>
//                 {Righticon && Righticon}
//             </Pressable>
//         </View>

//     )
// }

// export default PrimaryButton



import { ActivityIndicator, ButtonProps, Platform, Pressable, Text, TextStyle, View, ViewStyle } from 'react-native';
import React, { JSX } from 'react';
import { theme } from '../../../src/constant/theme';
import { primaryBtnStyle } from './style';
interface PrimaryButtonProps extends ButtonProps {
  containerStyle?: ViewStyle;
  style?: TextStyle;
  dontShow?:boolean;
  loading?:boolean;
  icon?: JSX.Element;
}

//This component is for all buttons
const PrimaryButton = (props: PrimaryButtonProps) => {
  const { containerStyle, style, title, loading, disabled, ...rest } = props;
  return (
    <Pressable
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
          <ActivityIndicator color={theme.WHITE_COLOR} size={'small'} style={{paddingVertical:18}}/>
        ) : (
          <Text style={[primaryBtnStyle.buttonText, style]}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default PrimaryButton;
