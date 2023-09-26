import { initTabs } from "./tabs.js";
import * as member from "./member.js";
import * as result from "./result.js";
import { fetchResults, fetchMembers } from "rest-services.js";

window.addEventListener("load", initApp);

async function initApp() {
  initTabs();
  // TODO: Make the rest of the program ...
}
