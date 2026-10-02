const key = 'AIzaSyBL7Iy02c9KIOVRLFUAlkgmr1T-6w62S70';

const CASCADE = [
  { id: 'simulated-upper-rate-limited', name: 'Simulated 429 Upper Model' },
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
  { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash' },
  { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite' }
];

async function testCascade() {
  console.log('Testing Auto-Downgrade Cascade Logic...');
  let downgraded = false;
  let firstReason = '';

  for (let i = 0; i < CASCADE.length; i++) {
    const m = CASCADE[i];
    console.log(`\nAttempting ${m.name} (${m.id})...`);

    if (m.id === 'simulated-upper-rate-limited') {
      console.warn(`[Auto-Downgrade Trigger] HTTP 429 Too Many Requests: Quota exceeded for model.`);
      downgraded = true;
      firstReason = 'Rate limit / Quota exceeded';
      continue;
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m.id}:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: 'Give a 1-sentence CCAT pacing rule.' }] }] })
      });
      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        console.log(`[SUCCESS] Responded via ${m.name}!`);
        console.log(`Response text:`, data.candidates[0].content.parts[0].text.trim());
        if (downgraded) {
          console.log(`[VERIFIED] Successfully auto-downgraded to lower model (${m.name}) without stopping! (Reason: ${firstReason})`);
        }
        return;
      } else {
        console.warn(`[Auto-Downgrade Trigger] ${m.name} failed:`, data.error?.message || data);
        downgraded = true;
        if (!firstReason) firstReason = data.error?.message;
      }
    } catch (e) {
      console.warn(`[Auto-Downgrade Trigger] ${m.name} error:`, e.message);
      downgraded = true;
      if (!firstReason) firstReason = e.message;
    }
  }
}

testCascade();
