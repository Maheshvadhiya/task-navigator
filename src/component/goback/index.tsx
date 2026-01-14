import { View, Text, Pressable, ViewStyle } from 'react-native';
import React from 'react';
import BackIcon from '../../icons/back-icon';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { goBackStyle } from './style';

interface GobackNavbarProps {
    title?: string;
    container?: ViewStyle | any;
    titleStyle?: object;
}

const GobackNavbar: React.FC<GobackNavbarProps> = ({
    title,
    container,
    titleStyle,
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const gobackNavigate = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }
    return (
        <View style={[goBackStyle.container, container]}>
            <Pressable style={{ padding: 3 }} onPress={gobackNavigate}>
                <BackIcon width={50} height={50} />
            </Pressable>

            <Text style={[goBackStyle.goBackTitle, titleStyle]}>
                {title ?? ''}
            </Text>
            <View style={{ width: 25, height: 25 }} />
        </View>
    )
};

export default GobackNavbar;