import { defineStore } from 'pinia';
import type { Task, TaskResponse } from '../models/task';
import { getServices, type Services } from '../requests/services';
import type { PaginatedResponse } from '../models/pagination';
import { cachedItem } from './cache';
import { DEFAULT_TIMER } from '../helpers/taskDefaults';
import { commonStoreActions } from './commonStoreActions';

let services!: Services;

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        currentTasks: cachedItem<TaskResponse | null>('currentTasks'), 
    }),
    getters: {
        todos: (state) => state.currentTasks?.todos ?? [],
        total: (state) => state.currentTasks?.total ?? 0,
    },
    actions: {
        async loadTodos(payload: { userId?: number } & Partial<PaginatedResponse>, force = false) {
          if(!force && this.todos && this.todos.length > 0){
            return this.currentTasks!;
          }
          const res = await services.tasks.listTasks(payload);
          res.todos = res.todos.map(todo => ({ ...todo, timer: 0, started: false }));
          this.currentTasks = res;
          return res;
        },
        getTask(id: number) {
          return this.todos?.find(task => task.id === id);
        },
        setTask(id: number, update: Task){
          let index = this.currentTasks!.todos!.findIndex(task => task.id === id);
          if(index >= 0){
            this.currentTasks!.todos[index] = { ...update };
          }
        },
        clear() {
          this.currentTasks = null;
        },
        async [commonStoreActions.ON_SETUP](){
          services = getServices(true);
        },
        async [commonStoreActions.ON_DESTROY](){
          this.clear();
        }
    },
  });


  