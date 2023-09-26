import { initTabs } from "./tabs.js";
import * as member from "./member.js";
import * as result from "./result.js";
import { fetchResults, fetchMembers } from "./data-fetch.js";

window.addEventListener("load", initApp);

const resultsArr = [];
const membersArr = [];

async function initApp() {
  initTabs();
  await buildResultsList();
  await buildMembersList();
  console.log(resultsArr);
  console.log(membersArr);
  // TODO: Make the rest of the program ...
}

async function buildResultsList() {
  const originalResults = await fetchResults();
  for (const jsonObj of originalResults) {
    const realObject = result.construct(jsonObj);
    resultsArr.push(realObject);
  }
}

async function buildMembersList() {
  const originalResults = await fetchMembers();
  for (const jsonObj of originalResults) {
    const realObject = member.construct(jsonObj);
    membersArr.push(realObject);
  }
}
