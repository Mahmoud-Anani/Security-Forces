export default function BtnSubmit({
  buttonText,
  classes,
  nativeStyls,
  pending,
}: {
  buttonText: string;
  classes: string;
  nativeStyls: object;
  pending: boolean;
}) {
  return (
    <button disabled={pending} style={nativeStyls} className={`${classes}`}>
      {pending ? "جاري الحساب..." : buttonText}
    </button>
  );
}
