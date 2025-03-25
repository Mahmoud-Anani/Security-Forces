import ExcelReader from "../components/excel/ExcelReader";
// import type { Route } from "./+types/home";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "تطبيق شؤون المجندين لوزارة الداخلية" },
//     {
//       name: "description",
//       content: `تطبيق شؤون المجندين لوزارة الداخلية يهدف الي تطوير البنية التحتيتة لوزارة الداخلية وزيادة كفاءة الخدمات المقدمة للشعب المصري وتسهيل الاجراءات الخاصة بالمجندين`,
//     },
//   ];
// }

export default function Home() {
  return (
    <>
      <ExcelReader />
    </>
  );
}
