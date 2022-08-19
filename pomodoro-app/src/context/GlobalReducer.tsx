// @author     John Karl Tumpalan
// @desc       A global reducer template

const GlobalReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_TASKS":
      return {
        ...state,
        loading: false,
        tasks: action.payload,
      };

    case "GET_TASK_BY_ID":
      return {
        ...state,
        activeTaskFull: action.payload[0],
      };

    case "ADD_TASK":
      let activeId = state.tasks.length;

      return {
        ...state,
        activeTask: activeId,
        totalTasks: state.totalTasks + 1,
        tasks: [...state.tasks, action.payload],
      };
    case "EDIT_TASK":
      state.tasks.forEach((task: any) => {
        if (task.id === action.payload.id) {
          task.title = action.payload.newTitle;
        }
      });
      return {
        ...state,
        tasks: [...state.tasks],
      };

    case "FINISH_TASK":
      const taskTitle = state.tasks.find(
        (task: any) => task && task.id === action.payload.id
      ).title;
      const allTasks = state.tasks.filter(
        (task: any) => task.id !== action.payload.id
      );

      const finishedTask = action.payload;
      finishedTask.title = taskTitle;

      console.log(finishedTask);
      return {
        ...state,
        tasks: [...allTasks, finishedTask],
      };

    case "DELETE_TASK":
      const newArray = state.tasks.filter(
        (task: any) => task.id !== action.payload
      );

      return {
        ...state,
        activeTask: state.tasks.length > 0 ? state.tasks[0].id : null,
        tasks: newArray,
      };

    case "SET_TASK":
      const newActiveTask = state.tasks.find(
        (task: any) => task && task.id === action.payload
      );

      return {
        ...state,
        activeTask: newActiveTask ? newActiveTask.id : null,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
