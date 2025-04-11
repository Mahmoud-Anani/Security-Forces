import { Button, ButtonGroup } from "@mui/material";
import Popup from "../utils/popup";
import { useCallback, useRef, useState } from "react";
import imagePrintSolder from "../../../public/temp-data-of-solder.png";
import { useReactToPrint } from "react-to-print";

function PrintDataOfSolder({
  rows,
  dataSelected,
}: {
  rows: any[];
  dataSelected: any[];
}) {
  const [popupTextOfSolder, setPopupTextOfSolder] = useState(false);

  const [value, setValue] = useState<string>(
    `تشهد إدارة قوات الامن بأن المجند المذكور  بياناته التجنيديه صحيحة و من قوة مجندي الادارة و مازال يخدم بها حتي الان و ليس في غياب او علي قوة الشطب و لم تتخذ ضده اي اجراءات لانهاء خدمته العسكرية وليس في انتظار اي محاكمات عسكرية او مدنية وقد تحررت له هذة الشهادة بناء علي طلبه وذلك لتقديمه الي .`
  );
  const handleSheetNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onAfterPrint: () => {},
  });
  const inputRef = useRef(null);
  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (window.innerWidth > 750) {
        reactToPrintFn();
      }

      if (contentRef.current && window.innerWidth < 750) {
        const newWindow = window.open("", "_blank", "width=400,height=300");

        if (newWindow) {
          newWindow.document.write(`<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body>
    ${contentRef.current?.innerHTML || ""}
  </body>
</html>`);
          newWindow.document.close();
          newWindow.focus();

          newWindow.onload = function () {
            newWindow.print();
            // newWindow.close();
          };
          // have error here not woking
          newWindow.onclose = function () {
            setShowOutput(false);
          };
        } else {
          console.error("Failed to open new window.");
        }
      }
      setPopupTextOfSolder(false);
    },
    [setValue, setPopupTextOfSolder]
  );

  const [showOutput, setShowOutput] = useState(window.innerWidth < 750);

  if (popupTextOfSolder) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <>
      <ButtonGroup
        className={`flex gap-1 w-full justify-between`}
        variant="contained"
        aria-label="Basic button group"
      >
        <Button
          className={`w-full !text-[20px] !bg-[#c27272df] !border-0 !rounded-none !rounded-l-[5px]`}
          disabled={!(dataSelected.length > 0)}
          onClick={() => {
            // console.log(rows[dataIndex])
            setPopupTextOfSolder(true);
          }}
        >
          طــبــاعــة اثــبــات تــجــنــيــد
        </Button>
        {dataSelected.length > 0 && (
          <label htmlFor="show" className={`sm:block hidden`}>
            عرض قبل الطباعة
            <input
              type="checkbox"
              onChange={() => setShowOutput((prive) => !prive)}
              name="show"
              id="show"
            />
          </label>
        )}
      </ButtonGroup>
      <Popup
        isVisible={popupTextOfSolder}
        title="سبب الاثبات"
        content={
          <div className={``}>
            <form
              onSubmit={handleFormSubmit}
              className={`flex flex-col justify-items-center flex-nowrap sm:max-w-[500px] max-w-[400px]`}
            >
              <p className={`bg-[#ad686a52] text-[24px] mb-2 p-2 rounded-xl`}>
                يرجي العلم انه سوف يتم طباعة اخر جندي تم تجديدة فقط
              </p>
              <textarea
                ref={inputRef}
                type={`text`}
                // @ts-ignore
                onChange={handleSheetNameChange}
                defaultValue={value}
                className={`outline p-2 w-full px-2 rounded-2xl hover:bg-[#3333341d]`}
              ></textarea>
              <button
                type="submit"
                className="cursor-pointer bg-green-600 rounded-2xl p-3"
              >
                طباعة
              </button>
            </form>
          </div>
        }
        value={value}
        onClose={() => {
          setPopupTextOfSolder(false);
        }}
      />

      {dataSelected.slice(-1).map(
        (dataIndex) =>
          showOutput && (
            <div
              ref={contentRef}
              key={dataIndex}
              className={`sm:text-2xl text-6xl flex flex-col gap-4 relative left-[-3%] w-[740px] h-[1095px] z-10`}
            >
              <div className={`absolute z-10 sm:top-[23.8%] top-[26.8%]`}>
                <p
                  style={{ direction: "rtl" }}
                  className={`px-8 font-semibold text-black`}
                >
                  {value}
                </p>
                <div
                  className={`text-center flex flex-col gap-[20px] mr-12 sticky sm:mt-[65px] mt-[150px] font-semibold text-black`}
                >
                  <div>{rows[dataIndex][1]}</div>
                  <div>{convertNumberToLang(rows[dataIndex][4], "ar")}م</div>
                  <div>{convertNumberToLang(rows[dataIndex][7], "ar")}</div>
                  <div>{convertNumberToLang(rows[dataIndex][11], "ar")}</div>
                  <div>{convertNumberToLang(rows[dataIndex][10], "ar")}</div>

                  <div>
                    {rows[dataIndex][8]} - {rows[dataIndex][9]}
                  </div>
                  <div>
                    م
                    {convertNumberToLang(
                      `${handleSineorDate(rows[dataIndex])}`,
                      "ar"
                    )}
                  </div>
                </div>
              </div>
              <img
                src={imagePrintSolder}
                className={`w-full h-full object-fill absolute top-0`}
              />
            </div>
          )
      )}
      {/* 
           
      
      <div className={`border-8 p-3 flex flex-col gap-4`}>
        <header className={`flex justify-between items-center`}>
          <img src={headerImage} className={`w-full h-full object-fill`} />
        </header>
        <div>{value}</div>
        <div></div>
        <div>
          <img src={footerImage} className={`w-full h-full object-fill`} />
        </div>
      </div> */}
    </>
  );
}

export default PrintDataOfSolder;

function handleSineorDate(data: any) {
  // need change data to en data becouse can incaludes for the data.
  const enDate = convertArabicDateToEnglish(data[4]);
  // const seniorDay = enDate[0];
  const seniorMonth = enDate[1];
  const seniorYear = enDate[2];

  // غير قابلة
  if (data[6] === "غير قابلة") {
    // دفعة 1
    if (seniorMonth.includes("1")) {
      switch (data[5]) {
        case "عليا":
          return `01/05/${+seniorYear + 1}`;

        case "متوسط":
          return `01/05/${+seniorYear + 2}`;

        case "فوق متوسط":
          return `01/11/${+seniorYear + 1}`;

        default:
          return `01/05/${+seniorYear + 3}`;
      }
    }
    // دفعة 4
    if (seniorMonth.includes("4")) {
      switch (data[5]) {
        case "عليا":
          return `01/08/${+seniorYear + 1}`;

        case "متوسط":
          return `01/08/${+seniorYear + 2}`;

        case "فوق متوسط":
          return `01/02/${+seniorYear + 2}`;

        default:
          return `01/08/${+seniorYear + 3}`;
      }
    }
    // دفعة 7
    if (seniorMonth.includes("7")) {
      switch (data[5]) {
        case "عليا":
          return `01/11/${+seniorYear + 1}`;

        case "متوسط":
          return `01/11/${+seniorYear + 2}`;

        case "فوق متوسط":
          return `01/05/${+seniorYear + 2}`;

        default:
          return `01/11/${+seniorYear + 3}`;
      }
    }
    // دفعة 10
    if (seniorMonth.includes("10")) {
      switch (data[5]) {
        case "عليا":
          return `01/02/${+seniorYear + 2}`;

        case "متوسط":
          return `01/02/${+seniorYear + 3}`;

        case "فوق متوسط":
          return `01/08/${+seniorYear + 2}`;

        default:
          return `01/02/${+seniorYear + 4}`;
      }
    }
  }

  // بدون و قابلة
  // دفعة 1
  if (seniorMonth.includes("1")) {
    switch (data[5]) {
      case "عليا":
        return `01/03/${+seniorYear + 1}`;

      case "متوسط":
        return `01/03/${+seniorYear + 2}`;

      case "فوق متوسط":
        return `01/09/${+seniorYear + 1}`;

      default:
        return `01/03/${+seniorYear + 3}`;
    }
  }

  // دفعة 4
  if (seniorMonth.includes("4")) {
    switch (data[5]) {
      case "عليا":
        return `01/06/${+seniorYear + 1}`;

      case "متوسط":
        return `01/06/${+seniorYear + 2}`;

      case "فوق متوسط":
        return `01/12/${+seniorYear + 1}`;

      default:
        return `01/06/${+seniorYear + 3}`;
    }
  }
  // دفعة 7
  if (seniorMonth.includes("7")) {
    switch (data[5]) {
      case "عليا":
        return `01/09/${+seniorYear + 1}`;

      case "متوسط":
        return `01/09/${+seniorYear + 2}`;

      case "فوق متوسط":
        return `01/03/${+seniorYear + 2}`;

      default:
        return `01/09/${+seniorYear + 3}`;
    }
  }
  // دفعة 10
  if (seniorMonth.includes("10")) {
    switch (data[5]) {
      case "عليا":
        return `01/12/${+seniorYear + 1}`;

      case "متوسط":
        return `01/12/${+seniorYear + 2}`;

      case "فوق متوسط":
        return `01/06/${+seniorYear + 2}`;

      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return `01/12/${+seniorYear + 3}`;
    }
  }
}

function convertNumberToLang(numberTxt: string, lang: "en" | "ar"): string {
  // Ensure the input is a string
  const value = String(numberTxt);

  // Regular expression to match numbers in the text
  const numberRegex = /\d+/g;

  // Replace all numbers in the text with their localized equivalents
  const localizedText = value.replace(numberRegex, (match) => {
    // Convert the matched number to the desired language
    return new Intl.NumberFormat(lang + "-EG").format(Number(match));
  });

  return localizedText.replace(/٬/g, "");
}
function convertArabicDateToEnglish(arabicDate: string): string[] {
  // خريطة لتحويل الأرقام العربية إلى إنجليزية
  const arabicToEnglishDigits: { [key: string]: string } = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  // تحويل الأرقام العربية داخل النص إلى إنجليزية
  const englishDate = arabicDate.replace(
    /[٠-٩]/g,
    (d) => arabicToEnglishDigits[d]
  );

  // تحويل إلى كائن تاريخ وتنسيقه
  const [day, month, year] = englishDate
    .split("/")
    .map((part) => part.padStart(2, "0"));
  return [day, month, year];
}
