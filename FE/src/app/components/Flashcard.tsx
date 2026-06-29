import { useState } from 'react';
import { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  card: FlashcardType;
  onNext?: () => void;
  onPrevious?: () => void;
  currentIndex?: number;
  totalCards?: number;
}

export function Flashcard({ card, onNext, onPrevious, currentIndex = 0, totalCards = 0 }: Readonly<FlashcardProps>) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
      {/* Card counter */}
      <div className="text-sm text-gray-600">
        Thẻ {currentIndex + 1} / {totalCards}
      </div>
      
      {/* Flashcard */}
      <div 
        className="relative w-full aspect-[3/2] cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-2xl shadow-lg border-2 border-gray-200 flex flex-col items-center justify-center p-8"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-4">
                {card.front}
              </div>
              
            </div>
          </div>
          
          {/* Back */}
          <div
            className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg border-2 border-blue-600 flex flex-col items-center justify-center p-8"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="text-center text-white">
              <div className="text-3xl font-semibold mb-4">
                {card.back}
              </div>
              {card.example && (
                <div className="mt-6 text-lg opacity-90 italic">
                  {card.example}
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex gap-4 w-full max-w-md">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious?.();
            setIsFlipped(false);
          }}
          disabled={currentIndex === 0}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Trước
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext?.();
            setIsFlipped(false);
          }}
          disabled={currentIndex === totalCards - 1}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Tiếp theo →
        </button>
      </div>
      
      {/* Progress */}
      <div className="w-full max-w-md">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
