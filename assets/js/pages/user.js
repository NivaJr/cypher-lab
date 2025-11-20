// ...existing code...
(() => {
  'use strict';

  const STORAGE_KEY = 'cypher_user';

  const SAMPLE_USER = {
    name: 'Joana Doe',
    handle: '@joanadoe',
    bio: 'Cybersecurity enthusiast and penetration tester. Passionate about ethical hacking and digital forensics.',
    email: 'joana.doe@email.com',
    avatar: 'https://placehold.co/96x96/e0e7ff/312e81?text=JD',
    memberSince: '15 de Janeiro, 2023',
    stats: {
      score: 2847,
      challenges: 45,
      rank: '#47',
      today: '+121 pontos hoje',
      progress: '57% de progresso',
      top: 'Top 5% global'
    },
    achievements: [
      { title: 'Cryptography Novice', desc: 'Completed the Basic Cryptography module.' },
      { title: 'Web Apprentice', desc: 'Completed 10 Web Application Security challenges.' },
      { title: 'First Blood', desc: 'Successfully completed your first challenge.' },
      { title: 'Script Kiddie', desc: 'Solved a challenge using a custom script.' }
    ],
    activity: [
      { title: 'Desafio: Cifra de César', category: 'Criptografia Básica', points: '+50 pts', time: '2 horas atrás' },
      { title: 'Vulnerabilidade de Injeção de SQL', category: 'Web Application Security', points: '+75 pts', time: '1 dia atrás' },
      { title: 'Análise de Malware Simples', category: 'Malware Analysis', points: '+100 pts', time: '2 dias atrás' },
      { title: 'Scanning de Rede com Nmap', category: 'Network Security', points: '+60 pts', time: '2 dias atrás' }
    ]
  };

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  function escapeHtml(str = '') {
    return String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function showMessage(text, timeout = 2600) {
    const box = $('#message-box');
    if (!box) return;
    box.textContent = text;
    box.classList.remove('hidden');
    clearTimeout(box._timer);
    box._timer = setTimeout(() => box.classList.add('hidden'), timeout);
  }

  function readLocalUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveLocalUser(user) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      // ignore
    }
  }

  async function fetchRemoteUser() {
    // tenta carregar de possíveis locais (ignore erros)
    const tryList = ['/api/user', '/assets/data/user.json', '../assets/data/user.json'];
    for (const path of tryList) {
      try {
        const res = await fetch(path, { cache: 'no-store' });
        if (!res.ok) continue;
        const json = await res.json();
        return json;
      } catch (e) { /* continue */ }
    }
    return null;
  }

  function initialsFromName(name = '') {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
    return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
  }

  function buildAvatarUrlFromInitials(initials) {
    return `https://placehold.co/96x96/111827/ffffff?text=${encodeURIComponent(initials)}`;
  }

  function populateProfile(user) {
    const nameEl = $('.profile-name');
    const handleEl = $('.profile-handle');
    const bioEl = $('.profile-bio');
    const avatarEl = $('.avatar-img');
    const emailEl = $('#email-text');
    const memberSinceEl = $('.member-since span');

    if (nameEl) nameEl.textContent = user.name || '';
    if (handleEl) handleEl.textContent = user.handle || '';
    if (bioEl) bioEl.textContent = user.bio || '';
    if (emailEl) emailEl.textContent = user.email || '';
    if (memberSinceEl) memberSinceEl.textContent = user.memberSince || '';

    if (avatarEl) {
      if (user.avatar) avatarEl.src = user.avatar;
      else avatarEl.src = buildAvatarUrlFromInitials(initialsFromName(user.name));
      avatarEl.alt = `Avatar de ${user.name || 'Usuário'}`;
    }

    // avatar initial on nav button (if exists)
    const avatarBtn = $('.avatar-btn');
    if (avatarBtn) {
      avatarBtn.textContent = (user.name ? initialsFromName(user.name) : (user.email ? user.email[0].toUpperCase() : 'U'));
    }
  }

  function populateStats(user) {
    const statEls = $$('.stat');
    if (!statEls.length) return;
    const stats = user.stats || {};
    // assume order matches markup
    const total = statEls[0];
    const challenges = statEls[1];
    const rank = statEls[2];

    total.querySelector('.big') && (total.querySelector('.big').textContent = stats.score ?? '');
    total.querySelector('.tiny') && (total.querySelector('.tiny').textContent = stats.today ?? '');

    challenges.querySelector('.big') && (challenges.querySelector('.big').textContent = stats.challenges ?? '');
    challenges.querySelector('.tiny') && (challenges.querySelector('.tiny').textContent = stats.progress ?? '');

    rank.querySelector('.big') && (rank.querySelector('.big').textContent = stats.rank ?? '');
    rank.querySelector('.tiny') && (rank.querySelector('.tiny').textContent = stats.top ?? '');
  }

  function createAchievementNode(a) {
    const wrap = document.createElement('div');
    wrap.className = 'achievement';
    wrap.innerHTML = `
      <div class="ach-icon bg-slate">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v8l3 3" />
        </svg>
      </div>
      <div>
        <p class="strong">${escapeHtml(a.title || '')}</p>
        <p class="muted small">${escapeHtml(a.desc || '')}</p>
      </div>
    `;
    return wrap;
  }

  function populateAchievements(user) {
    const container = $('.achievements');
    if (!container) return;
    container.innerHTML = '';
    (user.achievements || []).forEach(a => container.appendChild(createAchievementNode(a)));
  }

  function createActivityNode(item) {
    const li = document.createElement('li');
    li.className = 'activity-item';
    li.innerHTML = `
      <div class="activity-row">
        <div class="activity-main">
          <p class="activity-title">${escapeHtml(item.title || '')}</p>
          <p class="muted small">${escapeHtml(item.category || '')}</p>
        </div>
        <div class="activity-meta">
          <p class="activity-points plus">${escapeHtml(item.points || '')}</p>
          <p class="muted small">${escapeHtml(item.time || '')}</p>
        </div>
      </div>
    `;
    return li;
  }

  function populateActivity(user) {
    const list = $('.activity-list');
    if (!list) return;
    list.innerHTML = '';
    (user.activity || []).forEach(act => list.appendChild(createActivityNode(act)));
  }

  function bindUI(user) {
    const emailBtn = $('#email-btn');
    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        const email = $('#email-text')?.textContent || user.email || '';
        if (!email) return showMessage('Nenhum email disponível');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => showMessage('Email copiado'));
        } else {
          const ta = document.createElement('textarea');
          ta.value = email;
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); showMessage('Email copiado'); } catch (e) { showMessage('Não foi possível copiar'); }
          ta.remove();
        }
      });
    }

    const editBtn = $('#edit-profile-btn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const current = readLocalUser() || user;
        const newName = prompt('Nome completo:', current.name || '')?.trim();
        if (newName === null) return;
        const newBio = prompt('Biografia (curta):', current.bio || '') ?? '';
        current.name = newName || current.name;
        current.bio = (newBio === null) ? current.bio : newBio;
        // if avatar is initials-based, regenerate
        if (!current.avatar || current.avatar.includes('placehold.co')) {
          current.avatar = buildAvatarUrlFromInitials(initialsFromName(current.name));
        }
        saveLocalUser(current);
        populateProfile(current);
        showMessage('Perfil atualizado');
      });
    }

    const avatarBtn = $('.avatar-btn');
    if (avatarBtn) {
      avatarBtn.addEventListener('click', () => {
        // se quiser redirecionar para login/logout, ajuste aqui
        if (confirm('Deseja sair (logout)?')) {
          localStorage.removeItem(STORAGE_KEY);
          showMessage('Desconectado');
          // tente redirecionar para login se existir
          setTimeout(() => {
            if (location.pathname.endsWith('/pages/user.html')) location.href = 'login.html';
            else location.href = './login.html';
          }, 800);
        }
      });
    }
  }

  async function init() {
    // 1) prefer localStorage
    let user = readLocalUser();

    // 2) if not in localStorage, try remote JSON
    if (!user) {
      user = await fetchRemoteUser();
    }

    // 3) fallback sample
    if (!user) user = SAMPLE_USER;

    // normalize some fields
    user.name = user.name || '';
    user.handle = user.handle || (user.name ? '@' + user.name.replace(/\s+/g,'').toLowerCase() : (user.email ? '@' + user.email.split('@')[0] : '@user'));
    user.email = user.email || '';
    user.memberSince = user.memberSince || (new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }));

    // populate DOM
    populateProfile(user);
    populateStats(user);
    populateAchievements(user);
    populateActivity(user);

    // save default user to localStorage if it came from remote/sample
    if (!readLocalUser()) saveLocalUser(user);

    bindUI(user);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
  
// ...existing code...