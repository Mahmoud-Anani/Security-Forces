import { useForm, SubmitHandler } from "react-hook-form";
import { ColumnData, listSSFs, soldier } from "../stores/mainData"; // Import listSSFs
import { useRecoilState } from "recoil";
import { addedSoldiersState } from "../stores/seniorDate";
import AddedSoldierUI from "../components/addSoldier/addedSoldierUI";
import { toast } from "react-toastify";

function AddSoldier() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ColumnData>();
  const [addedSoldiers, setAddedSoldiers] = useRecoilState(addedSoldiersState);
  const onSubmit: SubmitHandler<ColumnData> = (data) => {
    const isNameAlrydeInserted = addedSoldiers.some(
      (soldier) =>
        soldier.name === data.name && soldier.nationalId === data.nationalId
    );
    if (isNameAlrydeInserted) {
      toast.error("تــمــت أضــافــة هــذا الــجــنــد");
      return;
    }
    const religion = data.religion === "مسلم" ? "" : data.religion;

    let reserve: string | Date = data.reserve;

    // غير قابلة
    if (data.reserveType === "غير قابلة") {
      // دفعة 1
      if (`${data.recruitmentDate}`.split("-")[1].includes("01")) {
        switch (data.qualificationType) {
          case "عليا":
            reserve = `01/05/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;

            break;
          case "متوسط":
            reserve = `01/05/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
            break;
          case "فوق متوسط":
            reserve = `01/11/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;
            break;

          default:
            reserve = `01/05/${+`${data.recruitmentDate}`.split("-")[0] + 3}`;
            break;
        }
      }
      // دفعة 4
      if (`${data.recruitmentDate}`.split("-")[1].includes("04")) {
        switch (data.qualificationType) {
          case "عليا":
            reserve = `01/08/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;
            break;
          case "متوسط":
            reserve = `01/08/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
            break;
          case "فوق متوسط":
            reserve = `01/02/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
            break;

          default:
            reserve = `01/08/${+`${data.recruitmentDate}`.split("-")[0] + 3}`;
            break;
        }
      }
      // دفعة 7
      if (`${data.recruitmentDate}`.split("-")[1].includes("07")) {
        switch (data.qualificationType) {
          case "عليا":
            reserve = `01/11/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;
            break;
          case "متوسط":
            reserve = `01/11/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
            break;
          case "فوق متوسط":
            reserve = `01/05/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
            break;

          default:
            reserve = `01/11/${+`${data.recruitmentDate}`.split("-")[0] + 3}`;
            break;
        }
      }
      // دفعة 10
      if (`${data.recruitmentDate}`.split("-")[1].includes("10")) {
        switch (data.qualificationType) {
          case "عليا":
            reserve = `01/02/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
            break;
          case "متوسط":
            reserve = `01/02/${+`${data.recruitmentDate}`.split("-")[0] + 3}`;
            break;
          case "فوق متوسط":
            reserve = `01/08/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
            break;

          default:
            reserve = `01/02/${+`${data.recruitmentDate}`.split("-")[0] + 4}`;
            break;
        }
      }
    }
    // بدون و قابلة
    // دفعة 1
    if (`${data.recruitmentDate}`.split("-")[1].includes("01")) {
      switch (data.qualificationType) {
        case "عليا":
          reserve = `01/03/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;
          break;
        case "متوسط":
          reserve = `01/03/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
          break;
        case "فوق متوسط":
          reserve = `01/09/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;
          break;

        default:
          reserve = `01/03/${+`${data.recruitmentDate}`.split("-")[0] + 3}`;
          break;
      }
    }
    // دفعة 4
    if (`${data.recruitmentDate}`.split("-")[1].includes("04")) {
      switch (data.qualificationType) {
        case "عليا":
          reserve = `01/06/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;
          break;
        case "متوسط":
          reserve = `01/06/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
          break;
        case "فوق متوسط":
          reserve = `01/12/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;
          break;

        default:
          reserve = `01/06/${+`${data.recruitmentDate}`.split("-")[0] + 3}`;
          break;
      }
    }
    // دفعة 7
    if (`${data.recruitmentDate}`.split("-")[1].includes("07")) {
      switch (data.qualificationType) {
        case "عليا":
          reserve = `01/09/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;
          break;
        case "متوسط":
          reserve = `01/09/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
          break;
        case "فوق متوسط":
          reserve = `01/03/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
          break;

        default:
          reserve = `01/09/${+`${data.recruitmentDate}`.split("-")[0] + 3}`;
          break;
      }
    }
    // دفعة 10
    if (`${data.recruitmentDate}`.split("-")[1].includes("10")) {
      switch (data.qualificationType) {
        case "عليا":
          reserve = `01/12/${+`${data.recruitmentDate}`.split("-")[0] + 1}`;
          break;
        case "متوسط":
          reserve = `01/12/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
          break;
        case "فوق متوسط":
          reserve = `01/06/${+`${data.recruitmentDate}`.split("-")[0] + 2}`;
          break;

        default:
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          reserve = `01/12/${+`${data.recruitmentDate}`.split("-")[0] + 3}`;
          break;
      }
    }

    setAddedSoldiers((prive) => [
      ...prive,
      {
        ...soldier,
        ...data,
        religion,
        reserve,
        id: addedSoldiers.length + 1,
      },
    ]); // reserve

    reset();
  };

  return (
    <div className="container mx-auto my-5 sm:px-0 px-2 flex flex-col gap-5 items-center">
      <h1
        style={{ fontFamily: "Aref Ruqaa" }}
        className={`text-2xl p-2 font-semibold border-b-4 border-[#cc6969] hover:border-[#8eb79a] duration-200 rounded-b-2xl `}
      >
        إضـــافـــة مـــجـــنـــديـــن
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 w-full"
      >
        <div>
          <label className="block font-medium">الاسم</label>
          <input
            {...register("name", {
              required: "الاسم مطلوب",
              minLength: {
                value: 3,
                message: "يجب أن يكون الاسم 3 أحرف على الأقل",
              },
            })}
            className="border p-2 w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium">تاريخ التجنيد</label>
          <input
            type="date"
            {...register("recruitmentDate", {
              required: "تاريخ التجنيد مطلوب",
            })}
            lang="ar-EG" // Set the language to Arabic
            defaultValue={new Date().toISOString().split("T")[0]} // Default to today's date
            className="border p-2 w-full"
          />
          {errors.recruitmentDate && (
            <p className="text-red-500">{errors.recruitmentDate.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">نوع المؤهل</label>
          <select
            {...register("qualificationType", { required: "نوع المؤهل مطلوب" })}
            defaultValue="عليا" // Set default value to "عليا"
            className="border p-2 w-full"
          >
            {/* <option value="">اختر نوع المؤهل</option> */}
            <option value="عليا">عليا</option>
            <option value="متوسط">متوسط</option>
            <option value="فوق متوسط">فوق متوسط</option>
            <option value="عادة">عادة</option>
          </select>
          {errors.qualificationType && (
            <p className="text-red-500">{errors.qualificationType.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">نوع الرديف</label>
          <select
            {...register("reserveType", { required: "نوع الرديف مطلوب" })}
            className="border p-2 w-full"
          >
            <option value="">اختر نوع الرديف</option>
            <option value="بدون">بدون</option>
            <option value="غير قابلة">غير قابلة</option>
            <option value="قابلة">قابلة</option>
          </select>
          {errors.reserveType && (
            <p className="text-red-500">{errors.reserveType.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">رقم الشرطة</label>
          <input
            {...register("policeNumber", { required: "رقم الشرطة مطلوب" })}
            className="border p-2 w-full"
          />
          {errors.policeNumber && (
            <p className="text-red-500">{errors.policeNumber.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">المحافظة</label>
          <input
            list="governorateList"
            {...register("governorate", { required: "المحافظة مطلوبة" })}
            className="border p-2 w-full"
          />
          <datalist id="governorateList">
            {listSSFs.map((ssf) => (
              <option key={ssf} value={ssf} />
            ))}
          </datalist>
          {errors.governorate && (
            <p className="text-red-500">{errors.governorate.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">محل الإقامة</label>
          <input
            {...register("residence", { required: "محل الإقامة مطلوب" })}
            className="border p-2 w-full"
          />
          {errors.residence && (
            <p className="text-red-500">{errors.residence.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">الرقم القومي</label>
          <input
            {...register("nationalId", {
              required: "الرقم القومي مطلوب",
              pattern: {
                value: /^[2-3]\d{13}$/, // Egyptian National ID format
                message:
                  "يجب أن يبدأ الرقم القومي بـ 2 أو 3 ويكون مكونًا من 14 رقمًا",
              },
            })}
            maxLength={14}
            className="border p-2 w-full"
          />
          {errors.nationalId && (
            <p className="text-red-500">{errors.nationalId.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">الرقم الثلاثي</label>
          <input
            {...register("tripleNumber", { required: "الرقم الثلاثي مطلوب" })}
            className="border p-2 w-full"
          />
          {errors.tripleNumber && (
            <p className="text-red-500">{errors.tripleNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">الملاحظات</label>
          <input
            type="text"
            {...register("notes")}
            className="border p-2 w-full"
            defaultValue={`ضم من معسكر مبارك بتاريخ ${new Date().toLocaleDateString(
              "ar-EG"
            )}م`}
          />
        </div>

        <div>
          <label className="block font-medium">الديانة</label>
          <select
            {...register("religion", { required: "الديانة مطلوبة" })}
            className="border p-2 w-full"
            defaultValue={"مسلم"}
          >
            <option value="مسلم">مسلم</option>
            <option value="مسيحي">مسيحي</option>
          </select>
          {errors.religion && (
            <p className="text-red-500">{errors.religion.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">رقم التليفون</label>
          <input
            type="text"
            {...register("phoneNumber", {
              required: "رقم التليفون مطلوب",
              pattern: {
                value: /^\d{11}$/, // Ensure exactly 11 digits
                message: "يجب أن يكون رقم التليفون مكونًا من 11 رقمًا",
              },
            })}
            className="border p-2 w-full"
            maxLength={11} // Limit to 11 digits
            minLength={11} // Ensure at least 11 digits
            placeholder="01111111111" // Placeholder for phone number
          />
          {errors.phoneNumber && (
            <p className="text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium">رقم تليفون الوالد</label>
          <input
            type="text"
            {...register("phoneNumber2", {
              pattern: {
                value: /^\d{11}$/, // Ensure exactly 11 digits
                message: "يجب أن يكون رقم التليفون مكونًا من 11 رقمًا",
              },
            })}
            className="border p-2 w-full"
            maxLength={11} // Limit to 11 digits
            minLength={11} // Ensure at least 11 digits
            placeholder="01111111111" // Placeholder for phone number
          />
          {errors.phoneNumber2 && (
            <p className="text-red-500">{errors.phoneNumber2.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-3xl !bg-[#c27272df] hover:!bg-[#c27272b6] duration-200 !border-0 rounded-[5px] cursor-pointer py-2"
        >
          إرسال
        </button>
      </form>
      <AddedSoldierUI />
    </div>
  );
}

export default AddSoldier;
