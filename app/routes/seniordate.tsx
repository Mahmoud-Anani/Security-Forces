import { useState } from "react";
import type { Route } from "./+types/home";
import CrLevel from "~/components/seniorDate/cr-level";
import StartDate from "~/components/seniorDate/startDate";
import RedifType from "~/components/seniorDate/RedifType";
import { useRef } from "react";
import BtnSubmit from "~/components/btnForm";
import SubError from "~/components/seniorDate/subError";
import RedifTypePush from "~/components/seniorDate/RedifType-push";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Calc Senior Date" },
    {
      name: "description",
      content:
        "Welcome to new project malitere services this sub project using to calc Senior Date",
    },
  ];
}
function DataView({
  index,
  component,
  className,
  error,
}: {
  index: Number;
  component: any;
  className?: string;
  error: { index: Number; message: string };
}) {
  return (
    <>
      {component}
      {error.index === index && (
        <SubError errorMessage={error.message} classes={`${className}`} />
      )}
    </>
  );
}
const componentsInputs = [
  <StartDate />,
  <CrLevel />,
  <RedifType />,
  <RedifTypePush />,
];

export default function SeniorDate() {
  const ref = useRef(null);

  const [error, setErorr] = useState({ index: -1, message: "" });
  const [pindingState, setPindingState] = useState<boolean>(false);
  const [seniorDate, setSeniorDate] = useState("");

  async function handleFormSubmit(formData: any) {
    setPindingState(true);
    setErorr({ index: -1, message: "" });
    const dataObj = {
      startDate: formData?.get("startDate"),
      crLevel: formData?.get("cr-level"),
      redifType: formData?.get("redifType"),
      redifTypePush: formData?.get("redifTypePush"),
    };
    if (!dataObj.redifType && !dataObj.startDate) {
      return setErorr({ index: 0, message: "تــأكد مــن الــبيانــات" });
    }
    if (!dataObj.startDate) {
      return setErorr({ index: 1, message: "تــأكد مــن تـاريخ الـتـجنيد" });
    }
    if (!dataObj.redifType) {
      return setErorr({ index: 3, message: "تــأكد مــن تـاريخ الـمؤهــل" });
    }
    if (!dataObj.redifTypePush) {
      return setErorr({ index: 4, message: "تــأكد مــن رقــم الــدفــعة" });
    }

    /*
{
    "startDate": "2025",
    "crLevel": "upperAverage", "high عالي" | "medium متوسط" | "upperAverage فوق متوسط" | "usually عادي"
    "redifType": "redifType_close",  "redifType_null بدون" | "redifType_open قابله" | "redifType_close غير قابلة"
    "redifType_push": "redifType_push 1",  "redifType_push 4" | "redifType_push 7" | "redifType_push 10"
}
*/
    // غير قابلة
    if (dataObj.redifType === "redifType_close") {
      // دفعة 1
      if (dataObj.redifTypePush === "redifType_push_1") {
        switch (dataObj.crLevel) {
          case "high":
            setSeniorDate(`01/05/${+dataObj.startDate + 1}`);
            break;
          case "medium":
            setSeniorDate(`01/05/${+dataObj.startDate + 2}`);
            break;
          case "upperAverage":
            setSeniorDate(`01/11/${+dataObj.startDate + 1}`);
            break;

          default:
            setSeniorDate(`01/05/${+dataObj.startDate + 3}`);
            break;
        }
        setPindingState(false);

        return;
      }
      // دفعة 4
      if (dataObj.redifTypePush === "redifType_push_4") {
        switch (dataObj.crLevel) {
          case "high":
            setSeniorDate(`01/08/${+dataObj.startDate + 1}`);
            break;
          case "medium":
            setSeniorDate(`01/08/${+dataObj.startDate + 2}`);
            break;
          case "upperAverage":
            setSeniorDate(`01/02/${+dataObj.startDate + 2}`);
            break;

          default:
            setSeniorDate(`01/08/${+dataObj.startDate + 3}`);
            break;
        }
        return;
      }
      // دفعة 7
      if (dataObj.redifTypePush === "redifType_push_7") {
        switch (dataObj.crLevel) {
          case "high":
            setSeniorDate(`01/11/${+dataObj.startDate + 1}`);
            break;
          case "medium":
            setSeniorDate(`01/11/${+dataObj.startDate + 2}`);
            break;
          case "upperAverage":
            setSeniorDate(`01/05/${+dataObj.startDate + 2}`);
            break;

          default:
            setSeniorDate(`01/11/${+dataObj.startDate + 3}`);
            break;
        }
        setPindingState(false);

        return;
      }
      // دفعة 10
      if (dataObj.redifTypePush === "redifType_push_10") {
        switch (dataObj.crLevel) {
          case "high":
            setSeniorDate(`01/02/${+dataObj.startDate + 2}`);
            break;
          case "medium":
            setSeniorDate(`01/02/${+dataObj.startDate + 3}`);
            break;
          case "upperAverage":
            setSeniorDate(`01/08/${+dataObj.startDate + 2}`);
            break;

          default:
            setSeniorDate(`01/02/${+dataObj.startDate + 4}`);
            break;
        }
        setPindingState(false);

        return;
      }
    }
    // بدون و قابلة
    // دفعة 1
    if (dataObj.redifTypePush === "redifType_push_1") {
      switch (dataObj.crLevel) {
        case "high":
          setSeniorDate(`01/03/${+dataObj.startDate + 1}`);
          break;
        case "medium":
          setSeniorDate(`01/03/${+dataObj.startDate + 2}`);
          break;
        case "upperAverage":
          setSeniorDate(`01/09/${+dataObj.startDate + 1}`);
          break;

        default:
          setSeniorDate(`01/03/${+dataObj.startDate + 3}`);
          break;
      }
      setPindingState(false);

      return;
    }
    // دفعة 4
    if (dataObj.redifTypePush === "redifType_push_4") {
      switch (dataObj.crLevel) {
        case "high":
          setSeniorDate(`01/06/${+dataObj.startDate + 1}`);
          break;
        case "medium":
          setSeniorDate(`01/06/${+dataObj.startDate + 2}`);
          break;
        case "upperAverage":
          setSeniorDate(`01/12/${+dataObj.startDate + 1}`);
          break;

        default:
          setSeniorDate(`01/06/${+dataObj.startDate + 3}`);
          break;
      }
      setPindingState(false);

      return;
    }
    // دفعة 7
    if (dataObj.redifTypePush === "redifType_push_7") {
      switch (dataObj.crLevel) {
        case "high":
          setSeniorDate(`01/09/${+dataObj.startDate + 1}`);
          break;
        case "medium":
          setSeniorDate(`01/09/${+dataObj.startDate + 2}`);
          break;
        case "upperAverage":
          setSeniorDate(`01/03/${+dataObj.startDate + 2}`);
          break;

        default:
          setSeniorDate(`01/09/${+dataObj.startDate + 3}`);
          break;
      }
      setPindingState(false);

      return;
    }
    // دفعة 10
    if (dataObj.redifTypePush === "redifType_push_10") {
      switch (dataObj.crLevel) {
        case "high":
          setSeniorDate(`01/12/${+dataObj.startDate + 1}`);
          break;
        case "medium":
          setSeniorDate(`01/12/${+dataObj.startDate + 2}`);
          break;
        case "upperAverage":
          setSeniorDate(`01/06/${+dataObj.startDate + 2}`);
          break;

        default:
          setSeniorDate(`01/12/${+dataObj.startDate + 3}`);
          break;
      }
      setPindingState(false);

      return;
    }
  }

  return (
    <>
      <div className={`flex justify-center h-[100vh] items-center`}>
        <form
          ref={ref}
          action={handleFormSubmit}
          onSubmit={(e) => {
            e.preventDefault();
            if (ref.current) {
              handleFormSubmit(new FormData(ref.current));
            }
          }}
          className={`flex  flex-col gap-2`}
        >
          {componentsInputs.map((component, index) => (
            <DataView
              error={error}
              key={index}
              index={index}
              component={component}
              className={`w-full`}
            />
          ))}
          <BtnSubmit
            pending={pindingState}
            nativeStyls={{
              direction: "rtl",
            }}
            buttonText={`تاريخ التسريح  ${seniorDate}`}
            classes={`border p-1 rounded-lg text-[20px] font-bold cursor-pointer
              hover:bg-[#5c5b5b12] duration-100`}
          />
        </form>
      </div>
    </>
  );
}
