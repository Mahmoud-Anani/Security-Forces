import type { Route } from "./+types/home";
import {  } from "exceljs";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <h1>hello</h1>;
}
