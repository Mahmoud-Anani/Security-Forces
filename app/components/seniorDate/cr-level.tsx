import { useState } from "react";

function CrLevel() {
  const [cr, setCR] = useState<String | null>("");

  return (
    <label
      className={` cursor-pointer border p-2 rounded-2xl hover:bg-[#3333341d]`}
      htmlFor="cr-level"
    >
      <select
        id="cr-level"
        className={`flex w-full cursor-pointer text-center font-bold border-0 outline-0`}
        value={`${cr}`}
        onChange={(e) => setCR(e.target.value)}
        name="cr-level"
      >
        <option className={`font-bold cursor-pointer`} value="high">
          عالي (1 سنه)
        </option>
        <option className={`font-bold cursor-pointer`} value="medium">
          متوسط (2 سنه)
        </option>
        <option className={`font-bold cursor-pointer`} value="upperAverage">
          فوق متوسط (1.5 سنه)
        </option>
        <option className={`font-bold cursor-pointer`} value="usually ">
          عادة (3 سنه)
        </option>
      </select>
    </label>
  );
}

export default CrLevel;
