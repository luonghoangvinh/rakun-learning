import { useParams, useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Trophy, Clock, Target, TrendingUp, Home, RotateCcw } from 'lucide-react';
import { Exercise, getExerciseById } from '../data/exercises';
import { useEffect, useState } from 'react';

export function PracticeResult() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [searchParams] = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0');
  const [exercise, setExercise] = useState<Exercise | undefined>(undefined);

  useEffect(() => {
    const loadExercise = async () => {
      if (exerciseId) {
        const data = await getExerciseById(exerciseId);
        setExercise(data);
      }
    };

    loadExercise();
  }, [exerciseId]);

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-gray-600 text-lg mb-4">Không tìm thấy bài tập</p>
          <Link to="/" className="text-blue-600 hover:underline">
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-600';
    if (score >= 70) return 'from-blue-500 to-blue-600';
    if (score >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { emoji: '🎉', title: 'Xuất sắc!', message: 'Bạn đã làm bài rất tốt. Tiếp tục phát huy!' };
    if (score >= 70) return { emoji: '👍', title: 'Tốt lắm!', message: 'Bạn đã nắm vững kiến thức. Hãy tiếp tục cố gắng!' };
    if (score >= 50) return { emoji: '💪', title: 'Khá tốt!', message: 'Bạn đang trên đúng hướng. Cố gắng thêm nhé!' };
    return { emoji: '📚', title: 'Cần cố gắng thêm!', message: 'Đừng nản chí. Hãy ôn lại và thử lại lần nữa!' };
  };

  const scoreInfo = getScoreMessage(score);
  const totalQuestions = exercise.questionCount;
  const correctAnswers = Math.round((score / 100) * totalQuestions);
  const incorrectAnswers = totalQuestions - correctAnswers;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-2 shadow-sm border border-gray-200 mb-4">
            
            <span className="font-bold text-gray-900">JLPT Study</span>
          </div>
        </div>

        {/* Score Card */}
        <div className={`bg-gradient-to-br ${getScoreBg(score)} rounded-2xl shadow-2xl p-8 text-white mb-6`}>
          <div className="text-center">
            <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
            <h2 className="text-3xl font-bold mb-2">{scoreInfo.title}</h2>
            <p className="text-white/90 mb-6">{scoreInfo.message}</p>
            
            {/* Score circle */}
            <div className="relative inline-flex items-center justify-center mb-6">
              <svg className="size-40" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="12"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="white"
                  strokeWidth="12"
                  strokeDasharray={`${(score / 100) * 440} 440`}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-5xl font-bold">{score}%</div>
                  <div className="text-sm opacity-90">Điểm số</div>
                </div>
              </div>
            </div>

            <div className="text-lg font-medium">
              {exercise.title}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 rounded-lg p-3">
                <CheckCircle className="size-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{correctAnswers}</div>
                <div className="text-sm text-gray-600">Câu đúng</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-100 rounded-lg p-3">
                <XCircle className="size-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{incorrectAnswers}</div>
                <div className="text-sm text-gray-600">Câu sai</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-100 rounded-lg p-3">
                <Target className="size-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
                <div className="text-sm text-gray-600">Tổng câu hỏi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="size-5 text-purple-600" />
            Phân tích kết quả
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Độ chính xác</span>
                <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getScoreBg(score)} rounded-full transition-all duration-1000`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>

            {score < 80 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 text-lg">💡</span>
                  <div>
                    <div className="font-medium text-yellow-900 mb-1">Gợi ý cải thiện</div>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Ôn lại các câu hỏi bạn đã làm sai</li>
                      <li>• Luyện tập thêm các bài tập cùng cấp độ</li>
                      <li>• Xem lại phần giải thích của từng câu hỏi</li>
                      <li>• Thử làm bài tập ở mức độ dễ hơn để củng cố kiến thức</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {score >= 80 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 text-lg">🎯</span>
                  <div>
                    <div className="font-medium text-green-900 mb-1">Bước tiếp theo</div>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Thử các bài tập khó hơn ở cùng cấp độ</li>
                      <li>• Luyện tập các dạng bài khác để cân bằng kỹ năng</li>
                      <li>• Thử thách bản thân với cấp độ cao hơn</li>
                      <li>• Làm đề thi thử JLPT để đánh giá tổng thể</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Achievements */}
        {score >= 90 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg p-6 text-white mb-6">
            <div className="flex items-center gap-4">
              <Trophy className="size-12 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-1">Thành tích mới!</h3>
                <p className="text-white/90">Bạn đã đạt điểm xuất sắc và nhận được huy hiệu "Bậc thầy {exercise.type}"</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to={`/practice-session/${exerciseId}`}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
          >
            <RotateCcw className="size-5" />
            Làm lại bài tập
          </Link>

          <Link
            to={`/practice/${exercise.type}`}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
          >
            <Target className="size-5" />
            Bài tập khác
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
          >
            <Home className="size-5" />
            Về trang chủ
          </Link>
        </div>

        
      </div>
    </div>
  );
}
