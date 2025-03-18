import { useFormStatus } from "react-dom";
import type { SeniorData } from "~/types/dataOfSeniors";

export default function BtnSubmit({
  buttonText,
  classes,
  nativeStyls,
}: {
  buttonText: string;
  classes: string;
  nativeStyls: {};
}) {
  const { pending, data, action, method } = useFormStatus();

  const dataObj = {
    startDate: data?.get("startDate"),
    crLevel: data?.get("cr-level"),
    redifType: data?.get("redifType"),
  };

  return (
    <button disabled={pending} style={nativeStyls} className={`${classes}`}>
      {pending ? "جاري الحساب..." : buttonText}
    </button>
  );
}
