import { atom } from "recoil";
import { ColumnData } from "./mainData";

// Popup
const nameSSFState = atom({
  key: "nameSSFState",
  default: "",
});
const SeniorDataErrors = atom({
  key: "SeniorDataErrors",
  default: { index: -1, message: "" },
});
const sidebarState = atom({
  key: "sidebarState",
  default: false,
});
export const isPopupVisibleState = atom({
  key: "isPopupVisibleState",
  default: false,
});
export const isDarkModeState = atom({
  key: "isDarkModeState",
  default: false,
});
export const workbookDataState = atom({
  key: "workbookDataState",
  default: [],
});
// Popup
export const enterPasswordAppState = atom({
  key: "enterPasswordAppState",
  default: false,
});

export const rowsDataState = atom({
  key: "rowsDataState",
  default: [],
});
export const dataSelectedState = atom({
  key: "dataSelectedState",
  default: [],
});
export const visibleColumnsState = atom<string[]>({
  key: "visibleColumnsState",
  default: [],
});
export const addedSoldiersState = atom<ColumnData[]>({
  key: "addedSoldiersState",
  default: [],
});
export { nameSSFState, SeniorDataErrors, sidebarState };
