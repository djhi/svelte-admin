import { getContext } from "svelte";
import type { DataProvider } from "./types";

export const getDataProvider = () => {
  return getContext<DataProvider>("dataProvider");
};
