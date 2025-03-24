import { useState } from "react";
import { useRecoilState } from "recoil";
import { SeniorDataErrors } from "~/stores/seniorDate";
import { globalStyleInputs, singleGlobalStyleInputs } from "./RedifType";

function RedifTypePush() {
  const [redifTypePush, setRedifTypePush] = useState("");
  const [error, setErorr] = useRecoilState(SeniorDataErrors);

  return (
    <div className={`flex justify-between `}>
      <label
        className={`${globalStyleInputs} ${
          redifTypePush === "redifType_push_1"
            ? `${singleGlobalStyleInputs}`
            : ""
        }`}
        htmlFor="redifType_push_1"
      >
        دفعة
        <br /> 1
      </label>
      <input
        type="radio"
        onClick={() => {
          setRedifTypePush("redifType_push_1");
          setErorr({ index: -1, message: "" });
        }}
        className={`hidden`}
        id="redifType_push_1"
        name="redifTypePush"
        value="redifType_push_1"
      />
      <label
        className={`${globalStyleInputs} ${
          redifTypePush === "redifType_push_4"
            ? `${singleGlobalStyleInputs}`
            : ""
        }`}
        htmlFor="redifType_push_4"
      >
        دفعة
        <br />4
      </label>
      <input
        type="radio"
        onClick={() => {
          setRedifTypePush("redifType_push_4");
          setErorr({ index: -1, message: "" });
        }}
        className={`hidden`}
        id="redifType_push_4"
        name="redifTypePush"
        value="redifType_push_4"
      />

      <label
        className={`cursor-pointer font-extrabold w-[70px] text-center px-[5px] py-[2px] rounded-[5px] hover:text-blue-500 duration-300 ${
          redifTypePush === "redifType_push_7"
            ? `${singleGlobalStyleInputs}`
            : ""
        }`}
        htmlFor="redifType_push_7"
      >
        دفعة
        <br /> 7
      </label>
      <input
        type="radio"
        onClick={() => {
          setRedifTypePush("redifType_push_7");
          setErorr({ index: -1, message: "" });
        }}
        className={`hidden`}
        id="redifType_push_7"
        name="redifTypePush"
        value="redifType_push_7"
      />

      <label
        className={`cursor-pointer font-extrabold w-[70px] text-center px-[5px] py-[2px] rounded-[5px] hover:text-blue-500 duration-300 ${
          redifTypePush === "redifType_push_10"
            ? `${singleGlobalStyleInputs}`
            : ""
        }`}
        htmlFor="redifType_push_10"
      >
        دفعة
        <br /> 10
      </label>
      <input
        type="radio"
        onClick={() => {
          setRedifTypePush("redifType_push_10");
          setErorr({ index: -1, message: "" });
        }}
        className={`hidden`}
        id="redifType_push_10"
        name="redifTypePush"
        value="redifType_push_10"
      />
    </div>
  );
}

export default RedifTypePush;
