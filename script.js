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
  console.log("script.js is running!");
  initTabs();
  // Build data structure
  await buildMembersList();
  await buildResultsList();

  // Sort results by best one first
  resultsArr.sort((result1, result2) => result1.time - result2.time);

  // Display in HTML table
  displayMembers(membersArr);
  displayResults(resultsArr);

  // EXAMPLE for..in loop
  // console.log("----------MEMBER OBJECT----------");
  // for (const key in membersArr[0]) {
  //   console.log(`${key}: ${membersArr[0][key]}`);
  // }

  // CHANGE ID of MEMBER OBJECT ()
  // membersArr[0].id = "TEST";
  // console.log(membersArr[0]);

  // console.log("----------RESULT OBJECT----------");
  // for (const key in resultsArr[0]) {
  //   console.log(`${key}: ${resultsArr[0][key]}`);
  // }
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
  const disciplineNames = {
    breaststroke: "Brystsvømning",
    butterfly: "Butterfly",
    backstroke: "Rygsvømning",
    freestyle: "Fri svømning",
  };
  for (const result of results) {
    const html = /*html*/ `
    <tr>
      <td>${result.date.toLocaleString("da-DK", dateDisplayOptions)}</td>
      <td>${result.member ? result.member.name : ""}</td>
      <td>${disciplineNames[result.discipline] || "Ukendt Disciplin"}</td>
      <td>${result.isTraining() ? "Træning" : "Stævne"}</td>
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
      <td>${member.getJuniorSeniorStatus()}</td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

function findMemberById(id) {
  // console.log("ID:", id);
  const member = membersArr.filter(member => member.id === id)[0];
  // console.log(member);
  return member;
}

export { findMemberById };
