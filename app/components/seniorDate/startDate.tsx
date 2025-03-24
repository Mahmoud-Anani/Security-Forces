import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { useRecoilState } from "recoil";
import { SeniorDataErrors } from "~/stores/seniorDate";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
function StartDate() {
  const [value, onChange] = useState<Value>(new Date());
  const [maxDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (window !== undefined) {
      const style = document.createElement("style");
      if (localStorage.getItem("mode") === "dark") {
        style.innerHTML = `
      .react-calendar__tile, .react-calendar__decade-view__years, .react-calendar__navigation, .react-calendar div, .react-calendar__navigation__arrow {
        background-color: white;
        color: #000000;
        border-color: #374151;
      }
      `;
      } else {
        style.innerHTML = `
      .react-calendar__tile, .react-calendar__decade-view__years, .react-calendar__navigation, .react-calendar div, .react-calendar__navigation__arrow {
        background-color: white;
        color: #000000;
        border-color: #d1d5db;
      }
      `;
      }
      document.head.appendChild(style);
    }
  }, []);
  const [error, setErorr] = useRecoilState(SeniorDataErrors);

  return (
    <label
      // style={{ direction: "rtl" }}
      className={`cursor-pointer border p-2 rounded-2xl bg-[#00000000] hover:bg-[#673ab708]`}
      htmlFor="date-of-start"
    >
      {/* <span className="mx-2">تاريخ التجنيد:</span> */}
      <DatePicker
        onClick={() => setErorr({ index: -1, message: "" })}
        format="yyyy"
        closeCalendar={false}
        locale="ar-EG"
        isOpen={false}
        maxDetail="decade"
        onChange={onChange}
        value={value}
        name="startDate"
        id="date-of-start"
        className={`border-0 outline-0 w-full`}
        maxDate={maxDate}
      />
    </label>
  );
}

export default StartDate;
