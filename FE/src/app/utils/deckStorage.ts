import { Deck, Flashcard } from '../types';

const DECKS_STORAGE_KEY = 'jlpt_decks';
const userStr = localStorage.getItem('user');
const userData = userStr ? JSON.parse(userStr) : null;
const userId = userData ? userData.id : null;
// Get all decks
export async function getDecks(){
  try{
    const res =await fetch("/api/decks")
    const data=await res.json()
    return data;
  } catch(err){
    throw (err);
  }
}

// Get deck by ID
export async function getDeckById(id: string) {
  const deckData = await fetch(`/api/decks/${id}`);
  const deck = await deckData.json();
  return deck;
}

// Save all decks
function saveDecks(decks: Deck[]) {
  localStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}

// Create new deck
export async function createDeck(name: string, description: string, cards:Flashcard[], color?: string, icon?: string, visibility?: 'personal' | 'community') {
  try {
    const newDeck = {
      //_id: `deck-${Date.now()}`,
      userId: userId,
      name,
      description,
      //cardCount: 0,
      cards: cards||[],
      color: color || '#3B82F6',
      icon: icon || '📚',
      visibility: visibility || 'personal'
    };
    const res = await fetch("/api/decks",{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newDeck),
    }
    )
    const data= await res.json();
    return data;
  } catch (err) {
    throw (err)
  }
}

// Update deck
export async function updateDeck(id: string, updates: Partial<Deck>): Promise<boolean> {
  const res= await fetch(`/api/decks/${id}`,{
    method: "PATCH",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates),
  })
  if(res.ok)
  return true;
else return false;
}

// Delete deck
export async function deleteDeck(id: string): Promise<boolean> {
  const res=await fetch(`/api/decks/${id}`,{method:"DELETE"})
  const data= await res.ok;
  if(data)
  return true;
else return false;
}

// Duplicate deck
export async function duplicateDeck(id: string): Promise<Deck | null> {
  const res= await fetch(`/api/decks/${id}/duplicate`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    }
  })
  const data=await res.json();
  return data;
}

// Add card to deck
export async function addCardToDeck(deckId: string, card: Omit<Flashcard, 'id'>): Promise<boolean> {
  const decks:Deck[] = await getDecks();
  const deckIndex = decks.findIndex(d => d._id === deckId);
  if (deckIndex === -1) return false;

  const newCard: Flashcard = {
    ...card
  };

  decks[deckIndex].cards.push(newCard);
  decks[deckIndex].cards.length = decks[deckIndex].cards.length;
  saveDecks(decks);
  return true;
}

// Update card in deck
export async function updateCard(deckId: string, cardId: string, updates: Partial<Flashcard>): Promise<boolean> {
  const decks :Deck[]= await getDecks();
  const deckIndex = decks.findIndex(d => d._id === deckId);
  if (deckIndex === -1) return false;

  const cardIndex = decks[deckIndex].cards.findIndex(c => c.id === cardId);
  if (cardIndex === -1) return false;

  decks[deckIndex].cards[cardIndex] = {
    ...decks[deckIndex].cards[cardIndex],
    ...updates,
    id: cardId // Preserve ID
  };

  saveDecks(decks);
  return true;
}

// Delete card from deck
export async function deleteCard(deckId: string, cardId: string): Promise<boolean> {
  
  const decks:Deck[] = await getDecks();
  const deckIndex = decks.findIndex(d => d._id === deckId);
  if (deckIndex === -1) return false;

  const originalLength = decks[deckIndex].cards.length;
  decks[deckIndex].cards = decks[deckIndex].cards.filter(c => c.id !== cardId);

  if (decks[deckIndex].cards.length === originalLength) return false;

  decks[deckIndex].cards.length = decks[deckIndex].cards.length;
  saveDecks(decks);
  return true;
}

// Duplicate card
export async function duplicateCard(deckId: string, cardId: string): Promise<boolean> {
  const deck = await getDeckById(deckId);
  if (!deck) return false;

  const card = deck.cards.find((c:Flashcard) => c.id === cardId);
  if (!card) return false;

  const newCard: Flashcard = {
    ...card,
    //id: `card-${Date.now()}-${Math.random()}`,
    //status: 'new'
  };

  return addCardToDeck(deckId, newCard);
}

// Export deck to JSON
export function exportDeck(id: string): string | null {
  const deck = getDeckById(id);
  if (!deck) return null;
  return JSON.stringify(deck, null, 2);
}

// Import deck from JSON
export async function importDeck(jsonString: string): Promise<Deck | null> {
  try {
    const deck = JSON.parse(jsonString) as Deck;
    deck._id = `deck-${Date.now()}`;
    deck.createdAt = new Date();

    const decks:Deck[] = await getDecks();
    decks.push(deck);
    saveDecks(decks);
    return deck;
  } catch {
    return null;
  }
}