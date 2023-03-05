<script setup lang="ts">
/**
 * Single TODO manager
 *
 * Displays a clickable todo that will count `DEFAULT_TIMER` seconds
 * until task is marked as done.
 *
 * Task can be paused if user wants, but can't run `MAX_TODOS_IN_PROGRESS` todos
 * simultaneously.
 */
import { MILLI } from '@/app/helpers/time';
import { DEFAULT_TIMER, MAX_TODOS_IN_PROGRESS } from '@/app/helpers/taskDefaults';
import type { Task } from '@/app/models/task';
import { useTaskStore } from '@/app/store/tasksStore';
import { reactive, computed, onBeforeUnmount } from 'vue';
import CheckIcon from '@/app/components/icons/CheckIcon.vue';

const props = defineProps<{
  task: Task;
}>();

const taskStore = useTaskStore();

const state = reactive({
  /**
   * Whether task is in an active state,
   * meaning that the timmer is running.
   */
  active: false,

  /**
   * Countdown in millisenconds until task is marked as
   * completed.
   */
  progress: props.task.timer ?? DEFAULT_TIMER,

  /**
   * Interval running while task is active
   */
  timeInterval: null as number | null,
});

/**
 * Computed timer variable got from the task
 */
const timer = computed(() => props.task.timer!);

/**
 * Computed percentage of the time spent on the current task
 */
const progressPercentage = computed(() => (timer.value * 100) / DEFAULT_TIMER);

/**
 * Whether task is completed
 */
const isComplete = computed(() => progressPercentage.value >= 100 || props.task.completed);

/**
 * Whether task is in progress
 */
const inProgress = computed(() => taskStore.todos.filter((task) => task.started && !task.completed).length);

/**
 * Whether task can be started
 */
const shouldBeDisabled = computed(
  () => !props.task.started && inProgress.value >= MAX_TODOS_IN_PROGRESS && !state.active
);

/**
 * set todo as active and save it in store
 */
function startTimer() {
  state.active = true;
  taskStore.setTask(props.task.id, { ...props.task, started: true });

  const startAmount = timer.value;
  const startTime = Date.now();

  // Every millisecond update timer and progress bar
  state.timeInterval = setInterval(() => {
    taskStore.setTask(props.task.id, { ...props.task, timer: startAmount + (Date.now() - startTime) });
    if (timer.value >= DEFAULT_TIMER) {
      taskStore.markAsComplete(props.task.id);
      stopTimer();
    }
  }, MILLI);
}

/**
 * set todo as inactive and save it in store
 */
function stopTimer() {
  state.active = false;
  clearInterval(state.timeInterval!);
  state.timeInterval = null;
  saveTask();
}

function onClick() {
  if (!state.active && (inProgress.value < MAX_TODOS_IN_PROGRESS || props.task.started)) {
    // if action is not active and we haven't reached the maximum simultaneous todos, start timer
    startTimer();
  } else if (state.active) {
    stopTimer();
  }
}

function saveTask() {
  taskStore.setTask(props.task.id, { ...props.task, started: true, completed: isComplete.value });
}

onBeforeUnmount(() => {
  clearInterval(state.timeInterval!);
  state.timeInterval = null;
});
</script>

<template>
  <div class="todo-wrapper">
    <span class="progress" :style="`width: ${progressPercentage}%;`" v-if="!isComplete" />
    <div
      :class="{ active: task.started, complete: isComplete, disabled: shouldBeDisabled }"
      class="todo-card card-block"
      @click="onClick"
    >
      <div class="description">{{ task.todo }}</div>
      <CheckIcon class="icon" v-if="isComplete" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-wrapper {
  display: flex;
  height: 6.2rem;

  .progress {
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
    background-color: #2c3e504e;
    box-shadow: none;
    width: 100%;
    height: calc(100% - 0.2rem);
    margin: 0.1rem;
    display: flex;
    align-items: center;
    border: 1px solid var(--white-soft);
    color: var(--color-text);
    cursor: pointer;

    .description {
      width: 90%;
    }

    &.disabled {
      cursor: not-allowed;
    }

    &.active {
      cursor: pointer;
      outline: 3px solid green;
      border-color: transparent;
    }

    &.complete {
      background-color: green;
      outline: none;
    }
  }
}
</style>
