import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  DeviceEventEmitter,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Loader from '../../../component/loader';
import InputComp from '../../../../assets/components/Input';
import ValidationComp from '../../../component/validation-comp';
import PrimaryButton from '../../../../assets/components/primary-button';
import { addStyle } from './style';
import { ToastMessage } from '../../../component/toast';
import { callGetApi, callPostApi, callPutApi } from '../../../apis/Api';
import GobackNavbar from '../../../component/goback';
import { ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SelectBoxComp from '../../../component/select-box-comp';
interface FormData {
  title: string;
  status: string;
  user_id: number | null,
}

interface UserProps {
  name: string,
  id: number
}

const AddEditTodo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute();
  const { id } = route.params as { isEdit: boolean, id: number };
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [users, setUsers] = useState<UserProps[]>([]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      status: '',
      user_id: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const payload = {
      user_id: data.user_id,
      title: data.title,
      status: data.status,
      due_on: new Date().toISOString(),
    };
    try {
      const response = id
        ? await callPutApi(`/todos/${id}`, payload)
        : await callPostApi('/todos', payload);

      if (
        (!id && response?.status === 201) ||
        (id && response?.status === 200)
      ) {
        ToastMessage({
          type: 'success',
          message: `✅ Todo ${id ? 'updated' : 'added'} successfully`,
        });
        reset();
        navigation.goBack();
        DeviceEventEmitter.emit('getTodoList');
      }
    } catch (error: any) {
      console.log('Todo submit error:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const getOneTodo = async () => {
    setLoading(true);
    try {
      const response = await callGetApi(`/todos/${id}`);
      if (response?.status === 200) {
        const setRecords: FormData = response?.data;
        reset({
          title: setRecords?.title,
          status: setRecords?.status,
          user_id: setRecords?.user_id
        });
      }
    } catch (error) {
      console.log('error while get todo by id', error)
    } finally {
      setLoading(false);
    }
  };


  const activeUserList = useCallback(async () => {
    try {
      const response = await callGetApi('/users?status=active');
      if (response?.status === 200) {
        setUsers(response?.data)
      }
    } catch (error) {
      console.log('Error fetching active users', error);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getOneTodo();
    }
  }, [id]);

  useEffect(() => {
    activeUserList();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={addStyle.scrollView}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <GobackNavbar title={`${id ? 'EDIT' : 'ADD'} TODO`} />
        {loading ? (
          <Loader />
        ) : (
          <View style={addStyle.container}>
            <View style={addStyle.inputMainView}>
              <View style={addStyle.inputContainer}>
                <Controller
                  control={control}
                  name="user_id"
                  render={({ field }) => (
                    <View style={{ gap: 3 }}>
                      <SelectBoxComp
                        starRequired
                        label={'User'}
                        title={'- Select'}
                        data={users?.map(
                          (item: { name: string }) => item?.name,
                        )}
                        onSelect={(value: string) => {
                          const id = users?.find(
                            (item: { name: string }) => item?.name === value,
                          )?.id;
                          field.onChange(id);
                        }}
                        defaultValue={
                          users?.find(
                            (item: { id: number }) => item?.id === field?.value,
                          )?.name
                        }
                      />
                      {errors.user_id && (
                        <ValidationComp
                          title={errors?.user_id?.message}
                          style={{ marginLeft: 6 }}
                        />
                      )}
                    </View>
                  )}
                  defaultValue={null}
                  rules={{
                    required: 'User is required*',
                  }}
                />
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={{ gap: 3 }}>
                      <InputComp
                        starRequired
                        label={'Title'}
                        placeholder={'Enter Your Title'}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                      {errors?.title && (
                        <ValidationComp
                          title={errors?.title?.message}
                          style={{ marginLeft: 6 }}
                        />
                      )}
                    </View>
                  )}
                  rules={{
                    required: 'Title is required*',
                  }}
                />
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value } }) => (
                    <View style={{ gap: 3 }}>
                      <SelectBoxComp
                        starRequired
                        label={'Status'}
                        title={'- Select'}
                        data={['pending', 'completed']}
                        onSelect={onChange}
                        defaultValue={value}
                        not_search={true}
                      />
                      {errors.status && (
                        <ValidationComp
                          title={errors?.status?.message}
                          style={{ marginLeft: 6 }}
                        />
                      )}
                    </View>
                  )}
                  defaultValue=""
                  rules={{
                    required: 'Status is required*',
                  }}
                />
              </View>
              <PrimaryButton
                title="Submit"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                disabled={loading}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddEditTodo;
