import { Helmet } from "react-helmet";
import ExcelReader from "../components/excel/ExcelReader";

function DataBaseView() {
  return (
    <>
      <Helmet>
        <title>شؤون المجندين || عرض البيانات</title>
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

export default DataBaseView