import { Link } from 'react-router-dom';
import { Clock, FileText, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { Exercise } from '../utils/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: Readonly<ExerciseCardProps>) {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    hard: 'bg-red-100 text-red-700 border-red-200'
  };
  
  const difficultyLabels = {
    easy: 'Dễ',
    medium: 'Trung bình',
    hard: 'Khó'
  };
  
  return (
    <Link
      to={`/practice-session/${exercise._id}`}
      className="group block bg-white rounded-xl shadow-sm border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {exercise.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
          </div>
          {exercise.completed && (
            <div className="ml-3 flex-shrink-0">
              <CheckCircle className="size-6 text-green-500" />
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${difficultyColors[exercise.difficulty]}`}>
            {difficultyLabels[exercise.difficulty]}
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
            {exercise.level}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FileText className="size-4" />
              <span>{exercise.questionCount} câu</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{exercise.timeLimit} phút</span>
            </div>
          </div>
          
          {exercise.completed && (
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <Star className="size-4 fill-current" />
              <span>{exercise.score}%</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 group-hover:bg-blue-50 transition-colors">
        <div className="text-sm font-medium text-gray-700 group-hover:text-blue-700 flex items-center justify-between">
          <span>{exercise.completed ? 'Làm lại bài tập' : 'Bắt đầu luyện tập'} →</span>
          {exercise.completed &&(exercise.score||exercise.score===0)&& exercise.score < 80 && (
            <span className="text-xs text-orange-600 flex items-center gap-1">
              <TrendingUp className="size-3" />
              Cải thiện điểm
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
