import { Helmet } from "react-helmet";
import ExcelReader from "../components/excel/ExcelReader";
import { enterPasswordAppState } from "../stores/seniorDate";
import { useRecoilState } from "recoil";
import Popup from "../components/utils/popup";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import DBAnalysis from "./dBAnalysis";

function Home() {
  const [enterPasswordApp, setEnterPasswordApp] = useRecoilState<boolean>(
    enterPasswordAppState
  );
  if (enterPasswordApp) {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  const [value, setValue] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    []
  );

  const inputRef = useRef(null);
  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        value.toString().trim().toLowerCase() === import.meta.env.VITE_PASSWORD
      ) {
        toast.success("تم تسجيل الدخول بنجاح");
        setEnterPasswordApp(false);
        // set cookie

        Cookies.set("auth", "true", { expires: 0.25 }); // 1 day
      } else {
        toast.error("كلمة المرور غير صحيحة");
      }
    },
    [value, setEnterPasswordApp]
  );
  useEffect(() => {}, [enterPasswordApp]);
  return (
    <div className={`container mx-auto`}>
      <Helmet>
        <title>تطبيق شؤون المجندين لوزارة الداخلية</title>
        <meta
          name="description"
          content="تطبيق شؤون المجندين لوزارة الداخلية يهدف الي تطوير البنية التحتية لوزارة الداخلية وزيادة كفاءة الخدمات المقدمة للشعب المصري وتسهيل الاجراءات الخاصة بالمجندين"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <DBAnalysis showLine={false} />

      <div className="flex flex-col gap-5 items-center">
        <h1
          style={{ fontFamily: "Aref Ruqaa" }}
          className={`text-2xl p-2 font-semibold border-b-4 border-[#cc6969] hover:border-[#8eb79a] duration-200 rounded-b-2xl `}
        >
          لـلأســتــعـــلام الــســريــع
        </h1>
        <div className="w-full ">
          <ExcelReader />
        </div>
      </div>

      <Popup
        isVisible={enterPasswordApp}
        title="ادخل كلمة المرور"
        content={
          <div className={`px-2 `}>
            <form
              onSubmit={handleFormSubmit}
              className={`flex outline flex-nowrap sm:max-w-[400px] max-w-[300px] px-2 rounded-2xl hover:bg-[#3333341d]`}
            >
              <input
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                onChange={handlePasswordChange}
                maxLength={6}
                minLength={6}
                placeholder="ادخل كلمة المرور..."
                className={`border-0 outline-0 p-2 w-full`}
              />
              {value && (
                <button
                  className={`cursor-pointer me-2 text-2xl text `}
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? hidPassword : unHidPassword}{" "}
                </button>
              )}
            </form>
          </div>
        }
        value={value}
        onClose={() => {
          toast.error("يجب ادخال كلمة المرور للدخول");
        }}
      />
    </div>
  );
}

export default memo(Home);

export const hidPassword = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
  </svg>
);
export const unHidPassword = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path
      fillRule="evenodd"
      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
      clipRule="evenodd"
    />
  </svg>
);
