/**
 * Big Boss Tech House Command Center - Core Application Engine
 * Handles all 12 Mandatory Features with real-time UI synchronization & LocalStorage persistence.
 */

// Initial Seed Data: 10 Tech House Contestants
const DEFAULT_CONTESTANTS = [
    {
        id: 'c1',
        name: 'Elon Byte',
        team: 'Neural Titans',
        role: 'Space & AI Architect',
        points: 850,
        status: 'active', // active, evicted
        isCaptain: true,
        isImmune: true,
        isNominated: false,
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
        bio: 'High risk, high reward coder. Known for sudden midnight deployment sprints.'
    },
    {
        id: 'c2',
        name: 'Ada Lovelace',
        team: 'Algorithm Avengers',
        role: 'Logic Queen & Pioneer',
        points: 920,
        status: 'active',
        isCaptain: false,
        isImmune: false,
        isNominated: false,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
        bio: 'First programmer in history. Master of pristine code and strategic nominations.'
    },
    {
        id: 'c3',
        name: 'Linus Kernel',
        team: 'Kernel Force',
        role: 'Open Source Rebel',
        points: 780,
        status: 'active',
        isCaptain: false,
        isImmune: false,
        isNominated: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        bio: 'Blunt code reviewer. Always in arguments during weekly sprint retrospectives.'
    },
    {
        id: 'c4',
        name: 'Grace Hopper',
        team: 'Algorithm Avengers',
        role: 'Compiler Master',
        points: 890,
        status: 'active',
        isCaptain: false,
        isImmune: true,
        isNominated: false,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        bio: 'Found the first actual bug. Calms house arguments with supreme leadership.'
    },
    {
        id: 'c5',
        name: 'Satoshi Nakamoto',
        team: 'Crypto Syndicate',
        role: 'Cryptographic Ghost',
        points: 640,
        status: 'active',
        isCaptain: false,
        isImmune: false,
        isNominated: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        bio: 'Silent player. Never reveals his true identity or token balance.'
    },
    {
        id: 'c6',
        name: 'Sam Altbyte',
        team: 'Neural Titans',
        role: 'Prompt Warlord',
        points: 710,
        status: 'active',
        isCaptain: false,
        isImmune: false,
        isNominated: true,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        bio: 'Survives board coups and house drama effortlessly.'
    },
    {
        id: 'c7',
        name: 'Alan Turing',
        team: 'Kernel Force',
        role: 'Enigma Breaker',
        points: 810,
        status: 'active',
        isCaptain: false,
        isImmune: false,
        isNominated: false,
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        bio: 'Calculates probability of survival with 99.8% precision.'
    },
    {
        id: 'c8',
        name: 'Guido Python',
        team: 'Algorithm Avengers',
        role: 'Benevolent Dictator',
        points: 730,
        status: 'active',
        isCaptain: false,
        isImmune: false,
        isNominated: false,
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        bio: 'Values clean indentation and zen-like peace in the house.'
    },
    {
        id: 'c9',
        name: 'Sundar Tech',
        team: 'Neural Titans',
        role: 'Search Titan',
        points: 690,
        status: 'active',
        isCaptain: false,
        isImmune: false,
        isNominated: false,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        bio: 'Extremely polite diplomat who orchestrates quiet alliances.'
    },
    {
        id: 'c10',
        name: 'Mark Meta',
        team: 'Crypto Syndicate',
        role: 'Metaverse Glitch',
        points: 580,
        status: 'active',
        isCaptain: false,
        isImmune: false,
        isNominated: true,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        bio: 'Moves fast and breaks things, including kitchen rules.'
    }
];

// Initial Seed Tasks
const DEFAULT_TASKS = [
    {
        id: 't1',
        title: 'Fix Production Hotfix Bug',
        description: 'Critical memory leak in the core neural module. Must be solved before the midnight deploy.',
        assignedTo: 'Elon Byte',
        points: 150,
        completed: true,
        category: 'Development'
    },
    {
        id: 't2',
        title: 'Weekly House Ration Hackathon',
        description: 'Optimize the smart pantry inventory algorithm to earn extra rations for the week.',
        assignedTo: 'Ada Lovelace',
        points: 200,
        completed: false,
        category: 'Hackathon'
    },
    {
        id: 't3',
        title: 'Security Audit & Penetration Test',
        description: 'Audit the House smart locks and eliminate vulnerability vectors.',
        assignedTo: 'Linus Kernel',
        points: 120,
        completed: false,
        category: 'Security'
    },
    {
        id: 't4',
        title: 'Luxury Budget Debate: Monolith vs Microservices',
        description: 'Win the fierce philosophical debate in the assembly hall.',
        assignedTo: 'Sam Altbyte',
        points: 100,
        completed: true,
        category: 'Luxury Task'
    }
];

class BigBossApp {
    constructor() {
        this.contestants = this.loadData('bb_contestants', DEFAULT_CONTESTANTS);
        this.tasks = this.loadData('bb_tasks', DEFAULT_TASKS);
        this.announcements = this.loadData('bb_announcements', [
            { text: 'Bigg Boss chahte hain ki sabhi sadasya living area mein ekathha ho jayein!', time: '10:00 AM' },
            { text: 'Elon Byte has been appointed as the House Captain!', time: '11:30 AM' }
        ]);
        this.pointHistory = this.loadData('bb_point_history', []);
        
        // Background Mood Theme (black, white, beige)
        this.theme = localStorage.getItem('bb_theme') || 'black';

        // Timer State
        this.timerSeconds = 300; // 5 mins default
        this.timerTotal = 300;
        this.timerInterval = null;
        this.isTimerRunning = false;

        this.init();
    }

    loadData(key, fallback) {
        try {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(fallback));
        } catch (e) {
            return JSON.parse(JSON.stringify(fallback));
        }
    }

    saveData() {
        localStorage.setItem('bb_contestants', JSON.stringify(this.contestants));
        localStorage.setItem('bb_tasks', JSON.stringify(this.tasks));
        localStorage.setItem('bb_announcements', JSON.stringify(this.announcements));
        localStorage.setItem('bb_point_history', JSON.stringify(this.pointHistory));
    }

    init() {
        this.applyTheme(this.theme);
        this.bindEvents();
        this.renderAll();
    }

    setTheme(themeName) {
        if (!['black', 'white', 'beige'].includes(themeName)) return;
        this.theme = themeName;
        localStorage.setItem('bb_theme', themeName);
        this.applyTheme(themeName);
        if (window.soundEngine) window.soundEngine.playAnnouncementChime();
        const moodNames = {
            black: '🌑 Cyberpunk Black',
            white: '☀️ Clean White',
            beige: '☕ Warm Luxury Beige'
        };
        this.showToast(`Background mood changed to ${moodNames[themeName] || themeName}`);
    }

    applyTheme(themeName) {
        document.body.setAttribute('data-theme', themeName);
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.getElementById(`themeBtn-${themeName}`);
        if (activeBtn) activeBtn.classList.add('active');
    }

    bindEvents() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetTab = btn.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });

        // Volume control & Mute toggle
        const volSlider = document.getElementById('volumeControl');
        if (volSlider) {
            volSlider.addEventListener('input', (e) => {
                window.soundEngine.setVolume(e.target.value);
            });
        }

        const muteBtn = document.getElementById('muteToggleBtn');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                const isMuted = window.soundEngine.toggleMute();
                muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
                this.showToast(isMuted ? 'Audio Muted' : 'Audio Unmuted');
            });
        }

        // Eye Logo Click triggers dramatic theme
        const eye = document.querySelector('.bb-eye-wrapper');
        if (eye) {
            eye.addEventListener('click', () => {
                window.soundEngine.playEyeTheme();
                this.showToast('👁️ BIG BOSS IS WATCHING YOU...');
            });
        }

        // Timer Controls
        const startTimerBtn = document.getElementById('startTimerBtn');
        const pauseTimerBtn = document.getElementById('pauseTimerBtn');
        const resetTimerBtn = document.getElementById('resetTimerBtn');

        if (startTimerBtn) startTimerBtn.addEventListener('click', () => this.startTimer());
        if (pauseTimerBtn) pauseTimerBtn.addEventListener('click', () => this.pauseTimer());
        if (resetTimerBtn) resetTimerBtn.addEventListener('click', () => this.resetTimer());

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const secs = parseInt(btn.getAttribute('data-seconds'), 10);
                this.setTimerPreset(secs);
            });
        });

        // Search & Filter
        const contestantSearch = document.getElementById('contestantSearch');
        if (contestantSearch) {
            contestantSearch.addEventListener('input', () => this.renderContestants());
        }
        const teamFilter = document.getElementById('teamFilter');
        if (teamFilter) {
            teamFilter.addEventListener('change', () => this.renderContestants());
        }
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.renderContestants());
        }
    }

    switchTab(tabId) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

        const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const targetPanel = document.getElementById(`tab-${tabId}`);

        if (targetBtn && targetPanel) {
            targetBtn.classList.add('active');
            targetPanel.classList.add('active');
            window.soundEngine.init();
        }
    }

    showToast(message, type = 'normal') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'bb-toast';
        toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    renderAll() {
        this.renderContestants();
        this.renderLeaderboard();
        this.renderTasks();
        this.renderDangerZone();
        this.renderCaptainBanner();
        this.renderStatistics();
        this.renderAnnouncements();
        this.renderEvictedList();
        this.updateBadgeCounts();
    }

    updateBadgeCounts() {
        const activeCount = this.contestants.filter(c => c.status === 'active').length;
        const nominatedCount = this.contestants.filter(c => c.status === 'active' && c.isNominated).length;
        const pendingTasks = this.tasks.filter(t => !t.completed).length;

        const elTotal = document.getElementById('badgeTotalContestants');
        const elNom = document.getElementById('badgeNominatedCount');
        const elTasks = document.getElementById('badgePendingTasks');

        if (elTotal) elTotal.textContent = activeCount;
        if (elNom) elNom.textContent = nominatedCount;
        if (elTasks) elTasks.textContent = pendingTasks;
    }

    // 1. FEATURE: Contestant Management
    renderContestants() {
        const grid = document.getElementById('contestantsGrid');
        if (!grid) return;

        const searchTerm = (document.getElementById('contestantSearch')?.value || '').toLowerCase();
        const teamVal = document.getElementById('teamFilter')?.value || 'all';
        const statusVal = document.getElementById('statusFilter')?.value || 'all';

        const filtered = this.contestants.filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(searchTerm) || c.team.toLowerCase().includes(searchTerm);
            const matchesTeam = teamVal === 'all' || c.team === teamVal;
            let matchesStatus = true;
            if (statusVal === 'active') matchesStatus = c.status === 'active';
            else if (statusVal === 'evicted') matchesStatus = c.status === 'evicted';
            else if (statusVal === 'nominated') matchesStatus = c.status === 'active' && c.isNominated;
            else if (statusVal === 'immune') matchesStatus = c.status === 'active' && c.isImmune;
            else if (statusVal === 'captain') matchesStatus = c.status === 'active' && c.isCaptain;

            return matchesSearch && matchesTeam && matchesStatus;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">No contestants found matching criteria.</div>`;
            return;
        }

        grid.innerHTML = filtered.map(c => {
            const isCaptainClass = c.isCaptain ? 'is-captain' : '';
            const isNominatedClass = c.isNominated ? 'is-nominated' : '';
            const isImmuneClass = c.isImmune ? 'is-immune' : '';
            const isEvictedClass = c.status === 'evicted' ? 'is-evicted' : '';

            return `
                <div class="contestant-card ${isCaptainClass} ${isNominatedClass} ${isImmuneClass} ${isEvictedClass}" data-id="${c.id}">
                    <div class="contestant-top">
                        <div class="contestant-avatar-wrap">
                            <img src="${c.avatar}" alt="${c.name}" class="contestant-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=10141f&color=00f0ff'">
                            ${c.isCaptain ? '<div class="badge-overlay">👑</div>' : (c.isImmune ? '<div class="badge-overlay">🛡️</div>' : '')}
                        </div>
                        <div class="contestant-main-info">
                            <div class="contestant-name">${c.name}</div>
                            <div class="contestant-team">${c.team}</div>
                        </div>
                        <div class="contestant-points-badge">
                            ${c.points} <span style="font-size: 0.75rem; color: var(--text-muted)">pts</span>
                        </div>
                    </div>

                    <div class="status-pills">
                        ${c.status === 'evicted' 
                            ? '<span class="pill pill-evicted">☠️ Evicted</span>' 
                            : '<span class="pill pill-active">🟢 Active</span>'}
                        ${c.isCaptain ? '<span class="pill pill-captain">👑 Captain</span>' : ''}
                        ${c.isImmune ? '<span class="pill pill-immune">🛡️ Immune</span>' : ''}
                        ${c.isNominated ? '<span class="pill pill-nominated">⚠️ Nominated</span>' : ''}
                    </div>

                    <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.35;">${c.bio || ''}</p>

                    ${c.status === 'active' ? `
                    <div class="contestant-actions">
                        <button class="bb-btn bb-btn-outline bb-btn-sm" onclick="app.openPointsModal('${c.id}')" title="Adjust Points">🪙 Points</button>
                        <button class="bb-btn bb-btn-outline bb-btn-sm" onclick="app.toggleNomination('${c.id}')" title="Nominate / Un-nominate">${c.isNominated ? '🟢 Save' : '⚠️ Nominate'}</button>
                        <button class="bb-btn bb-btn-outline bb-btn-sm" onclick="app.toggleImmunity('${c.id}')" title="Toggle Immunity">${c.isImmune ? '🛡️ Revoke' : '🛡️ Shield'}</button>
                        <button class="bb-btn bb-btn-gold bb-btn-sm" onclick="app.setCaptain('${c.id}')" ${c.isCaptain ? 'disabled' : ''} title="Appoint Captain">👑</button>
                        <button class="bb-btn bb-btn-danger bb-btn-sm" onclick="app.confirmEviction('${c.id}')" title="Evict Contestant">☠️</button>
                    </div>
                    ` : `
                    <div class="contestant-actions">
                        <button class="bb-btn bb-btn-outline bb-btn-sm" style="width: 100%" onclick="app.reviveContestant('${c.id}')">🔄 Reinstate to House</button>
                    </div>
                    `}
                </div>
            `;
        }).join('');
    }

    // 2. FEATURE: Live Leaderboard
    renderLeaderboard() {
        const tbody = document.getElementById('leaderboardBody');
        const tbodyTab = document.getElementById('leaderboardBodyTab');
        if (!tbody && !tbodyTab) return;

        // Only active contestants on live leaderboard, sorted by points descending
        const activeRanked = [...this.contestants]
            .filter(c => c.status === 'active')
            .sort((a, b) => b.points - a.points);

        const html = activeRanked.map((c, index) => {
            const rank = index + 1;
            let rankClass = '';
            let rankBadge = `${rank}`;
            if (rank === 1) { rankClass = 'rank-1'; rankBadge = '🥇 1'; }
            else if (rank === 2) { rankClass = 'rank-2'; rankBadge = '🥈 2'; }
            else if (rank === 3) { rankClass = 'rank-3'; rankBadge = '🥉 3'; }

            return `
                <tr>
                    <td><span class="rank-badge ${rankClass}">${rankBadge}</span></td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <img src="${c.avatar}" class="contestant-avatar" style="width: 36px; height: 36px;" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=10141f&color=00f0ff'">
                            <div>
                                <div style="font-weight: 700; color: #fff;">${c.name} ${c.isCaptain ? '👑' : ''} ${c.isImmune ? '🛡️' : ''}</div>
                                <div style="font-size: 0.78rem; color: var(--text-dim);">${c.role || c.team}</div>
                            </div>
                        </div>
                    </td>
                    <td><span style="font-family: var(--font-sub); font-weight: 600; color: var(--primary-cyan);">${c.team}</span></td>
                    <td>
                        <div class="status-pills" style="margin: 0;">
                            ${c.isCaptain ? '<span class="pill pill-captain">Captain</span>' : ''}
                            ${c.isImmune ? '<span class="pill pill-immune">Immune</span>' : ''}
                            ${c.isNominated ? '<span class="pill pill-nominated">Nominated</span>' : ''}
                            ${!c.isCaptain && !c.isImmune && !c.isNominated ? '<span class="pill pill-active">Safe</span>' : ''}
                        </div>
                    </td>
                    <td>
                        <div style="font-family: var(--font-heading); font-weight: 800; font-size: 1.15rem; color: var(--primary-gold);">
                            ${c.points}
                        </div>
                    </td>
                    <td>
                        <div style="display: flex; gap: 6px;">
                            <button class="bb-btn bb-btn-outline bb-btn-sm" onclick="app.quickPointDelta('${c.id}', 50)">+50</button>
                            <button class="bb-btn bb-btn-outline bb-btn-sm" onclick="app.quickPointDelta('${c.id}', -20)">-20</button>
                            <button class="bb-btn bb-btn-primary bb-btn-sm" onclick="app.openPointsModal('${c.id}')">⚙️</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        if (tbody) tbody.innerHTML = html;
        if (tbodyTab) tbodyTab.innerHTML = html;
    }

    // 3. FEATURE: Task Management
    renderTasks() {
        const grid = document.getElementById('tasksGrid');
        if (!grid) return;

        grid.innerHTML = this.tasks.map(t => {
            return `
                <div class="task-card ${t.completed ? 'completed' : ''}" data-task-id="${t.id}">
                    <div>
                        <div class="task-top">
                            <h4 class="task-title">${t.title}</h4>
                            <span class="task-points-tag">+${t.points} pts</span>
                        </div>
                        <p class="task-desc">${t.description}</p>
                    </div>

                    <div>
                        <div class="task-meta">
                            <span>👤 Assigned: <strong>${t.assignedTo}</strong></span>
                            <span>🏷️ ${t.category}</span>
                        </div>

                        <div style="display: flex; gap: 8px; justify-content: space-between;">
                            ${t.completed ? `
                                <button class="bb-btn bb-btn-outline bb-btn-sm" style="color: var(--primary-green); width: 100%;" disabled>
                                    ✅ Completed & Awarded
                                </button>
                            ` : `
                                <button class="bb-btn bb-btn-primary bb-btn-sm" style="flex: 1;" onclick="app.completeTask('${t.id}')">
                                    ⚡ Complete & Award Points
                                </button>
                            `}
                            <button class="bb-btn bb-btn-outline bb-btn-sm" onclick="app.deleteTask('${t.id}')" title="Delete Task">🗑️</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    completeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task || task.completed) return;

        task.completed = true;

        // Award points to the assigned contestant
        const contestant = this.contestants.find(c => c.name === task.assignedTo);
        if (contestant) {
            contestant.points += task.points;
            this.recordPointLog(contestant.name, task.points, `Task Completed: ${task.title}`);
        }

        this.saveData();
        this.renderAll();
        window.soundEngine.playPointAdd();
        this.showToast(`Task "${task.title}" completed! +${task.points} pts awarded to ${task.assignedTo}`);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveData();
        this.renderAll();
        this.showToast('Task removed from queue');
    }

    // 4. FEATURE: Point System
    openPointsModal(contestantId) {
        const c = this.contestants.find(item => item.id === contestantId);
        if (!c) return;

        const modal = document.getElementById('pointsModal');
        const nameDisplay = document.getElementById('pointsModalContestantName');
        const idInput = document.getElementById('pointsModalContestantId');

        if (nameDisplay) nameDisplay.textContent = `${c.name} (Current: ${c.points} pts)`;
        if (idInput) idInput.value = c.id;

        modal.classList.add('active');
        window.soundEngine.init();
    }

    applyPointChange(amount, customReason = null) {
        const idInput = document.getElementById('pointsModalContestantId');
        const reasonInput = document.getElementById('pointsReasonInput');
        const contestantId = idInput.value;
        const reason = customReason || reasonInput.value || 'Big Boss House Ruling';

        const contestant = this.contestants.find(c => c.id === contestantId);
        if (!contestant) return;

        contestant.points = Math.max(0, contestant.points + amount);
        this.recordPointLog(contestant.name, amount, reason);
        this.saveData();
        this.renderAll();

        if (amount >= 0) {
            window.soundEngine.playPointAdd();
            this.showToast(`+${amount} points awarded to ${contestant.name} (${reason})`);
        } else {
            window.soundEngine.playPointDeduct();
            this.showToast(`${amount} points deducted from ${contestant.name} (${reason})`);
        }

        this.closeModal('pointsModal');
        if (reasonInput) reasonInput.value = '';
    }

    quickPointDelta(contestantId, delta) {
        const contestant = this.contestants.find(c => c.id === contestantId);
        if (!contestant) return;

        contestant.points = Math.max(0, contestant.points + delta);
        this.recordPointLog(contestant.name, delta, delta > 0 ? 'Quick Reward' : 'House Penalty');
        this.saveData();
        this.renderAll();

        if (delta > 0) {
            window.soundEngine.playPointAdd();
            this.showToast(`+${delta} pts awarded to ${contestant.name}`);
        } else {
            window.soundEngine.playPointDeduct();
            this.showToast(`${delta} pts deducted from ${contestant.name}`);
        }
    }

    recordPointLog(name, delta, reason) {
        this.pointHistory.unshift({
            id: 'ph_' + Date.now(),
            name,
            delta,
            reason,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        if (this.pointHistory.length > 30) this.pointHistory.pop();
    }

    // 5. FEATURE: Captaincy
    setCaptain(contestantId) {
        const target = this.contestants.find(c => c.id === contestantId);
        if (!target || target.status !== 'active') return;

        // Strip previous captain
        this.contestants.forEach(c => {
            if (c.isCaptain) {
                c.isCaptain = false;
                // Previous captain loses captain immunity if they were not individually granted it
            }
        });

        // Appoint new captain
        target.isCaptain = true;
        target.isImmune = true; // Captain gets automatic immunity
        target.isNominated = false; // Captain cannot be nominated

        this.saveData();
        this.renderAll();

        window.soundEngine.playCaptainFanfare();
        const announcement = `Bigg Boss announces ${target.name} as the new House Captain! Captaincy immunity granted.`;
        this.addAnnouncement(announcement);
        this.showToast(`👑 ${target.name} is now the House Captain!`);
    }

    renderCaptainBanner() {
        const banner = document.getElementById('captainBanner');
        if (!banner) return;

        const captain = this.contestants.find(c => c.status === 'active' && c.isCaptain);
        if (!captain) {
            banner.innerHTML = `
                <div class="captain-info">
                    <div style="font-size: 2rem;">👑</div>
                    <div>
                        <div style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--primary-gold);">No House Captain Appointed</div>
                        <div style="font-size: 0.85rem; color: var(--text-muted);">Assign a captain to take charge of weekly rations and immunity.</div>
                    </div>
                </div>
                <button class="bb-btn bb-btn-gold bb-btn-sm" onclick="app.switchTab('contestants')">Appoint Captain</button>
            `;
            return;
        }

        banner.innerHTML = `
            <div class="captain-info">
                <img src="${captain.avatar}" alt="${captain.name}" class="captain-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(captain.name)}&background=10141f&color=ffd700'">
                <div>
                    <div style="font-family: var(--font-heading); font-size: 1.15rem; color: #fff; display: flex; align-items: center;">
                        <span class="captain-crown">👑</span> ${captain.name}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--primary-gold); font-weight: 600;">House Captain • ${captain.team} • Immune</div>
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="bb-btn bb-btn-outline bb-btn-sm" onclick="app.switchTab('contestants')">Change Captain</button>
            </div>
        `;
    }

    // 6. FEATURE: Nominations
    // 7. FEATURE: Immunity (Immune contestants CANNOT be nominated)
    toggleNomination(contestantId) {
        const c = this.contestants.find(item => item.id === contestantId);
        if (!c || c.status !== 'active') return;

        if (!c.isNominated) {
            // Check immunity rule
            if (c.isImmune || c.isCaptain) {
                window.soundEngine.playPointDeduct();
                this.showToast(`⛔ Cannot nominate ${c.name}! Contestant is PROTECTED by Immunity/Captaincy.`, 'danger');
                return;
            }
            c.isNominated = true;
            window.soundEngine.playNominationSiren();
            this.showToast(`🚨 ${c.name} is NOMINATED for Eviction!`);
        } else {
            c.isNominated = false;
            this.showToast(`🟢 ${c.name} nomination revoked.`);
        }

        this.saveData();
        this.renderAll();
    }

    toggleImmunity(contestantId) {
        const c = this.contestants.find(item => item.id === contestantId);
        if (!c || c.status !== 'active') return;

        c.isImmune = !c.isImmune;
        if (c.isImmune) {
            c.isNominated = false; // Immunity removes nomination immediately
            window.soundEngine.playImmunityShield();
            this.showToast(`🛡️ Immunity granted to ${c.name}! Any active nomination cleared.`);
        } else {
            this.showToast(`🛡️ Immunity revoked from ${c.name}.`);
        }

        this.saveData();
        this.renderAll();
    }

    // 8. FEATURE: Danger Zone
    renderDangerZone() {
        const grid = document.getElementById('dangerZoneGrid');
        if (!grid) return;

        const nominees = this.contestants.filter(c => c.status === 'active' && c.isNominated);

        if (nominees.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: rgba(0, 255, 136, 0.04); border: 1px dashed rgba(0, 255, 136, 0.3); border-radius: 12px; color: var(--primary-green);">
                    <h3>✨ The House is at Peace</h3>
                    <p style="margin-top: 6px; color: var(--text-muted);">No contestants currently nominated for eviction. Use the Nomination Chamber to nominate.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = nominees.map((c, idx) => {
            // Simulated public voting risk percentage (lower points = higher risk)
            const riskPercent = Math.min(95, Math.max(15, Math.round(100 - (c.points / 12))));

            return `
                <div class="danger-card">
                    <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 12px;">
                        <img src="${c.avatar}" class="contestant-avatar" style="width: 52px; height: 52px; border-color: var(--primary-red);" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=10141f&color=ff1e56'">
                        <div>
                            <div style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; font-weight: 700;">${c.name}</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">${c.team} • ${c.points} pts</div>
                        </div>
                    </div>

                    <div class="risk-meter">
                        <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-family: var(--font-sub); font-weight: 700;">
                            <span style="color: var(--primary-red);">⚡ EVICTION RISK</span>
                            <span style="color: #fff;">${riskPercent}%</span>
                        </div>
                        <div class="risk-meter-bar">
                            <div class="risk-fill" style="width: ${riskPercent}%"></div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 8px; margin-top: 14px;">
                        <button class="bb-btn bb-btn-danger bb-btn-sm" style="flex: 1;" onclick="app.confirmEviction('${c.id}')">
                            ☠️ Trigger Eviction
                        </button>
                        <button class="bb-btn bb-btn-outline bb-btn-sm" onclick="app.toggleImmunity('${c.id}')" title="Grant Emergency Immunity">
                            🛡️ Save
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 9. FEATURE: Big Boss Announcements
    broadcastAnnouncement(customText = null) {
        const input = document.getElementById('announcementInput');
        const text = customText || (input ? input.value : '');

        if (!text || !text.trim()) {
            this.showToast('Please type an announcement or choose a preset!');
            return;
        }

        this.addAnnouncement(text);
        if (input) input.value = '';

        // Play Announcement Chime & Voice
        window.soundEngine.speakBigBoss(text);
        this.showToast('📢 Announcement broadcasted live across the House!');
    }

    addAnnouncement(text) {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.announcements.unshift({ text, time });
        if (this.announcements.length > 20) this.announcements.pop();
        
        // Update marquee / ticker banner
        const ticker = document.getElementById('broadcastTickerText');
        if (ticker) ticker.textContent = `📢 BIGG BOSS: "${text}"`;

        this.saveData();
        this.renderAnnouncements();
    }

    renderAnnouncements() {
        const container = document.getElementById('announcementsLog');
        if (!container) return;

        container.innerHTML = this.announcements.map(a => `
            <div style="padding: 10px 14px; background: rgba(255, 255, 255, 0.03); border-radius: 8px; border-left: 3px solid var(--primary-gold); margin-bottom: 8px;">
                <div style="font-size: 0.75rem; color: var(--primary-gold); font-weight: 700; margin-bottom: 2px;">⏰ ${a.time}</div>
                <div style="font-size: 0.9rem; color: #f0f4fc;">${a.text}</div>
            </div>
        `).join('');
    }

    // 10. FEATURE: Task Timer
    setTimerPreset(seconds) {
        this.pauseTimer();
        this.timerSeconds = seconds;
        this.timerTotal = seconds;
        this.updateTimerDisplay();
    }

    startTimer() {
        if (this.isTimerRunning) return;
        window.soundEngine.init();
        this.isTimerRunning = true;

        const startBtn = document.getElementById('startTimerBtn');
        if (startBtn) startBtn.style.display = 'none';
        const pauseBtn = document.getElementById('pauseTimerBtn');
        if (pauseBtn) pauseBtn.style.display = 'inline-flex';

        this.timerInterval = setInterval(() => {
            if (this.timerSeconds > 0) {
                this.timerSeconds--;
                this.updateTimerDisplay();
                if (this.timerSeconds <= 5 && this.timerSeconds > 0) {
                    window.soundEngine.playTimerTick();
                }
            } else {
                this.timerFinished();
            }
        }, 1000);
    }

    pauseTimer() {
        this.isTimerRunning = false;
        clearInterval(this.timerInterval);
        const startBtn = document.getElementById('startTimerBtn');
        if (startBtn) startBtn.style.display = 'inline-flex';
        const pauseBtn = document.getElementById('pauseTimerBtn');
        if (pauseBtn) pauseBtn.style.display = 'none';
    }

    resetTimer() {
        this.pauseTimer();
        this.timerSeconds = this.timerTotal || 300;
        this.updateTimerDisplay();
    }

    timerFinished() {
        this.pauseTimer();
        window.soundEngine.playTimerBuzzer();
        this.showToast('🚨 TIME IS UP! Task countdown ended.');
        this.addAnnouncement('Bigg Boss Task Time is UP! Contestants must freeze immediately.');
    }

    updateTimerDisplay() {
        const display = document.getElementById('timerDigits');
        const displayTab = document.getElementById('timerDigitsTab');
        const bar = document.getElementById('timerBar');
        const barTab = document.getElementById('timerBarTab');

        const mins = Math.floor(this.timerSeconds / 60);
        const secs = this.timerSeconds % 60;
        const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (display) display.textContent = timeStr;
        if (displayTab) displayTab.textContent = timeStr;

        const isUrgent = this.timerSeconds <= 10 && this.timerSeconds > 0;
        if (display) {
            if (isUrgent) display.classList.add('urgent');
            else display.classList.remove('urgent');
        }
        if (displayTab) {
            if (isUrgent) displayTab.classList.add('urgent');
            else displayTab.classList.remove('urgent');
        }

        if (this.timerTotal > 0) {
            const percent = (this.timerSeconds / this.timerTotal) * 100;
            if (bar) bar.style.width = `${percent}%`;
            if (barTab) barTab.style.width = `${percent}%`;
        }
    }

    // 11. FEATURE: House Statistics
    renderStatistics() {
        const active = this.contestants.filter(c => c.status === 'active');
        const evicted = this.contestants.filter(c => c.status === 'evicted');
        const completedTasks = this.tasks.filter(t => t.completed).length;
        const totalPoints = active.reduce((sum, c) => sum + c.points, 0);

        // MVP / Highest Scorer
        const highest = [...active].sort((a, b) => b.points - a.points)[0];
        const lowest = [...active].sort((a, b) => a.points - b.points)[0];

        // Drama Index calculated dynamically based on nominations, penalties & close points
        const nominatedCount = active.filter(c => c.isNominated).length;
        const dramaScore = Math.min(100, Math.round(35 + (nominatedCount * 12) + (this.pointHistory.length * 2)));

        const elDrama = document.getElementById('statDramaIndex');
        const elTotalPts = document.getElementById('statTotalPoints');
        const elHighest = document.getElementById('statHighestScorer');
        const elLowest = document.getElementById('statLowestScorer');
        const elTaskRate = document.getElementById('statTaskRate');

        if (elDrama) elDrama.textContent = `${dramaScore}% 🔥`;
        if (elTotalPts) elTotalPts.textContent = `${totalPoints} pts`;
        if (elHighest && highest) elHighest.textContent = `${highest.name} (${highest.points})`;
        if (elLowest && lowest) elLowest.textContent = `${lowest.name} (${lowest.points})`;
        if (elTaskRate) {
            const rate = this.tasks.length ? Math.round((completedTasks / this.tasks.length) * 100) : 0;
            elTaskRate.textContent = `${rate}% (${completedTasks}/${this.tasks.length})`;
        }
    }

    // 12. FEATURE: Eviction
    confirmEviction(contestantId) {
        const c = this.contestants.find(item => item.id === contestantId);
        if (!c) return;

        const overlay = document.getElementById('evictionOverlay');
        const photo = document.getElementById('evictedOverlayPhoto');
        const nameEl = document.getElementById('evictedOverlayName');
        const verdictEl = document.getElementById('evictedOverlayVerdict');

        if (photo) photo.src = c.avatar;
        if (nameEl) nameEl.textContent = c.name;
        if (verdictEl) verdictEl.textContent = `By public vote and the decree of Big Boss, ${c.name} has been EVICTED from the Tech House!`;

        overlay.classList.add('active');

        // Play suspense heartbeat, then doom thud
        window.soundEngine.playHeartbeat();
        setTimeout(() => window.soundEngine.playHeartbeat(), 700);
        setTimeout(() => window.soundEngine.playEvictionDrama(), 1500);

        // Update contestant state
        c.status = 'evicted';
        c.isNominated = false;
        c.isImmune = false;
        c.isCaptain = false;

        this.saveData();
        this.renderAll();

        this.addAnnouncement(`Bigg Boss announces that ${c.name} has been evicted from the House! Pack your bags immediately.`);
    }

    closeEvictionOverlay() {
        const overlay = document.getElementById('evictionOverlay');
        if (overlay) overlay.classList.remove('active');
    }

    reviveContestant(contestantId) {
        const c = this.contestants.find(item => item.id === contestantId);
        if (!c) return;

        c.status = 'active';
        this.saveData();
        this.renderAll();
        window.soundEngine.playCaptainFanfare();
        this.showToast(`✨ Wildcard Entry: ${c.name} has returned to the House!`);
    }

    renderEvictedList() {
        const container = document.getElementById('evictedGraveyardList');
        if (!container) return;

        const evicted = this.contestants.filter(c => c.status === 'evicted');
        if (evicted.length === 0) {
            container.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 20px;">No evicted contestants yet. The Tech House is currently at full capacity!</div>`;
            return;
        }

        container.innerHTML = evicted.map(c => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 10px; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${c.avatar}" style="width: 44px; height: 44px; border-radius: 50%; filter: grayscale(100%); border: 1px solid rgba(255, 255, 255, 0.2);" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}'">
                    <div>
                        <div style="font-weight: 700; color: #aaa; text-decoration: line-through;">${c.name}</div>
                        <div style="font-size: 0.78rem; color: var(--text-dim);">${c.team} • Final Points: ${c.points}</div>
                    </div>
                </div>
                <button class="bb-btn bb-btn-outline bb-btn-sm" onclick="app.reviveContestant('${c.id}')">🔄 Wildcard Re-entry</button>
            </div>
        `).join('');
    }

    // Modal Helpers
    openCreateContestantModal() {
        const modal = document.getElementById('newContestantModal');
        if (modal) modal.classList.add('active');
    }

    openCreateTaskModal() {
        const modal = document.getElementById('newTaskModal');
        const select = document.getElementById('taskAssignSelect');
        if (select) {
            select.innerHTML = this.contestants
                .filter(c => c.status === 'active')
                .map(c => `<option value="${c.name}">${c.name} (${c.team})</option>`)
                .join('');
        }
        if (modal) modal.classList.add('active');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    saveNewContestant() {
        const name = document.getElementById('newContestantName').value.trim();
        const team = document.getElementById('newContestantTeam').value.trim();
        const role = document.getElementById('newContestantRole').value.trim();
        const points = parseInt(document.getElementById('newContestantPoints').value, 10) || 500;
        const bio = document.getElementById('newContestantBio').value.trim();

        if (!name || !team) {
            alert('Please provide contestant name and team!');
            return;
        }

        const newC = {
            id: 'c_' + Date.now(),
            name,
            team,
            role: role || 'Housemate',
            points,
            status: 'active',
            isCaptain: false,
            isImmune: false,
            isNominated: false,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10141f&color=00f0ff`,
            bio: bio || 'Ready to compete in the Big Boss Tech House.'
        };

        this.contestants.push(newC);
        this.saveData();
        this.renderAll();
        this.closeModal('newContestantModal');
        this.showToast(`✨ Contestant ${name} entered the House!`);
    }

    saveNewTask() {
        const title = document.getElementById('newTaskTitle').value.trim();
        const desc = document.getElementById('newTaskDesc').value.trim();
        const assignedTo = document.getElementById('taskAssignSelect').value;
        const points = parseInt(document.getElementById('newTaskPoints').value, 10) || 100;
        const category = document.getElementById('newTaskCategory').value;

        if (!title) {
            alert('Please provide a task title!');
            return;
        }

        const newTask = {
            id: 't_' + Date.now(),
            title,
            description: desc || 'Assigned by Big Boss.',
            assignedTo,
            points,
            completed: false,
            category: category || 'House Task'
        };

        this.tasks.push(newTask);
        this.saveData();
        this.renderAll();
        this.closeModal('newTaskModal');
        this.showToast(`📋 New task "${title}" assigned to ${assignedTo}!`);
    }

    // Microphone Live Megaphone & Intercom
    async toggleMicBroadcast() {
        const headerBtn = document.getElementById('headerMicBtn');
        const headerIcon = document.getElementById('headerMicIcon');
        const headerText = document.getElementById('headerMicText');
        const headerCanvas = document.getElementById('headerMicCanvas');

        const studioBtn = document.getElementById('studioMicToggleBtn');
        const studioIcon = document.getElementById('studioMicIcon');
        const studioText = document.getElementById('studioMicText');
        const studioCanvas = document.getElementById('studioMicCanvas');
        const onAirBadge = document.getElementById('studioOnAirBadge');

        if (window.soundEngine.isMicActive) {
            window.soundEngine.stopMicBroadcast(() => {
                if (headerBtn) headerBtn.classList.remove('mic-btn-active');
                if (headerIcon) headerIcon.textContent = '🎙️';
                if (headerText) headerText.textContent = 'Live Mic';
                if (headerCanvas) headerCanvas.style.display = 'none';

                if (studioBtn) studioBtn.classList.remove('mic-btn-active');
                if (studioIcon) studioIcon.textContent = '🎙️';
                if (studioText) studioText.textContent = 'Start Live Mic Broadcast';
                if (studioCanvas) studioCanvas.style.display = 'none';
                if (onAirBadge) onAirBadge.style.display = 'none';
                this.showToast('Mic broadcast stopped.');
            });
        } else {
            const canvasToUse = (studioCanvas && studioCanvas.offsetParent !== null) ? studioCanvas : headerCanvas;
            const success = await window.soundEngine.startMicBroadcast(canvasToUse, (active, errMsg) => {
                if (active) {
                    if (headerBtn) headerBtn.classList.add('mic-btn-active');
                    if (headerIcon) headerIcon.textContent = '🛑';
                    if (headerText) headerText.textContent = 'Stop Mic';
                    if (headerCanvas) headerCanvas.style.display = 'block';

                    if (studioBtn) studioBtn.classList.add('mic-btn-active');
                    if (studioIcon) studioIcon.textContent = '🛑';
                    if (studioText) studioText.textContent = 'Stop Live Mic Broadcast';
                    if (studioCanvas) studioCanvas.style.display = 'block';
                    if (onAirBadge) onAirBadge.style.display = 'inline-flex';
                    this.showToast('🔴 LIVE ON AIR! Speaking through House Intercom.');
                } else if (errMsg) {
                    alert('Could not access microphone: ' + errMsg);
                }
            });
        }
    }

    // Speech-to-Text Dictation
    toggleDictation() {
        const btn = document.getElementById('studioDictationBtn');
        const textarea = document.getElementById('studioAnnouncementText');
        const quickInput = document.getElementById('quickAnnouncementInput');

        if (window.soundEngine.isRecognizing) {
            window.soundEngine.stopDictation();
            if (btn) btn.innerHTML = '🎤 Voice Dictation';
            this.showToast('Dictation stopped.');
        } else {
            if (btn) btn.innerHTML = '🔴 Listening... (Speak Now)';
            this.showToast('Listening in Hindi/English... Speak into your mic!');
            window.soundEngine.startDictation(
                (text) => {
                    if (textarea) textarea.value = text;
                    if (quickInput) quickInput.value = text;
                },
                () => {
                    if (btn) btn.innerHTML = '🎤 Voice Dictation';
                }
            );
        }
    }

    // Play Custom MP3 Audio File
    playCustomAudioFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }

        const url = URL.createObjectURL(file);
        this.currentAudio = new Audio(url);
        this.currentAudio.volume = window.soundEngine.masterVolume;
        this.currentAudio.play();

        const stopBtn = document.getElementById('stopCustomAudioBtn');
        if (stopBtn) stopBtn.style.display = 'inline-flex';

        this.currentAudio.onended = () => {
            if (stopBtn) stopBtn.style.display = 'none';
            this.currentAudio = null;
        };

        this.showToast(`🎵 Playing: ${file.name}`);
    }

    stopCustomAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        const stopBtn = document.getElementById('stopCustomAudioBtn');
        if (stopBtn) stopBtn.style.display = 'none';
        this.showToast('Audio playback stopped.');
    }

    resetHouseData() {
        if (confirm('Are you sure you want to reset all contestants and tasks to initial Big Boss default state?')) {
            localStorage.clear();
            this.contestants = JSON.parse(JSON.stringify(DEFAULT_CONTESTANTS));
            this.tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
            this.announcements = [
                { text: 'Bigg Boss chahte hain ki sabhi sadasya living area mein ekathha ho jayein!', time: '10:00 AM' }
            ];
            this.pointHistory = [];
            this.saveData();
            this.renderAll();
            this.showToast('🔄 House data has been reset to defaults.');
        }
    }
}

// Global App Instance
window.app = new BigBossApp();
