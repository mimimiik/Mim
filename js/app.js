import { initAuth } from './auth.js';
import { switchTab, showBottomNav } from './utils.js';
import { renderChats } from './chat.js';
import { renderContacts } from './contacts.js';
import { renderSettingsMain } from './settings.js';
import { renderProfile } from './profile.js';

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(console.error);
  });
}

// Инициализация хранилищ
if (!localStorage.getItem('mime_messages')) {
  localStorage.setItem('mime_messages', JSON.stringify({
    'ai': [{ text: 'Привет! Я MIM, твой умный помощник.', type: 'other', time: '10:00' }],
    'friend1': [{ text: 'Привет! Как дела?', type: 'other', time: '14:20' }],
    'friend2': []
  }));
}
if (!localStorage.getItem('mime_settings')) {
  localStorage.setItem('mime_settings', JSON.stringify({
    theme: 'light',
    accent: '#8E2DE2',
    fontSize: 16,
    wallpaper: 'default',
    bubbleRadius: 22,
    animations: true,
    notifications: true,
    sound: true,
    autoDownload: 'wifi'
  }));
}
if (!localStorage.getItem('mime_profile')) {
  localStorage.setItem('mime_profile', JSON.stringify({
    name: 'Алексей', username: 'alex_ai', bio: 'Разработчик MIM',
    phone: '+7 999 123-45-67', email: 'alex@mim.app', birthday: '19 сент. 2000',
    avatar: '😎'
  }));
}

// Глобальные переменные
window.currentChat = null;
window.chats = [
  { id: 'ai', name: 'MIM Ассистент', avatar: '🤖', type: 'ai', lastMsg: 'Привет! Я MIM...', time: '10:00' },
  { id: 'friend1', name: 'Анна', avatar: 'А', type: 'user', lastMsg: 'Привет! Как дела?', time: '14:20' },
  { id: 'friend2', name: 'Кирилл', avatar: 'К', type: 'user', lastMsg: '🐾 Стикер', time: '27 мар' }
];
window.contacts = [
  { name: 'МАма', avatar: '👩', status: 'был(а) 05 апр. в 18:41' },
  { name: 'Доставка Т-Банк', avatar: '🏦', status: 'был(а) недавно' },
  { name: 'Никита Па', avatar: '👤', status: 'был(а) в этом месяце' }
];

// Привязка глобальных функций
window.showScreen = (id) => {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
};
window.switchTab = (tab) => {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.tab === tab));
  const content = document.getElementById('tabContent');
  showBottomNav(true);
  if (tab === 'chats') renderChats(content);
  else if (tab === 'contacts') renderContacts(content);
  else if (tab === 'settings') renderSettingsMain(content);
  else if (tab === 'profile') renderProfile(content);
};
window.closeChat = () => window.switchTab('chats');

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  document.getElementById('startAuthBtn').addEventListener('click', () => window.showScreen('authScreen'));
});
