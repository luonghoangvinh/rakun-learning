import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Shuffle, TrendingUp, Award, Filter } from 'lucide-react';
import { ExerciseCard } from '../components/ExerciseCard';
import { Exercise, getExercisesByTypeAndLevel } from '../data/exercises';
import { JLPTLevel, QuestionType } from '../types';
import { Layout } from '../components/Layout';
import { RandomExerciseModal } from '../components/RandomExerciseModal';

export function PracticeList() {
  const { type } = useParams<{ type: QuestionType }>();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<JLPTLevel>('N5');
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [showRandomExerciseModal, setShowRandomExerciseModal] = useState(false);

  if (!type) {
    return <div>Không tìm thấy loại bài tập</div>;
  }
  
  

useEffect(() => {
  const loadExercises = async () => {
    const data = await getExercisesByTypeAndLevel(type as QuestionType, selectedLevel);
    setExercises(data);
  };

  loadExercises();
}, [selectedLevel,filterDifficulty,type]);
  const filteredExercises = filterDifficulty === 'all'
    ? exercises
    : exercises.filter(ex => ex.difficulty === filterDifficulty);
  
  const completedCount = exercises.filter(ex => ex.completed).length;
  const avgScore = exercises
    .filter(ex => ex.score !== undefined)
    .reduce((sum, ex) => sum + (ex.score || 0), 0) / exercises.filter(ex => ex.score !== undefined).length || 0;
  
  const typeNames: Record<QuestionType, string> = {
    vocabulary: 'Từ vựng',
    grammar: 'Ngữ pháp',
    listening: 'Nghe hiểu',
    reading: 'Đọc hiểu'
  };
  
  const typeIcons: Record<QuestionType, string> = {
    vocabulary: '📚',
    grammar: '✏️',
    listening: '🎧',
    reading: '📖'
  };

  const handleStartRandomExercise = async (level: JLPTLevel) => {
    // Navigate to a random exercise for this type and level
    // For now, just navigate to the first exercise of this type/level
    const levelExercises = await getExercisesByTypeAndLevel(type as QuestionType, level);
    if (levelExercises.length > 0) {
      const randomIndex = Math.floor(Math.random() * levelExercises.length);
      navigate(`/practice-session/${levelExercises[randomIndex]._id}`);
    }
  };

  return (
    <Layout selectedLevel={selectedLevel} onLevelChange={setSelectedLevel}>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-5xl">{typeIcons[type as QuestionType]}</span>
                <div>
                  <h2 className="text-3xl font-bold">{typeNames[type as QuestionType]}</h2>
                  <p className="text-blue-100 mt-1">Cấp độ {selectedLevel}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <div>
                  <div className="text-2xl font-bold">{exercises.length}</div>
                  <div className="text-sm text-blue-100">Bài tập</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-2xl font-bold">{completedCount}</div>
                  <div className="text-sm text-blue-100">Đã hoàn thành</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div>
                  <div className="text-2xl font-bold">{avgScore > 0 ? avgScore.toFixed(1) : '--'}%</div>
                  <div className="text-sm text-blue-100">Điểm TB</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowRandomExerciseModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Shuffle className="size-5" />
              Bài tập ngẫu nhiên
            </button>
          </div>
        </div>
        
        {/* Filter bar */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <Filter className="size-5 text-gray-600" />
            <span className="font-medium text-gray-700">Lọc theo độ khó:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterDifficulty('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterDifficulty === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả ({exercises.length})
              </button>
              <button
                onClick={() => setFilterDifficulty('easy')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterDifficulty === 'easy'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100'
                }`}
              >
                Dễ
              </button>
              <button
                onClick={() => setFilterDifficulty('medium')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterDifficulty === 'medium'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                }`}
              >
                Trung bình
              </button>
              <button
                onClick={() => setFilterDifficulty('hard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterDifficulty === 'hard'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                Khó
              </button>
            </div>
          </div>
          
      
        </div>
        
        {/* Quick stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-100 rounded-lg p-3">
                <Award className="size-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((completedCount / exercises.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Tiến độ hoàn thành</div>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${(completedCount / exercises.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-lg p-3">
                <TrendingUp className="size-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {exercises.length - completedCount}
                </div>
                <div className="text-sm text-gray-600">Bài chưa làm</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 rounded-lg p-3">
                <span className="text-2xl">⏱️</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {exercises.reduce((sum, ex) => sum + ex.timeLimit, 0)}
                </div>
                <div className="text-sm text-gray-600">Phút tổng thời gian</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Exercises grid */}
        {filteredExercises.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <ExerciseCard key={exercise._id} exercise={exercise} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-600 text-lg font-medium">Không có bài tập nào</p>
            <p className="text-sm text-gray-500 mt-2">Thử chọn bộ lọc khác</p>
          </div>
        )}
      </div>


      <RandomExerciseModal
        isOpen={showRandomExerciseModal}
        onClose={() => setShowRandomExerciseModal(false)}
        onStart={handleStartRandomExercise}
      />
    </Layout>
  );
}
