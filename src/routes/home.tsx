import { Helmet } from "react-helmet";
import ExcelReader from "../components/excel/ExcelReader";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>تطبيق شؤون المجندين لوزارة الداخلية</title>
        <meta
          name="description"
          content="تطبيق شؤون المجندين لوزارة الداخلية يهدف الي تطوير البنية التحتيتة لوزارة الداخلية وزيادة كفاءة الخدمات المقدمة للشعب المصري وتسهيل الاجراءات الخاصة بالمجندين"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <ExcelReader />
    </>
  );
}
