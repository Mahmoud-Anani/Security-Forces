import { useEffect, useState } from "react";
import { handleFileInputChange } from "./ExcelReader";
import { useRecoilState } from "recoil";
import { workbookDataState } from "../../stores/seniorDate";
import { toast } from "react-toastify";

function DataMatching() {
  const [data] = useRecoilState(workbookDataState);

  const [fileMatchOne, setFileMatchOne] = useState([]);
  const [fileMatchOneTitles, setFileMatchOneTitles] = useState([]);
  // const [dataFileMatching, setDataFileMatching] = useState({
  //   fileHaveTopTitle: "",
  //   coulmnsSelections: [] as string[],
  // });
  const [fileHaveTopTitle, setFileHaveTopTitle] = useState("");
  const [coulmnsSelections, setCoulmnsSelections] = useState<string[]>([]);

  useEffect(() => {
    if (fileMatchOne.length > 0) {
      const lastNames: string[] = [];
      fileMatchOne.map((row: any[]) => {
        if (typeof row[0] === "number") {
          return lastNames.push(row[1]);
        }
        return;
      });

      // const cloneMainData = data;
      setFileMatchOneTitles(
        fileMatchOne[fileHaveTopTitle === "fileHaveTopTitle" ? 1 : 0]
      );

      // const dataLast = data.filter((row) => lastNames.includes(row[1]));

      // setData([data[0], ...newData]);
    }
  }, [fileMatchOne]);
  const uploadMatchingFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileInputChange(e, setFileMatchOne, false);
  };
  const submitFormMatching = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      fileMatchOne.length <= 0 ||
      !fileHaveTopTitle ||
      coulmnsSelections.length <= 0
    ) {
      toast.error("تأكد من البيانات");
      return;
    }

    /*
  if(data['الاسم'] === fileMatchOne['الاسم']) {
      obj['coulmnsSelections']= fileMatchOne['fileMatchOne']
  }
  */
    const newData = data.map((row, index) => {
      if (
        `${row[1]}`.split(" ").slice(0, 4).join("") ===
        `${fileMatchOne[index][1] || ""}`.split(" ").slice(0, 4).join("")
      ) {
        coulmnsSelections.map(
          (coulmn) => (row[coulmn] = fileMatchOne[index][coulmn])
        );
      }
    });

    console.log(newData);

    // console.log(data, fileMatchOne, coulmnsSelections);
  };

  const handleSelectionFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoulmnsSelections((prive) =>
      prive.includes(`${e.target.value}`)
        ? prive.filter((cuolmn) => cuolmn !== e.target.value)
        : [...prive, e.target.value]
    );
  };

  return (
    <div className={`container mx-auto`}>
      <form onSubmit={submitFormMatching} className="m-5 flex flex-col gap-5">
        <div className="flex gap-3">
          <label
            htmlFor="fileHaveTopTitle"
            className={`p-2 cursor-pointer rounded-2xl ${
              fileHaveTopTitle === "fileHaveTopTitle"
                ? "bg-[#cc696969]"
                : "bg-transparent"
            }`}
          >
            الملف يحتوي علي عنوان
            <input
              type="radio"
              name="fileHaveTopTitle"
              id="fileHaveTopTitle"
              value="fileHaveTopTitle"
              className="hidden"
              onChange={(e) => setFileHaveTopTitle(e.target.value)}
            />
          </label>
          <label
            htmlFor="fileHaveNotTopTitle"
            className={`p-2 cursor-pointer rounded-2xl ${
              fileHaveTopTitle === "fileHaveNotTopTitle"
                ? "bg-[#cc696969]"
                : "bg-transparent"
            }`}
          >
            الملف لا يحتوي علي عنوان
            <input
              type="radio"
              name="fileHaveTopTitle"
              id="fileHaveNotTopTitle"
              value="fileHaveNotTopTitle"
              className="hidden"
              onChange={(e) => setFileHaveTopTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="flex gap-5">
          {fileMatchOneTitles.map((coulmnText, index) => (
            <label key={index}>
              {coulmnText}
              <input
                onChange={handleSelectionFields}
                value={coulmnText}
                type="checkbox"
                name={coulmnText}
              />
            </label>
          ))}
        </div>
        <input
          type="file"
          className="m-5 cursor-pointer bg-[#00000007]"
          title="الملف المنقول منه"
          onChange={uploadMatchingFile}
        />
        <button type="submit" className={`cursor-pointer`}>
          دمج و عرض
        </button>
        {/* <div className="w-full ">
          <ExcelReader />
        </div> */}
      </form>
    </div>
  );
}

export default DataMatching;
