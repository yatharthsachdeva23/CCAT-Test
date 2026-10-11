import { buildTest } from '../src/data/testCatalog.js';
import {
  VOCAB_BANK,
  ANALOGY_BANK,
  ODD_WORD_BANK,
  SENTENCE_COMPLETION_BANK,
  DEDUCTIVE_LOGIC_BANK
} from '../src/data/verbalBank.js';

const oldVerbalQuestions = new Set();
for (let t = 1; t <= 30; t++) {
  const test = buildTest(t);
  test.questions.filter(q => q.category === 'verbal').forEach(q => {
    oldVerbalQuestions.add(q.question.trim().toLowerCase().replace(/\s+/g, ' '));
  });
}

console.log('Total unique verbal questions across all 30 old tests:', oldVerbalQuestions.size);

// Check which items in VOCAB_BANK appeared in old tests
const usedVocabIndices = [];
VOCAB_BANK.forEach((item, idx) => {
  const isAntonym = item.type === 'antonym';
  const qText = isAntonym 
    ? `Which of the following words is most OPPOSITE in meaning to "${item.word}"?`
    : `Which of the following words is most SIMILAR in meaning to "${item.word}"?`;
  if (oldVerbalQuestions.has(qText.trim().toLowerCase().replace(/\s+/g, ' '))) {
    usedVocabIndices.push(idx);
  }
});
console.log(`VOCAB_BANK: ${usedVocabIndices.length} / ${VOCAB_BANK.length} used in old tests. (indices: ${usedVocabIndices[0]} to ${usedVocabIndices[usedVocabIndices.length - 1]})`);

// Check ANALOGY_BANK
const usedAnalogyIndices = [];
ANALOGY_BANK.forEach((item, idx) => {
  const qText = `${item.pair} is analogous to:`;
  if (oldVerbalQuestions.has(qText.trim().toLowerCase().replace(/\s+/g, ' '))) {
    usedAnalogyIndices.push(idx);
  }
});
console.log(`ANALOGY_BANK: ${usedAnalogyIndices.length} / ${ANALOGY_BANK.length} used in old tests. (indices: ${usedAnalogyIndices[0]} to ${usedAnalogyIndices[usedAnalogyIndices.length - 1]})`);

// Check ODD_WORD_BANK
const usedOddIndices = [];
ODD_WORD_BANK.forEach((item, idx) => {
  const qText = `In the domain of ${item.categoryContext}, which word does NOT belong with the others?`;
  if (oldVerbalQuestions.has(qText.trim().toLowerCase().replace(/\s+/g, ' '))) {
    usedOddIndices.push(idx);
  }
});
console.log(`ODD_WORD_BANK: ${usedOddIndices.length} / ${ODD_WORD_BANK.length} used in old tests. (indices: ${usedOddIndices[0]} to ${usedOddIndices[usedOddIndices.length - 1]})`);

// Check SENTENCE_COMPLETION_BANK
const usedSentenceIndices = [];
SENTENCE_COMPLETION_BANK.forEach((item, idx) => {
  const qText = `Complete the sentence with the word that best fits the context:\n\n"${item.sentence}"`;
  if (oldVerbalQuestions.has(qText.trim().toLowerCase().replace(/\s+/g, ' '))) {
    usedSentenceIndices.push(idx);
  }
});
console.log(`SENTENCE_COMPLETION_BANK: ${usedSentenceIndices.length} / ${SENTENCE_COMPLETION_BANK.length} used in old tests. (indices: ${usedSentenceIndices[0]} to ${usedSentenceIndices[usedSentenceIndices.length - 1]})`);

// Check DEDUCTIVE_LOGIC_BANK
const usedLogicIndices = [];
DEDUCTIVE_LOGIC_BANK.forEach((item, idx) => {
  const qText = item.premise;
  if (oldVerbalQuestions.has(qText.trim().toLowerCase().replace(/\s+/g, ' '))) {
    usedLogicIndices.push(idx);
  }
});
console.log(`DEDUCTIVE_LOGIC_BANK: ${usedLogicIndices.length} / ${DEDUCTIVE_LOGIC_BANK.length} used in old tests. (indices: ${usedLogicIndices[0]} to ${usedLogicIndices[usedLogicIndices.length - 1]})`);
