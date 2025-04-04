export const linksApp = [
  {
    name: "الرئيسية",
    link: "/",
  },
  {
    name: "تاريخ التسريح",
    link: "/senior-date",
  },
  {
    name: "الاستعلامات",
    link: "/data-base-view",
  },
  {
    name: "التحليلات",
    link: "/analysis",
  },
  {
    name: "دفع جديد",
    link: "/add-soldier",
  },
];

export const listSSFs = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "القليوبية",
  "الدقهلية",
  "الشرقية",
  "العاشر",
  "الغربية",
  "المنوفية",
  "البحيرة",
  "كفر الشيخ",
  "الإسماعيلية",
  "السويس",
  "بورسعيد",
  "دمياط",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر",
  "الوادي الجديد",
  "مرسى مطروح",
  "شمال سيناء",
  "جنوب سيناء",
];

export const listColumns = [
  "م",
  "الاسم",
  "السرية",
  "جهة قضاء الخدمة",
  "تاريخ التجنيد",
  "نوع المؤهل",
  "نوع الرديف",
  "رقم الشرطة",
  "المحافظة",
  "محل الإقامة",
  "الرقم القومي",
  "الرقم الثلاثي",
  "التشغيل",
  "الرديف",
  "سرايا قسم قوات امن العاشر",
  "الرتبة",
  "منع من حمل السلاح",
  "العمل المسند اليه",
  "الكلية",
  "الصنعه",
  "الملاحظات",
  "تاريخ القرار",
  "الديانة",
  "خطط الاجازات",
  "LEN",
  "التوصيات",
  "التفاصيل",
]; // 27 columns

export const soldier: ColumnData = {
  id: "",
  name: "",
  company: "س10",
  serviceLocation: "قوات الامن",
  recruitmentDate: "",
  qualificationType: "",
  reserveType: "",
  policeNumber: "",
  governorate: "",
  residence: "",
  nationalId: "",
  tripleNumber: "",
  operation: "",
  reserve: "",
  securityForces: "",
  rank: "",
  weaponRestriction: "",
  assignedWork: "",
  college: "",
  profession: "",
  notes: "",
  decisionDate: "",
  religion: "",
  vacationPlans: "",
  len: "",
  recommendations: "",
  details: "",
  phoneNumber: "",
  phoneNumber2: "",
};

export interface ColumnData {
  id: string | number; // "م" @autoincrement
  name: string; // "الاسم"
  company: string; // "السرية" !
  serviceLocation: string; // "جهة قضاء الخدمة"
  recruitmentDate: string | Date; // "تاريخ التجنيد"
  qualificationType: string; // "نوع المؤهل"
  reserveType: string; // "نوع الرديف"
  policeNumber: string; // "رقم الشرطة"
  governorate: string; // "المحافظة" !
  residence: string; // "محل الإقامة"
  nationalId: string; // "الرقم القومي"
  tripleNumber: string; // "الرقم الثلاثي"
  operation: string; // "التشغيل"
  reserve: string; // "الرديف"
  securityForces: string; // "سرايا قسم قوات امن العاشر"
  rank: string; // "الرتبة"
  weaponRestriction: string; // "منع من حمل السلاح"
  assignedWork: string; // "العمل المسند اليه"  !
  college: string; // "الكلية"
  profession: string; // "الصنعه"
  notes: string; // "الملاحظات"
  decisionDate: string | Date; // "تاريخ القرار" !
  religion: string; // "الديانة"
  vacationPlans: string; // "خطط الاجازات"
  len: string; // "LEN"
  recommendations: string; // "التوصيات"
  details: string; // "التفاصيل"
  phoneNumber?: string; // "رقم التليفون"
  phoneNumber2?: string; // "رقم ولي الأمر"
}
