<script setup lang="ts">
import { useTaskStore } from '@/app/store/tasksStore';
import { useAuthStore } from '@/app/store/authStore';
import TaskTodo from './TaskTodo.vue';
import InfiniteScroll from '@/app/components/ui/InfiniteScroll.vue';
import { computed } from '@vue/reactivity';
import CompleteCounter from '../ui/CompleteCounter.vue';
import { MAX_TODOS_IN_PROGRESS } from '@/app/helpers/taskDefaults';
import IconLoading from '../icons/IconLoading.vue';

const taskStore = useTaskStore();
const authStore = useAuthStore();


const state = computed(() => ({
  isWaiting: false,
  tasks: taskStore.todos,
  total: taskStore.total || 0,
}));

const inProgress = computed(() => {
  return state.value.tasks.filter(task => task.started).length;
})

loadTodos({});

async function loadTodos(query: any){
  if(!state.value.isWaiting){
    state.value.isWaiting = true;
    query.userId = authStore.loggedInUser!.id;
    await taskStore.loadTodos(query);
    state.value.isWaiting = false;
  }
}

</script>

<template>
      <InfiniteScroll @fetch="loadTodos($event)" :total="state.total">
        <template #header>
          <div class="centered">
            <div class="col">
              <h1 class="mb-3"> Todos List </h1>
            </div>
            <div class="col counter">
              <CompleteCounter label="On going todos:" :max="MAX_TODOS_IN_PROGRESS" :in-progress="inProgress" />
            </div>
          </div>
        </template>

        <div class="todo-content">
          <div class="row pt-3 mx-0" v-if="state.tasks.length > 0">
            <div class="col col-xl-6 col-md-12 mb-3" v-for="todo in state.tasks" :key="todo.id">
              <TaskTodo :task="todo" />
            </div>
          </div>
          <div class="" v-else-if="state.isWaiting">
            Loading Todos
            <IconLoading class="icon" />
          </div>
          <div v-else>
            No Todos Found.
          </div>
        </div>
      </InfiniteScroll>
</template>

<style lang="scss" scoped>
.todo-content{
  width: 100%;
  text-align: center;
  .icon{
    margin-bottom: 2px;
    margin-left: 1rem;
  }
}

.row {
  align-items: center;
  .counter{
    margin-right: 2rem;
  }
}
</style>
