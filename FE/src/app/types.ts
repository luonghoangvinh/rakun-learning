
export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';


export type QuestionType = 'vocabulary' | 'grammar' | 'listening' | 'reading';


export type FlashcardStatus = 'new' | 'learning' | 'mastered' | 'review';


export type DeckVisibility = 'personal' | 'community';

// Question data
export interface Question {
  _id: string;
  type: QuestionType;
  level: JLPTLevel;
  audioURL?: string; // For listening questions
  imageURL?: string; // For vocabulary,reading questions
  readingContent?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// Flashcard data
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  type: 'vocabulary' | 'grammar';
  level: JLPTLevel;
  example?: string;
  image?: string;
  audio?: string;
  status?: FlashcardStatus;
}

// Flashcard deck
export interface Deck {
  _id: string;
  name: string;
  description: string;
  cardCount: number;
  cards: Flashcard[];
  createdAt: Date;
  color?: string;
  icon?: string;
  visibility?: DeckVisibility;
  viewCount?: number; // For community decks
}

// User answer
export interface UserAnswer {
  userId:string;
  questionId: string;
  type: QuestionType;
  level: JLPTLevel;
  isCorrect: boolean;
  timeSpent: number; // in seconds
  answeredAt: Date;
}

// Progress statistics
export interface ProgressStats {
  type: QuestionType;
  total: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  averageTime: number;
}

// Question category for home page
export interface QuestionCategory {
  type: QuestionType;
  title: string;
  description: string;
  icon: string;
  color: string;
}
export interface ExerciseProgress{


  userId: String;

  exerciseId: String;

  completeAt: Date;

  score: number;

  
  totalQuestion: number;

  rightAnswer: number;

}