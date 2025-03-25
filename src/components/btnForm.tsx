export default function BtnSubmit({
  buttonText,
  classes,
  nativeStyls,
  pending,
}: {
  buttonText: string;
  classes: string;
  nativeStyls: {};
  pending: boolean;
}) {
  return (
    <button disabled={pending} style={nativeStyls} className={`${classes}`}>
      {pending ? "جاري الحساب..." : buttonText}
    </button>
  );
}
