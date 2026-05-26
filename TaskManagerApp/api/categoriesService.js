// api/categoriesService.js
// CRUD operations for the Category (secondary) entity

import client from './client';

const CATEGORIES_PATH = '/categories';

/** GET /categories */
export const fetchCategories = () =>
  client.get(CATEGORIES_PATH).then((res) => res.data);

/** GET /categories/:id */
export const fetchCategoryById = (id) =>
  client.get(`${CATEGORIES_PATH}/${id}`).then((res) => res.data);

/** POST /categories */
export const createCategory = (data) =>
  client.post(CATEGORIES_PATH, data).then((res) => res.data);

/** PUT /categories/:id */
export const updateCategory = (id, data) =>
  client.put(`${CATEGORIES_PATH}/${id}`, data).then((res) => res.data);

/** DELETE /categories/:id */
export const deleteCategory = (id) =>
  client.delete(`${CATEGORIES_PATH}/${id}`).then((res) => res.data);
