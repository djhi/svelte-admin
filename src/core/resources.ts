import { getContext, setContext } from "svelte";
import { writable, Readable } from "svelte/store";
import type { ResourceRecord } from "../types";

export type ResourceDefinition = {
  name: string;
  hasList: boolean;
  hasCreate: boolean;
  hasEdit: boolean;
  hasShow: boolean;
};

export interface ResourceStore {
  byName: {
    [key: string]: ResourceDefinition;
  };
  byIndex: ResourceDefinition[];
}

const { subscribe, set, update } = writable<ResourceStore>({
  byName: {},
  byIndex: [],
});

export const getResource = () => {
  return getContext<ResourceDefinition>("resource");
};

const ResourceRecordContextKey = "@@admin/record";
export const setResourceRecord = (record: Readable<ResourceRecord>) => {
  return setContext<Readable<ResourceRecord>>(ResourceRecordContextKey, record);
};

export const getResourceRecord = () => {
  return getContext<Readable<ResourceRecord>>(ResourceRecordContextKey);
};

export const resourceStore = {
  subscribe,
  add: (definition: ResourceDefinition) =>
    update((store) => {
      store.byName[definition.name] = definition;
      const currentResourceIndex = store.byIndex.findIndex(
        (r) => r.name === definition.name
      );

      if (currentResourceIndex) {
        store.byIndex = [
          ...store.byIndex.slice(0, currentResourceIndex),
          definition,
          ...store.byIndex.slice(currentResourceIndex + 1),
        ];
      }

      return store;
    }),
  remove: (definition: ResourceDefinition) =>
    update((store) => {
      delete store.byName[definition.name];
      const currentResourceIndex = store.byIndex.findIndex(
        (r) => r.name === definition.name
      );

      if (currentResourceIndex) {
        store.byIndex = [
          ...store.byIndex.slice(0, currentResourceIndex),
          ...store.byIndex.slice(currentResourceIndex + 1),
        ];
      }

      return store;
    }),
};
