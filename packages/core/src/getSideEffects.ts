import { router } from "tinro";
import { Identifier, SideEffects } from "./types";
import { Notifications } from "./notifications";

function redirect(url: string): void;
function redirect(url: string, resource?: string): void;
function redirect(url: string, resource?: string, id?: Identifier) {
  switch (url) {
    case "list":
      router.goto(`/${resource}`);
      break;
    case "edit":
      router.goto(`/${resource}/${id}`);
      break;
    case "show":
      router.goto(`/${resource}/${id}/show`);
      break;
    default:
      router.goto(url);
      break;
  }
}

export const getSideEffects = (): SideEffects => ({
  notify: (message) => {
    if (typeof message === "string") {
      Notifications.add({ message, type: "info", timeout: 5000 });
    } else {
      Notifications.add({
        ...message,
        timeout: message.timeout || message.type == "error" ? 0 : 5000,
      });
    }
  },
  redirect,
});
