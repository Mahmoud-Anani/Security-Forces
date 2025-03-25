import ExcelReader from "~/components/excel/ExcelReader";
import type { Route } from "./+types/home";
import { Button } from "@mui/material";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "تطبيق شؤون المجندين لوزارة الداخلية" },
    {
      name: "description",
      content: `تطبيق شؤون المجندين لوزارة الداخلية يهدف الي تطوير البنية التحتيتة لوزارة الداخلية وزيادة كفاءة الخدمات المقدمة للشعب المصري وتسهيل الاجراءات الخاصة بالمجندين`,
    },
  ];
}

export default function Home() {
  return (
    <>
      <Button variant="contained">Contained</Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons">
        Link
      </Button>
      {/* <ExcelReader /> */}
    </>
  );
}
