import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, Flag } from 'lucide-react';
import { Question, JLPTLevel, QuestionType, ExerciseProgress } from '../types';
import { getQuestionsByType } from '../data/mockData';
import { Exercise, getExerciseById, getExercisesQuestion } from '../data/exercises';
import { saveUserAnswer } from '../utils/storage';
import createNewExProgress, { updateExProgress } from '../api/exProgress';

export function PracticeSession() {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | undefined>(undefined);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);


  const [correctCount, setCorrectCount] = useState(0);
  const userStr = localStorage.getItem('user');
  const userData = userStr ? JSON.parse(userStr) : null;
  const userId = userData ? userData.id : null;
  const loadExercise = async () => {
    if (exerciseId) {
      const data = await getExerciseById(userId,exerciseId);
      setExercise(data);
    }
  };

  useEffect(() => {
    loadExercise();
  }, [exerciseId]);

  useEffect(() => {
    if (exercise) {

      const getQuestions = async (exerciseId: string) => {
        try {
          const questions = await getExercisesQuestion(exerciseId);
          setQuestions(questions);

        } catch (error) {
          console.error('Error fetching exercise questions:', error);
          setQuestions([]);
        }
      }
      getQuestions(exerciseId? exerciseId : '');
    }
  }, [exercise]);

  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  if (!exercise) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  const currentQuestion = questions[currentQuestionIndex];
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    setShowResult(true);

    // Save user answer
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setCorrectCount(prev => prev + (isCorrect ? 1 : 0));

    saveUserAnswer({
      userId: userId,
      questionId: currentQuestion._id,
      type: currentQuestion.type,
      level: currentQuestion.level,
      isCorrect,
      timeSpent,
      answeredAt: new Date()
    });

    // Store answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = isCorrect;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setStartTime(Date.now());
    } else {
      // Finish exercise
      handleFinish();
    }
  };

  const handleFinish = async () => {
    let exerciseProgress: any = {};

    const exScore = Math.round((correctCount / exercise.questionCount) * 100);
    if (userId) {
      exerciseProgress = {
        userId: userId,
        exerciseId: exerciseId,
        totalQuestion: exercise.questionCount,
        rightAnswer: correctCount,
        score: exScore
      };
    }
    try {
      if (!exercise.completed) {
        const res = await createNewExProgress(exerciseProgress);
      } else {
        const res = await updateExProgress(exercise.progressId ? exercise.progressId : '', exerciseProgress);
      }
      navigate(`/practice-result/${exerciseId}?score=${exScore}`);
    } catch (error) {
      console.error('Error saving exercise progress:', error);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Đang tải bài tập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={`/practice/${exercise.type}`}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="size-5 text-gray-600" />
              </Link>
              <div>
                <h2 className="font-semibold text-gray-900">{exercise.title}</h2>
                <p className="text-sm text-gray-600">
                  Câu {currentQuestionIndex + 1} / {questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="size-5" />
                <span className="font-mono font-semibold">{formatTime(timeElapsed)}</span>
              </div>
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors border border-red-200"
              >
                <Flag className="size-4" />
                Kết thúc
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded-full transition-all ${index < currentQuestionIndex
                    ? answers[index]
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : index === currentQuestionIndex
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                    }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="mb-6">
            <div className='flex w-full  justify-center'>{currentQuestion.imageURL&&(<img src={currentQuestion.imageURL} alt='Ảnh JLPT'/>)}</div>
            
            {currentQuestion.readingContent&&(<p className='text-xl mb-8'>{currentQuestion.readingContent}</p>)}
            <div className="flex items-center gap-2 mb-3">
              
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {currentQuestion.level}
              </span>
              <span className="text-sm text-gray-500">
                Câu hỏi {currentQuestionIndex + 1}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;

              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{option}</span>
                    {showCorrect && <CheckCircle className="size-5 text-green-600" />}
                    {showIncorrect && <XCircle className="size-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && currentQuestion.explanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <span className="text-blue-600 font-semibold">💡</span>
                <div>
                  <div className="font-medium text-blue-900 mb-1">Giải thích:</div>
                  <div className="text-sm text-blue-800">{currentQuestion.explanation}</div>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Kiểm tra đáp án
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Hoàn thành bài tập' : 'Câu tiếp theo →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
