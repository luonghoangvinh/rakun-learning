import { Clock, CheckCircle, XCircle, Target } from 'lucide-react';

interface ExerciseDetail {
  id: string;
  type: string;
  level: string;
  totalQuestions: number;
  correctAnswers: number;
  averageTime: number;
  accuracy: number;
  completedAt: Date;
}

interface DayActivityDetailProps {
  date: string;
  exercises: ExerciseDetail[];
  onClose?: () => void;
}

export function DayActivityDetail({ date, exercises, onClose }: Readonly<DayActivityDetailProps>) {
  if (exercises.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📅</div>
          <p className="text-gray-600">Chưa có bài tập nào trong ngày này</p>
          <p className="text-sm text-gray-500 mt-1">Hãy bắt đầu luyện tập để ghi nhận tiến độ</p>
        </div>
      </div>
    );
  }
  
  // Calculate totals
  const totalQuestions = exercises.reduce((sum, ex) => sum + ex.totalQuestions, 0);
  const totalCorrect = exercises.reduce((sum, ex) => sum + ex.correctAnswers, 0);
  const overallAccuracy = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;
  const averageTime = exercises.reduce((sum, ex) => sum + ex.averageTime, 0) / exercises.length;
  
  // Format date
  const formattedDate = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
  
  // Get accuracy color
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600';
    if (accuracy >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Get type title
  const getTypeTitle = (type: string) => {
    const titles: { [key: string]: string } = {
      vocabulary: 'Từ vựng',
      grammar: 'Ngữ pháp',
      listening: 'Nghe hiểu',
      reading: 'Đọc hiểu'
    };
    return titles[type] || type;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
        <h3 className="font-semibold text-lg mb-1">Chi tiết hoạt động</h3>
        <p className="text-sm opacity-90">{formattedDate}</p>
      </div>
      
      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{exercises.length}</div>
          <div className="text-xs text-gray-600 mt-1">Bài tập</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
          <div className="text-xs text-gray-600 mt-1">Câu hỏi</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${getAccuracyColor(overallAccuracy)}`}>
            {overallAccuracy.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-600 mt-1">Độ chính xác</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{averageTime.toFixed(1)}s</div>
          <div className="text-xs text-gray-600 mt-1">TB/câu</div>
        </div>
      </div>
      
      {/* Exercise list */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Danh sách bài tập</h4>
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-700 rounded-lg px-3 py-1 text-sm font-semibold">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {getTypeTitle(exercise.type)} - {exercise.level}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Intl.DateTimeFormat('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(exercise.completedAt)}
                    </div>
                  </div>
                </div>
                <div className={`text-lg font-bold ${getAccuracyColor(exercise.accuracy)}`}>
                  {exercise.accuracy.toFixed(1)}%
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="size-4 text-gray-400" />
                  <span className="text-gray-700">{exercise.totalQuestions} câu</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="size-4 text-green-500" />
                  <span className="text-gray-700">{exercise.correctAnswers} đúng</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <XCircle className="size-4 text-red-500" />
                  <span className="text-gray-700">{exercise.totalQuestions - exercise.correctAnswers} sai</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="size-4 text-purple-500" />
                  <span className="text-gray-700">{exercise.averageTime.toFixed(1)}s/câu</span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${exercise.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
