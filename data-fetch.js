async function fetchResults() {
  const resp = await fetch("./data/results.json");
  const data = await resp.json();
  return data;
}

async function fetchMembers() {
  const resp = await fetch("./data/members.json");
  const data = await resp.json();
  return data;
}

export { fetchResults, fetchMembers };
