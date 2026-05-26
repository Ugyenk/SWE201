// api/tasksService.js
// All CRUD operations for the Task entity

import client from './client';

const TASKS_PATH = '/tasks';

/**
 * GET /tasks — fetch all tasks (with optional filters)
 * @param {object} params - query params e.g. { status, categoryId, search }
 */
export const fetchTasks = (params = {}) =>
  client.get(TASKS_PATH, { params }).then((res) => res.data);

/**
 * GET /tasks/:id — fetch single task by ID
 */
export const fetchTaskById = (id) =>
  client.get(`${TASKS_PATH}/${id}`).then((res) => res.data);

/**
 * POST /tasks — create a new task
 * @param {object} taskData - { title, description, status, categoryId, dueDate }
 */
export const createTask = (taskData) =>
  client.post(TASKS_PATH, taskData).then((res) => res.data);

/**
 * PUT /tasks/:id — update an existing task
 * @param {string} id
 * @param {object} taskData - fields to update
 */
export const updateTask = (id, taskData) =>
  client.put(`${TASKS_PATH}/${id}`, taskData).then((res) => res.data);

/**
 * DELETE /tasks/:id — delete a task
 */
export const deleteTask = (id) =>
  client.delete(`${TASKS_PATH}/${id}`).then((res) => res.data);
