import React, { useCallback, useEffect, useRef, useState } from "react";
import type { Route } from "./+types/home";
import { listSSFs, nameSSFState } from "~/stores/seniorDate";
import Popup from "~/components/utils/popup";
import { useNameSSF } from "~/context/nameSSFContext";
import { useRecoilState } from "recoil";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [nameSSF, setNameSSF] = useRecoilState(nameSSFState);
  const [isPopupVisible, setPopupVisible] = useState(
    nameSSF.length > 2 ? false : true
  );
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

      if (!listSSFs.includes(value)) {
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
                className={`text-center w-auto rounded-2xl border-2 border-[#3f282811] p-2 my-2`}
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
        onClose={() => setPopupVisible(false)}
        value={nameSSF}
      />
    </>
  );
}
