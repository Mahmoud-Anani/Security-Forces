import { atom } from "recoil";

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




export { nameSSFState,  SeniorDataErrors, sidebarState };
