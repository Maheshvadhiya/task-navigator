import { RefreshControl, ScrollView, Text, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { callGetApi } from '../../apis/Api';
import Loader from '../../component/loader';
import GobackNavbar from '../../component/goback';
import { getTodoDetailFromCache, saveTodoDetailToCache } from '../../storage/todoStore';
import NetInfo from '@react-native-community/netinfo';
import { ToastMessage } from '../../component/toast';
import { todoDetailStyle } from './style';
interface TodoDetail {
  id: number;
  user_id: number;
  title: string;
  due_on: any;
  status: 'pending' | 'completed';
}

const TodoDetailList = () => {
  const [todoData, setTodoData] = useState<TodoDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const shownOfflineToast = useRef(false);
  const route = useRoute();
  const { id } = route.params as { id: number };

  const getOneTodo = useCallback(async () => {
    setLoading(true);

    try {
      const netState = await NetInfo.fetch();

      // this is for online
      if (netState.isConnected) {
        const response = await callGetApi(`/todos/${id}`);

        if (response?.status === 200) {
          setTodoData(response.data);
          saveTodoDetailToCache(id, response.data);
        }
      }
      // this is for offline
      else {
        const cachedTodo = await getTodoDetailFromCache(id);

        if (cachedTodo) {
          setTodoData(cachedTodo);
        }

        if (!shownOfflineToast.current) {
          ToastMessage({
            type: 'info',
            message: 'Offline mode – showing cached todo',
          });
          shownOfflineToast.current = true;
        }
      }
    } catch (error) {
      console.log('Todo detail error:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);


  useEffect(() => {
    getOneTodo();
  }, [getOneTodo]);

  const isCompleted = todoData?.status === 'completed';

  return (
    <ScrollView style={todoDetailStyle.container}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={getOneTodo} />
      }
    >
      <GobackNavbar title='Todo detail' />
      {loading ? (
        <Loader />
      ) : (
        !todoData ? (
          <View style={todoDetailStyle.offlineData}>
            <Text>No data available offline</Text>
          </View>
        ) : (
          <View style={todoDetailStyle.card}>
            <Text style={todoDetailStyle.title}>{todoData?.title}</Text>
            <View style={todoDetailStyle.row}>
              <View>
                <View
                  style={[
                    todoDetailStyle.statusBadge,
                    { backgroundColor: isCompleted ? '#4CAF50' : '#FF9800' },
                  ]}
                >
                  <Text style={todoDetailStyle.statusText}>
                    {isCompleted ? 'Completed' : 'Pending'}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={todoDetailStyle.label}>Due Date</Text>
                <Text style={todoDetailStyle.value}>
                  {todoData?.due_on
                    ? new Date(todoData.due_on).toDateString()
                    : '--'}
                </Text>
              </View>
            </View>
            <View style={todoDetailStyle.divider} />
            <View style={todoDetailStyle.row}>
              <Text style={todoDetailStyle.meta}>Todo ID: {todoData?.id}</Text>
              <Text style={todoDetailStyle.meta}>User ID: {todoData?.user_id}</Text>
            </View>
          </View>
        )
      )}
    </ScrollView>
  );
};

export default TodoDetailList;
