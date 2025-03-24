function SubError({
  errorMessage,
  classes,
}: {
  errorMessage: string;
  classes: string;
}) {
  return <span className={`${classes}`}>{errorMessage}</span>;
}

export default SubError;
