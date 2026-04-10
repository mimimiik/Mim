const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Раздаём все файлы из текущей папки как статику
app.use(express.static(__dirname));

// На любой другой запрос отдаём index.html (для SPA-режима)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`MIM запущен на порту ${PORT}`);
});
