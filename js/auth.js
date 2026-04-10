import { showScreen, startTimer, moveToNext } from './utils.js';

let demoCode = '1234';

export function initAuth() {
  // Tab switching
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab === 'phone' ? 'phoneForm' : 'loginForm').classList.add('active');
    });
  });

  document.getElementById('requestCodeBtn').addEventListener('click', () => {
    const phone = document.getElementById('phoneInput').value;
    if (phone.length < 10) { alert('Введите номер'); return; }
    demoCode = Math.floor(1000 + Math.random() * 9000).toString();
    document.getElementById('demoCodeDisplay').textContent = demoCode;
    document.getElementById('codeHint').innerHTML = `Мы отправили SMS на +7 ${phone}`;
    showScreen('codeScreen');
    startTimer(59, 'timer', () => requestCode());
  });

  document.getElementById('loginBtn').addEventListener('click', () => {
    if (document.getElementById('loginUsername').value && document.getElementById('loginPassword').value) {
      showScreen('mainScreen');
      window.switchTab('chats');
    } else alert('Введите логин и пароль');
  });

  document.getElementById('verifyCodeBtn').addEventListener('click', () => {
    const digits = Array.from(document.querySelectorAll('.code-digit')).map(d => d.value).join('');
    if (digits === demoCode) {
      showScreen('mainScreen');
      window.switchTab('chats');
    } else alert('Неверный код. Попробуйте ' + demoCode);
  });

  document.querySelectorAll('.code-digit').forEach((input, i) => {
    input.addEventListener('input', () => moveToNext(input));
  });

  document.getElementById('backToWelcomeLink').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen('welcomeScreen');
  });
  document.getElementById('backToPhoneLink').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen('authScreen');
  });
}

function requestCode() {
  const phone = document.getElementById('phoneInput').value;
  if (phone.length < 10) { alert('Введите номер'); return; }
  demoCode = Math.floor(1000 + Math.random() * 9000).toString();
  document.getElementById('demoCodeDisplay').textContent = demoCode;
  showScreen('codeScreen');
  startTimer(59, 'timer', () => requestCode());
}
