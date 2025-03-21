import React, { useState } from "react";
import { Link } from "react-router";
import { useRecoilState } from "recoil";
import { nameSSFState } from "~/stores/seniorDate";

const Navbar: React.FC = () => {
  const [nameSSF, setNameSSF] = useRecoilState(nameSSFState);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  };

  const linksApp = [
    {
      name: "الرئيسية",
      link: "/",
    },
    {
      name: "تاريخ التسريح",
      link: "/senior-date",
    },
  ];
  return (
    <nav
      className={`p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className={`flex items-center gap-2`}>
          <img
            src="/public/favicon.ico"
            alt="logo"
            className="w-14 h-14 rounded-full"
          />
          <h1 className="text-xl aref-ruqaa-bold ">
            قوات أمن{" "}
            <span className={`underline text-[#5f2323]`}>
              {nameSSF.toString()}
            </span>
          </h1>
        </Link>
        {/* Links */}
        <ul className="flex gap-4">
          {linksApp.map((link, index) => (
            <li key={index}>
              <Link
                to={link.link}
                className={`hover:text-[#5f2323] hover:underline duration-200`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <button
          onClick={toggleDarkMode}
          className="cursor-pointer px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {!darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
