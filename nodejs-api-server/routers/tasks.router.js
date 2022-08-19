/**
 * This is the Tasks router.
 */

const express = require("express");
const bodyParser = require("body-parser");

module.exports = function TaskRouter(tasksController) {
  const router = express.Router();

  /* Parse HTTP request bodies as JSON */
  router.use(bodyParser.json());

  /**
   * Get all of the Task objects
   */
  router.get("/", (req, res, next) => {
    tasksController
      .getTasks()
      .then((tasks) => {
        res.status(200).send(tasks);
      })
      .catch(next);
  });

  /**
   * Get a single Task object.
   */
  router.get("/:id", (req, res, next) => {
    tasksController
      .getTaskById(req.params.id)
      .then((task) => {
        res.status(200).send(task);
      })
      .catch(next);
  });

  /**
   * Create a Task object
   */
  router.post("/", (req, res, next) => {
    tasksController
      .createTask(req.body.title)
      .then((taskId) => {
        res.status(201).send(taskId.toString());
      })
      .catch(next);
  });

  /**
   * Update a Task object. This does PATCH update, not PUT update, so the whole entity is not re-written, just selected fields.
   */
  router.patch("/:id/title", (req, res, next) => {
    tasksController
      .updateTaskTitle(req.params.id, req.body.title)
      .then((updatedTask) => {
        res.status(200).send(updatedTask);
      })
      .catch(next);
  });

  /**
   * Update a Task object. This does PUT updates, not PATCH updates, so the whole entity is re-written, not selected fields.
   */
  router.put("/:id", (req, res, next) => {
    tasksController
      .updateTask(req.params.id, req.body)
      .then((updatedRecord) => {
        res.status(200).send(updatedRecord);
      })
      .catch(next);
  });

  /**
   * Delete a Task object.    */
  router.delete("/:id", (req, res, next) => {
    tasksController
      .deleteTask(req.params.id)
      .then((deletedId) => {
        res.status(200).send(deletedId);
      })
      .catch(next);
  });

  return router;
};
