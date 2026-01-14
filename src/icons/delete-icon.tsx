import React from 'react';
import { Path, Svg } from 'react-native-svg';
import { theme } from '../constant/theme';

const DeleteIcon = ({
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
      <Path d="M261-120q-24.75 0-42.37-17.63Q201-155.25 201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z" />
    </Svg>
  );
};

export default DeleteIcon;
