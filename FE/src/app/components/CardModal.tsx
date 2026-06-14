import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Flashcard, JLPTLevel } from '../types';

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: Omit<Flashcard, 'id'>) => void;
  card?: Flashcard | null;
  mode: 'create' | 'edit';
}

export function CardModal({ isOpen, onClose, onSave, card, mode }: Readonly<CardModalProps>) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [example, setExample] = useState('');
  const [type, setType] = useState<'vocabulary' | 'grammar'>('vocabulary');
  const [level, setLevel] = useState<JLPTLevel>('N5');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (card) {
      setFront(card.front);
      setBack(card.back);
      setExample(card.example || '');
      setType(card.type);
      setLevel(card.level);
    } else {
      setFront('');
      setBack('');
      setExample('');
      setType('vocabulary');
      setLevel('N5');
    }
    setErrors({});
  }, [card, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!front.trim()) {
      newErrors.front = 'Vui lòng nhập nội dung mặt trước';
    }

    if (!back.trim()) {
      newErrors.back = 'Vui lòng nhập nội dung mặt sau';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      front: front.trim(),
      back: back.trim(),
      example: example.trim(),
      type,
      level,
      //status: card?.status || 'new'
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'create' ? 'Thêm thẻ mới' : 'Chỉnh sửa thẻ'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Type and Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại thẻ
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as 'vocabulary' | 'grammar')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="vocabulary">Từ vựng</option>
                <option value="grammar">Ngữ pháp</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cấp độ JLPT
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as JLPTLevel)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="N5">N5</option>
                <option value="N4">N4</option>
                <option value="N3">N3</option>
                <option value="N2">N2</option>
                <option value="N1">N1</option>
              </select>
            </div>
          </div>

          {/* Front */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mặt trước <span className="text-red-500">*</span>
            </label>
            <textarea
              value={front}
              onChange={(e) => {
                setFront(e.target.value);
                if (errors.front) setErrors({ ...errors, front: '' });
              }}
              placeholder={type === 'vocabulary' ? 'Ví dụ: 家族 (かぞく)' : 'Ví dụ: ～てください'}
              rows={2}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                errors.front ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.front && (
              <p className="text-red-500 text-sm mt-1">{errors.front}</p>
            )}
          </div>

          {/* Back */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mặt sau <span className="text-red-500">*</span>
            </label>
            <textarea
              value={back}
              onChange={(e) => {
                setBack(e.target.value);
                if (errors.back) setErrors({ ...errors, back: '' });
              }}
              placeholder={type === 'vocabulary' ? 'Ví dụ: Gia đình' : 'Ví dụ: Vui lòng... (yêu cầu lịch sự)'}
              rows={2}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                errors.back ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.back && (
              <p className="text-red-500 text-sm mt-1">{errors.back}</p>
            )}
          </div>

          {/* Example */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ví dụ (không bắt buộc)
            </label>
            <textarea
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder={
                type === 'vocabulary'
                  ? 'Ví dụ: 私の家族は５人です。(Gia đình tôi có 5 người)'
                  : 'Ví dụ: 静かにしてください。(Vui lòng giữ yên lặng)'
              }
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Xem trước
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Front preview */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white min-h-[150px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-semibold mb-2 opacity-75">MẶT TRƯỚC</div>
                  <div className="text-xl font-bold">
                    {front || 'Nội dung mặt trước'}
                  </div>
                </div>
              </div>

              {/* Back preview */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white min-h-[150px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-semibold mb-2 opacity-75">MẶT SAU</div>
                  <div className="text-lg font-semibold mb-2">
                    {back || 'Nội dung mặt sau'}
                  </div>
                  {example && (
                    <div className="text-sm opacity-90 mt-3 pt-3 border-t border-white/20">
                      {example}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {mode === 'create' ? 'Thêm thẻ' : 'Lưu thay đổi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
