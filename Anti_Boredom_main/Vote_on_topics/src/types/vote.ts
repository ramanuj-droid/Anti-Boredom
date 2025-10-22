export type Topic = 'food' | 'technology' | 'meme' | 'politics' | 'geography';

export interface Option {
  id: string;
  name: string;
  image: string;
}

export interface Question {
  id: string;
  question: string;
  options: Option[];
}

export interface VoteData {
  questionId: string;
  selectedOptionId: string;
}

export interface QuestionResults {
  [optionId: string]: number;
}
