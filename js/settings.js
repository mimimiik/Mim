export function renderSettingsMain(container) {
  const sections = ['Аккаунт', 'Данные и память', 'Конфиденциальность', 'Оформление', 'Папки с чатами', 'Уведомления', 'Устройства', 'Энергосбережение', 'Язык'];
  sections.sort((a,b)=>a.localeCompare(b, 'ru'));
  container.innerHTML = `
    <div class="content-header"><h2>Настройки</h2></div>
    <div class="list-container">
      ${sections.map(s => `<div class="list-item" data-section="${s}"><span>${s}</span><i class="fas fa-chevron-right"></i></div>`).join('')}
    </div>
  `;
  container.querySelectorAll('.list-item').forEach(el => {
    el.addEventListener('click', () => openSettingsSection(el.dataset.section));
  });
}

function openSettingsSection(section) {
  const content = document.getElementById('tabContent');
  const s = JSON.parse(localStorage.getItem('mime_settings'));
  const p = JSON.parse(localStorage.getItem('mime_profile'));
  if (section === 'Аккаунт') {
    content.innerHTML = `
      <div class="content-header"><i class="fas fa-arrow-left" class="back-btn"></i><h3>Аккаунт</h3></div>
      <div class="list-container">
        <div class="list-item"><span>Имя: ${p.name}</span></div>
        <div class="list-item"><span>Телефон: ${p.phone}</span></div>
        <div class="list-item"><span>Username: @${p.username}</span></div>
      </div>
    `;
  } else if (section === 'Оформление') {
    content.innerHTML = `
      <div class="content-header"><i class="fas fa-arrow-left" class="back-btn"></i><h3>Оформление</h3></div>
      <div class="list-container">
        <div class="list-item"><span>Тема</span><select id="themeSelect"><option value="light" ${s.theme==='light'?'selected':''}>Светлая</option><option value="dark" ${s.theme==='dark'?'selected':''}>Тёмная</option></select></div>
        <div class="list-item"><span>Акцентный цвет</span><div style="display:flex;gap:8px;">${['#8E2DE2','#00B4DB','#FF6B35','#10B981'].map(c => `<div style="width:30px;height:30px;border-radius:15px;background:${c};cursor:pointer;" data-color="${c}"></div>`).join('')}</div></div>
        <div class="list-item"><span>Размер шрифта: ${s.fontSize}px</span><input type="range" min="14" max="20" value="${s.fontSize}" id="fontSizeSlider"></div>
        <div class="list-item"><span>Радиус пузырьков: ${s.bubbleRadius}px</span><input type="range" min="8" max="30" value="${s.bubbleRadius}" id="bubbleRadiusSlider"></div>
        <div class="list-item"><span>Анимации</span><input type="checkbox" ${s.animations?'checked':''} id="animationsCheck"></div>
      </div>
    `;
    content.querySelector('#themeSelect').addEventListener('change', e => setTheme(e.target.value));
    content.querySelectorAll('[data-color]').forEach(d => d.addEventListener('click', e => setAccent(e.target.dataset.color)));
    content.querySelector('#fontSizeSlider').addEventListener('input', e => setFontSize(e.target.value));
    content.querySelector('#bubbleRadiusSlider').addEventListener('input', e => setBubbleRadius(e.target.value));
    content.querySelector('#animationsCheck').addEventListener('change', e => setAnimations(e.target.checked));
  } else {
    content.innerHTML = `<div class="content-header"><i class="fas fa-arrow-left" class="back-btn"></i><h3>${section}</h3></div><div class="list-container"><p>Настройки в разработке</p></div>`;
  }
  content.querySelector('.back-btn').addEventListener('click', () => window.switchTab('settings'));
}

function updateSetting(k,v) { const s = JSON.parse(localStorage.getItem('mime_settings')); s[k]=v; localStorage.setItem('mime_settings', JSON.stringify(s)); }
function setTheme(t) { document.documentElement.setAttribute('data-theme', t); updateSetting('theme', t); }
function setAccent(c) { document.documentElement.style.setProperty('--primary-gradient', `linear-gradient(135deg, ${c} 0%, #4A00E0 100%)`); document.documentElement.style.setProperty('--bubble-my', `linear-gradient(135deg, ${c} 0%, #4A00E0 100%)`); updateSetting('accent', c); }
function setFontSize(v) { document.documentElement.style.fontSize = v+'px'; updateSetting('fontSize', parseInt(v)); }
function setBubbleRadius(v) { document.documentElement.style.setProperty('--bubble-radius', v+'px'); updateSetting('bubbleRadius', parseInt(v)); }
function setAnimations(e) { updateSetting('animations', e); }
