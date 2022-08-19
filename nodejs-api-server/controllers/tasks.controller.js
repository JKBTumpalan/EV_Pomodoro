/**
 * This is the Tasks controller.
 */

module.exports = function (tasksModel) {
  /**
   * Async method that returns a promise with the result or rejects with a message.
   */

  // The controller must contain the business logic, but in this instance, it just calls
  // the mapped function from the service
  const getTasks = () => {
    return tasksModel.getTasks();
  };

  const getTaskById = (id) => {
    return tasksModel.getTaskById(id);
  };

  const createTask = (title) => {
    return tasksModel.createTask(title);
  };

  const updateTask = (id, changes) => {
    return tasksModel.updateTask(id, changes);
  };

  const updateTaskTitle = (id, title) => {
    return tasksModel.updateTaskTitle(id, title);
  };

  const deleteTask = (id) => {
    return tasksModel.deleteTask(id);
  };

  return {
    createTask,
    getTasks,
    updateTask,
    updateTaskTitle,
    getTaskById,
    deleteTask,
  };
};
