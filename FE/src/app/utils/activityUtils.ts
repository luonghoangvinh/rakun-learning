

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

export async function getUserProgress(userId:string){
  const res=await fetch(`/api/exercise-progress/user/${userId}`)
  const activity= await res.json();
  return activity;
}