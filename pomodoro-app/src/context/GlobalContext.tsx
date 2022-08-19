// @authors     Karl Tumpalan
// @desc        A context file that relates data to every component in the pomodoro client

import React, { createContext, useReducer } from "react";
import GlobalReducer from "./GlobalReducer";
import axios from "axios";

// Initialize the task variable as empty.
const appState = {
  tasks: [],
  activeTask: null,
  activeTaskFull: null,
  getTasks: () => {},
  totalTasks: 0,
  addTask: (task: { title: String }) => {},
  deleteTask: (id: number) => {},
  getTaskById: (id: number) => {},
  editTask: (id: number, newTitle: string) => {},
  finishTask: (id: number, task: any) => {},
  setTask: (id: number) => {},
  error: [],
};

export interface GlobalContextType {
  tasks: { title: String; description: String; is_done: boolean; id: number }[];
  activeTask: number | null;
  activeTaskFull: {
    id: number;
    is_done: boolean;
    number_of_sessions: number;
    title: string;
    total_time_elapsed: number;
  } | null;
  totalTasks: number;
  getTasks: () => Promise<void> | void;
  getTaskById: (id: number) => Promise<void> | void;
  addTask: (task: { title: String }) => Promise<void> | void;
  deleteTask: (id: number) => Promise<void> | void;
  editTask: (id: number, newTitle: string) => Promise<void> | void;
  finishTask: (id: number, task: any) => Promise<void> | void;
  setTask: (id: number) => Promise<void> | void;
  loading?: boolean;
}

// Create a context for the initial state
export const GlobalContext = createContext<GlobalContextType>(appState);

export const GlobalProvider = ({ children }: any) => {
  // Main reducer for the global provider.
  const [state, dispatch] = useReducer(GlobalReducer, appState);

  // Main functions of the global context.
  // API calls must be inserted before dispatch, then change payload to the response data.
  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:9000/task");

      dispatch({
        type: "GET_TASKS",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "GET_TASK_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const getTaskById = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:9000/task/${id}`);

      dispatch({
        type: "GET_TASK_BY_ID",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "GET_TASK_ERROR",
        payload: err.response.data.error,
      });
    }
  };

  const addTask = async (task: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("http://localhost:9000/task", task, config);

    try {
      dispatch({
        type: "ADD_TASK",
        payload: {
          id: res.data,
          title: task.title,
          total_time_elapsed: 0,
          number_of_sessions: 0,
          is_done: task.is_done,
        },
      });
    } catch (err) {
      dispatch({
        type: "ADD_TASK",
        payload: err.response.data.error,
      });
    }
  };

  const deleteTask = async (id: number) => {
    await axios.delete(`http://localhost:9000/task/${id}`);

    try {
      dispatch({
        type: "DELETE_TASK",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "DELETE_TASK",
        payload: err.response.data.error,
      });
    }
  };

  const editTask = async (id: number, newTitle: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .patch(
        `http://localhost:9000/task/${id}/title`,
        { id, title: newTitle },
        config
      )
      .catch((err) => {
        window.alert(
          `Task title already taken! Please delete finished tasks to avoid duplicates.`
        );
      });

    try {
      dispatch({
        type: "EDIT_TASK",
        payload: { id, newTitle },
      });
    } catch (err) {
      dispatch({
        type: "EDIT_TASK",
        payload: err.response.data.error,
      });
    }
  };

  const finishTask = async (id: number, task: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.put(`http://localhost:9000/task/${id}`, task, config);

    try {
      dispatch({
        type: "FINISH_TASK",
        payload: task,
      });
    } catch (err) {
      dispatch({
        type: "FINISH_TASK",
        payload: err.response.data.error,
      });
    }
  };

  const setTask = async (id: number) => {
    try {
      dispatch({
        type: "SET_TASK",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "SET_TASK",
        payload: err.response.data.error,
      });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        tasks: state.tasks,
        activeTaskFull: state.activeTaskFull,
        totalTasks: state.totalTasks,
        activeTask: state.activeTask,
        getTasks,
        getTaskById,
        setTask,
        addTask,
        deleteTask,
        finishTask,
        editTask,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
