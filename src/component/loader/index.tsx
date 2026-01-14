import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { loaderStyle } from './style';
import { theme } from '../../constant/theme';
interface LoaderProps {
  containerLoaderStyle?: object;
}
//This is the component of the main loader, when the API call is made, this loader will appear
const Loader = ({ containerLoaderStyle }: LoaderProps) => {
  return (
    <View style={[loaderStyle.container, { ...containerLoaderStyle }]}>
      <View style={loaderStyle.loadingView}>
        <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
      </View>
    </View>
  );
};

export default Loader;
