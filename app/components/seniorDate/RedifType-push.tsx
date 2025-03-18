function RedifTypePush() {
  return (
    <div className={`flex gap-2 `}>
      <label className="cursor-pointer" htmlFor="redifType_push_1">
        دفعة 1
      </label>
      <input
        type="radio"
        className="cursor-pointer"
        id="redifType_push_1"
        name="redifTypePush"
        value="redifType_push_1"
      />
      <label className="cursor-pointer" htmlFor="redifType_push_4">
        دفعة 4
      </label>
      <input
        type="radio"
        className="cursor-pointer"
        id="redifType_push_4"
        name="redifTypePush"
        value="redifType_push_4"
      />

      <label className="cursor-pointer" htmlFor="redifType_push_7">
        دفعة 7
      </label>
      <input
        type="radio"
        className="cursor-pointer"
        id="redifType_push_7"
        name="redifTypePush"
        value="redifType_push_7"
      />

      <label className="cursor-pointer" htmlFor="redifType_push_10">
        دفعة 10
      </label>
      <input
        type="radio"
        className="cursor-pointer"
        id="redifType_push_10"
        name="redifTypePush"
        value="redifType_push_10"
      />
    </div>
  );
}

export default RedifTypePush;
