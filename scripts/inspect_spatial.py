import re

text = open('src/data/spatialBank.js', encoding='utf-8').read()
subtypes = set(re.findall(r"subType:\s*['\"]([^'\"]+)['\"]", text))
print("SubTypes:", subtypes)

keys = ['figureSvg', 'matrixSvg', 'analogySvg', 'netSvg', 'options', 'correctOption']
for k in keys:
    if k in text:
        print(f"Key {k} present in spatialBank")

# Check how QuestionCard or UI renders spatial questions
qc_text = open('src/components/QuestionCard.jsx', encoding='utf-8').read()
print("QuestionCard SVG references:")
for line in qc_text.split('\n'):
    if 'Svg' in line or 'svg' in line:
        print("  ", line.strip())
