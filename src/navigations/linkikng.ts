export const linking = {
  prefixes: ['tasknavigator://'],
  config: {
    screens: {
      TodoList: 'todos',
      TodoDetailList: 'todo/:id',
      AddEditTodo: {
        path: 'todo/edit/:id',
        parse: {
          id: Number,
        },
      },
    },
  },
};
