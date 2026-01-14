import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '../navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../component/loader';
import { linking } from '../navigations/linkikng';

export const navigationRef = React.createRef<any>();
const useAuthMiddleWare = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const getTokenFunc = async () => {
        const response = await AsyncStorage.getItem('token');
        setIsLoggedIn(!!response);
        setLoading(false);
    };

    useEffect(() => {
        getTokenFunc();
    }, []);

    return { isLoggedIn, loading, };
};

const Screens = () => {
    const { loading, isLoggedIn } = useAuthMiddleWare();

    return (
        <NavigationContainer linking={linking} ref={navigationRef}>
            {
                loading ? (
                    <Loader />
                ) : (
                    <MainNavigation isLoggedIn={isLoggedIn} />
                )
            }
        </NavigationContainer>
    );
};

export default Screens;