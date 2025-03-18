import { atom } from "recoil";

const seniorDateAfterCalc = atom({
  key: "seniorDateAfterCalc",
  default: "",
});
const errorSeniorDate = atom({
  key: "errorSeniorDate",
  default: { index: -1, message: "" },
});

export { seniorDateAfterCalc, errorSeniorDate };
