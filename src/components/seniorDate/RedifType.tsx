import { memo, useState } from "react";
import { useRecoilState } from "recoil";
import { SeniorDataErrors } from "../../stores/seniorDate";

export const globalStyleInputs = `cursor-pointer font-extrabold px-[5px] py-[2px] rounded-[5px] hover:text-blue-500 duration-200 w-[70px] text-center h-fit`;
export const singleGlobalStyleInputs = `text-white bg-[#cc6963] hover:!text-[#ffffffc4]`;

function RedifType() {
  const [redifType, setRedifType] = useState("");
  const [, setErorr] = useRecoilState(SeniorDataErrors);

  return (
    <div className={`flex justify-between gap-1`}>
      <label
        onClick={() => {
          setRedifType("redifType_null");
          setErorr({ index: -1, message: "" });
        }}
        className={`${globalStyleInputs} ${
          redifType === "redifType_null" ? `${singleGlobalStyleInputs} ` : ""
        }`}
        htmlFor="redifType_null"
      >
        بدون
        <input
          type="radio"
          className={`hidden `}
          id="redifType_null"
          name="redifType"
          value="redifType_null"
        />
      </label>

      <label
        onClick={() => {
          setRedifType("redifType_open");
          setErorr({ index: -1, message: "" });
        }}
        className={`${globalStyleInputs} ${
          redifType === "redifType_open" ? `${singleGlobalStyleInputs} ` : ""
        }`}
        htmlFor="redifType_open"
      >
        قابلة
        <input
          type="radio"
          className={`hidden `}
          id="redifType_open"
          name="redifType"
          value="redifType_open"
        />
      </label>

      <label
        onClick={() => {
          setRedifType("redifType_close");
          setErorr({ index: -1, message: "" });
        }}
        className={`${globalStyleInputs} ${
          redifType === "redifType_close" ? `${singleGlobalStyleInputs} ` : ""
        }`}
        htmlFor="redifType_close"
      >
        غير قابلة
        <input
          type="radio"
          className={`hidden `}
          id="redifType_close"
          name="redifType"
          value="redifType_close"
        />
      </label>
    </div>
  );
}

export default memo(RedifType);
