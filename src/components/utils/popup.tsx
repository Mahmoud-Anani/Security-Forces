import React, { useEffect } from "react";
import logo from "../../../public/favicon.ico";

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
  onClose,
}) => {
  if (!isVisible) return null;

  const OnCloseButNotAddSSF = () => {
    // document.body.style.maxHeight = "auto";
    // document.body.style.overflow = "auto";
    onClose();
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // document.body.style.maxHeight = "100vh";
    // document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      <div className="bg-white rounded-4xl text-black aref-ruqaa-bold text-3xl z-[999] max-w-[500px] w-[90%] absolute transform translate-x-[-50%] left-[50%] top-[10%]">
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
        className={`h-[100vh] w-[100%] backdrop-blur-sm  absolute top-0 left-0 z-[99] opacity-90 bg-black`}
        onClick={OnCloseButNotAddSSF}
      ></div>
    </>
  );
};

export default Popup;
