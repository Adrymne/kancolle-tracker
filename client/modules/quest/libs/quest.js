const QUEST_COLOUR = {
  A: '#43C769', // composition
  B: '#EC6063', // sortie
  C: '#93CE67', // pvp
  D: '#4EBBD4', // expedition
  E: '#DEC772', // resupply
  F: '#BA8F79', // arsenal
  G: '#CAA6DD', // modernization
  W: '#FDD0F0', // marriage
};
export const getQuestColour = (id) => QUEST_COLOUR[id.charAt(0)];
