import { Alert, DeviceEventEmitter, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native"
import { callDeleteApi, callGetApi } from "../../apis/Api"
import { useEffect, useState } from "react"
import Loader from "../../component/loader"
import TodoListComp from "../../component/todo-list-comp"
import { theme } from "../../constant/theme"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import PrimaryButton from "../../../assets/components/primary-button"
import { ToastMessage } from "../../component/toast"
import { addToDeleteQueue, clearDeleteQueue, getDeleteQueue, getTodosFromCache, saveTodosToCache } from "../../storage/todoStore"
import NetInfo from '@react-native-community/netinfo';

interface TodoProps {
  id: number,
  status: string,
  title: string,
}

interface ItemProps {
  item: {
    title: string,
    status: string
    id: number
  }
}

const TodoList = () => {
  const [todoData, setTodoData] = useState<TodoProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const getTodoList = async () => {
    setLoading(true);

    const netState = await NetInfo.fetch();

    // online data and save in async storage
    if (netState.isConnected) {
      try {
        const response = await callGetApi('todos');
        if (response.status === 200) {
          setTodoData(response.data);
          saveTodosToCache(response.data);
        }
      } catch (error) {
        console.log('API error', error);
      }
    }
    // visible offline data
    else {
      const cachedTodos = await getTodosFromCache();
      setTodoData(cachedTodos);

      ToastMessage({
        type: 'info',
        message: 'Offline mode – showing cached todos',
      });
    }

    setLoading(false);
  };


  const confirmDelete = (id: number) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTodo(id),
        },
      ],
      { cancelable: true }
    );
  };


  const deleteTodo = async (id: number) => {
  const netState = await NetInfo.fetch();

  // online data and save in async storage
  if (netState.isConnected) {
    try {
      setLoading(true);
      const response = await callDeleteApi(`/todos/${id}`);

      if (response?.status === 204) {
        ToastMessage({
          message: 'Todo deleted successfully',
          type: 'success',
        });

        const updatedTodos = todoData.filter(todo => todo.id !== id);
        setTodoData(updatedTodos);
        saveTodosToCache(updatedTodos);
      }
    } catch (error) {
      console.log('delete error', error);
    } finally {
      setLoading(false);
    }
  }
  // visible offline data
  else {
    const updatedTodos = todoData.filter(todo => todo.id !== id);
    setTodoData(updatedTodos);
    saveTodosToCache(updatedTodos);

    await addToDeleteQueue(id);

    ToastMessage({
      type: 'info',
      message: 'Offline: delete will sync when online',
    });
  }
};


  useEffect(() => {
    getTodoList();
    const listener = DeviceEventEmitter.addListener('getTodoList', getTodoList)
    return () => {
      listener.remove();
    };
  }, [])

  useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(async state => {
    if (state.isConnected) {
      const queue = await getDeleteQueue();

      for (const id of queue) {
        try {
          await callDeleteApi(`/todos/${id}`);
        } catch (e) {
          console.log('sync delete failed', id);
        }
      }

      if (queue.length > 0) {
        clearDeleteQueue();
        getTodoList();
      }
    }
  });

  return () => unsubscribe();
}, []);


  if (loading) {
    return (
      <Loader />
    )
  }
  const renderItem = (item: ItemProps) => {
    return (
      <TodoListComp
        title={item?.item?.title}
        status={item?.item?.status}
        onPress={() => navigation.navigate('TodoDetailList', { id: item?.item?.id })}
        onDelete={() => confirmDelete(item?.item?.id)}
        onEdit={() => navigation.navigate('AddEditTodo', { isEdit: true, id: item?.item?.id })}
      />
    )
  }

  return (
    <View style={style.container}>
      <View style={style.headerView}>
        <Text style={style.headerText}>Todo List</Text>
      </View>
      {todoData?.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={todoData}
          renderItem={renderItem}
          contentContainerStyle={style.flatlistContainer}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={getTodoList} />
          }
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.WHITE_COLOR }}>
          <Text>No todo available</Text>
        </View>
      )}

      <PrimaryButton
        title="Add Todo"
        containerStyle={{ padding: 10 }}
        onPress={() => navigation.navigate('AddEditTodo', { isEdit: false })}
        icon={<Text style={{ color: 'white', fontSize: 25 }}>+</Text>}
      />
    </View>
  )
}

export default TodoList

const style = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#FFFFFF', gap: 10,
  },
  flatlistContainer: {
    gap: 5, backgroundColor: '#FFFFFF', paddingBottom: 10
  },
  headerView: {
    backgroundColor: theme.PRIMARY_COLOR,
    padding: 20,
  },
  headerText: {
    textAlign: 'center', fontSize: 20, color: theme.WHITE_COLOR,
  }
})