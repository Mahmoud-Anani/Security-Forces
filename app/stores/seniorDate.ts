import { atom } from "recoil";

const nameSSFState = atom({
  key: "nameSSFState",
  default:
    (typeof window !== "undefined" && localStorage.getItem("nameSSF")) || "",
});

const listSSFs = [
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

export { nameSSFState, listSSFs };
