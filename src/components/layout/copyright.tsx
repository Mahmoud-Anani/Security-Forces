import React from "react";

const Copyright: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`text-center py-16`}
    >
      <p>© {currentYear} Security Forces. All rights reserved.</p>
    </footer>
  );
};

export default Copyright;
