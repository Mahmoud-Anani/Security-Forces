import { Button, ButtonGroup } from "@mui/material";
import { useRecoilState } from "recoil";
import { dataSelectedState, rowsDataState } from "../../stores/seniorDate";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Popup from "../utils/popup";

function BtnsPrint() {
  const [dataSelected] = useRecoilState(dataSelectedState);
  const [rows] = useRecoilState(rowsDataState);
  const [dataState, setDataState] = useState([]);
  // console.log("dataSelected", dataSelected); [0,1,2,4,8]
  // console.log("rows", rows);[{row}]

  const contentRef = useRef<HTMLTableElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    const dataPrint = dataSelected.map((index) => rows[index]);
    setDataState(() => [...dataPrint]);
  }, [dataSelected, rows]);

  const [value, setValue] = useState<string>("");
  const [enterSheetName, setEnterSheetName] = useState<boolean>(false);

  const handleSheetNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );
  const currentYearMonthDayAR = new Date().toLocaleString("ar-EG", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const inputRef = useRef(null);
  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      reactToPrintFn();
      setEnterSheetName(false);
    },
    [value, setEnterSheetName]
  );

  return (
    <>
      <div className={`absolute top-0 left-[200vw] -z-10`}>
        <div
          ref={contentRef}
          className={`p-5 `}
          style={{

            width: "100%",
          }}
        >
          <h1 className="border border-black text-center text-3xl p-5">
            كشف مجندين
          </h1>
          <table
            style={{
              width: "100%",
              border: "1px solid black",
              textAlign: "center",
            }}
          >
            <thead className={`text-[36px]`}>
              {/* <th className={`border border-black`}>م</th>
          <th className={`border border-black`}>الأســــــــم</th> */}
              <th className={`border border-black px-2`}>م</th>
              <th className={`border border-black px-2`}>الأســــــــم</th>
            </thead>
            <tbody>
              {dataState.map((row, index) => (
                <tr key={index} className={`text-[26px]`}>
                  <td className={`border border-black px-2`}>{index + 1}</td>
                  <td className={`border border-black px-2`}>{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          }}
        >
          طـبـاعـة كــشــف اســمـاء فــقــط
        </Button>
        <Button
          className={`w-full !text-[20px] !bg-[#c27272df] !border-0 !rounded-none`}
          disabled={!(dataSelected.length > 0)}
        >
          طـبـاعـة حــســب الــجــدول
        </Button>
        {/* <Button className={`w-full !text-[20px] !bg-[#c27272df] !border-0 !rounded-none !rounded-l-[5px]`}>Three</Button> */}
      </ButtonGroup>

      <Popup
        isVisible={enterSheetName}
        title="ادخل اسم االكشف"
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
                defaultValue={`كــشــف     بــتــاريــخ ${currentYearMonthDayAR}م`}
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
