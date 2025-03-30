import { useState } from "react";
// import type { Route } from "./+types/home";
import CrLevel from "../components/seniorDate/cr-level";
import StartDate from "../components/seniorDate/startDate";
import RedifType from "../components/seniorDate/RedifType";
import { useRef } from "react";
import BtnSubmit from "../components/btnForm";
import SubError from "../components/seniorDate/subError";
import RedifTypePush from "../components/seniorDate/RedifType-push";
import { isDarkModeState, SeniorDataErrors } from "../stores/seniorDate";
import { useRecoilState } from "recoil";
import { Helmet } from "react-helmet";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "حــسـاب تــاريــخ تــســريــح الـمـجـنـد" },
//     {
//       name: "description",
//       content:
//         "Welcome to new project malitere services this sub project using to calc Senior Date",
//     },
//   ];
// }
function DataView({
  index,
  component,
  className,
  error,
}: {
  index: number;
  component: any;
  className?: string;
  error: { index: number; message: string };
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

  const [, setErorr] = useRecoilState(SeniorDataErrors);
  const [pindingState, setPindingState] = useState<boolean>(false);
  const [error] = useState<{ index: number; message: string }>({
    index: -1,
    message: "",
  });
  const [seniorDate, setSeniorDate] = useState("");

  const [darkMode] = useRecoilState(isDarkModeState);

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
      setPindingState(false);
      return setErorr({ index: 0, message: "تــأكد مــن الــبيانــات" });
    }
    if (!dataObj.startDate) {
      setPindingState(false);
      return setErorr({ index: 1, message: "تــأكد مــن سـنـه الـتـجنيد" });
    }
    if (!dataObj.redifType) {
      setPindingState(false);
      return setErorr({ index: 2, message: "تــأكد مــن نــوع الـرديـف" });
    }
    // if (!dataObj.crLevel) {
    //   return setErorr({ index: 3, message: "تــأكد مــن نــوع الـرديـف" });
    // }
    if (!dataObj.redifTypePush) {
      setPindingState(false);
      return setErorr({ index: 3, message: "تــأكد مــن رقــم الــدفــعة" });
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
      <Helmet>
        <title>شؤون المجندين || تاريخ التسريح</title>
        <meta
          name="description"
          content="تطبيق شؤون المجندين لوزارة الداخلية يهدف الي تطوير البنية التحتية لوزارة الداخلية وزيادة كفاءة الخدمات المقدمة للشعب المصري وتسهيل الاجراءات الخاصة بالمجندين"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className={`flex justify-center mt-16 container mx-auto`}>
        <form
          ref={ref}
          // action={handleFormSubmit}
          onSubmit={(e) => {
            e.preventDefault();

            if (ref.current) {
              handleFormSubmit(new FormData(ref.current));
            }
          }}
          className={`flex flex-col gap-4 rounded-[5px] p-[15px] ${
            darkMode
              ? "bg-[#242f3e] shadow-[3px_5px_6px_3px_#2318189e]"
              : "shadow-[3px_5px_6px_3px_#2318187d]"
          }`}
        >
          {componentsInputs.map((component, index) => (
            <DataView
              error={error}
              key={index}
              index={index}
              component={component}
              className={`w-full text-[14px] py-1 bg-red-400 text-white rounded-[2px] text-center`}
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
