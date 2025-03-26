import { atom } from "recoil";

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
export { nameSSFState, SeniorDataErrors, sidebarState };
