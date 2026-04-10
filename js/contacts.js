export function renderContacts(container) {
  container.innerHTML = `
    <div class="content-header"><h2>Контакты</h2><i class="fas fa-user-plus" onclick="alert('Добавить контакт')" style="color:#8E2DE2;"></i></div>
    <div class="search-bar"><i class="fas fa-search"></i><input placeholder="Поиск"></div>
    <div class="list-container">
      <div class="list-item" onclick="alert('Поиск друзей')"><i class="fas fa-user-friends" style="margin-right:12px;"></i>Найти друзей</div>
      <div class="list-item" onclick="alert('Пригласить')"><i class="fas fa-envelope"></i> Пригласить друзей</div>
      <div style="margin:16px 0 8px;font-weight:600;">Недавние звонки</div>
      ${window.contacts.map(c => `
        <div class="list-item"><div class="avatar" style="width:40px;height:40px;">${c.avatar}</div><div><strong>${c.name}</strong><br>${c.status}</div></div>
      `).join('')}
    </div>
  `;
}
