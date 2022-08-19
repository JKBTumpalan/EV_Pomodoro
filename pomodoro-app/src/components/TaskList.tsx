// @authors     Karl Tumpalan
// @desc        A component that contains all the tasks, and the buttons to control the CRUD.

import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Task } from "../components/Task";
import { Modal } from "./ui/Modal";
import { toast } from "react-toastify";
// A taskList must contain a title, description, and a done flag.
export const TaskList: React.FC = () => {
  const { tasks, addTask, activeTask, getTasks } = useContext(GlobalContext);
  let [modalState, setmodalState] = useState<boolean>(false);
  let [newTaskTitle, setNewTaskTitle] = useState("");

  // Add Task toasts
  const notifyAddSuccess = () => toast.info("Successfully added a task!");
  const notifyAddConstraint = () =>
    toast.warn(
      "Submission failed! Please double check the details you submitted."
    );
  const notifyAddError = () => toast.error("Add task failed!");

  //Create a state for the search input
  const [searchState, setSearchState] = useState("");

  const handleAddButton = () => {
    // Handle the add task form here.

    const newTask = {
      title: newTaskTitle,
      is_done: false,
    };

    if (addTask) {
      if (newTaskTitle === "") notifyAddConstraint();
      else {
        addTask(newTask);
        notifyAddSuccess();
      }
    } else {
      notifyAddError();
    }
  };

  useEffect(() => {
    getTasks();

    // remove exhaustive deps
    // eslint-disable-next-line
  }, []);

  return (
    <div className="sm:w-1/3 sm:max-h-screen min-h-screen w-screen overflow-y-auto sm:order-1 order-2 border-2">
      {/* Add and Search functionality */}
      <div className="p-2 flex flex-row bg-blue-200 sm:sticky sm:top-0 sm:z-10">
        <button
          className="px-4 w-36 h-12 ml-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          onClick={() => setmodalState(true)}
        >
          Add Task
        </button>

        {/* Add Task Modal */}
        <Modal
          modalTitle={"Add a Task"}
          modalState={modalState}
          modalDescription={`Please input the title of the task you wish to add.`}
          buttonText2={"Discard"}
          buttonAction2={() => setmodalState(false)}
          buttonText1={"Submit"}
          buttonAction1={handleAddButton}
          closeModal={() => setmodalState(false)}
        >
          {/* Main Form */}
          <label htmlFor="task_title"> Task title </label>
          <input
            id="task_title"
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setNewTaskTitle(e.target.value);
            }}
            className="px-4 py-2 my-2 border-2 rounded-md w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddButton();
                setmodalState(false);
              }
            }}
          ></input>
        </Modal>

        <input
          type="text"
          placeholder="Search tasks.."
          onChange={(e) => {
            setSearchState(e.target.value);
          }}
          className="px-4 py-2 mx-1 border-2 rounded-md w-full"
        ></input>
      </div>
      {/* Map the tasks array to render the task components */}
      {tasks
        .filter((task) =>
          task.title.toLowerCase().includes(searchState.toLowerCase())
        )
        .map((task, index) => {
          return (
            <Task
              {...task}
              isActive={task.id === activeTask}
              key={index}
            ></Task>
          );
        })}
    </div>
  );
};
