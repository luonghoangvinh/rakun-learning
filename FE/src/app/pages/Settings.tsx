import { useState } from 'react';
import {
  User, Lock, Bell, Palette, Target,
  Shield, HelpCircle, LogOut, Save, ChevronRight
} from 'lucide-react';

export function Settings() {
  const [activeSection, setActiveSection] = useState<string>('account');

  // Settings state
  const [settings, setSettings] = useState({
    // Account
    name: 'Học viên JLPT',
    email: 'student@jlpt.com',

    // Appearance
    theme: 'light',
    language: 'vi',
    fontSize: 'medium',

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    achievementAlerts: true,

    // Study Preferences
    dailyGoal: 20,
    autoPlayAudio: true,
    showExplanations: true,
    immediateCorrection: false,

    // Privacy
    profileVisibility: 'public',
    showActivity: true,
    allowDataCollection: true
  });

  const handleSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('jlpt_settings', JSON.stringify(settings));
    alert('Đã lưu cài đặt thành công!');
  };

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem('jlpt_user');
      window.location.href = '/login';
    }
  };

  const sections = [
    { id: 'account', name: 'Tài khoản', icon: User },
    { id: 'appearance', name: 'Giao diện', icon: Palette },
    { id: 'notifications', name: 'Thông báo', icon: Bell },
    { id: 'study', name: 'Học tập', icon: Target },
    { id: 'privacy', name: 'Bảo mật', icon: Shield },
    { id: 'about', name: 'Về ứng dụng', icon: HelpCircle }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Cài đặt</h2>
        <p className="text-sm text-gray-600 mt-1">Quản lý tài khoản và tùy chỉnh trải nghiệm học tập</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="size-5" />
                  <span className="flex-1 text-left">{section.name}</span>
                  <ChevronRight className={`size-4 ${activeSection === section.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Account Settings */}
            {activeSection === 'account' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin tài khoản</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tên hiển thị
                      </label>
                      <input
                        type="text"
                        value={settings.name}
                        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Lock className="size-4" />
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Xóa tài khoản</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Sau khi xóa, dữ liệu của bạn sẽ bị mất vĩnh viễn và không thể khôi phục.
                  </p>
                  <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors">
                    Xóa tài khoản
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Giao diện</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chủ đề
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['light', 'dark', 'auto'].map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setSettings({ ...settings, theme })}
                            className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                              settings.theme === theme
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {theme === 'light' ? '☀️ Sáng' : theme === 'dark' ? '🌙 Tối' : '🔄 Tự động'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ngôn ngữ
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="vi">🇻🇳 Tiếng Việt</option>
                        <option value="en">🇺🇸 English</option>
                        <option value="ja">🇯🇵 日本語</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kích thước chữ
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['small', 'medium', 'large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => setSettings({ ...settings, fontSize: size })}
                            className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                              settings.fontSize === size
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {size === 'small' ? 'Nhỏ' : size === 'medium' ? 'Trung bình' : 'Lớn'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông báo</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email thông báo', desc: 'Nhận thông báo qua email' },
                      { key: 'pushNotifications', label: 'Thông báo đẩy', desc: 'Nhận thông báo trên thiết bị' },
                      { key: 'studyReminders', label: 'Nhắc nhở học tập', desc: 'Nhắc nhở hàng ngày để học' },
                      { key: 'achievementAlerts', label: 'Thông báo thành tích', desc: 'Thông báo khi đạt thành tích mới' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{item.label}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Study Preferences */}
            {activeSection === 'study' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tùy chỉnh học tập</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mục tiêu hàng ngày (câu hỏi)
                      </label>
                      <input
                        type="number"
                        value={settings.dailyGoal}
                        onChange={(e) => setSettings({ ...settings, dailyGoal: parseInt(e.target.value) })}
                        min="5"
                        max="100"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {[
                      { key: 'autoPlayAudio', label: 'Tự động phát âm thanh', desc: 'Tự động phát âm thanh khi hiển thị từ vựng' },
                      { key: 'showExplanations', label: 'Hiển thị giải thích', desc: 'Hiển thị giải thích chi tiết sau mỗi câu hỏi' },
                      { key: 'immediateCorrection', label: 'Sửa lỗi ngay lập tức', desc: 'Hiển thị đáp án đúng ngay khi trả lời sai' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{item.label}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bảo mật & Quyền riêng tư</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hiển thị hồ sơ
                      </label>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="public">Công khai</option>
                        <option value="friends">Bạn bè</option>
                        <option value="private">Riêng tư</option>
                      </select>
                    </div>

                    {[
                      { key: 'showActivity', label: 'Hiển thị hoạt động', desc: 'Cho phép người khác xem hoạt động học tập của bạn' },
                      { key: 'allowDataCollection', label: 'Thu thập dữ liệu', desc: 'Cho phép thu thập dữ liệu để cải thiện trải nghiệm' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{item.label}</div>
                          <div className="text-sm text-gray-600">{item.desc}</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* About */}
            {activeSection === 'about' && (
              <div className="p-6 space-y-6">
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎌</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">JLPT Learning App</h3>
                  <p className="text-gray-600 mb-1">Phiên bản 1.0.0</p>
                  <p className="text-sm text-gray-500">© 2024 JLPT Learning. All rights reserved.</p>
                </div>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900">Điều khoản sử dụng</span>
                    <ChevronRight className="size-5 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900">Chính sách bảo mật</span>
                    <ChevronRight className="size-5 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900">Hỗ trợ & Phản hồi</span>
                    <ChevronRight className="size-5 text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-900">Giới thiệu ứng dụng</span>
                    <ChevronRight className="size-5 text-gray-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="border-t border-gray-200 p-6 flex items-center justify-between">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                <LogOut className="size-5" />
                Đăng xuất
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Save className="size-5" />
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
