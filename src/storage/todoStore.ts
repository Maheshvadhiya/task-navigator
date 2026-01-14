import AsyncStorage from '@react-native-async-storage/async-storage';

const TODO_CACHE_KEY = 'CACHED_TODOS';
const TODO_DETAIL_PREFIX = 'TODO_DETAIL_';
const DELETE_QUEUE_KEY = 'OFFLINE_DELETE_QUEUE';

export const saveTodosToCache = async (todos: any[]) => {
  try {
    await AsyncStorage.setItem(TODO_CACHE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.log('Error saving todos', e);
  }
};

export const getTodosFromCache = async () => {
  try {
    const data = await AsyncStorage.getItem(TODO_CACHE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log('Error reading todos', e);
    return [];
  }
};

export const saveTodoDetailToCache = async (id: number, todo: any) => {
  try {
    await AsyncStorage.setItem(
      `${TODO_DETAIL_PREFIX}${id}`,
      JSON.stringify(todo)
    );
  } catch (e) {
    console.log('Error saving todo detail', e);
  }
};

export const getTodoDetailFromCache = async (id: number) => {
  try {
    const data = await AsyncStorage.getItem(`${TODO_DETAIL_PREFIX}${id}`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.log('Error reading todo detail', e);
    return null;
  }
};

export const getDeleteQueue = async (): Promise<number[]> => {
  const data = await AsyncStorage.getItem(DELETE_QUEUE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addToDeleteQueue = async (id: number) => {
  const queue = await getDeleteQueue();
  if (!queue.includes(id)) {
    queue.push(id);
    await AsyncStorage.setItem(DELETE_QUEUE_KEY, JSON.stringify(queue));
  }
};

export const clearDeleteQueue = async () => {
  await AsyncStorage.removeItem(DELETE_QUEUE_KEY);
};