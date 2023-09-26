function construct(resultData) {
  // console.log("constructor is called");
  const ResultObject = {
    date: new Date(resultData.date),
    id: resultData.id,
    discipline: resultData.discipline,
    type: resultData.resultType,
    _time: undefined,
    isTraining() {
      return this.type === "training";
    },
    isCompetition() {
      return this.type === "competition";
    },
    timeToString() {
      return resultData.time;
    },
    set time(time) {
      const [min, sec, hundredthOfSec] = resultData.time
        .replaceAll(".", ":")
        .split(":")
        .map(a => Number(a));
      // Time in milliseconds
      this._time = min * 60 * 1000 + sec * 1000 + hundredthOfSec * 10;
    },
    get time() {
      return this._time;
    },
  };
  ResultObject.time = resultData.time;
  Object.defineProperty(ResultObject, "_time", { enumerable: false });
  return ResultObject;
}

export { construct };
