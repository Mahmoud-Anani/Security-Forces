import { useState } from "react";
import DatePicker from "react-date-picker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
function StartDate() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <label
      style={{ direction: "rtl" }}
      className={`cursor-pointer border p-2 rounded-2xl bg-[#00000000] hover:bg-[#673ab708]`}
      htmlFor="date-of-start"
    >
      <span className="mx-2">تاريخ التجنيد:</span>
      <DatePicker
        format="yyyy"
        closeCalendar={false}
        locale="ar-EG"
        isOpen={false}
        maxDetail="decade"
        autoFocus
        onChange={onChange}
        value={value}
        name="startDate"
        id="date-of-start"
        className={`border-0 outline-0`}
        maxDate={new Date()}
      />
    </label>
  );
}

export default StartDate;
