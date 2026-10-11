import json
import re

with open('src/data/newSuiteMath.js', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = "export const NEW_SUITE_MATH = "
start_idx = content.find(prefix) + len(prefix)
end_idx = content.rfind("};\n\nexport function getNewSuiteMathQuestions")
if end_idx == -1:
    end_idx = content.rfind("};\nexport function getNewSuiteMathQuestions")

math_data = json.loads(content[start_idx:end_idx+1].strip())

preambles_cat11 = [
    "Identify the next logical number in the following numerical sequence:\n\n",
    "Determine the succeeding value in the following arithmetic sequence:\n\n",
    "Which number correctly continues this linear progression:\n\n",
    "Find the subsequent integer in the constant-step sequence below:\n\n",
    "Calculate the next value in the following arithmetic series:\n\n",
    "What number logically follows in this uniform progression:\n\n",
    "Determine the next term in the constant-difference sequence:\n\n",
    "Which value completes the regular numerical series below:\n\n",
    "Identify the missing number that extends this arithmetic progression:\n\n",
    "Find the subsequent term in the following linear sequence:\n\n",
    "What is the next number in this regular incrementing series:\n\n",
    "Calculate the next term in the arithmetic sequence below:\n\n",
    "Which number logically succeeds the following numerical series:\n\n",
    "Determine the next integer in the constant-addition progression:\n\n",
    "Find the succeeding value in this regular arithmetic sequence:\n\n",
    "Identify the subsequent term in the given linear progression:\n\n",
    "What value completes the uniform increment sequence below:\n\n",
    "Determine the next number in the following constant-step series:\n\n",
    "Which term logically follows in this arithmetic progression:\n\n",
    "Calculate the succeeding value in the numerical sequence below:\n\n",
    "Find the next logical term in this linear addition series:\n\n",
    "What is the next value in the following uniform sequence:\n\n",
    "Identify the subsequent number in this constant-difference series:\n\n",
    "Determine the missing term in the linear numerical progression:\n\n",
    "Which value correctly continues the arithmetic sequence below:\n\n",
    "Find the next number in the following regular addition series:\n\n",
    "Calculate the next logical term in this uniform progression:\n\n"
]

preambles_cat12 = [
    "Identify the next number in the following geometric sequence:\n\n",
    "What value logically succeeds this exponential sequence:\n\n",
    "Determine the next term in the multiplicative progression below:\n\n",
    "Which value correctly extends the following geometric series:\n\n",
    "Find the subsequent term in the ratio-based numerical sequence:\n\n",
    "Calculate the next number in this multiplying progression:\n\n",
    "Which value logically completes the following exponential series:\n\n",
    "Determine the succeeding number in this constant-ratio sequence:\n\n",
    "What term follows in the expanding geometric series below:\n\n",
    "Find the next logical value in this multiplicative progression:\n\n",
    "Identify the subsequent term in the exponential series below:\n\n",
    "Calculate the succeeding number in this geometric sequence:\n\n",
    "Which number correctly continues the multiplicative progression:\n\n",
    "Determine the next value in the following exponential series:\n\n",
    "What is the next term in this constant-ratio geometric sequence:\n\n",
    "Find the succeeding integer in the multiplying sequence below:\n\n",
    "Identify the next logical number in the expanding ratio series:\n\n",
    "Calculate the next value in this exponential progression:\n\n",
    "Which term logically succeeds the geometric series below:\n\n",
    "Determine the following number in this multiplicative sequence:\n\n",
    "What number completes the constant-factor progression below:\n\n",
    "Find the subsequent value in the following geometric sequence:\n\n",
    "Identify the next term in this exponential numerical series:\n\n",
    "Calculate the succeeding term in the multiplicative series below:\n\n",
    "Which value correctly extends this constant-ratio progression:\n\n",
    "Determine the next logical number in the geometric sequence:\n\n",
    "What term logically follows in this multiplying number series:\n\n"
]

preambles_cat13 = [
    "Identify the next number in the following sequence:\n\n",
    "Examine the increasing differences to find the succeeding value:\n\n",
    "Which term logically completes this second-order progression:\n\n",
    "Determine the next integer in the expanding-interval series:\n\n",
    "What number correctly continues the two-tier difference sequence:\n\n",
    "Calculate the succeeding term in the quadratic numerical sequence:\n\n",
    "Identify the subsequent value in this accelerating difference series:\n\n",
    "Which number completes the two-level progressive sequence below:\n\n",
    "Determine the next term in this compound difference progression:\n\n",
    "Find the succeeding integer in the expanding gap sequence:\n\n",
    "What value logically follows in this two-tier difference progression:\n\n",
    "Calculate the next term in the accelerating numerical series:\n\n",
    "Which integer continues the expanding-difference sequence below:\n\n",
    "Identify the next value in this second-tier interval series:\n\n",
    "Determine the subsequent term in the progressive gap sequence:\n\n",
    "Find the next number in this escalating-difference sequence:\n\n",
    "What is the succeeding value in this two-level numerical series:\n\n",
    "Calculate the next logical term in this expanding interval progression:\n\n",
    "Which term completes the accelerating two-tier sequence below:\n\n",
    "Determine the next number in the compound difference series:\n\n",
    "Find the subsequent integer in this progressive second-order sequence:\n\n",
    "Identify the next value in the expanding-interval progression:\n\n",
    "What number correctly continues this two-tier difference series:\n\n",
    "Calculate the succeeding term in the escalating interval sequence:\n\n",
    "Which value logically follows in this two-stage difference series:\n\n",
    "Determine the next term in the progressive gap numerical sequence:\n\n",
    "Find the next logical integer in this second-order progression:\n\n"
]

preambles_cat14 = [
    "What is the next number in this alternating sequence:\n\n",
    "Analyze the dual interleaved operations to find the succeeding term:\n\n",
    "Which number logically extends this oscillating numerical progression:\n\n",
    "Determine the next value in the two-track alternating series below:\n\n",
    "Identify the subsequent number in this alternating-step sequence:\n\n",
    "Find the missing term that completes the interleaved series below:\n\n",
    "What value logically succeeds this dual-pattern alternating sequence:\n\n",
    "Calculate the next number in the oscillating progression below:\n\n",
    "Which term completes the two-tier alternating series below:\n\n",
    "Determine the next integer in this interleaved operation sequence:\n\n",
    "Find the subsequent term in the alternating numerical series below:\n\n",
    "Identify the next logical number in this dual-rule sequence:\n\n",
    "What is the succeeding value in the alternating progression below:\n\n",
    "Calculate the next term in this two-track oscillating sequence:\n\n",
    "Which number correctly extends the interleaved series below:\n\n",
    "Determine the subsequent value in this alternating-step progression:\n\n",
    "Find the next integer in the dual-pattern numerical sequence:\n\n",
    "What term logically follows in this oscillating series below:\n\n",
    "Identify the succeeding number in this two-track alternating progression:\n\n",
    "Calculate the next value in the interleaved numerical sequence:\n\n",
    "Which value completes this dual-operation alternating series:\n\n",
    "Determine the next logical term in the oscillating progression:\n\n",
    "Find the subsequent number in this two-track sequence below:\n\n",
    "What is the next term in this alternating-step numerical series:\n\n",
    "Identify the value that completes the interleaved progression below:\n\n",
    "Calculate the succeeding number in this oscillating series:\n\n",
    "Which term logically extends this dual-track alternating progression:\n\n"
]

for t in range(31, 58):
    t_idx = t - 31
    test_key = str(t)
    qs = math_data[test_key]
    
    # Q11: Cat 11 (index 10)
    q10 = qs[10]
    seq10 = q10['question'].split('\n\n')[-1]
    q10['question'] = preambles_cat11[t_idx] + seq10
    
    # Q12: Cat 12 (index 11)
    q11 = qs[11]
    seq11 = q11['question'].split('\n\n')[-1]
    q11['question'] = preambles_cat12[t_idx] + seq11
    
    # Q13: Cat 13 (index 12)
    q12 = qs[12]
    seq12 = q12['question'].split('\n\n')[-1]
    q12['question'] = preambles_cat13[t_idx] + seq12
    
    # Q14: Cat 14 (index 13)
    q13 = qs[13]
    seq13 = q13['question'].split('\n\n')[-1]
    q13['question'] = preambles_cat14[t_idx] + seq13

output_code = (
    "// Brand New CCAT Math Bank for Tests 31 through 57 (Zero overlap with Tests 1-30)\n\n"
    + "export const NEW_SUITE_MATH = "
    + json.dumps(math_data, indent=2)
    + ";\n\n"
    + "export function getNewSuiteMathQuestions(testNumber) {\n"
    + "  const list = NEW_SUITE_MATH[testNumber] || NEW_SUITE_MATH[31];\n"
    + "  return [...list];\n"
    + "}\n"
)

with open('src/data/newSuiteMath.js', 'w', encoding='utf-8') as f:
    f.write(output_code)

print("Saved newSuiteMath.js with 100% unique preambles successfully!")
