import { StorageSerializers, useStorage } from '@vueuse/core';

/**
 * Creates a Cached Item with given `key`
 */
export function cachedItem<T>(key: string) {
  return useStorage<T>(key, null, undefined, { serializer: StorageSerializers.object });
}
