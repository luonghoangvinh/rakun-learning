import { Deck } from '../types';

const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#EF4444', '#6366F1', '#14B8A6'];
const icons = ['📚', '📖', '📝', '✏️', '📕', '📗', '📘', '📙', '🎯', '⭐', '🌟', '💡', '🔥', '🎓', '📌', '🏆'];

// Generate more mock decks for pagination demo
export const generateMockDecks = (): Deck[] => {
  const baseDecks = [
    {
      name: 'N5 Từ vựng cơ bản',
      description: 'Các từ vựng cơ bản thường gặp trong JLPT N5',
      level: 'N5',
      cardCount: 50
    },
    {
      name: 'N5 Động từ nhóm 1',
      description: 'Động từ nhóm 1 (godan) trong JLPT N5',
      level: 'N5',
      cardCount: 30
    },
    {
      name: 'N5 Tính từ い',
      description: 'Các tính từ đuôi い cơ bản',
      level: 'N5',
      cardCount: 25
    },
    {
      name: 'N4 Ngữ pháp',
      description: 'Các cấu trúc ngữ pháp quan trọng JLPT N4',
      level: 'N4',
      cardCount: 40
    },
    {
      name: 'N4 Từ vựng nâng cao',
      description: 'Từ vựng nâng cao cho JLPT N4',
      level: 'N4',
      cardCount: 60
    },
    {
      name: 'N4 Kính ngữ cơ bản',
      description: 'Các mẫu câu kính ngữ thông dụng',
      level: 'N4',
      cardCount: 35
    },
    {
      name: 'N3 Kanji thường dùng',
      description: 'Các Kanji quan trọng cho JLPT N3',
      level: 'N3',
      cardCount: 80
    },
    {
      name: 'N3 Từ đồng nghĩa',
      description: 'Các từ có nghĩa tương tự cần phân biệt',
      level: 'N3',
      cardCount: 45
    },
    {
      name: 'N3 Thành ngữ',
      description: 'Thành ngữ và cách diễn đạt thông dụng',
      level: 'N3',
      cardCount: 50
    },
    {
      name: 'N2 Từ vựng nâng cao',
      description: 'Từ vựng nâng cao cho JLPT N2',
      level: 'N2',
      cardCount: 100
    },
    {
      name: 'N2 Kính ngữ nâng cao',
      description: 'Kính ngữ, khiêm nhượng ngữ phức tạp',
      level: 'N2',
      cardCount: 40
    },
    {
      name: 'N2 Onomatopoeia',
      description: 'Từ tượng thanh, tượng hình',
      level: 'N2',
      cardCount: 55
    },
    {
      name: 'N1 Từ vựng chuyên ngành',
      description: 'Từ vựng chuyên ngành business, học thuật',
      level: 'N1',
      cardCount: 120
    },
    {
      name: 'N1 Thành ngữ cao cấp',
      description: 'Thành ngữ, tục ngữ Nhật Bản',
      level: 'N1',
      cardCount: 65
    },
    {
      name: 'N1 Kanji phức tạp',
      description: 'Các Kanji khó, ít gặp trong N1',
      level: 'N1',
      cardCount: 90
    },
    {
      name: 'Số đếm tiếng Nhật',
      description: 'Các loại số đếm (counter) trong tiếng Nhật',
      level: 'N5',
      cardCount: 30
    },
    {
      name: 'Gia đình & Họ hàng',
      description: 'Từ vựng về gia đình, họ hàng',
      level: 'N5',
      cardCount: 20
    },
    {
      name: 'Thời gian & Ngày tháng',
      description: 'Cách nói thời gian, ngày tháng',
      level: 'N5',
      cardCount: 28
    },
    {
      name: 'Ẩm thực Nhật Bản',
      description: 'Từ vựng về món ăn, nhà hàng',
      level: 'N4',
      cardCount: 45
    },
    {
      name: 'Du lịch & Giao thông',
      description: 'Từ vựng cần thiết khi du lịch',
      level: 'N4',
      cardCount: 50
    },
    {
      name: 'Mua sắm & Thời trang',
      description: 'Từ vựng về shopping, quần áo',
      level: 'N4',
      cardCount: 38
    },
    {
      name: 'Công việc & Văn phòng',
      description: 'Từ vựng môi trường làm việc',
      level: 'N3',
      cardCount: 70
    },
    {
      name: 'Y tế & Sức khỏe',
      description: 'Từ vựng về bệnh tật, bác sĩ',
      level: 'N3',
      cardCount: 55
    },
    {
      name: 'Thiên nhiên & Môi trường',
      description: 'Từ vựng về tự nhiên, thời tiết',
      level: 'N3',
      cardCount: 48
    },
    {
      name: 'Kinh tế & Tài chính',
      description: 'Từ vựng kinh tế, ngân hàng',
      level: 'N2',
      cardCount: 85
    },
    {
      name: 'Chính trị & Xã hội',
      description: 'Từ vựng về chính trị, xã hội',
      level: 'N2',
      cardCount: 75
    },
    {
      name: 'Khoa học & Công nghệ',
      description: 'Từ vựng khoa học, công nghệ',
      level: 'N2',
      cardCount: 80
    },
    {
      name: 'Văn học & Nghệ thuật',
      description: 'Từ vựng văn học, nghệ thuật',
      level: 'N1',
      cardCount: 95
    },
    {
      name: 'Lịch sử & Văn hóa',
      description: 'Từ vựng lịch sử, văn hóa Nhật',
      level: 'N1',
      cardCount: 88
    },
    {
      name: 'Triết học & Tâm lý',
      description: 'Từ vựng triết học, tâm lý học',
      level: 'N1',
      cardCount: 92
    },
    {
      name: 'Truyền thông & Media',
      description: 'Từ vựng báo chí, truyền hình',
      level: 'N2',
      cardCount: 65
    },
    {
      name: 'Thể thao & Giải trí',
      description: 'Từ vựng về thể thao, game',
      level: 'N3',
      cardCount: 52
    },
    {
      name: 'Giáo dục & Học tập',
      description: 'Từ vựng về trường học, giáo dục',
      level: 'N4',
      cardCount: 58
    },
    {
      name: 'Nhà cửa & Nội thất',
      description: 'Từ vựng về nhà, đồ dùng',
      level: 'N4',
      cardCount: 42
    },
    {
      name: 'Công nghệ thông tin',
      description: 'Từ vựng IT, máy tính, internet',
      level: 'N3',
      cardCount: 68
    },
    {
      name: 'Âm nhạc & Nhạc cụ',
      description: 'Từ vựng về âm nhạc',
      level: 'N3',
      cardCount: 44
    }
  ];

  return baseDecks.map((deck, index) => ({
    _id: `deck${index + 1}`,
    name: deck.name,
    description: deck.description,
    cardCount: deck.cardCount,
    createdAt: new Date(2024, 0, 1 + index),
    color: colors[index % colors.length],
    icon: icons[index % icons.length],
    visibility: 'community' as const,
    viewCount: Math.floor(Math.random() * 10000) + 100, // Random views 100-10100
    cards: [
      {
        id: `card${index}1`,
        front: '例',
        back: 'れい - Ví dụ',
        type: 'vocabulary' as const,
        level: deck.level as any,
        example: 'これは例です。'
      },
      {
        id: `card${index}2`,
        front: '単語',
        back: 'たんご - Từ vựng',
        type: 'vocabulary' as const,
        level: deck.level as any,
        example: '新しい単語を覚える。'
      }
    ]
  }));
};