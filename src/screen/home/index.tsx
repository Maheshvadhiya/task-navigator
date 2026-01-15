import { Alert, DeviceEventEmitter, FlatList, RefreshControl, Text, View } from "react-native"
import { callDeleteApi, callGetApi } from "../../apis/Api"
import { useCallback, useEffect, useRef, useState } from "react"
import Loader from "../../component/loader"
import TodoListComp from "../../component/todo-list-comp"
import { ParamListBase, useFocusEffect, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import PrimaryButton from "../../../assets/components/primary-button"
import { ToastMessage } from "../../component/toast"
import { addToDeleteQueue, clearDeleteQueue, getDeleteQueue, getTodosFromCache, saveTodosToCache } from "../../storage/todoStore"
import NetInfo from '@react-native-community/netinfo';
import { homeStyle } from "./style"

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
  const isSyncingRef = useRef(false);
  const shownOfflineToast = useRef(false);

  const getTodoList = useCallback(async () => {
    setLoading(true);
    try {
      const netState = await NetInfo.fetch();

      if (netState.isConnected) {
        const response = await callGetApi('todos');
        if (response.status === 200) {
          setTodoData(response.data);
          saveTodosToCache(response.data);
        }
      } else {
        const cachedTodos = await getTodosFromCache();
        setTodoData(cachedTodos);

        if (!shownOfflineToast.current) {
          ToastMessage({
            type: 'info',
            message: 'Offline mode – showing cached todos',
          });
          shownOfflineToast.current = true;
        }
      }

    } catch (error) {
      console.log('API error', error);
    } finally {
      setLoading(false);
    }
  }, []);


  const deleteTodo = useCallback(async (id: number) => {
    const netState = await NetInfo.fetch();

    if (netState.isConnected) {
      try {
        setLoading(true);
        const response = await callDeleteApi(`/todos/${id}`);

        if (response?.status === 204) {
          ToastMessage({
            message: 'Todo deleted successfully',
            type: 'success',
          });

          setTodoData(prev => {
            const updated = prev.filter(todo => todo.id !== id);
            saveTodosToCache(updated);
            return updated;
          });
        }
      } catch (error) {
        console.log('delete error', error);
      } finally {
        setLoading(false);
      }
    } else {
      setTodoData(prev => {
        const updated = prev.filter(todo => todo.id !== id);
        saveTodosToCache(updated);
        return updated;
      });

      await addToDeleteQueue(id);

      ToastMessage({
        type: 'info',
        message: 'Offline: delete will sync when online',
      });
    }
  }, []);


  const confirmDelete = useCallback((id: number) => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTodo(id) },
      ],
      { cancelable: true }
    );
  }, [deleteTodo]);

  const renderItem = useCallback(
    ({ item }: ItemProps) => (
      <TodoListComp
        title={item.title}
        status={item.status}
        onPress={() =>
          navigation.navigate('TodoDetailList', { id: item.id })
        }
        onDelete={() => confirmDelete(item.id)}
        onEdit={() =>
          navigation.navigate('AddEditTodo', { isEdit: true, id: item.id })
        }
      />
    ),
    [navigation, confirmDelete]
  );

  useEffect(() => {
    getTodoList();
    const listener = DeviceEventEmitter.addListener('getTodoList', getTodoList)
    return () => {
      listener.remove();
    };
  }, [])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isConnected && !isSyncingRef.current) {
        isSyncingRef.current = true;

        const queue = await getDeleteQueue();

        for (const id of queue) {
          try {
            await callDeleteApi(`/todos/${id}`);
          } catch {
            console.log('sync delete failed', id);
          }
        }

        if (queue.length > 0) {
          clearDeleteQueue();
          await getTodoList();
        }
        isSyncingRef.current = false;
      }
    });

    return () => unsubscribe();
  }, [getTodoList]);


  return (
    <View style={homeStyle.container}>
      <View style={homeStyle.headerView}>
        <Text style={homeStyle.headerText}>Todo List</Text>
      </View>
      {loading ? (
        <Loader />
      ) : (
        todoData?.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={todoData}
            renderItem={renderItem}
            contentContainerStyle={homeStyle.flatlistContainer}
            initialNumToRender={10}
            windowSize={5}
            removeClippedSubviews
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={getTodoList} />
            }
          />
        ) : (
          <View style={homeStyle.notAvalilable}>
            <Text>No todo available</Text>
          </View>
        )
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
