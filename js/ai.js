const DEEPSEEK_API_KEY = 'sk-dc7179e1ffab43ea9b5b49e0299bf63f';
const MODEL = 'deepseek-chat';

export async function callAI(userMessage) {
  if (!DEEPSEEK_API_KEY) return generateLocalReply(userMessage);
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DEEPSEEK_API_KEY}` },
      body: JSON.stringify({ model: MODEL, messages: [{ role: 'user', content: userMessage }], max_tokens: 500 })
    });
    const data = await response.json();
    if (data.choices?.[0]) return data.choices[0].message.content;
    throw new Error('Invalid response');
  } catch {
    return generateLocalReply(userMessage);
  }
}

function generateLocalReply(input) {
  const l = input.toLowerCase();
  if(l.includes('привет')) return 'Привет! Я MIM.';
  if(l.includes('погода')) return 'Сейчас солнечно, +22°C.';
  if(l.includes('время')) return 'Сейчас ' + new Date().toLocaleTimeString();
  if(l.includes('анекдот')) return 'Колобок повесился.';
  if(l.includes('новости')) return 'Сегодня всё стабильно.';
  return 'Я пока учусь.';
}
