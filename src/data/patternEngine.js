/**
 * CCAT Telemetry & Hidden Pattern Diagnostic Engine
 * Analyzes full per-question timing, accuracy, categories, and past attempts.
 */

export function analyzeAttemptPatterns(attempt) {
  if (!attempt || !attempt.responses) return null;

  const responses = Object.values(attempt.responses);
  const totalQuestions = attempt.totalQuestions || 50;
  const attemptedCount = responses.filter(r => !r.isSkipped && r.selectedOption).length;
  const correctCount = responses.filter(r => r.isCorrect).length;

  // 1. Time Traps (> 28s and incorrect)
  const timeTraps = responses.filter(r => !r.isCorrect && r.timeSpentSec >= 28);
  const totalWastedTimeSec = Math.max(0, timeTraps.reduce((acc, r) => acc + Math.max(0, r.timeSpentSec - 18), 0));
  const potentialLostQuestions = Math.floor(totalWastedTimeSec / 15);

  // 2. Rush Errors (< 8s and incorrect)
  const rushErrors = responses.filter(r => !r.isCorrect && !r.isSkipped && r.timeSpentSec < 8);

  // 3. Category Breakdown with timing
  const categories = {
    math: { name: 'Math & Logic', total: 0, attempted: 0, correct: 0, totalTime: 0 },
    verbal: { name: 'Verbal Reasoning', total: 0, attempted: 0, correct: 0, totalTime: 0 },
    spatial: { name: 'Spatial Reasoning', total: 0, attempted: 0, correct: 0, totalTime: 0 }
  };

  // Initialize totals from full test structure (never leave total at 0 or 1)
  if (attempt.questions && Array.isArray(attempt.questions) && attempt.questions.length > 0) {
    attempt.questions.forEach(q => {
      const cat = q.category || 'math';
      if (!categories[cat]) categories[cat] = { name: cat, total: 0, attempted: 0, correct: 0, totalTime: 0 };
      categories[cat].total += 1;
    });
  } else {
    // Official CCAT Standard Distribution (22 Math, 17 Verbal, 11 Spatial = 50 total)
    categories.math.total = 22;
    categories.verbal.total = 17;
    categories.spatial.total = 11;
  }

  responses.forEach(r => {
    const cat = r.category || 'math';
    if (!categories[cat]) categories[cat] = { name: cat, total: 0, attempted: 0, correct: 0, totalTime: 0 };
    categories[cat].totalTime += (r.timeSpentSec || 0);
    if (!r.isSkipped && r.selectedOption) categories[cat].attempted += 1;
    if (r.isCorrect) categories[cat].correct += 1;
  });

  const categoryStats = Object.entries(categories).map(([key, data]) => {
    const avgTime = data.attempted > 0 
      ? (data.totalTime / data.attempted).toFixed(1)
      : data.totalTime > 0
      ? data.totalTime.toFixed(1)
      : '0.0';
    const accuracy = data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0;
    return {
      key,
      name: data.name,
      total: Math.max(1, data.total),
      attempted: data.attempted,
      correct: data.correct,
      avgTimeSec: parseFloat(avgTime),
      accuracyPercent: accuracy
    };
  });

  // 4. Half-test Fatigue Analysis (Q1-25 vs Q26-50)
  const firstHalf = responses.filter(r => (r.questionId || 0) <= 25);
  const secondHalf = responses.filter(r => (r.questionId || 0) > 25);

  const calcHalfStats = (arr) => {
    if (!arr.length) return { correct: 0, avgTime: 0, accuracy: 0 };
    const correct = arr.filter(r => r.isCorrect).length;
    const totalTime = arr.reduce((acc, r) => acc + (r.timeSpentSec || 0), 0);
    const attempted = arr.filter(r => !r.isSkipped && r.selectedOption).length;
    return {
      correct,
      total: arr.length,
      attempted,
      avgTime: attempted > 0 ? (totalTime / attempted).toFixed(1) : '0.0',
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0
    };
  };

  const half1 = calcHalfStats(firstHalf);
  const half2 = calcHalfStats(secondHalf);
  const staminaDecay = half1.accuracy > 0 ? (half1.accuracy - half2.accuracy) : 0;

  // 5. Overall timing (calculated over touched questions to avoid dividing 0s for unreached)
  const touchedQuestions = responses.filter(r => (r.timeSpentSec || 0) > 0 || (!r.isSkipped && r.selectedOption));
  const totalTimeSpent = responses.reduce((acc, r) => acc + (r.timeSpentSec || 0), 0);
  const overallAvgTime = touchedQuestions.length > 0 
    ? (totalTimeSpent / touchedQuestions.length).toFixed(1) 
    : '0.0';

  return {
    score: correctCount,
    totalQuestions,
    attemptedCount,
    unattemptedCount: totalQuestions - attemptedCount,
    overallAccuracy: attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0,
    overallAvgTimeSec: parseFloat(overallAvgTime),
    timeTraps: {
      count: timeTraps.length,
      wastedSeconds: Math.round(totalWastedTimeSec),
      potentialLostQuestions,
      items: timeTraps.map(t => ({
        qId: t.questionId,
        category: t.category,
        timeSpentSec: t.timeSpentSec,
        prompt: t.promptSummary || `Question #${t.questionId}`
      }))
    },
    rushErrors: {
      count: rushErrors.length,
      items: rushErrors.map(r => ({
        qId: r.questionId,
        timeSpentSec: r.timeSpentSec
      }))
    },
    categoryStats,
    fatigue: {
      half1,
      half2,
      staminaDecay
    }
  };
}

/**
 * Intelligent Advisor for the AI Coach Chatbot
 * Synthesizes advice from all historical attempts and telemetry patterns
 */
export function generateCoachInsight(query, allAttempts, activeAttempt = null) {
  const latestAttempt = activeAttempt || (allAttempts && allAttempts.length > 0 ? allAttempts[allAttempts.length - 1] : null);

  if (!latestAttempt) {
    return `### Welcome to the CCAT AI Performance Coach! 🧠
I analyze your timing, question-by-question telemetry, and category accuracy to help you hit **35–42+ on the CCAT**.

You haven't completed any tests yet. Click **"Start Test"** above to complete a 15-minute simulation. Once completed, I will analyze:
1. **Hidden Time Traps** (questions that stole minutes from you).
2. **Category Speed Imbalance** (Math vs Verbal vs Spatial velocity).
3. **Panic Guessing / Fatigue Decay** in the final minutes.
4. **Actionable Roadmap** to unlock the 35+ score bracket.`;
  }

  const analysis = analyzeAttemptPatterns(latestAttempt);
  const qLower = query.toLowerCase();

  // Pattern 1: Time Traps query
  if (qLower.includes('time trap') || qLower.includes('wasted time') || qLower.includes('slow') || qLower.includes('stuck')) {
    const { timeTraps } = analysis;
    if (timeTraps.count === 0) {
      return `### ⚡ Time Trap Analysis: Excellent Discipline!
In your latest attempt, **you had 0 critical time traps** (>28s on an incorrect question). Your pacing was disciplined and respected the CCAT 18-second rule!

**Pro Tip to push further:** Ensure you are not spending more than **22s on Math word problems**. If step 1 doesn't click in 5 seconds, guess and advance immediately.`;
    }

    const trapList = timeTraps.items.map(t => `* **Question #${t.qId}** (${t.category}): Spent **${t.timeSpentSec}s**`).join('\n');
    return `### ⚠️ Hidden Pattern Alert: ${timeTraps.count} Severe Time Traps Detected!
On the CCAT, your greatest enemy is **sunk cost**. In your latest test:
* You spent excessive time on **${timeTraps.count} questions** that you ultimately got wrong.
* Total wasted time: **${timeTraps.wastedSeconds} seconds** (~${(timeTraps.wastedSeconds / 60).toFixed(1)} minutes).
* **The Cost:** That wasted time deprived you of seeing or answering at least **${timeTraps.potentialLostQuestions} faster questions**!

#### Questions that trapped you:
${trapList}

**🚀 The Golden CCAT Rule:**
Set an internal mental alarm at **20 seconds**. If you cannot eliminate options down to 2 choices by second 20, make an educated guess and hit **Next** instantly. Never surrender 35+ seconds to a single point.`;
  }

  // Pattern 2: Speed and Pacing query
  if (qLower.includes('speed') || qLower.includes('pace') || qLower.includes('time') || qLower.includes('faster')) {
    const cats = analysis.categoryStats;
    const mathCat = cats.find(c => c.key === 'math') || {};
    const verbalCat = cats.find(c => c.key === 'verbal') || {};
    const spatialCat = cats.find(c => c.key === 'spatial') || {};

    return `### ⏱️ Pacing & Speed Telemetry Breakdown

* **Overall Average Pace:** **${analysis.overallAvgTimeSec}s** per question (Target: $\\le$ **18.0s**).
* **Verbal Velocity:** **${verbalCat.avgTimeSec || 0}s** avg (Target: **10–12s**). Accuracy: **${verbalCat.accuracyPercent}%**.
* **Math Velocity:** **${mathCat.avgTimeSec || 0}s** avg (Target: **18–22s**). Accuracy: **${mathCat.accuracyPercent}%**.
* **Spatial Velocity:** **${spatialCat.avgTimeSec || 0}s** avg (Target: **14–16s**). Accuracy: **${spatialCat.accuracyPercent}%**.

#### Strategic Adjustments:
1. **Borrow Verbal Seconds for Math:** If you complete Verbal questions in 10 seconds, you bank 8 seconds per question to spend on multi-step Math calculations.
2. **Rapid Elimination in Spatial:** On Odd-One-Out and Next-in-Series, track only **one attribute** (e.g. rotation only or dot position only) to immediately discard 3 false choices.`;
  }

  // Pattern 3: How to reach 35+ / 40+ score
  if (qLower.includes('35') || qLower.includes('40') || qLower.includes('improve score') || qLower.includes('increase') || qLower.includes('score')) {
    const score = analysis.score;
    const gap = 35 - score;
    const cats = analysis.categoryStats;
    const weakest = [...cats].sort((a, b) => a.accuracyPercent - b.accuracyPercent)[0];

    return `### 🎯 Roadmap to 35+ (Current Score: ${score}/50)
${gap > 0 ? `You are **${gap} points away** from the competitive 35+ elite threshold.` : `🎉 You are already in the 35+ elite bracket with **${score}/50**! Here is how to solidify 40+.`}

#### 1. Attack Your Lowest Accuracy Section: **${weakest ? weakest.name : 'Math'}** (${weakest ? weakest.accuracyPercent : 0}%)
* Focus your prep specifically on **${weakest ? weakest.name : 'Math'}** question patterns.

#### 2. The 40/40 Completion Strategy
* To hit 35+, you do **NOT** need to answer all 50 questions with certainty.
* Attempt **42 questions** with an **85% accuracy rate** ($42 \\times 0.85 = 35.7$).
* Guess the remaining 8 questions blindly in the last 15 seconds (statistical chance of picking up another 1–2 points).

#### 3. Eliminate Rush Mistakes
* You had **${analysis.rushErrors.count} questions** answered under 8 seconds that were wrong. Taking just 3 extra seconds to re-verify negatives (*"not"*, *"except"*) will save 2–3 easy points.`;
  }

  // Pattern 4: Overall Progress & Cross-Attempt Trajectory query
  if (qLower.includes('progress') || qLower.includes('overall') || qLower.includes('summary') || qLower.includes('trajectory') || qLower.includes('all test') || qLower.includes('how am i doing') || qLower.includes('trend')) {
    const historyAnalysis = analyzeFullHistory(allAttempts, []);
    if (!historyAnalysis.hasData) {
      return `### 📊 Overall Progress Summary\nYou have completed **${allAttempts.length} tests** so far. Complete more tests to generate detailed trajectory and trend comparisons.`;
    }

    const { totalTests, initialScore, latestScore, scoreDelta, bestScore, averageScore, scoreTrajectory, cumulativeSections, primaryWeakness, primaryStrength, totalTimeTraps } = historyAnalysis;

    return `### 📈 Overall Progress & Trajectory Summary (${totalTests} Tests Recorded)

#### 🚀 Score Trajectory:
* **Timeline:** ${scoreTrajectory.join(' ➔ ')}
* **Start vs Current:** Started at **${initialScore}/50** ➔ Currently at **${latestScore}/50** (${scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta} points delta).
* **Peak Score:** **${bestScore}/50** (Average: **${averageScore}/50**).

#### 🧠 Cumulative Section Diagnostics:
* **Verbal Reasoning:** **${cumulativeSections.verbal.accuracy}%** accuracy (${cumulativeSections.verbal.correct}/${cumulativeSections.verbal.attempted}) | Avg Pace: **${cumulativeSections.verbal.avgTime}s**
* **Spatial Reasoning:** **${cumulativeSections.spatial.accuracy}%** accuracy (${cumulativeSections.spatial.correct}/${cumulativeSections.spatial.attempted}) | Avg Pace: **${cumulativeSections.spatial.avgTime}s**
* **Math & Logic:** **${cumulativeSections.math.accuracy}%** accuracy (${cumulativeSections.math.correct}/${cumulativeSections.math.attempted}) | Avg Pace: **${cumulativeSections.math.avgTime}s**

#### ⚡ Strategic Insights toward 45+:
1. **Primary Strength:** **${primaryStrength.name}** (${primaryStrength.accuracy}% accuracy) is your highest reliability bank.
2. **Current Bottleneck:** **${primaryWeakness.name}** (${primaryWeakness.accuracy}% accuracy) is currently where the most points are leaked.
3. **Time Traps:** You have accumulated **${totalTimeTraps} time traps** (>28s on wrong questions) across all tests. Enforcing a strict 22s math kill-switch will free up the time needed to see all 50 questions!`;
  }

  // Default comprehensive overview
  return `### 🧠 Diagnostic Summary (Attempt Score: ${analysis.score}/50)

Here is what your attempt telemetry revealed:

* **Score:** **${analysis.score} / ${analysis.totalQuestions}** (${analysis.overallAccuracy}% accuracy on attempted questions).
* **Pacing:** **${analysis.overallAvgTimeSec}s** average per question.
* **Time Traps:** **${analysis.timeTraps.count} questions** consumed >28s and were missed (totaling ~${analysis.timeTraps.wastedSeconds}s wasted).
* **Fatigue / Stamina Drop:** ${analysis.fatigue.staminaDecay > 10 ? `⚠️ Significant drop of **${analysis.fatigue.staminaDecay}% accuracy** between the first half and second half.` : `✅ Steady stamina throughout both halves.`}

**What would you like to explore?**
* Ask: *"Summarize my overall progress across all tests"*
* Ask: *"Where are my time traps?"*
* Ask: *"Analyze my speed by section"*
* Ask: *"How do I reach a 45+ score?"*`;
}

/**
 * Multi-Attempt & Speed Sprints Historical Synthesis Engine
 * Aggregates all test attempts and ultra-fast sprints into unified trajectory analytics.
 */
export function analyzeFullHistory(allAttempts = [], ultraFastAttempts = []) {
  if (!allAttempts || allAttempts.length === 0) {
    return {
      hasData: false,
      totalTests: 0,
      summaryMarkdown: 'No completed tests recorded yet.'
    };
  }

  // Filter valid attempts that have at least 1 attempted/answered response
  const validAttempts = allAttempts.filter(a => {
    const resp = a.responses ? Object.values(a.responses) : [];
    return resp.some(r => r.selectedOption !== null || r.isCorrect);
  });

  if (validAttempts.length === 0) {
    return {
      hasData: false,
      totalTests: 0,
      summaryMarkdown: 'No completed tests with recorded answers.'
    };
  }

  // Sort chronologically ascending (earliest to latest)
  const chronological = [...validAttempts].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Process per-attempt patterns
  const detailedAttempts = chronological.map((att, idx) => {
    const analysis = analyzeAttemptPatterns(att);
    const score = analysis?.score || 0;
    const accuracy = analysis?.overallAccuracy || 0;
    const avgTime = analysis?.overallAvgTimeSec || 0;
    const timeTrapsCount = analysis?.timeTraps?.count || 0;
    const wastedSeconds = analysis?.timeTraps?.wastedSeconds || 0;

    const mathStats = analysis?.categoryStats.find(c => c.key === 'math') || { correct: 0, attempted: 0, accuracyPercent: 0, avgTimeSec: 0 };
    const verbalStats = analysis?.categoryStats.find(c => c.key === 'verbal') || { correct: 0, attempted: 0, accuracyPercent: 0, avgTimeSec: 0 };
    const spatialStats = analysis?.categoryStats.find(c => c.key === 'spatial') || { correct: 0, attempted: 0, accuracyPercent: 0, avgTimeSec: 0 };

    const testLabel = att.testTitle || (att.testId ? `Test ${att.testId.replace('test-', '')}` : `Test #${idx + 1}`);

    return {
      attemptNumber: idx + 1,
      id: att.id,
      testTitle: testLabel,
      testId: att.testId,
      timestamp: att.timestamp,
      dateStr: new Date(att.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      score,
      totalQuestions: att.totalQuestions || 50,
      attemptedCount: analysis?.attemptedCount || 0,
      accuracy,
      avgTime,
      timeTrapsCount,
      wastedSeconds,
      categories: {
        math: mathStats,
        verbal: verbalStats,
        spatial: spatialStats
      }
    };
  });

  const totalTests = detailedAttempts.length;
  const initialAttempt = detailedAttempts[0];
  const latestAttempt = detailedAttempts[totalTests - 1];
  const bestScore = detailedAttempts.reduce((max, a) => Math.max(max, a.score), 0);
  const lowestScore = detailedAttempts.reduce((min, a) => Math.min(min, a.score), 50);
  const averageScore = Math.round((detailedAttempts.reduce((acc, a) => acc + a.score, 0) / totalTests) * 10) / 10;
  const scoreDelta = latestAttempt.score - initialAttempt.score;

  // Cumulative section metrics across all tests
  let cumMath = { attempted: 0, correct: 0, totalTime: 0 };
  let cumVerbal = { attempted: 0, correct: 0, totalTime: 0 };
  let cumSpatial = { attempted: 0, correct: 0, totalTime: 0 };
  let totalTimeTraps = 0;
  let totalWastedSeconds = 0;

  detailedAttempts.forEach(a => {
    cumMath.attempted += a.categories.math.attempted;
    cumMath.correct += a.categories.math.correct;
    cumMath.totalTime += (a.categories.math.avgTimeSec * a.categories.math.attempted);

    cumVerbal.attempted += a.categories.verbal.attempted;
    cumVerbal.correct += a.categories.verbal.correct;
    cumVerbal.totalTime += (a.categories.verbal.avgTimeSec * a.categories.verbal.attempted);

    cumSpatial.attempted += a.categories.spatial.attempted;
    cumSpatial.correct += a.categories.spatial.correct;
    cumSpatial.totalTime += (a.categories.spatial.avgTimeSec * a.categories.spatial.attempted);

    totalTimeTraps += a.timeTrapsCount;
    totalWastedSeconds += a.wastedSeconds;
  });

  const calcSectionCum = (sec) => ({
    attempted: sec.attempted,
    correct: sec.correct,
    accuracy: sec.attempted > 0 ? Math.round((sec.correct / sec.attempted) * 100) : 0,
    avgTime: sec.attempted > 0 ? (sec.totalTime / sec.attempted).toFixed(1) : '0.0'
  });

  const aggregateMath = calcSectionCum(cumMath);
  const aggregateVerbal = calcSectionCum(cumVerbal);
  const aggregateSpatial = calcSectionCum(cumSpatial);

  // Section comparison
  const sections = [
    { name: 'Math & Logic', ...aggregateMath },
    { name: 'Verbal Reasoning', ...aggregateVerbal },
    { name: 'Spatial Reasoning', ...aggregateSpatial }
  ];
  const sortedByAccuracy = [...sections].sort((a, b) => a.accuracy - b.accuracy);
  const primaryWeakness = sortedByAccuracy[0];
  const primaryStrength = sortedByAccuracy[sortedByAccuracy.length - 1];

  // Ultra Fast Mode sprint metrics
  let ultraFastSummary = 'No Ultra Fast speed sprints completed yet.';
  if (ultraFastAttempts && ultraFastAttempts.length > 0) {
    const totalSprints = ultraFastAttempts.length;
    const avgSprintAcc = Math.round(ultraFastAttempts.reduce((acc, s) => acc + s.accuracy, 0) / totalSprints);
    const avgSprintSpeed = (ultraFastAttempts.reduce((acc, s) => acc + s.avgTimeSpentSec, 0) / totalSprints).toFixed(1);
    const totalTimedOut = ultraFastAttempts.reduce((acc, s) => acc + (s.timedOutCount || 0), 0);
    const totalWrongChoices = ultraFastAttempts.reduce((acc, s) => acc + (s.wrongCount || 0), 0);

    const sprintsBySub = { verbal: [], math: [], spatial: [] };
    ultraFastAttempts.forEach(s => {
      if (sprintsBySub[s.subject]) sprintsBySub[s.subject].push(s);
    });

    const formatSubDrill = (subName, arr) => {
      if (!arr.length) return `  * ${subName}: 0 sprints`;
      const avgAcc = Math.round(arr.reduce((acc, s) => acc + s.accuracy, 0) / arr.length);
      const avgPace = (arr.reduce((acc, s) => acc + s.avgTimeSpentSec, 0) / arr.length).toFixed(1);
      return `  * ${subName}: ${arr.length} sprints | Avg Accuracy: ${avgAcc}% | Avg Reaction: ${avgPace}s`;
    };

    ultraFastSummary = `
- Total Speed Sprints Completed: ${totalSprints}
- Overall Sprint Speed Accuracy: ${avgSprintAcc}%
- Overall Average Reaction Time: ${avgSprintSpeed}s per question
- Reflex Mistakes: ${totalWrongChoices} wrong choices, ${totalTimedOut} questions timed out before confirming "Done"
- Drills by Subject:
${formatSubDrill('English / Verbal (7s limit)', sprintsBySub.verbal)}
${formatSubDrill('Math & Logic (15s limit)', sprintsBySub.math)}
${formatSubDrill('Spatial Reasoning (10s limit)', sprintsBySub.spatial)}
`.trim();
  }

  // Trajectory table format
  const testTrajectoryTable = detailedAttempts.map(a => {
    return `* Attempt #${a.attemptNumber} (${a.dateStr}) [${a.testTitle}]: Score **${a.score}/${a.totalQuestions}** (${a.accuracy}%) | Avg Pace: ${a.avgTime}s | Traps: ${a.timeTrapsCount} | Math: ${a.categories.math.correct}/${a.categories.math.attempted} (${a.categories.math.accuracyPercent}%, ${a.categories.math.avgTimeSec}s) | Verbal: ${a.categories.verbal.correct}/${a.categories.verbal.attempted} (${a.categories.verbal.accuracyPercent}%, ${a.categories.verbal.avgTimeSec}s) | Spatial: ${a.categories.spatial.correct}/${a.categories.spatial.attempted} (${a.categories.spatial.accuracyPercent}%, ${a.categories.spatial.avgTimeSec}s)`;
  }).join('\n');

  const scoreTrajectoryArray = detailedAttempts.map(a => `${a.testTitle}: ${a.score}/50`);

  const summaryMarkdown = `
### 📊 UNIFIED HISTORICAL PROGRESSION & TELEMETRY LEDGER
- **Total Standard Tests Completed:** ${totalTests}
- **Score Progression:** ${scoreTrajectoryArray.join(' ➔ ')}
- **Score Delta:** Started at **${initialAttempt.score}/50** ➔ Latest at **${latestAttempt.score}/50** (${scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta} points change)
- **Best Score:** **${bestScore}/50** | **Lowest Score:** **${lowestScore}/50** | **Average Score:** **${averageScore}/50**
- **Cumulative Time Traps:** ${totalTimeTraps} time traps (>28s spent on wrong questions, ~${totalWastedSeconds}s wasted across all tests)

#### Section Performance Across All Tests:
* **Math & Logic:** ${aggregateMath.correct}/${aggregateMath.attempted} (${aggregateMath.accuracy}%) | Avg Pace: ${aggregateMath.avgTime}s
* **Verbal Reasoning:** ${aggregateVerbal.correct}/${aggregateVerbal.attempted} (${aggregateVerbal.accuracy}%) | Avg Pace: ${aggregateVerbal.avgTime}s
* **Spatial Reasoning:** ${aggregateSpatial.correct}/${aggregateSpatial.attempted} (${aggregateSpatial.accuracy}%) | Avg Pace: ${aggregateSpatial.avgTime}s
* **Primary Bottleneck Holding Back 45+:** **${primaryWeakness.name}** (${primaryWeakness.accuracy}% cumulative accuracy)
* **Primary Cognitive Strength:** **${primaryStrength.name}** (${primaryStrength.accuracy}% cumulative accuracy)

#### Chronological Test-by-Test Log:
${testTrajectoryTable}

#### Ultra Fast Reflex Sprints (~1-Min Drills):
${ultraFastSummary}
`.trim();

  return {
    hasData: true,
    totalTests,
    initialScore: initialAttempt.score,
    latestScore: latestAttempt.score,
    scoreDelta,
    bestScore,
    lowestScore,
    averageScore,
    scoreTrajectory: scoreTrajectoryArray,
    detailedAttempts,
    cumulativeSections: {
      math: aggregateMath,
      verbal: aggregateVerbal,
      spatial: aggregateSpatial
    },
    primaryWeakness,
    primaryStrength,
    totalTimeTraps,
    totalWastedSeconds,
    ultraFastSummary,
    summaryMarkdown
  };
}
