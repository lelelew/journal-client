import { Entry, Quote } from "./types";

// export const getEntry: (date: string) => Promise<Entry> = async (
//   date: string
// ) => {
//   try {
//     const response = await fetch(`http://localhost:4000/entry?date=${date}`);
//     return await response.json();
//   } catch (error) {
//     console.error(`error fetching entry from api for date ${date}`);
//     console.error(error);
//   }
// };

export async function getEntry(date: string): Promise<Entry | undefined> {
  try {
    const response = await fetch(`http://localhost:4000/entry?date=${date}`);
    return await response.json();
  } catch (error) {
    console.error(`error fetching entry from api for date ${date}`);
    console.error(error);
  }
}

export async function saveEntry(entry: Entry): Promise<Entry | undefined> {
  let savedEntry;
  try {
    const response = await fetch("http://localhost:4000/entries/new", {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json"
      }
    });
    savedEntry = await response.json();
  } catch (error) {
    console.error("error saving entry from api");
    console.error(error);
    throw error;
  }
  return savedEntry;
}

export async function getAllEntries(): Promise<Array<Entry> | undefined> {
  let entries;
  try {
    const response = await fetch("http://localhost:4000/entries", {
      method: "GET"
    });
    entries = await response.json();
  } catch (error) {
    console.error("error fetching all entries from api");
    console.error(error);
  }
  return entries;
}

export async function newQuote(): Promise<Quote | undefined> {
  let quote;
  try {
    const response = await fetch("http://localhost:4000/quote", {
      method: "GET"
    });
    quote = await response.json();
  } catch (error) {
    console.error("error fetching quote from api");
    console.error(error);
  }
  return quote;
}
