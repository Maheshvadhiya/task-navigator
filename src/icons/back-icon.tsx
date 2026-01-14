import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';
import { theme } from '../constant/theme';
import { ViewStyle } from 'react-native';

const BackIcon = ({
  height,
  width,
  color,
  style,
}: {
  height?: number;
  width?: number;
  color?: string;
  style?: ViewStyle;
}) => {
  return (
    <Svg
      width={width ?? 40}
      height={height ?? 40}
      viewBox="0 0 50 50"
      fill="none"
      style={style}
    >
      <Circle cx="25" cy="25" r="24.5" fill={theme.WHITE_COLOR} stroke="#ECECEC" />
      <Path
        d="M28.85 17.4916C28.7532 17.3946 28.6383 17.3176 28.5117 17.2651C28.3852 17.2126 28.2495 17.1855 28.1125 17.1855C27.9755 17.1855 27.8398 17.2126 27.7133 17.2651C27.5867 17.3176 27.4718 17.3946 27.375 17.4916L20.45 24.4166C20.3727 24.4937 20.3115 24.5852 20.2696 24.6861C20.2278 24.7869 20.2063 24.8949 20.2063 25.0041C20.2063 25.1132 20.2278 25.2213 20.2696 25.3221C20.3115 25.4229 20.3727 25.5145 20.45 25.5916L27.375 32.5166C27.7833 32.9249 28.4417 32.9249 28.85 32.5166C29.2583 32.1082 29.2583 31.4499 28.85 31.0416L22.8167 24.9999L28.8583 18.9582C29.2583 18.5582 29.2583 17.8916 28.85 17.4916Z"
        fill={theme.BLACK_COLOR}
        stroke={color ?? theme.BLACK_COLOR}
        strokeWidth="0.1"
      />
    </Svg>
  );
};

export default BackIcon;
