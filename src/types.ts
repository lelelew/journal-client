export interface Entry {
  id?: number;
  entryDate: string;
  wins: string;
  lessonsLearned: string;
  goals: string;
  morningGrateful: Array<string>;
  todaysTargets: Array<string>;
  eveningGrateful: Array<string>;
  [key: string]: any;
}

export interface Quote {
  quote: string;
  source?: string;
}
