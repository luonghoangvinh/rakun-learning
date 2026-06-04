
import { JLPTLevel, Question, QuestionType } from '../types';


export interface Exercise {
  _id: string;
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
          _id: `${type}-${level}-${i}`,
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

export function getExercisesByTypeAndLevel(userId: string, type: QuestionType, level: JLPTLevel){
  const getExercises = async (type: QuestionType, level: JLPTLevel) => {
    try {
      const exercises = await fetch(`/api/exercises/findBy?userId=${userId}&type=${type}&level=${level}`);
      const data: Exercise[] = await exercises.json();
      return data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }
  }
  return getExercises(type, level);
}



export async function getExerciseById(id: string): Promise<Exercise | undefined> {
  try{
    const exercise = await fetch(`/api/exercises/${id}`);
    const data: Exercise = await exercise.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercise:', error);
    return undefined;
  }
}

export async function getExercisesQuestion(exerciseId: string): Promise<Question[]> {
  try{
    const res= await fetch(`/api/exercises/${exerciseId}/questions`);
    const data: Question[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercise questions:', error);
    return [];
  }
}
