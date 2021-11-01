import { getContext } from "svelte";
import type { createForm } from "svelte-forms-lib";

export type FormProps = {
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => any | Promise<any>;
  validate?: (values: Record<string, any>) => any | undefined;
};

export const getForm = () => getContext<ReturnType<typeof createForm>>("form");
