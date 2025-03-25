// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";

// interface NameSSFContextProps {
//   nameSSF: string;
//   setNameSSF: (name: string) => void;
// }

// const NameSSFContext = createContext<NameSSFContextProps | undefined>(
//   undefined
// );

// export const NameSSFProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [nameSSF, setNameSSF] = useState("");

//   useEffect(() => {
//     const storedName = window.localStorage.getItem("nameSSF");
//     if (storedName) {
//       setNameSSF(storedName);
//     }
//   }, []);

//   const updateNameSSF = (name: string) => {
//     setNameSSF(name);
//     window.localStorage.setItem("nameSSF", name);
//   };

//   return (
//     <NameSSFContext.Provider value={{ nameSSF, setNameSSF: updateNameSSF }}>
//       {children}
//     </NameSSFContext.Provider>
//   );
// };

// export const useNameSSF = () => {
//   const context = useContext(NameSSFContext);
//   if (!context) {
//     throw new Error("useNameSSF must be used within a NameSSFProvider");
//   }
//   return context;
// };

// export default NameSSFProvider;
