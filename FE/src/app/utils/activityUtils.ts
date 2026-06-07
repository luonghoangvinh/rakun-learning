import { UserAnswer } from '../types';

export interface DayActivity {
  date: string; // YYYY-MM-DD
  exerciseCount: number;
  totalQuestions: number;
  accuracy: number;
}

export interface ExerciseDetail {
  id: string;
  type: string;
  level: string;
  totalQuestions: number;
  correctAnswers: number;
  averageTime: number;
  accuracy: number;
  completedAt: Date;
}

// Group user answers by date
export function getActivityByDate(answers: UserAnswer[]): DayActivity[] {
  const activityMap = new Map<string, {
    exerciseIds: Set<string>;
    totalQuestions: number;
    correctAnswers: number;
  }>();
  
  answers.forEach(answer => {
    const date = answer.answeredAt.toISOString().split('T')[0];
    
    if (!activityMap.has(date)) {
      activityMap.set(date, {
        exerciseIds: new Set(),
        totalQuestions: 0,
        correctAnswers: 0
      });
    }
    
    const activity = activityMap.get(date)!;
    activity.exerciseIds.add(answer.questionId.split('-')[0]); // Extract exercise ID from question ID
    activity.totalQuestions++;
    if (answer.isCorrect) {
      activity.correctAnswers++;
    }
  });
  
  return Array.from(activityMap.entries()).map(([date, data]) => ({
    date,
    exerciseCount: data.exerciseIds.size,
    totalQuestions: data.totalQuestions,
    accuracy: data.totalQuestions > 0 ? (data.correctAnswers / data.totalQuestions) * 100 : 0
  }));
}

// Get exercises for a specific date
export function getExercisesForDate(answers: UserAnswer[], targetDate: string): ExerciseDetail[] {
  // Filter answers for the specific date
  const dateAnswers = answers.filter(answer => {
    const answerDate = answer.answeredAt.toISOString().split('T')[0];
    return answerDate === targetDate;
  });
  
  if (dateAnswers.length === 0) {
    return [];
  }
  
  // Group by exercise (using questionId prefix as exercise identifier)
  const exerciseMap = new Map<string, {
    type: string;
    level: string;
    answers: UserAnswer[];
    completedAt: Date;
  }>();
  
  dateAnswers.forEach(answer => {
    // Use first part of questionId as exercise identifier
    const exerciseId = answer.questionId.split('-')[0];
    
    if (!exerciseMap.has(exerciseId)) {
      exerciseMap.set(exerciseId, {
        type: answer.type,
        level: answer.level,
        answers: [],
        completedAt: answer.answeredAt
      });
    }
    
    const exercise = exerciseMap.get(exerciseId)!;
    exercise.answers.push(answer);
    
    // Update completedAt to the latest answer
    if (answer.answeredAt > exercise.completedAt) {
      exercise.completedAt = answer.answeredAt;
    }
  });
  
  // Convert to ExerciseDetail array
  return Array.from(exerciseMap.entries()).map(([id, data]) => {
    const totalQuestions = data.answers.length;
    const correctAnswers = data.answers.filter(a => a.isCorrect).length;
    const totalTime = data.answers.reduce((sum, a) => sum + a.timeSpent, 0);
    
    return {
      id,
      type: data.type,
      level: data.level,
      totalQuestions,
      correctAnswers,
      averageTime: totalTime / totalQuestions,
      accuracy: (correctAnswers / totalQuestions) * 100,
      completedAt: data.completedAt
    };
  }).sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime()); // Sort by completion time descending
}

// Generate mock activity data for demo purposes
export function generateMockActivityData(): UserAnswer[] {
  const mockAnswers: UserAnswer[] = [];
  const types = ['vocabulary', 'grammar', 'listening', 'reading'] as const;
  const levels = ['N5', 'N4', 'N3', 'N2', 'N1'] as const;
  
  // Generate activities for the last 30 days
  const today = new Date();
  for (let daysAgo = 0; daysAgo < 30; daysAgo++) {
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    
    // Random number of exercises per day (0-3)
    const exercisesPerDay = Math.floor(Math.random() * 4);
    
    for (let exerciseNum = 0; exerciseNum < exercisesPerDay; exerciseNum++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const level = levels[Math.floor(Math.random() * levels.length)];
      const questionsPerExercise = 5 + Math.floor(Math.random() * 16); // 5-20 questions
      
      const exerciseId = `ex${daysAgo}_${exerciseNum}`;
      
      for (let q = 0; q < questionsPerExercise; q++) {
        const isCorrect = Math.random() > 0.3; // 70% correct rate
        const timeSpent = 5 + Math.random() * 25; // 5-30 seconds
        
        const answerTime = new Date(date);
        answerTime.setHours(9 + exerciseNum * 2); // Spread exercises throughout the day
        answerTime.setMinutes(Math.floor(Math.random() * 60));
        
        mockAnswers.push({
          userId:"",//
          questionId: `${exerciseId}-q${q}`,
          type,
          level,
          isCorrect,
          timeSpent,
          answeredAt: answerTime
        });
      }
    }
  }
  
  return mockAnswers;
}
