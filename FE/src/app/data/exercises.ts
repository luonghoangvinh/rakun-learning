
import { JLPTLevel, QuestionType } from '../types';

export interface Exercise {
  id: string;
  title: string;
  //questionIDs: string[]; // List of question IDs associated with this exercise
  description: string;
  type: QuestionType;
  level: JLPTLevel;
  questionCount: number;
  timeLimit: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  score?: number;
}

// Generate mock exercises
export const generateExercises = (): Exercise[] => {
  const exercises: Exercise[] = [];

  const types: QuestionType[] = ['vocabulary', 'grammar', 'listening', 'reading'];
  const levels: JLPTLevel[] = ['N5', 'N4', 'N3', 'N2', 'N1'];


  types.forEach(type => {
    levels.forEach(level => {
      // Add 5-8 exercises per type and level
      const count = 5 + Math.floor(Math.random() * 4);
      for (let i = 1; i <= count; i++) {
        const difficulty = i <= 2 ? 'easy' : i <= 4 ? 'medium' : 'hard';
        exercises.push({
          id: `${type}-${level}-${i}`,
          title: `${getTypeName(type)} ${level} - Bài ${i}`,
          description: getExerciseDescription(type, level, i),
          type,
          level,
          questionCount: 10 + i * 5,
          timeLimit: 10 + i * 5,
          difficulty,
          completed: Math.random() > 0.7,
          score: Math.random() > 0.7 ? Math.floor(60 + Math.random() * 40) : undefined
        });
      }
    });
  });

  return exercises;
};


export async function getExercises() {
  const res = await fetch('/api/exercises');
  return res.json();
}

function getTypeName(type: QuestionType): string {
  const names: Record<QuestionType, string> = {
    vocabulary: 'Từ vựng',
    grammar: 'Ngữ pháp',
    listening: 'Nghe hiểu',
    reading: 'Đọc hiểu'
  };
  return names[type];
}

function getExerciseDescription(type: QuestionType, level: JLPTLevel, num: number): string {
  const descriptions: Record<QuestionType, string[]> = {
    vocabulary: [
      'Luyện tập từ vựng cơ bản',
      'Từ vựng theo chủ đề',
      'Phân biệt từ đồng nghĩa',
      'Kanji và cách đọc',
      'Từ vựng nâng cao'
    ],
    grammar: [
      'Ngữ pháp cơ bản',
      'Cấu trúc câu phức tạp',
      'Trợ từ và liên từ',
      'Thể kính ngữ',
      'Ngữ pháp nâng cao'
    ],
    listening: [
      'Nghe hội thoại đơn giản',
      'Nghe thông báo',
      'Nghe hiểu chi tiết',
      'Nghe và trả lời câu hỏi',
      'Nghe hiểu nâng cao'
    ],
    reading: [
      'Đọc đoạn văn ngắn',
      'Hiểu ý chính',
      'Đọc hiểu chi tiết',
      'Đọc báo và bài báo',
      'Đọc văn bản phức tạp'
    ]
  };

  return descriptions[type][(num - 1) % descriptions[type].length];
}

export const allExercises = generateExercises();

export function getExercisesByTypeAndLevel(type: QuestionType, level: JLPTLevel): Exercise[] {
  return allExercises.filter(ex => ex.type === type && ex.level === level);
}

export function getExercisesByTandL(type: QuestionType, level: JLPTLevel) {
  const getExercisesByTypeAndLevel = async (type: QuestionType, level: JLPTLevel) => {
    try {
      const res = await fetch('/api/exercises');
      const exercises: Exercise[] = await res.json();
      return exercises.filter(ex => ex.type === type && ex.level === level);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }
  }
  return getExercisesByTypeAndLevel(type, level);
}

export function getExerciseById(id: string): Exercise | undefined {

  return allExercises.find(ex => ex.id === id);
}
