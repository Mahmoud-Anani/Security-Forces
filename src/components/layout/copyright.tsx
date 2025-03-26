import React from "react";
import { Link } from "react-router";

const Copyright: React.FC = () => {
  const currentYear = new Date().toLocaleDateString("ar-EG", {
    year: "numeric",
  });

  return (
    <footer
      style={{ direction: "rtl" }}
      className={`text-center py-3 mt-10 rounded-t-2xl flex justify-center items-center gap-2 w-full font-semibold bg-[#cc696919]`}
    >
      <p>
        جميع الحقوق محفوظة لدي{" "}
        <Link to={"https://www.linkedin.com/in/mahmoud-anani"}>
          {" "}
          Mahmoud Anani©{" "}
        </Link>
      </p>
      <span>{currentYear}.</span>
    </footer>
  );
};

export default Copyright;
