import { defineStore } from 'pinia';
import type { Task, TaskResponse } from '../models/task';
import { getServices, type Services } from '../requests/services';
import type { PaginatedResponse } from '../models/pagination';
import { cachedItem } from './cache';
import { commonStoreActions } from './commonStoreActions';

let services!: Services;

/**
 * Todo Tasks Store
 *
 * Task management store
 */
export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    /**
     * Current cached tasks if any
     */
    currentTasks: cachedItem<TaskResponse | null>('currentTasks'),
  }),
  getters: {
    /**
     * Get all todos if any loaded
     */
    todos: (state) => state.currentTasks?.todos ?? [],

    /**
     * Gets total of loaded todos
     */
    total: (state) => state.currentTasks?.total ?? 0,
  },
  actions: {
    /**
     * Action to load TODOs.
     *
     * Gets todos in cache if any, otherwise if no todos are cached or forcing is set to true
     * todos will be fetched from API
     */
    async loadTodosOfUser(userId: number, payload: Partial<PaginatedResponse>, force = false) {
      if (!force && this.todos && this.todos.length > 0 && this.todos.length >= (payload.limit ?? 0)) {
        return this.currentTasks!;
      }
      const res = await services.tasks.listTasksOfUser(userId, payload);
      res.todos = res.todos.map((todo) => ({ ...todo, timer: 0, started: false }));
      this.currentTasks = res;
      return res;
    },

    /**
     * Get task by id
     */
    getTask(id: number) {
      return this.todos?.find((task) => task.id === id);
    },

    /**
     * Mutates task from array of todos
     *
     * Improvement - task timmer should actually be managed by the store itself and not by the
     * component to improve performance
     */
    setTask(id: number, update: Task) {
      const index = this.currentTasks!.todos!.findIndex((task) => task.id === id);
      if (index >= 0) {
        this.currentTasks!.todos[index] = { ...update };
      }
    },

    /**
     * Saves task and marks it as complete
     */
    async markAsComplete(id: number) {
      const index = this.currentTasks!.todos!.findIndex((task) => task.id === id);
      if (index >= 0) {
        this.currentTasks!.todos[index].completed = true;
        const { timer, started, ...task } = this.currentTasks!.todos[index];
        return await services.tasks.updateTodo(task.id, { completed: task.completed });
      }
    },

    /**
     * Clears all todos in cache
     */
    clear() {
      this.currentTasks = null;
    },

    /**
     * Setup action
     *
     * Run on store initialization
     */
    async [commonStoreActions.ON_SETUP]() {
      services = getServices();
    },

    /**
     * Destroy action
     *
     * Clears current user tasks
     */
    async [commonStoreActions.ON_DESTROY]() {
      this.clear();
    },
  },
});
