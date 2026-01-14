import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { theme } from '../constant/theme';

const SearchIcon = ({
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
      height={height ?? 24}
      width={width ?? 24}
      viewBox="3 -4 60 60"
      fill={color ?? theme.BLACK_COLOR}
    >
      <Path
        d="M58.73,44.35l-11-11a21.26,21.26,0,0,1-6.37,6.37l11,11a4.51,4.51,0,0,0,6.38-6.38Z"
        fill={theme.BLACK_COLOR ?? color}
      />
      <Path
        d="M48,22A18,18,0,1,0,30,40,18,18,0,0,0,48,22ZM30,35.52A13.53,13.53,0,1,1,43.52,22,13.55,13.55,0,0,1,30,35.52Z"
        fill={theme.BLACK_COLOR ?? color}
      />
      <Path
        d="M19.47,22h3A7.52,7.52,0,0,1,30,14.47v-3A10.53,10.53,0,0,0,19.47,22Z"
        fill={theme.BLACK_COLOR ?? color}
      />
    </Svg>
  );
};

export default SearchIcon;
