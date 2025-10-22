import { VoteData, QuestionResults } from '@/types/vote';

const STORAGE_KEY = 'vote-app-data';

interface StorageData {
  votes: VoteData[];
}

export const getStorageData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { votes: [] };
  } catch (error) {
    console.error('Error reading from storage:', error);
    return { votes: [] };
  }
};

export const saveVote = (vote: VoteData): void => {
  try {
    const data = getStorageData();
    
    // Remove any existing vote for this question
    const filteredVotes = data.votes.filter(v => v.questionId !== vote.questionId);
    
    // Add new vote
    filteredVotes.push(vote);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ votes: filteredVotes }));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

export const getVoteForQuestion = (questionId: string): string | null => {
  const data = getStorageData();
  const vote = data.votes.find(v => v.questionId === questionId);
  return vote ? vote.selectedOptionId : null;
};

export const calculateResults = (questionId: string, totalOptions: number): QuestionResults => {
  const data = getStorageData();
  
  // In a real app, this would aggregate votes from all users
  // For this demo, we'll generate some realistic-looking percentages
  const results: QuestionResults = {};
  
  // Check if user has voted on this question
  const userVote = data.votes.find(v => v.questionId === questionId);
  
  if (!userVote) {
    // No vote yet, return empty results
    return results;
  }
  
  // Generate pseudo-random but consistent percentages based on question ID
  const seed = questionId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (index: number) => {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  };
  
  // Generate base votes for each option
  const baseVotes = Array.from({ length: totalOptions }, (_, i) => 
    Math.floor(random(i) * 100) + 50
  );
  
  const totalVotes = baseVotes.reduce((sum, v) => sum + v, 0);
  
  // Calculate percentages
  baseVotes.forEach((votes, index) => {
    results[`option-${index}`] = Math.round((votes / totalVotes) * 100);
  });
  
  return results;
};
