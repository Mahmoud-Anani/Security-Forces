"use client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  isDarkModeState,
  nameSSFState,
  sidebarState,
} from "../../stores/seniorDate";
import logo from "../../../public/favicon.ico";
import { linksApp } from "../../stores/mainData";
import WhatsNameSSF from "./whatsNameSSF";
import { ToastContainer } from "react-toastify";

import { NavLink } from "react-router"; // Correct import for NavLink
const Navbar: React.FC = () => {
  const [nameSSF] = useRecoilState(nameSSFState);
  const [darkMode, setDarkMode] = useRecoilState(isDarkModeState);
  const [, setSidebar] = useRecoilState(sidebarState);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window && localStorage.setItem("mode", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    const mode = window && localStorage.getItem("mode");
    if (mode === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }

    // change mode by keyboard shortcut
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "m") {
        event.preventDefault(); // Prevent default behavior
        setDarkMode((prev) => !prev);
        document.body.classList.toggle("dark");
        console.log("click");

        localStorage.setItem(
          "mode",
          localStorage.getItem("mode") === "dark" ? "light" : "dark"
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className={`p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } shadow-md`}
    >
      <ToastContainer />
      <WhatsNameSSF />
      <div className="container mx-auto flex justify-between items-center relative">
        <NavLink to="/" className={`flex items-center gap-2`}>
          <img src={logo} alt="logo" className="w-14 h-14 rounded-full" />
          <h1 className="text-xl aref-ruqaa-bold">
            قوات أمن{" "}
            <span className="underline text-[#cc6969]">
              {typeof window !== "undefined" && nameSSF
                ? nameSSF.toString()
                : ""}
            </span>
          </h1>
        </NavLink>
        {/* Links */}
        <ul className="hidden sm:flex gap-4 absolute left-[50%] -translate-x-[50%]">
          {linksApp.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.link} // Ensure valid paths in linksApp
                className={`hover:text-[#5f2323] hover:underline duration-200`}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={`flex gap-4 items-center`}>
          <button
            onClick={toggleDarkMode}
            className={`cursor-pointer p-[10px] rounded-[5px] ${
              darkMode ? `bg-[#161c25a1]` : `bg-[#f0f0f082]`
            }`}
          >
            {!darkMode ? "🌙" : "☀️"}
          </button>
          {/* toggle menu (Side Bar) */}
          <button
            className={`sm:hidden block p-[10px] rounded-[5px] ${
              darkMode ? `bg-[#161c25a1]` : `bg-[#f0f0f082]`
            }`}
            onClick={() => {
              setSidebar((prive) => !prive);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
