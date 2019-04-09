export async function getEntry(date) {
  const response = await fetch(`http://localhost:4000?date=${date}`);
  return response.json();
}
