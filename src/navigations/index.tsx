import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Login from '../screen/login';
import TodoList from '../screen/home';
import TodoDetailList from '../screen/todo-detail';
import AddEditTodo from '../screen/home/add-edit-todo';
const stackScreens = [
  { name: 'TodoList', component: TodoList },
  { name: 'TodoDetailList', component: TodoDetailList },
  { name: 'AddEditTodo', component: AddEditTodo },
  { name: 'Login', component: Login },
];
const loginStackScreens = [
  { name: 'Login', component: Login },
  { name: 'TodoList', component: TodoList },
  { name: 'TodoDetailList', component: TodoDetailList },
  { name: 'AddEditTodo', component: AddEditTodo },
];

const Stack = createNativeStackNavigator();
const MainNavigation = ({ isLoggedIn }: any) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn
        ? stackScreens.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))
        : loginStackScreens.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))}
    </Stack.Navigator>
  );
};

export default MainNavigation;
