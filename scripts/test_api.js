const key = 'AIzaSyBL7Iy02c9KIOVRLFUAlkgmr1T-6w62S70';

async function test() {
  const models = ['gemini-2.5-flash', 'gemini-3.8-flash'];
  for (const m of models) {
    console.log(`\nTesting ${m}...`);
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${key}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: 'Hello, what is CCAT?' }] }] })
      });
      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        console.log(`[SUCCESS] ${m} responded:`, data.candidates[0].content.parts[0].text.slice(0, 100) + '...');
        return;
      } else {
        console.log(`[FAIL] ${m}:`, JSON.stringify(data));
      }
    } catch (e) {
      console.log(`[ERROR] ${m}:`, e.message);
    }
  }
}

test();
