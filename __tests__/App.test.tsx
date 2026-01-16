import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Login from '../src/screen/login';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

jest.mock('axios');

jest.spyOn(Alert, 'alert');

describe('Login Screen', () => {
  it('shows alert if token is empty', () => {
    const { getByTestId } = render(<Login />);

    fireEvent.press(getByTestId('login-button'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'GoRest API token is required'
    );
  });
});
