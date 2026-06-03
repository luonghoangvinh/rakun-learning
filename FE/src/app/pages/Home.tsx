import { Link } from 'react-router-dom';
import { Target, Zap, Trophy, TrendingUp, Clock, Award, BookOpen, Brain, Headphones, FileText, ArrowRight, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getUserAnswers } from '../utils/storage';
import { calculateProgressStats } from '../utils/analytics';
import { MiniTestModal } from '../components/MiniTestModal';
import { QuizModal } from '../components/QuizModal';
import { JLPTTestModal } from '../components/JLPTTestModal';

export function Home() {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    accuracy: 0,
    streak: 7,
    points: 1250,
    level: 'N4'
  });
  
  const [showMiniTestModal, setShowMiniTestModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showJLPTTestModal, setShowJLPTTestModal] = useState(false);
  
  useEffect(() => {
    const answers = getUserAnswers();
    const progressStats = calculateProgressStats(answers);
    const total = answers.length;
    const correct = answers.filter(a => a.isCorrect).length;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    
    setStats(prev => ({
      ...prev,
      totalQuestions: total,
      accuracy
    }));
  }, []);
  
  const quickStats = [
    {
      label: 'Câu hỏi đã làm',
      value: stats.totalQuestions,
      icon: FileText,
      color: 'bg-blue-500',
      change: ''
    },
    {
      label: 'Độ chính xác',
      value: `${stats.accuracy.toFixed(1)}%`,
      icon: Target,
      color: 'bg-green-500',
      change: ''
    },
    {
      label: 'Streak hiện tại',
      value: `${stats.streak} ngày`,
      icon: Zap,
      color: 'bg-orange-500',
      change: ''
    },
    {
      label: 'Tổng điểm',
      value: stats.points,
      icon: Trophy,
      color: 'bg-purple-500',
      change: ''
    }
  ];
  
  const learningModes = [
    {
      title: 'Từ vựng',
      description: 'Luyện tập từ vựng theo cấp độ JLPT',
      icon: BookOpen,
      path: '/practice/vocabulary',
      color: 'from-blue-500 to-blue-600',
      stats: '250+ câu hỏi'
    },
    {
      title: 'Ngữ pháp',
      description: 'Ôn tập cấu trúc ngữ pháp',
      icon: Brain,
      path: '/practice/grammar',
      color: 'from-green-500 to-green-600',
      stats: '180+ câu hỏi'
    },
    {
      title: 'Nghe hiểu',
      description: 'Luyện kỹ năng nghe',
      icon: Headphones,
      path: '/practice/listening',
      color: 'from-purple-500 to-purple-600',
      stats: '120+ câu hỏi'
    },
    {
      title: 'Đọc hiểu',
      description: 'Luyện kỹ năng đọc',
      icon: FileText,
      path: '/practice/reading',
      color: 'from-orange-500 to-orange-600',
      stats: '200+ câu hỏi'
    }
  ];
  
  const recentActivity = [
    { type: 'Hoàn thành', subject: 'N5 Từ vựng - Bài 12', time: '2 giờ trước', score: 95 },
    { type: 'Luyện tập', subject: 'N4 Ngữ pháp - Quiz 5', time: '5 giờ trước', score: 87 },
    { type: 'Hoàn thành', subject: 'N5 Nghe hiểu - Test 3', time: 'Hôm qua', score: 92 }
  ];
  
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Chào buổi sáng, Học viên! </h2>
              <p className="text-blue-100">Sẵn sàng chinh phục JLPT hôm nay chưa?</p>
            </div>
            <div className="text-6xl opacity-20">🎌</div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              🎯 Mục tiêu: Đạt N3 trong 6 tháng
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              📅 {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} rounded-lg p-3 text-white`}>
                  <Icon className="size-6" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-xs text-green-600 font-medium">{stat.change}</div>
            </div>
          );
        })}
      </div>
      
      {/* Learning modes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Chế độ luyện tập</h3>
          <Link to="/decks" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
            Xem tất cả
            <ArrowRight className="size-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningModes.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <Link
                key={index}
                to={mode.path}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br ${mode.color} rounded-lg p-4 text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="size-8" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{mode.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{mode.description}</p>
                <div className="text-xs text-gray-500 font-medium">{mode.stats}</div>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Two column layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="size-5 text-blue-600" />
              Bài thi thử & Quiz
            </h3>
            <div className="grid md:grid-cols-3 gap-3">
              <button
                className="px-4 py-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl hover:shadow-md transition-all group"
                onClick={() => setShowMiniTestModal(true)}
              >
                <div className="text-3xl mb-2">📝</div>
                <div className="font-semibold text-green-900 mb-1">Mini Test</div>
                <div className="text-xs text-green-700">15 phút • 20 câu</div>
              </button>
              <button
                className="px-4 py-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:shadow-md transition-all group"
                onClick={() => setShowQuizModal(true)}
              >
                <div className="text-3xl mb-2">📋</div>
                <div className="font-semibold text-blue-900 mb-1">Quiz</div>
                <div className="text-xs text-blue-700">30 phút • 40 câu</div>
              </button>
              <button
                className="px-4 py-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:shadow-md transition-all group"
                onClick={() => setShowJLPTTestModal(true)}
              >
                <div className="text-3xl mb-2">📖</div>
                <div className="font-semibold text-purple-900 mb-1">Đề thi JLPT</div>
                <div className="text-xs text-purple-700">180 phút • Full test</div>
              </button>
            </div>
          </div>
          
          {/* Study progress chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Tiến độ 7 ngày qua</h3>
              <Link to="/progress" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Chi tiết →
              </Link>
            </div>
            <div className="flex items-end justify-between h-32 gap-2">
              {[65, 45, 80, 55, 90, 70, 85].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden relative group cursor-pointer hover:opacity-80">
                    <div 
                      className="bg-gradient-to-t from-blue-600 to-blue-400 w-full rounded-t-lg transition-all"
                      style={{ height: `${height}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="size-5 text-purple-600" />
              Hoạt động gần đây
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`size-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${
                    activity.score >= 90 ? 'bg-green-500' : activity.score >= 80 ? 'bg-blue-500' : 'bg-orange-500'
                  }`}>
                    <span className="font-bold text-sm">{activity.score}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500 mb-1">{activity.type}</div>
                    <div className="text-sm font-medium text-gray-900 truncate">{activity.subject}</div>
                    <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Study streak */}
          <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm opacity-90 mb-1">Streak hiện tại</div>
                <div className="text-4xl font-bold">{stats.streak} 🔥</div>
              </div>
              <Zap className="size-12 opacity-50" />
            </div>
            <div className="text-sm opacity-90">
              Tuyệt vời! Bạn đã học liên tục {stats.streak} ngày. Hãy tiếp tục phấn đấu!
            </div>
            <div className="mt-4 flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`flex-1 h-2 rounded-full ${
                    day <= stats.streak ? 'bg-white' : 'bg-white/30'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <MiniTestModal
        
        isOpen={showMiniTestModal}
        onClose={() => setShowMiniTestModal(false)}
        onStart={() => setShowMiniTestModal(false)}
      />
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        onStart={() => setShowMiniTestModal(false)}
      />
      <JLPTTestModal
        isOpen={showJLPTTestModal}
        onClose={() => setShowJLPTTestModal(false)}
        onStart={() => setShowMiniTestModal(false)}
      />
    </div>
  );
}