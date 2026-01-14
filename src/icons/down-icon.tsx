import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { theme } from '../constant/theme';

const DownIcon = ({
  height,
  width,
  color,
}: {
  height?: number;
  width?: number;
  color?: string;
}) => {
  return (
    <Svg
      height={height ?? 25}
      viewBox="0 -960 960 960"
      width={width ?? 25}
      fill={color ?? theme.BLACK_COLOR}
    >
      <Path d="M480-340.76 237.26-583.5l47.24-46.74L480-434.74l195.5-195.5 47.24 46.74L480-340.76Z" />
    </Svg>
  );
};

export default DownIcon;
