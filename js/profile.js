export function renderProfile(container) {
  const p = JSON.parse(localStorage.getItem('mime_profile'));
  container.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar" id="profileAvatarDisplay">${p.avatar}</div>
      <h2>${p.name}</h2><p>@${p.username}</p>
      <p style="color:var(--text-secondary);">${p.bio}</p>
      <div class="profile-actions">
        <button class="action-btn" id="uploadAvatarBtn"><i class="fas fa-camera"></i> Фото</button>
        <input type="file" id="avatarUpload" accept="image/*" style="display:none;">
        <button class="action-btn" id="editProfileBtn"><i class="fas fa-pen"></i> Изменить</button>
        <button class="action-btn" id="profileSettingsBtn"><i class="fas fa-cog"></i> Настройки</button>
      </div>
    </div>
    <div class="list-container">
      <div class="info-row"><i class="fas fa-phone"></i> ${p.phone}</div>
      <div class="info-row"><i class="fas fa-envelope"></i> ${p.email}</div>
      <div class="info-row"><i class="fas fa-calendar"></i> ${p.birthday}</div>
      <div class="info-row" onclick="alert('QR-код профиля')"><i class="fas fa-qrcode"></i> Показать QR-код</div>
    </div>
  `;
  document.getElementById('uploadAvatarBtn').addEventListener('click', () => document.getElementById('avatarUpload').click());
  document.getElementById('avatarUpload').addEventListener('change', uploadAvatar);
  document.getElementById('editProfileBtn').addEventListener('click', editProfile);
  document.getElementById('profileSettingsBtn').addEventListener('click', () => window.switchTab('settings'));
}

function uploadAvatar(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const avatarEl = document.getElementById('profileAvatarDisplay');
    avatarEl.style.backgroundImage = `url(${ev.target.result})`;
    avatarEl.style.backgroundSize = 'cover';
    avatarEl.textContent = '';
    const p = JSON.parse(localStorage.getItem('mime_profile'));
    p.avatar = ev.target.result;
    localStorage.setItem('mime_profile', JSON.stringify(p));
  };
  reader.readAsDataURL(file);
}

function editProfile() {
  const p = JSON.parse(localStorage.getItem('mime_profile'));
  const name = prompt('Имя', p.name);
  if (name) p.name = name;
  const username = prompt('Username', p.username);
  if (username) p.username = username;
  const bio = prompt('Bio', p.bio);
  if (bio) p.bio = bio;
  localStorage.setItem('mime_profile', JSON.stringify(p));
  window.switchTab('profile');
}
