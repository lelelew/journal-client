export async function getDay(date) {
  const response = await fetch("http://localhost:4000");
  return response.json();
}
