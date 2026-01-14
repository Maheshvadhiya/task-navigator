import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  DeviceEventEmitter,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
}

const AddEditTodo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute();
  const { id } = route.params as { isEdit: boolean, id: number };
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      status: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const payload = {
      user_id: 8263951,
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
        const setRecords = response?.data;
        setValue('title', setRecords.title);
        setValue('status', setRecords.status);
      }
    } catch (error) {
      console.log('error while get todo by id', error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getOneTodo();
    }
  }, [id])

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
        {loading ? (
          <Loader />
        ) : (
          <View style={addStyle.container}>
            <GobackNavbar title={`${id ? 'EDIT' : 'ADD'} TODO`} />
            <View style={addStyle.inputMainView}>
              <View style={addStyle.inputContainer}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={{ gap: 4 }}>
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
                    <View style={{ gap: 4 }}>
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
              <PrimaryButton title="Submit" onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddEditTodo;
