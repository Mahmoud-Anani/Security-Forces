function RedifType() {
  return (
    <div className={`flex gap-2 justify-between`}>
      <label className="cursor-pointer" htmlFor="redifType_null">
        بدون
      </label>
      <input
        type="radio"
        className="cursor-pointer"
        id="redifType_null"
        name="redifType"
        value="redifType_null"
      />

      <label className="cursor-pointer" htmlFor="redifType_open">
        قابلة
      </label>
      <input
        type="radio"
        className="cursor-pointer"
        id="redifType_open"
        name="redifType"
        value="redifType_open"
      />

      <label className="cursor-pointer" htmlFor="redifType_close">
        غير قابلة
      </label>
      <input
        type="radio"
        className="cursor-pointer"
        id="redifType_close"
        name="redifType"
        value="redifType_close"
      />
    </div>
  );
}

export default RedifType;
