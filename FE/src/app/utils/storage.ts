import { UserAnswer, Deck } from '../types';

const STORAGE_KEYS = {
  USER_ANSWERS: 'jlpt_user_answers',
  CUSTOM_DECKS: 'jlpt_custom_decks',
  SAVED_CARDS: 'jlpt_saved_cards'
};

// User answers storage
export async function saveUserAnswer(answer: UserAnswer) {
  try{
    const data= await fetch("/api/user-answers",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answer),
    })
    return data;
  }catch (err){
    console.log(err);
  }
  //const answers = getUserAnswers();
  //answers.push(answer);
  //localStorage.setItem(STORAGE_KEYS.USER_ANSWERS, JSON.stringify(answers));
}

export function getUserAnswers(): UserAnswer[] {
  const data = localStorage.getItem(STORAGE_KEYS.USER_ANSWERS);
  if (!data) return [];
  
  const answers = JSON.parse(data);
  // Convert date strings back to Date objects
  return answers.map((a: any) => ({
    ...a,
    answeredAt: new Date(a.answeredAt)
  }));
}

export function clearUserAnswers(): void {
  localStorage.removeItem(STORAGE_KEYS.USER_ANSWERS);
}

// Custom decks storage
export function saveCustomDeck(deck: Deck): void {
  const decks = getCustomDecks();
  const existingIndex = decks.findIndex(d => d.id === deck.id);
  
  if (existingIndex >= 0) {
    decks[existingIndex] = deck;
  } else {
    decks.push(deck);
  }
  
  localStorage.setItem(STORAGE_KEYS.CUSTOM_DECKS, JSON.stringify(decks));
}

export function getCustomDecks(): Deck[] {
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_DECKS);
  if (!data) return [];
  
  const decks = JSON.parse(data);
  // Convert date strings back to Date objects
  return decks.map((d: any) => ({
    ...d,
    createdAt: new Date(d.createdAt)
  }));
}

export function deleteCustomDeck(deckId: string): void {
  const decks = getCustomDecks();
  const filtered = decks.filter(d => d.id !== deckId);
  localStorage.setItem(STORAGE_KEYS.CUSTOM_DECKS, JSON.stringify(filtered));
}

// Saved cards storage
export function saveCard(deckId: string, cardId: string): void {
  const saved = getSavedCards();
  if (!saved[deckId]) {
    saved[deckId] = [];
  }
  if (!saved[deckId].includes(cardId)) {
    saved[deckId].push(cardId);
  }
  localStorage.setItem(STORAGE_KEYS.SAVED_CARDS, JSON.stringify(saved));
}

export function getSavedCards(): Record<string, string[]> {
  const data = localStorage.getItem(STORAGE_KEYS.SAVED_CARDS);
  return data ? JSON.parse(data) : {};
}

export function removeSavedCard(deckId: string, cardId: string): void {
  const saved = getSavedCards();
  if (saved[deckId]) {
    saved[deckId] = saved[deckId].filter(id => id !== cardId);
  }
  localStorage.setItem(STORAGE_KEYS.SAVED_CARDS, JSON.stringify(saved));
}
