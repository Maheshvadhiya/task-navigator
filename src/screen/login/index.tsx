import { Alert, Text, View } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PrimaryButton from '../../../assets/components/primary-button';
import InputComp from '../../../assets/components/Input';
import loginStyle from './style';
import { ToastMessage } from '../../component/toast';

const Login = () => {
  const [token, setToken] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!token.trim()) {
      Alert.alert('Error', 'GoRest API token is required');
      return;
    }
    try {
      setLoading(true)
      const response = await axios.get(
        'https://gorest.co.in/public/v2/todos',
        {
          headers: {
            Authorization: `Bearer ${token.trim()}`,
          },
        }
      );
      if (response?.status === 200) {
        await AsyncStorage.setItem('token', token.trim());
        navigation.replace('TodoList')
        ToastMessage({
          message: 'You are successfully login.',
          type: 'success'
        })
      }
    } catch (error) {
      Alert.alert('Invalid Token', 'Please enter a valid GoRest API token');
    } finally {
      setLoading(false)
    }
  };

  return (
    <View style={loginStyle.container}>
      <View style={loginStyle.formView}>
        <Text style={loginStyle.headerText}>Login</Text>
        <InputComp
          label="GoRest API Token"
          value={token}
          onChangeText={setToken}
          autoCapitalize="none"
        />
        <PrimaryButton
          testID="login-button"
          title="Login"
          onPress={handleLogin}
          containerStyle={{ width: '100%' }}
          disabled={loading}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default Login;
