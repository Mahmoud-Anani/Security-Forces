import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { isPopupVisibleState, nameSSFState } from "../../stores/seniorDate";
import Popup from "../utils/popup";
import { listSSFs } from "../../stores/mainData";
import { toast } from "react-toastify";

function WhatsNameSSF() {
  const [nameSSF, setNameSSF] = useRecoilState(nameSSFState);
  const [isPopupVisible, setPopupVisible] = useRecoilState(isPopupVisibleState);
  const [errorNameSSF, setErrorNameSSF] = useState("");

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorNameSSF("");
      setNameSSF(e.target.value);
      window.localStorage.setItem("nameSSF", e.target.value);
    },
    [setNameSSF]
  );

  const handleOnblurName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (!listSSFs.includes(value.trim())) {
        setErrorNameSSF("تــأكد مـن اســم قـوات الأمــن");
      } else {
        setErrorNameSSF("");
        window.localStorage.setItem("nameSSF", value);
        setNameSSF(value);
        setTimeout(() => {
          setPopupVisible(false);
        }, 2000);
      }
    },
    [setNameSSF]
  );

  const inputNameSSF = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (window !== undefined) {
      if (localStorage.getItem("nameSSF") || ""?.length > 0) {
        setNameSSF(localStorage.getItem("nameSSF") || "");
        return setPopupVisible(false);
      }
      setPopupVisible(true);
    }
    inputNameSSF.current?.focus();
  }, []);

  return (
    <>
      <Popup
        isVisible={isPopupVisible}
        title="مَرْحَبًا بِكَ فِي نِظَامِ إِدَارَةِ قُوَّاتِ الأَمْنِ"
        content={
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="nameSSF">
              اسم قوات الامن:
              <input
                ref={inputNameSSF}
                name="nameSSF"
                type="text"
                onBlur={handleOnblurName}
                onChange={handleNameChange}
                value={nameSSF}
                className={`text-center w-[100%] rounded-2xl outline-0 border-2 border-[#261f1f] p-2 my-2`}
                list="nameSSFs"
              />
              <datalist id="nameSSFs">
                {listSSFs.map((ssf) => (
                  <option key={ssf} value={ssf} />
                ))}
              </datalist>
            </label>
            <span className="text-red-500 text-[22px] text-center">
              {errorNameSSF}
            </span>
          </form>
        }
        onClose={() => {
          if (!listSSFs.includes(nameSSF)) {
            toast.error("يجب اختيار اسم قوات الامن");
            return;
          }
          setPopupVisible(false);
        }}
        value={nameSSF}
      />
    </>
  );
}

export default WhatsNameSSF;
