import { createSlice } from "@reduxjs/toolkit";

const TODO_LIST_KEY = "todolist";

const getInitialToDos = () => {
  const localList = window.localStorage.getItem(TODO_LIST_KEY);

  if (localList) {
    return JSON.parse(localList);
  }
  window.localStorage.setItem(TODO_LIST_KEY, JSON.stringify([]));

  return [];
};

const initialState = {
  todoList: getInitialToDos(),
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addToDo: (state, action) => {

      state.todoList.push(action.payload);

      // Retrieve the existing list from local storage
      const todoList =
        JSON.parse(window.localStorage.getItem(TODO_LIST_KEY)) || [];

      // Add the new todo to the list
      todoList.push(action.payload);

      // Update the list in local storage
      window.localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoList));
    },

    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem(TODO_LIST_KEY);

      if (todoList) {
        const todoListArr = JSON.parse(todoList);

        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });

        window.localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoListArr));

        state.todoList = todoListArr;
      }
    },

    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem(TODO_LIST_KEY);

      if (todoList) {
        const todoListArr = JSON.parse(todoList);

        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });

        window.localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todoListArr));

        state.todoList = todoListArr;
      }
    },
  },
});

export const { addToDo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
