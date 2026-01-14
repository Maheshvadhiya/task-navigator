import { RefreshControl, ScrollView,  StyleSheet,  Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { callGetApi } from '../../apis/Api';
import Loader from '../../component/loader';
import { theme } from '../../constant/theme';
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
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const { id } = route.params as { id: number };

  const getOneTodo = async () => {
    setLoading(true);

    const netState = await NetInfo.fetch();

    // online data and save in async storage
    if (netState.isConnected) {
      try {
        const response = await callGetApi(`/todos/${id}`);
        if (response?.status === 200) {
          setTodoData(response.data);
          saveTodoDetailToCache(id, response.data);
        }
      } catch (error) {
        console.log('detail api error', error);
      }
    }
    // visible offline data
    else {
      const cachedTodo = await getTodoDetailFromCache(id);

      if (cachedTodo) {
        setTodoData(cachedTodo);
      }

      ToastMessage({
        type: 'info',
        message: 'Offline mode – showing cached todo',
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    getOneTodo();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const isCompleted = todoData?.status === 'completed';

  return (
    <ScrollView style={todoDetailStyle.container}
    contentContainerStyle={{flexGrow:1}}
    refreshControl={
      <RefreshControl refreshing={false} onRefresh={getOneTodo}/>
    }
    >
      <GobackNavbar title='Todo detail' />
      {!todoData ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.WHITE_COLOR }}>
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
                {new Date(todoData?.due_on).toDateString()}
              </Text>
            </View>
          </View>
          <View style={todoDetailStyle.divider} />
          <View style={todoDetailStyle.row}>
            <Text style={todoDetailStyle.meta}>Todo ID: {todoData?.id}</Text>
            <Text style={todoDetailStyle.meta}>User ID: {todoData?.user_id}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default TodoDetailList;
