import type { Store as PiniaStore } from 'pinia';
import { useAuthStore } from './authStore';
import { commonStoreActions } from './commonStoreActions';
import { useTaskStore } from './tasksStore';

/**
 * Run common store accross all stores on demand
 */
export const runActions = async (action: commonStoreActions) => {
  const actions = [] as Promise<any>[];

  const piniaStores: PiniaStore[] = [useAuthStore(), useTaskStore()];
  for (let i = 0; i < piniaStores.length; i += 1) {
    if (typeof (piniaStores[i] as any)[action] === 'function') {
      actions.push(Promise.resolve((piniaStores[i] as any)[action]()));
    }
  }

  await Promise.all(actions);
};

export async function setupStore() {
  await runActions(commonStoreActions.ON_SETUP);
}
