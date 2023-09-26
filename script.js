import { initTabs } from "./tabs.js";
import * as member from "./member.js";
import * as result from "./result.js";
import { fetchResults, fetchMembers } from "./data-fetch.js";

window.addEventListener("load", initApp);

// Global data arrays
const resultsArr = [];
const membersArr = [];

// Config for Date object
const dateDisplayOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "Europe/Copenhagen",
};

async function initApp() {
  initTabs();
  await buildResultsList();
  await buildMembersList();
  console.log(resultsArr);
  console.log(membersArr);
  displayResults(resultsArr);
  displayMembers(membersArr);
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

function displayResults(results) {
  const table = document.querySelector("table#results tbody");
  table.innerHTML = "";
  for (const result of results) {
    const html = /*html*/ `
    <tr>
      <td>${result.date.toLocaleString("da-DK", dateDisplayOptions)}</td>
      <td>${result.id}</td>
      <td>${result.discipline}</td>
      <td>${result.type}</td>
      <td>${result.timeToString()}</td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

function displayMembers(members) {
  const table = document.querySelector("table#members tbody");
  table.innerHTML = "";
  for (const member of members) {
    const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${member.active ? "Ja" : "Nej"}</td>
      <td>${member.birthday.toLocaleString("da-DK", dateDisplayOptions)}</td>
      <td>${member.getAge()}</td>
      <td>${member.isJunior() ? "Junior" : "Senior"}</td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}
