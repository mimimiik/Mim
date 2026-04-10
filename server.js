const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Прокси для DeepSeek API
app.post('/api/deepseek', async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'API ключ не настроен на сервере' });
    }

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: 'Ты — ИИ-ассистент в мессенджере MIM. Отвечай полезно, кратко и дружелюбно.' },
                    { role: 'user', content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 600
            })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error?.message || 'Ошибка API');
        }
        
        const reply = data.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error('Ошибка DeepSeek:', error);
        res.status(500).json({ error: 'Не удалось получить ответ от ИИ' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MIM + DeepSeek на порту ${PORT}`));
