import { findMemberById } from "./script.js";

function construct(resultData) {
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
    set member(value) {
      this._member = value;
    },
    get member() {
      return this._member;
    },
  };
  // Add member object to results
  ResultObject.member = findMemberById(resultData.memberId);
  // Add time result to object
  ResultObject.time = resultData.time;
  // Make id property non writeable
  Object.defineProperty(ResultObject, "id", { writable: false });
  return ResultObject;
}

export { construct };
