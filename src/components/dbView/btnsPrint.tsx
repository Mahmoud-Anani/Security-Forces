import { Button, ButtonGroup } from "@mui/material";
import { useRecoilState } from "recoil";
import {
  dataSelectedState,
  rowsDataState,
  visibleColumnsState,
} from "../../stores/seniorDate";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Popup from "../utils/popup";
import { listColumns } from "../../stores/mainData";
import PrintDataOfSolder from "./printDataOfSolder";

function BtnsPrint() {
  const [dataSelected] = useRecoilState(dataSelectedState);
  const [rows] = useRecoilState(rowsDataState);
  const [dataState, setDataState] = useState([]);
  const [visibleColumns] = useRecoilState<string[]>(visibleColumnsState);
  const [coulmnsPrintState, setCoulmnsPrintState] = useState<string[]>([]);

  // console.log("coulmnsPrintState", coulmnsPrintState);
  // console.log("dataSelected", dataSelected); // [0,1,2,4,8]
  // console.log("rows", rows);[{row}]

  const currentYearMonthDayAR = new Date().toLocaleString("ar-EG", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const [value, setValue] = useState<string>(
    `كــشــف     بــتــاريــخ ${currentYearMonthDayAR}م`
  );

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
  });

  useEffect(() => {
    const dataPrint = dataSelected.map((index) => rows[index]);

    const coulmnsPrint = visibleColumns
      .map((index) => listColumns[+index])
      .filter(Boolean);

    setCoulmnsPrintState(coulmnsPrint);

    setDataState(() => [...dataPrint]);
  }, [dataSelected, rows]);

  const [enterSheetName, setEnterSheetName] = useState<boolean>(false);
  const [isOnlyNames, setIsOnlyNames] = useState<boolean>(true);

  const handleSheetNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );
  const inputRef = useRef(null);
  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      reactToPrintFn();

      setEnterSheetName(false);
    },
    [setValue, setEnterSheetName, setIsOnlyNames]
  );
  const [closeNote, setCloseNote] = useState(true);

  if (enterSheetName) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <>
      <div className={`absolute top-0 left-[200vw] -z-10`}>
        {/* Prinet Only Name */}
        <div
          ref={contentRef}
          className={`p-5 `}
          style={{
            width: "100%",
          }}
        >
          <h1
            style={{ fontFamily: "Aref Ruqaa" }}
            className="border font-extrabold border-black bg-[#00000020] text-center text-3xl p-5"
          >
            {value}
          </h1>

          <table
            style={{
              width: "100%",
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            <thead className={`text-[36px]`}></thead>
            <tbody>
              <tr className="border border-black bg-[#00000020]">
                <td
                  className={`text-center font-bold text-2xl border-x border-black p-2 w-[7%] `}
                >
                  م
                </td>
                {isOnlyNames ? (
                  <td
                    className={`text-center font-bold text-2xl border-x border-black px-2 w-fit`}
                  >
                    الأســــــــم
                  </td>
                ) : (
                  coulmnsPrintState.map((row, index) => (
                    <td
                      key={index}
                      className={`text-center font-bold text-2xl border-x border-black px-2 w-fit`}
                    >
                      {row}
                    </td>
                  ))
                )}
              </tr>
              {dataState.map((row, index) => (
                <tr key={index} className={`text-[18px]`}>
                  <td className={`border border-black px-2 w-[7%]`}>
                    {index + 1}
                  </td>
                  {isOnlyNames ? (
                    <td className={`border border-black px-2 w-fit`}>
                      {`${row[1]}`.split(" ").slice(0, 5).join(" ") || ""}
                    </td>
                  ) : (
                    visibleColumns.map((indexText, colIndex) => (
                      <td
                        key={colIndex}
                        className={`border border-black px-2 w-fit`}
                      >
                        {indexText == "1"
                          ? `${row[`${indexText}`]}`
                              .split(" ")
                              .slice(0, 5)
                              .join(" ")
                          : indexText == "20"
                          ? ""
                          : row[`${indexText}`]}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Prinet Any Coulmns */}
      </div>

      <ButtonGroup
        className={`flex gap-1 w-full justify-between`}
        variant="contained"
        aria-label="Basic button group"
      >
        <Button
          className={`w-full !text-[20px] !bg-[#c27272df] !border-0 !rounded-none !rounded-r-[5px]`}
          disabled={!(dataSelected.length > 0)}
          onClick={() => {
            // @ts-ignore
            inputRef.current?.focus();
            setEnterSheetName(true);
            setIsOnlyNames(true);
          }}
        >
          طـبـاعـة كــشــف اســمـاء فــقــط
        </Button>
        <Button
          className={`w-full !text-[20px] !bg-[#c27272df] !border-0 !rounded-none !rounded-l-[5px]`}
          disabled={!(dataSelected.length > 0)}
          onClick={() => {
            // @ts-ignore
            inputRef.current?.focus();
            setEnterSheetName(true);
            setIsOnlyNames(false);
          }}
        >
          طـبـاعـة حــســب الــجــدول
        </Button>

        {/* <Button className={`w-full !text-[20px] !bg-[#c27272df] !border-0 !rounded-none !rounded-l-[5px]`}>Three</Button> */}
      </ButtonGroup>
      <PrintDataOfSolder {...{ rows, dataSelected }} />
      <div
        style={{ fontFamily: "Aref Ruqaa" }}
        className={`bg-[#ad686a52] ${
          !closeNote && "hidden"
        } w-full p-2 rounded-sm relative`}
      >
        <button
          className={`absolute top-0 left-0 p-2 text-[#ffffff] hover:text-[#b97a7c] cursor-pointer duration-200`}
          onClick={() => setCloseNote(false)}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <h5 className="text-3xl underline">عند الطباعة حسب الجدول</h5>
        <p className="mt-2 text-3xl">قم بتحديد الاعمدة اولا ثم اختر المجندين</p>
      </div>
      <Popup
        isVisible={enterSheetName}
        title="ادخل اسم الكشف"
        content={
          <div className={`px-2 `}>
            <form
              onSubmit={handleFormSubmit}
              className={`flex outline flex-nowrap sm:max-w-[400px] max-w-[300px] px-2 rounded-2xl hover:bg-[#3333341d]`}
            >
              <input
                ref={inputRef}
                type={`text`}
                onChange={handleSheetNameChange}
                defaultValue={value}
                className={`border-0 outline-0 p-2 w-full`}
              />
            </form>
          </div>
        }
        value={value}
        onClose={() => {
          setEnterSheetName(false);
        }}
      />
    </>
  );
}

export default BtnsPrint;
