// @authors     Karl Tumpalan
// @desc        A reusable Task component that consumes data from the task state.

import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../context/GlobalContext";
import { Modal } from "../components/ui/Modal";
import { toast } from "react-toastify";

// A task must contain a title, description, an id, an active flag, and a done flag.
export const Task: React.FC<{
  title: String;
  is_done: boolean;
  id: number;
  isActive: boolean | null;
}> = ({ title, is_done, isActive, id }) => {
  const { setTask, deleteTask, editTask, getTaskById } =
    useContext(GlobalContext);

  const handleDelete = () => {
    deleteTask(id);
    notifyDeleteSuccess();
  };

  // Modal and Edit Task States
  let [modalState, setmodalState] = useState<boolean>(false);
  let [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [deleteConfirmState, setDeleteConfirmState] = useState<boolean>(false);

  // Add Task toasts
  const notifyEditSuccess = () => toast.info("Edit success!");

  const notifyDeleteSuccess = () =>
    toast.info(`Successfully deleted ${title}!`);

  // Handle edit function to use the editTask function from the context.
  const handleEditButton = () => {
    // Handle the add task form here.

    if (editTask) {
      editTask(id, newTaskTitle);
      notifyEditSuccess();
    }
  };

  // Function for changing active task
  const handleClk = () => {
    setTask(id);
    getTaskById(id);
  };

  return (
    <div
      className={`relative bg-white p-6 shadow-lg rounded-lg flex ${
        isActive
          ? `bg-blue-200`
          : `${is_done ? `border-l-8 border-green-500` : ``}`
      }`}
    >
      <div className="w-full flex flex-row justify-between" onClick={handleClk}>
        {/* Data display */}
        <div className="text-left">
          <h1 className="text-xl font-medium text-gray-700">{title}</h1>
          <p className="text-gray-400"> Task </p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center space-x-2">
        {/* Edit button */}
        <button
          className="w-full p-2 px-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
          onClick={() => setmodalState(true)}
        >
          Edit
        </button>

        {/* Modal section */}

        <Modal
          modalTitle={"Edit a Task"}
          modalState={modalState}
          modalDescription={`Please enter the new title of the task`}
          buttonText2={"Discard"}
          buttonAction2={() => setmodalState(false)}
          buttonText1={"Submit"}
          buttonAction1={handleEditButton}
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
                handleEditButton();
                setmodalState(false);
              }
            }}
          ></input>
        </Modal>

        {/* Delete button */}
        <div
          className="flex justify-center items-center"
          onClick={() => setDeleteConfirmState(true)}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="text-red-400 hover:text-red-500"
          />{" "}
        </div>
        {/* Confirm delete section */}
        <Modal
          modalTitle={"Are you sure you want to delete?"}
          modalState={deleteConfirmState}
          modalDescription={`Please confirm deleting ${title}`}
          buttonText2={"Confirm"}
          buttonAction2={handleDelete}
          buttonText1={"Cancel"}
          buttonAction1={() => setDeleteConfirmState(false)}
          closeModal={() => setDeleteConfirmState(false)}
        />
      </div>
    </div>
  );
};
