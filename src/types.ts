export interface Entry {
  id: number;
  entryDate: string;
  wins: string;
  lessonsLearned: Array<string>;
  goals: string;
  morningGrateful: Array<string>;
  todaysTargets: Array<string>;
  eveningGrateful: Array<string>;
}

export interface Quote {
  quote: string;
  source?: string;
}
