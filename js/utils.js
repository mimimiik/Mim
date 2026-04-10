export function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

export function showBottomNav(show) {
  document.getElementById('bottomNav').classList.toggle('hidden', !show);
}

export function startTimer(seconds, elementId, onComplete) {
  let time = seconds;
  const el = document.getElementById(elementId);
  const int = setInterval(() => {
    if (time <= 0) {
      clearInterval(int);
      el.innerHTML = '<a href="#">Отправить снова</a>';
      el.querySelector('a').addEventListener('click', (e) => { e.preventDefault(); onComplete(); });
      return;
    }
    const m = Math.floor(time/60), s = time%60;
    el.textContent = `Отправить повторно через ${m}:${s.toString().padStart(2,'0')}`;
    time--;
  }, 1000);
}

export function moveToNext(input) {
  if (input.value.length === 1) input.nextElementSibling?.focus();
}
