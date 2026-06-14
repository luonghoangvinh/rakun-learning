import { X, Plus, Edit2, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Deck, Flashcard } from '../types';
import { CardModal } from './CardModal';

interface DeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deck: Partial<Deck>) => void;
  deck?: Deck | null;
  mode: 'create' | 'edit';
}

const DECK_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Orange', value: '#F59E0B' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Teal', value: '#14B8A6' }
];

const DECK_ICONS = ['📚', '📖', '📝', '✏️', '📕', '📗', '📘', '📙', '🎯', '⭐', '🌟', '💡', '🔥', '🎓', '📌', '🏆'];

export function DeckModal({ isOpen, onClose, onSave, deck, mode }: DeckModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'cards'>('info');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(DECK_COLORS[0].value);
  const [selectedIcon, setSelectedIcon] = useState(DECK_ICONS[0]);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Card modal states
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardModalMode, setCardModalMode] = useState<'create' | 'edit'>('create');
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);

  useEffect(() => {
    if (deck) {
      setName(deck.name);
      setDescription(deck.description);
      setSelectedColor(deck.color || DECK_COLORS[0].value);
      setSelectedIcon(deck.icon || DECK_ICONS[0]);
      setCards(deck.cards || []);
    } else {
      setName('');
      setDescription('');
      setSelectedColor(DECK_COLORS[0].value);
      setSelectedIcon(DECK_ICONS[0]);
      setCards([]);
    }
    setErrors({});
    setActiveTab('info');
  }, [deck, isOpen]);

  const handleAddCard = () => {
    setCardModalMode('create');
    setEditingCard(null);
    setIsCardModalOpen(true);
  };

  const handleEditCard = (card: Flashcard) => {
    setCardModalMode('edit');
    setEditingCard(card);
    setIsCardModalOpen(true);
  };

  const handleDeleteCard = (cardId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa thẻ này?')) {
      setCards(cards.filter(c => c.id !== cardId));
    }
  };

  const handleSaveCard = (cardData: Omit<Flashcard, 'id'>) => {
    if (cardModalMode === 'create') {
      const newCard: Flashcard = {
        ...cardData,
       // id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
      setCards([...cards, newCard]);
    } else if (editingCard) {
      setCards(cards.map(c => c.id === editingCard.id ? { ...cardData, id: c.id } : c));
    }
    setIsCardModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập tên bộ thẻ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      color: selectedColor,
      icon: selectedIcon,
      cards: cards,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'create' ? 'Tạo bộ thẻ mới' : 'Chỉnh sửa bộ thẻ'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 font-semibold transition-all relative ${
              activeTab === 'info'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Thông tin
            {activeTab === 'info' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cards')}
            className={`px-6 py-3 font-semibold transition-all relative ${
              activeTab === 'cards'
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Flashcards ({cards.length})
            {activeTab === 'cards' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            {activeTab === 'info' && (
              <div className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên bộ thẻ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="Ví dụ: Từ vựng N5 - Chủ đề gia đình"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả ngắn về bộ thẻ này..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Biểu tượng
            </label>
            <div className="grid grid-cols-8 gap-2">
              {DECK_ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={`p-3 text-2xl rounded-lg border-2 transition-all hover:scale-110 ${
                    selectedIcon === icon
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Màu sắc
            </label>
            <div className="grid grid-cols-8 gap-2">
              {DECK_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`size-10 rounded-lg border-2 transition-all hover:scale-110 ${
                    selectedColor === color.value
                      ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                      : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Xem trước
            </label>
            <div className="p-6 rounded-xl border-2 border-gray-200" style={{ backgroundColor: `${selectedColor}15` }}>
              <div className="flex items-start gap-3">
                <div
                  className="size-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: selectedColor, color: 'white' }}
                >
                  {selectedIcon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {name || 'Tên bộ thẻ'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {description || 'Mô tả bộ thẻ'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              {cards.length === 0 ? 'Chưa có thẻ nào' : `${cards.length} thẻ trong bộ`}
            </p>
            <button
              type="button"
              onClick={handleAddCard}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="size-4" />
              Thêm thẻ
            </button>
          </div>

          {cards.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <div className="text-5xl mb-3">📝</div>
              <p className="text-gray-600 font-medium">Chưa có thẻ nào</p>
              <p className="text-sm text-gray-500 mt-1">Nhấn "Thêm thẻ" để bắt đầu</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                          card.type === 'vocabulary'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {card.type === 'vocabulary' ? 'Từ vựng' : 'Ngữ pháp'}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded">
                          {card.level}
                        </span>
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">{card.front}</div>
                      <div className="text-sm text-gray-600">{card.back}</div>
                      {card.example && (
                        <div className="text-xs text-gray-500 mt-2 italic">{card.example}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleEditCard(card)}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCard(card?.id??"")}
                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Actions - outside tabs */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {mode === 'create' ? 'Tạo bộ thẻ' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

{/* Card Modal */}
<CardModal
  isOpen={isCardModalOpen}
  onClose={() => setIsCardModalOpen(false)}
  onSave={handleSaveCard}
  card={editingCard}
  mode={cardModalMode}
/>
</div>
  );
}
