import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  enterPasswordAppState,
  workbookDataState,
} from "../../stores/seniorDate";
import Cookies from "js-cookie";

function MainRender() {
  // @ts-ignore
  const [, setData] = useRecoilState<any[][] | [null]>(workbookDataState);
  const [, setEnterPasswordApp] = useRecoilState<boolean>(
    enterPasswordAppState
  );

  useEffect(() => {
    const data = localStorage.getItem("workbookData") || [];
    if (data.length > 0) {
      // @ts-ignore
      setData(JSON.parse(data));
      // Cookies.set("auth", "true", { expires: 0.25 });
      const auth = Cookies.get("auth") || "";
      if (auth === "true") {
        setEnterPasswordApp(false);
        return;
      }
      setEnterPasswordApp(true);
    } else {
      setData(JSON.parse(JSON.stringify(data)));
      setEnterPasswordApp(false);
    }
  }, []);
  return <></>;
}

export default MainRender;
