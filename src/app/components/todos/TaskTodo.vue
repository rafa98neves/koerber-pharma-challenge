<script setup lang="ts">
import { MILLI } from '@/app/helpers/time';
import { DEFAULT_TIMER, MAX_TODOS_IN_PROGRESS } from '@/app/helpers/taskDefaults';
import type { Task } from '@/app/models/task';
import { useTaskStore } from '@/app/store/tasksStore';
import { reactive, computed } from 'vue';
import CheckIcon from '@/app/components/icons/CheckIcon.vue';

const props = defineProps<{
  task: Task,
}>()

const taskStore = useTaskStore();

const state = reactive({
  active: false,
  progress: props.task.timer ?? DEFAULT_TIMER,
  timeInterval: null as number | null,
})

const timer = computed(() => props.task.timer!)

const progressPercentage = computed(() => (props.task.timer! * 100) / DEFAULT_TIMER)

const isComplete = computed(() => progressPercentage.value >= 100 || props.task.completed)

const inProgress = computed(() => taskStore.todos.filter(task => task.started && !task.completed).length)

const shouldBeDisabled = computed(() => !props.task.started && inProgress.value >= MAX_TODOS_IN_PROGRESS && !state.active)

function startTimer(){
  state.active = true;
  taskStore.setTask(props.task.id, { ...props.task, started: true })
  state.timeInterval = setInterval(() => {
    taskStore.setTask(props.task.id, { ...props.task, timer: timer.value + 1 })
    if(timer.value >= DEFAULT_TIMER) {
      taskStore.setTask(props.task.id, { ...props.task, completed: true })
      stopTimer();
    }
  }, MILLI)
}

function stopTimer(){
  state.active = false;
  clearInterval(state.timeInterval!);
  state.timeInterval = null;
  saveTask();
}

function onClick(){
  if(!state.active && (inProgress.value < MAX_TODOS_IN_PROGRESS || props.task.started)){
    startTimer();
  } else if(state.active){
    stopTimer();
  }
}

function saveTask(){
  taskStore.setTask(props.task.id, { ...props.task, started: true })
}

</script>

<template>
  <div class="todo-wrapper">
    <span class="progress" :style="`width: ${progressPercentage}%;`" v-if="!isComplete" />
    <div :class="{ active: state.active, complete: isComplete, disabled: shouldBeDisabled }" class="todo-card card-block" @click="onClick">
      <div class="description"> {{ task.todo }} </div>
      <CheckIcon class="icon" v-if="isComplete"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-wrapper{
  display: flex;
  height: 6.2rem;

  .progress{
    width: 0;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: green;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .todo-card {
    background-color: #00000024;
    width: 100%;
    height: calc(100% - .2rem);
    margin: 0.1rem;
    display: flex;
    align-items: center;
    border: 1px solid var(--white-soft);
    color: var(--color-text);
    cursor: pointer;

    .description{
      width: 90%;
    }

    &.disabled{
      cursor: not-allowed;
    }

    &.active{
      cursor: pointer;
      outline: 3px solid green;
      border-color: transparent;
    }

    &.complete{
      background-color: green;
      outline: none;
    }
  }

}
</style>
