export async function getEntry(date) {
  const response = await fetch(`http://localhost:4000?date=${date}`);
  let entry;
  try {
    entry = await response.json();
  } catch (error) {
    console.error(`error fetching entry from api for date ${date}`);
    console.error(error);
  }
  return entry;
}

export async function saveEntry(entry) {
  const response = await fetch("http://localhost:4000/entries/new", {
    method: "POST",
    body: JSON.stringify(entry),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
  debugger;
}
