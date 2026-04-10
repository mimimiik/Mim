import { showBottomNav } from './utils.js';
import { callAI } from './ai.js';

export function renderChats(container) {
  container.innerHTML = `
    <div class="content-header">
      <h2>Чаты</h2>
      <div style="display:flex; gap:12px;">
        <i class="fas fa-users" style="color:#8E2DE2;" onclick="alert('Создать группу')"></i>
        <i class="fas fa-bullhorn" style="color:#8E2DE2;" onclick="alert('Создать канал')"></i>
      </div>
    </div>
    <div class="search-bar"><i class="fas fa-search"></i><input placeholder="Поиск"></div>
    <div class="list-container" id="chatList"></div>
  `;
  const list = document.getElementById('chatList');
  list.innerHTML = window.chats.map(c => `
    <div class="list-item" data-chat-id="${c.id}">
      <div class="avatar" style="background:${c.type==='ai'?'var(--primary-gradient)':'var(--secondary-gradient)'}">${c.avatar}</div>
      <div style="flex:1"><strong>${c.name}</strong><p style="color:var(--text-secondary);">${c.lastMsg}</p></div>
      <span style="font-size:12px;">${c.time}</span>
    </div>
  `).join('');
  list.querySelectorAll('.list-item').forEach(el => {
    el.addEventListener('click', () => openChat(el.dataset.chatId));
  });
}

function openChat(id) {
  window.currentChat = id;
  const chat = window.chats.find(c => c.id === id);
  const content = document.getElementById('tabContent');
  showBottomNav(false);
  content.innerHTML = `
    <div class="content-header">
      <div style="display:flex; align-items:center; gap:12px;">
        <i class="fas fa-arrow-left" id="closeChatBtn" style="cursor:pointer;"></i>
        <div class="avatar" style="width:40px;height:40px;">${chat.avatar}</div>
        <div><h3>${chat.name}</h3><span>${chat.type==='ai'?'ИИ онлайн':'был(а) недавно'}</span></div>
      </div>
      <i class="fas fa-phone"></i>
    </div>
    <div class="chat-messages" id="msgContainer"></div>
    <div style="padding:12px;display:flex;gap:8px;border-top:1px solid var(--border-light);">
      <input id="msgInput" placeholder="Сообщение..." style="flex:1;padding:12px;border-radius:30px;border:1px solid var(--border-light);">
      <button class="btn" style="width:auto;margin:0;" id="sendMsgBtn"><i class="fas fa-paper-plane"></i></button>
    </div>
  `;
  document.getElementById('closeChatBtn').addEventListener('click', () => window.closeChat());
  renderMessages();
  document.getElementById('sendMsgBtn').addEventListener('click', sendMessage);
  document.getElementById('msgInput').addEventListener('keypress', (e) => { if(e.key==='Enter') sendMessage(); });
}

function renderMessages() {
  const msgs = JSON.parse(localStorage.getItem('mime_messages'))[window.currentChat] || [];
  const cont = document.getElementById('msgContainer');
  cont.innerHTML = msgs.map(m => `
    <div class="message-row ${m.type}"><div class="message-bubble">${m.text}<div style="font-size:10px;opacity:0.7;margin-top:4px;">${m.time}</div></div></div>
  `).join('');
  cont.scrollTop = cont.scrollHeight;
}

async function sendMessage() {
  const inp = document.getElementById('msgInput');
  const text = inp.value.trim();
  if (!text) return;
  const msgs = JSON.parse(localStorage.getItem('mime_messages'));
  const time = new Date().toLocaleTimeString().slice(0,5);
  msgs[window.currentChat].push({text, type:'my', time});
  localStorage.setItem('mime_messages', JSON.stringify(msgs));
  renderMessages();
  inp.value = '';

  if (window.currentChat === 'ai') {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message-row other';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<div class="message-bubble">Печатает...</div>';
    document.getElementById('msgContainer').appendChild(typingDiv);
    const reply = await callAI(text);
    document.getElementById('typingIndicator')?.remove();
    msgs[window.currentChat].push({text: reply, type:'other', time: new Date().toLocaleTimeString().slice(0,5)});
    localStorage.setItem('mime_messages', JSON.stringify(msgs));
    renderMessages();
  }
}
