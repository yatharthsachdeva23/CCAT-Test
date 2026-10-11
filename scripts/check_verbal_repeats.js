import { NEW_SUITE_VERBAL } from '../src/data/newSuiteVerbal.js';

const allVocabWords = [];
const allAnalogyPairs = [];

for (let t = 31; t <= 57; t++) {
  const list = NEW_SUITE_VERBAL[String(t)];
  for (let i = 0; i < 6; i++) {
    const match = list[i].question.match(/"([A-Z]+)"/);
    if (match) allVocabWords.push({ word: match[1], t, q: i + 1 });
  }
  for (let i = 6; i < 12; i++) {
    const match = list[i].question.match(/([A-Z\s]+ : [A-Z\s]+)/);
    if (match) allAnalogyPairs.push({ pair: match[1], t, q: i + 1 });
  }
}

const wordMap = new Map();
allVocabWords.forEach(w => {
  wordMap.set(w.word, (wordMap.get(w.word) || 0) + 1);
});
let dupWords = 0;
for (let [w, count] of wordMap) {
  if (count > 1) {
    dupWords++;
    console.log('Word ' + w + ' appears ' + count + ' times');
  }
}
console.log('Total vocab slots:', allVocabWords.length, 'Unique words:', wordMap.size, 'Duplicates:', dupWords);

const pairMap = new Map();
allAnalogyPairs.forEach(p => {
  pairMap.set(p.pair, (pairMap.get(p.pair) || 0) + 1);
});
let dupPairs = 0;
for (let [p, count] of pairMap) {
  if (count > 1) {
    dupPairs++;
    console.log('Pair ' + p + ' appears ' + count + ' times');
  }
}
console.log('Total analogy slots:', allAnalogyPairs.length, 'Unique pairs:', pairMap.size, 'Duplicates:', dupPairs);
