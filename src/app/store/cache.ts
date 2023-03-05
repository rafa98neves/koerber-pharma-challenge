import { StorageSerializers, useStorage } from '@vueuse/core';

export function cachedItem<T>(key: string){
    return useStorage<T>(key, null, undefined, { serializer: StorageSerializers.object })
}
