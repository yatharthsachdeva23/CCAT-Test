import json
import re

with open('scripts/fresh_verbal_pack.json') as f:
    fresh = json.load(f)

with open('scripts/generated_verbal_pack.json') as f:
    gen = json.load(f)

new_vocab = fresh['vocab']
new_analogies = fresh['analogies']
new_odd_words = gen['odd_words']
new_sentences = gen['sentences']
new_logics = gen['logics']

print(f"Loaded: vocab={len(new_vocab)}, analogies={len(new_analogies)}, odd={len(new_odd_words)}, sentences={len(new_sentences)}, logics={len(new_logics)}")

with open('src/data/verbalBank.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Format new items as JS objects
def format_items(items):
    lines = []
    for item in items:
        lines.append('  ' + json.dumps(item, indent=2).replace('\n', '\n  ') + ',')
    return '\n' + '\n'.join(lines) + '\n'

# 2. Append to VOCAB_BANK (before `export const ANALOGY_BANK = [`)
vocab_marker = 'export const ANALOGY_BANK = ['
idx_vocab = content.find(vocab_marker)
last_bracket_v = content.rfind('];', 0, idx_vocab)
content = content[:last_bracket_v] + ',' + format_items(new_vocab) + '];\n' + content[idx_vocab:]

# 3. Append to ANALOGY_BANK (before `export const SYLLOGISM_BANK = [`)
analogy_marker = 'export const SYLLOGISM_BANK = ['
idx_analogy = content.find(analogy_marker)
last_bracket_a = content.rfind('];', 0, idx_analogy)
content = content[:last_bracket_a] + ',' + format_items(new_analogies) + '];\n' + content[idx_analogy:]

# 4. Append to ODD_WORD_BANK (before `export const SENTENCE_COMPLETION_BANK = [`)
sentence_marker = 'export const SENTENCE_COMPLETION_BANK = ['
idx_sentence = content.find(sentence_marker)
last_bracket_o = content.rfind('];', 0, idx_sentence)
content = content[:last_bracket_o] + ',' + format_items(new_odd_words) + '];\n' + content[idx_sentence:]

# 5. Append to SENTENCE_COMPLETION_BANK (before `export const DEDUCTIVE_LOGIC_BANK = [`)
logic_marker = 'export const DEDUCTIVE_LOGIC_BANK = ['
idx_logic = content.find(logic_marker)
last_bracket_s = content.rfind('];', 0, idx_logic)
content = content[:last_bracket_s] + ',' + format_items(new_sentences) + '];\n' + content[idx_logic:]

# 6. Append to DEDUCTIVE_LOGIC_BANK (before `export function getVerbalQuestionsForTest`)
fn_marker = 'export function getVerbalQuestionsForTest'
idx_fn = content.find(fn_marker)
last_bracket_l = content.rfind('];', 0, idx_fn)
content = content[:last_bracket_l] + ',' + format_items(new_logics) + '];\n\n' + content[idx_fn:]

# 7. Update getVerbalQuestionsForTest function implementation
new_fn_code = """export function getVerbalQuestionsForTest(testNumber, isNewSuite = false) {
  const rand = pseudoRandom(testNumber * 8819 + 421);
  const questions = [];
  const isNew = isNewSuite || testNumber > 30;
  const tIdx = isNew ? (testNumber > 30 ? testNumber - 31 : testNumber - 2) : (testNumber - 2);

  // Slicing policy:
  // Tests 1-30 (Original baseline): use initial banks with modulo wrap
  // Tests 31-57 (New suite): use dedicated non-overlapping slices with ZERO repeat of Tests 1-30!
  const vocabOffset = isNew ? 60 : 0;
  const vocabMod = isNew ? VOCAB_BANK.length : 60;

  const analogyOffset = isNew ? 40 : 0;
  const analogyMod = isNew ? ANALOGY_BANK.length : 40;

  const oddBase = isNew ? (30 + tIdx * 3) : ((tIdx * 3) % 30);
  const sentenceOffset = isNew ? 10 : 0;
  const logicOffset = isNew ? 10 : 0;

  // 1. Six Vocabulary questions
  for (let i = 0; i < 6; i++) {
    const idx = isNew ? (vocabOffset + tIdx * 6 + i) : ((tIdx * 6 + i) % vocabMod);
    const item = VOCAB_BANK[idx];
    const isAntonym = item.type === 'antonym';
    const qText = isAntonym 
      ? `Which of the following words is most OPPOSITE in meaning to "${item.word}"?`
      : `Which of the following words is most SIMILAR in meaning to "${item.word}"?`;
    const rawOpts = [item.correct, ...item.distractors.slice(0, 4)];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    questions.push({
      question: qText,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${item.correct})\\n\\n${item.expl}\\n\\n💡 **Speed Tip:** Rapidly eliminate choices that belong to the wrong category. Target <8 seconds.`,
      category: 'verbal',
      subType: isAntonym ? 'antonym' : 'synonym'
    });
  }

  // 2. Six Analogy questions
  for (let i = 0; i < 6; i++) {
    const idx = isNew ? (analogyOffset + tIdx * 6 + i) : ((tIdx * 6 + i) % analogyMod);
    const item = ANALOGY_BANK[idx];
    const qText = `${item.pair} is analogous to:`;
    const rawOpts = [item.correct, ...item.distractors.slice(0, 4)];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    questions.push({
      question: qText,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${item.correct})\\n\\n${item.expl}\\n\\n💡 **Speed Tip:** Build a precise bridge sentence: "X is used to / is composed of Y". Apply to find the exact match.`,
      category: 'verbal',
      subType: 'analogy'
    });
  }

  // 3. Three Odd-Word-Out questions
  const oddSlice = ODD_WORD_BANK.slice(oddBase, oddBase + 3);
  for (let i = 0; i < 3; i++) {
    const item = oddSlice[i];
    const qText = `In the domain of ${item.categoryContext}, which word does NOT belong with the others?`;
    const rawOpts = [...item.words.slice(0, 5)];
    const corrIdx = rawOpts.indexOf(item.correct);
    const { options, correctOption } = randomize(rawOpts, corrIdx >= 0 ? corrIdx : 0, rand);
    questions.push({
      question: qText,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${item.correct})\\n\\n${item.expl}\\n\\n💡 **Speed Tip:** Identify the unifying trait uniting 4 options, isolate the outlier.`,
      category: 'verbal',
      subType: 'odd_word'
    });
  }

  // 4. Exactly ONE Contextual Sentence Completion question
  const sentItem = isNew ? SENTENCE_COMPLETION_BANK[sentenceOffset + tIdx] : SENTENCE_COMPLETION_BANK[tIdx % 10];
  {
    const rawOpts = [sentItem.correct, ...sentItem.distractors.slice(0, 4)];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    questions.push({
      question: `Complete the sentence with the word that best fits the context:\\n\\n"${sentItem.sentence}"`,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${sentItem.correct})\\n\\n${sentItem.expl}\\n\\n💡 **Speed Tip:** Predict the missing word's connotation (positive/negative) before reading the options.`,
      category: 'verbal',
      subType: 'sentence_completion'
    });
  }

  // 5. Exactly ONE Deductive Logic / Syllogism question
  const logicItem = isNew ? DEDUCTIVE_LOGIC_BANK[logicOffset + tIdx] : DEDUCTIVE_LOGIC_BANK[tIdx % 10];
  {
    const rawOpts = [logicItem.correct, ...logicItem.distractors.slice(0, 4)];
    const { options, correctOption } = randomize(rawOpts, 0, rand);
    questions.push({
      question: logicItem.premise,
      options,
      correctOption,
      explanation: `**Correct Answer: ${correctOption}** (${logicItem.correct})\\n\\n${logicItem.expl}\\n\\n💡 **Speed Tip:** Stick strictly to stated facts. Watch out for the 'Affirming the Consequent' trap!`,
      category: 'verbal',
      subType: 'syllogism'
    });
  }

  return questions;
}
"""

fn_regex = re.compile(r'export function getVerbalQuestionsForTest\(testNumber, isNewSuite = false\) \{[\s\S]*?\n\}', re.MULTILINE)
content = fn_regex.sub(new_fn_code.strip(), content)

with open('src/data/verbalBank.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("verbalBank.js updated successfully!")
