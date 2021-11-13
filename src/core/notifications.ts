import { writable } from "svelte/store";

export type NotificationType = "success" | "info" | "warning" | "error";
export type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  timeout?: number;
};

const notifications = writable<Notification[]>([]);

export const Notifications = {
  subscribe: notifications.subscribe,
  add: (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    notifications.update((n) => [...n, { ...notification, id }]);
  },
  remove: (id: string) => {
    notifications.update((n) => n.filter((n) => n.id !== id));
  },
};
