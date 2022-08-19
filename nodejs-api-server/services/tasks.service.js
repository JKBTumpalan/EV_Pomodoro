/**
 * This is the tasks service.
 * This guy is responsible for all of the business logic related to a To Do entity.
 *
 *
 * @param config is the config object
 * @param database is a database representation
 */

module.exports = function (config, database) {
  /**
   * Get all the Task records from the database
   */
  let getTasks = () => {
    return database("tasks").select("*");
  };

  /**
   * Get a single Task record from the database
   *
   * @param search_id the id of the Task to search
   *
   */
  let getTaskById = async (search_id) => {
    return database("tasks").where("id", parseInt(search_id));
  };

  /**
   * Create a Task record in the database
   *
   * @param title the name of the Task item
   *
   * session, time elapsed, and done flag is default assigned 0.
   */
  let createTask = async (title) => {
    const [id] = await database("tasks")
      .insert({ title: title, number_of_sessions: 0, total_time_elapsed: 0 })
      .returning("id");

    return id;
  };

  /**
   * Update a Task record in the database
   *
   * @param key the key for the Task entity to update (usually the ID)
   * @param updatedTask The updated record to put in the database
   */
  let updateTask = async (key, updatedTask) => {
    const [id, title, number_of_sessions, total_time_elapsed, is_done] =
      await database("tasks")
        .where({ id: key })
        .update(updatedTask, [
          "id",
          "title",
          "number_of_sessions",
          "total_time_elapsed",
          "is_done",
        ]);

    return {
      id,
      title,
      number_of_sessions,
      total_time_elapsed,
      is_done,
    };
  };

  /**
   * Update a Task title in the database
   *
   * @param key the key for the Task entity to update (usually the ID)
   * @param newTitle The updated record to put in the database
   */
  let updateTaskTitle = async (key, newTitle) => {
    const [id, title] = await database("tasks")
      .where({ id: key })
      .update({ title: newTitle }, ["id", "title"]);

    return {
      id,
      title,
    };
  };

  /**
   * Delete a Task record in the database
   *
   * @param key the key for the Task entity to delete (usually the ID)
   */
  let deleteTask = async (key) => {
    const [id] = await database("tasks").where({ id: key }).del(["id"]);

    return id;
  };

  return {
    createTask,
    updateTask,
    getTasks,
    deleteTask,
    getTaskById,
    updateTaskTitle,
  };
};
