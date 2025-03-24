import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useRecoilState } from "recoil";
import { linksApp } from "~/stores/mainData";
import { sidebarState } from "~/stores/seniorDate";

function Sidebar() {
  const [sidebar, setSidebar] = useRecoilState(sidebarState);

  const sidebarUiRef = useRef<HTMLButtonElement>(null);

  if (!sidebar) {
    setTimeout(() => {
      if (sidebarUiRef.current) {
        sidebarUiRef.current.style.display = "none";
      }
    }, 400);
  } else {
    if (sidebarUiRef.current) {
      sidebarUiRef.current.style.display = "block";
    }
  }
  useEffect(() => {
    document.body.style.maxHeight = "100vh";
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div
      className={`sm:hidden block z-20 absolute  top-0 left-0 text-white bg-[#000000e3] h-full shadow-md duration-500`}
      style={{
        width: sidebar ? "100%" : "0",
        // display: sidebar ? "block" : "none",
      }}
    >
      <button
        ref={sidebarUiRef}
        className={`cursor-pointer ${
          sidebar ? "animate-bounce" : ""
        } mt-5 duration-1000`}
        style={{ rotate: sidebar ? "270deg" : "400deg" }}
        onClick={() => setSidebar(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
          />
        </svg>
      </button>
      {/* Links */}
      {sidebar && (
        <div className={`h-[100vh] flex flex-col justify-between items-center`}>
          <ul
            className={`flex flex-col justify-center gap-8 mt-5 text-center font-bold text-3xl `}
          >
            {linksApp.map((link, index) => (
              <li
                key={index}
                className={`p-[2px_70px] bg-[#2b2b2b70] rounded-[10px]`}
              >
                <Link
                  to={link.link}
                  className={`w-full hover:text-[#5f2323] hover:underline duration-200`}
                  style={{ whiteSpace: sidebar ? "nowrap" : "normal" }}
                  onClick={() => setSidebar(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
