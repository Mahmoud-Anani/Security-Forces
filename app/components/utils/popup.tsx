import React, { useState } from "react";
import { listSSFs } from "~/stores/seniorDate";
import logo from "~/../public/favicon.ico";

interface PopupProps {
  isVisible: boolean;
  title: string;
  content: React.ReactNode;
  value: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({
  isVisible,
  title,
  content,
  value,
  onClose,
}) => {
  if (!isVisible) return null;

  const OnCloseButNotAddSSF = () => {
    if (!listSSFs.includes(value)) {
      return;
    }
    onClose();
  };

  return (
    <>
      <div className="bg-white rounded-4xl text-black aref-ruqaa-bold text-3xl z-10 absolute transform translate-x-[-50%] left-[50%] top-[10%]">
        <button
          onClick={OnCloseButNotAddSSF}
          className="sm:block hidden cursor-pointer relative left-[15%] bottom-[10%] text-xl mt-2"
        >
          ❌
        </button>
        <div className="flex flex-col items-center gap-4 sm:p-4 py-2 rounded-lg ">
          <img src={logo} alt="logo" className="w-40 h-40 rounded-full" />
          <div className="flex gap-1 justify-center items-center">
            <h2>{title}</h2>
          </div>
          {content}
        </div>
      </div>
      <div
        className={`h-[100vh] w-[100%] absolute top-0 left-0 z-[1] opacity-60 bg-black`}
        onClick={OnCloseButNotAddSSF}
      ></div>
    </>
  );
};

export default Popup;
