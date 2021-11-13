import { writable } from "svelte/store";

export const pageTitle = writable("");

export const setPageTitle = (newTitle: string) => {
  pageTitle.set(newTitle);
};
