import { Question, Deck, QuestionCategory } from '../types';
import { generateMockDecks } from './mockDecks';

// Question categories for home page
export const questionCategories: QuestionCategory[] = [
  {
    type: 'vocabulary',
    title: 'Từ vựng',
    description: 'Luyện tập từ vựng tiếng Nhật',
    icon: '📚',
    color: 'bg-blue-500'
  },
  {
    type: 'grammar',
    title: 'Ngữ pháp',
    description: 'Ôn tập cấu trúc ngữ pháp',
    icon: '✏️',
    color: 'bg-green-500'
  },
  {
    type: 'listening',
    title: 'Nghe hiểu',
    description: 'Luyện kỹ năng nghe',
    icon: '🎧',
    color: 'bg-purple-500'
  },
  {
    type: 'reading',
    title: 'Đọc hiểu',
    description: 'Luyện kỹ năng đọc',
    icon: '📖',
    color: 'bg-orange-500'
  }
];

// Mock questions
export const mockQuestions: Question[] = [
  {
    _id: 'q1',
    type: 'vocabulary',
    level: 'N5',
    question: '私は＿＿＿学生です。',
    options: ['が', 'を', 'は', 'に'],
    correctAnswer: 0,
    explanation: '「が」được sử dụng để nhấn mạnh chủ ngữ'
  },
  {
    _id: 'q2',
    type: 'grammar',
    level: 'N5',
    question: '毎日日本語＿＿＿勉強します。',
    options: ['を', 'が', 'に', 'で'],
    correctAnswer: 0,
    explanation: '「を」được sử dụng để đánh dấu tân ngữ trực tiếp'
  },
  {
    _id: 'q3',
    type: 'reading',
    level: 'N4',
    question: 'このりんごは＿＿＿です。',
    options: ['おいしい', 'おいしいく', 'おいしくて', 'おいしかった'],
    correctAnswer: 0
  },
  {
    _id: 'q4',
    type: 'vocabulary',
    level: 'N3',
    question: '彼は会議に＿＿＿しました。',
    options: ['参加', '参考', '参照', '参拝'],
    correctAnswer: 0,
    explanation: '参加 (さんか) nghĩa là tham gia'
  }
];

// Mock flashcard decks
export const mockDecks: Deck[] = generateMockDecks();

// Get questions by type and level
export function getQuestionsByType(type: string, level?: string): Question[] {
  return mockQuestions.filter(q => {
    if (level) {
      return q.type === type && q.level === level;
    }
    return q.type === type;
  });
}

// Get deck by id
export function getDeckById(id: string): Deck | undefined {
  return mockDecks.find(deck => deck.id === id);
}