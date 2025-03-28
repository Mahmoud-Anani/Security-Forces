import { Helmet } from "react-helmet";
import ExcelReader from "../components/excel/ExcelReader";
import BtnsPrint from "../components/dbView/btnsPrint";

function DataBaseView() {
  
  return (
    <div className={`container mx-auto sm:px-0 px-2 my-5`}>
      <Helmet>
        <title>شؤون المجندين || عرض البيانات</title>
        <meta
          name="description"
          content="تطبيق شؤون المجندين لوزارة الداخلية يهدف الي تطوير البنية التحتيتة لوزارة الداخلية وزيادة كفاءة الخدمات المقدمة للشعب المصري وتسهيل الاجراءات الخاصة بالمجندين"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className="flex flex-col gap-5 items-center">
        <h1
          style={{ fontFamily: "Aref Ruqaa" }}
          className={`text-2xl p-2 font-semibold border-b-4 border-[#cc6969] hover:border-[#8eb79a] duration-200 rounded-b-2xl `}
        >
          الأسـتـعـلام و طـبـاعـة الـكـشوفـات
        </h1>
        <BtnsPrint />
        <div className="w-full ">
          <ExcelReader />
        </div>
      </div>
    </div>
  );
}

export default DataBaseView;
