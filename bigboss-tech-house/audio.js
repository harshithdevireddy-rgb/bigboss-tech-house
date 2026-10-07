/**
 * Big Boss Tech House - Authentic Audio Synthesis, Microphone Intercom & Speech Engine
 * Faithfully recreates the actual Bigg Boss TV series signature music, stings, gongs, and live microphone broadcaster.
 */

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.masterVolume = 0.85;
        this.muted = false;
        
        // Microphone state
        this.isMicActive = false;
        this.micStream = null;
        this.micSource = null;
        this.micGain = null;
        this.micFilter = null;
        this.micAnalyser = null;
        this.micAnimId = null;

        // Speech Recognition
        this.recognition = null;
        this.isRecognizing = false;

        // Custom MP3 audio clip cache
        this.customClips = {};
        
        this.initSpeechRecognition();
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    setVolume(val) {
        this.masterVolume = Math.max(0, Math.min(1, parseFloat(val)));
        if (this.micGain) {
            this.micGain.gain.setValueAtTime(this.muted ? 0 : this.masterVolume * 1.2, this.ctx.currentTime);
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    getGain(customVol = 1) {
        this.init();
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(this.muted ? 0 : this.masterVolume * customVol, this.ctx.currentTime);
        gain.connect(this.ctx.destination);
        return gain;
    }

    // =========================================================================
    // 1. ACTUAL BIGG BOSS TV SERIES ICONIC TITLE THEME (Authentic Orchestration)
    // =========================================================================
    // Scale: Bhairav / Double Harmonic Minor (D, Eb, F#, G, A, Bb, C#)
    // Melody: Re Ma Pa Dha Pa Ma Re Sa Re with Timpani roll, sitar pluck, & brass stabs
    playEyeTheme() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const masterGain = this.getGain(1.0);

        // 1. Cinematic Timpani Roll & Heavy Sub Boom
        const boomOsc = this.ctx.createOscillator();
        const boomGain = this.ctx.createGain();
        boomOsc.type = 'sine';
        boomOsc.frequency.setValueAtTime(140, now);
        boomOsc.frequency.exponentialRampToValueAtTime(32, now + 1.6);
        boomGain.gain.setValueAtTime(0.9, now);
        boomGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
        boomOsc.connect(boomGain);
        boomGain.connect(masterGain);
        boomOsc.start(now);
        boomOsc.stop(now + 2.1);

        // Heavy percussion strike
        this.createTaikoHit(now, 1.2);
        this.createTaikoHit(now + 1.8, 1.4);

        // 2. The Signature Bigg Boss Melody Motif:
        // D4 (293.66) -> Eb4 (311.13) -> F#4 (369.99) -> G4 (392.00) -> F#4 (369.99) -> Eb4 (311.13) -> D4 (293.66) -> C4 (261.63) -> D4 (293.66)
        const bbNotes = [
            { f: 293.66, t: 0.15, d: 0.22 }, // Re
            { f: 311.13, t: 0.38, d: 0.22 }, // Ga komal / Eb
            { f: 369.99, t: 0.60, d: 0.32 }, // Ma teevra / F#
            { f: 392.00, t: 0.92, d: 0.25 }, // Pa / G
            { f: 369.99, t: 1.17, d: 0.22 }, // F#
            { f: 311.13, t: 1.39, d: 0.22 }, // Eb
            { f: 293.66, t: 1.61, d: 0.40 }, // D
            { f: 261.63, t: 2.01, d: 0.22 }, // C
            { f: 293.66, t: 2.23, d: 0.85 }  // D (sustained resolve)
        ];

        bbNotes.forEach(item => {
            const startTime = now + item.t;
            
            // Sitar / Flute Lead Layer (Sawtooth with resonant Indian flute filter)
            const leadOsc = this.ctx.createOscillator();
            const leadGain = this.ctx.createGain();
            const leadFilter = this.ctx.createBiquadFilter();
            
            leadOsc.type = 'sawtooth';
            leadOsc.frequency.setValueAtTime(item.f, startTime);
            // Slight pitch vibrato
            leadOsc.frequency.linearRampToValueAtTime(item.f * 1.01, startTime + item.d * 0.5);
            leadOsc.frequency.linearRampToValueAtTime(item.f, startTime + item.d);

            leadFilter.type = 'bandpass';
            leadFilter.frequency.setValueAtTime(item.f * 2, startTime);
            leadFilter.Q.setValueAtTime(3.5, startTime);

            leadGain.gain.setValueAtTime(0, startTime);
            leadGain.gain.linearRampToValueAtTime(0.35, startTime + 0.04);
            leadGain.gain.exponentialRampToValueAtTime(0.001, startTime + item.d);

            leadOsc.connect(leadFilter);
            leadFilter.connect(leadGain);
            leadGain.connect(masterGain);
            leadOsc.start(startTime);
            leadOsc.stop(startTime + item.d + 0.1);

            // Sine Sub/Harmonic warmth
            const harmOsc = this.ctx.createOscillator();
            const harmGain = this.ctx.createGain();
            harmOsc.type = 'sine';
            harmOsc.frequency.setValueAtTime(item.f * 2, startTime);
            harmGain.gain.setValueAtTime(0.18, startTime);
            harmGain.gain.exponentialRampToValueAtTime(0.001, startTime + item.d);
            harmOsc.connect(harmGain);
            harmGain.connect(masterGain);
            harmOsc.start(startTime);
            harmOsc.stop(startTime + item.d + 0.1);
        });

        // 3. Eerie High Whistle / Glissando Stinger (Signature show feature)
        const whistleOsc = this.ctx.createOscillator();
        const whistleGain = this.ctx.createGain();
        whistleOsc.type = 'sine';
        whistleOsc.frequency.setValueAtTime(1174.66, now + 1.2); // D6
        whistleOsc.frequency.exponentialRampToValueAtTime(1244.51, now + 1.6); // Eb6
        whistleOsc.frequency.exponentialRampToValueAtTime(1174.66, now + 2.2); // D6
        whistleGain.gain.setValueAtTime(0.001, now + 1.2);
        whistleGain.gain.linearRampToValueAtTime(0.18, now + 1.5);
        whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
        whistleOsc.connect(whistleGain);
        whistleGain.connect(masterGain);
        whistleOsc.start(now + 1.2);
        whistleOsc.stop(now + 2.6);

        // 4. Low Dramatic Drone & Brass Stabs at resolution
        [146.83, 220.00, 293.66].forEach(f => {
            const stab = this.ctx.createOscillator();
            const stabG = this.ctx.createGain();
            stab.type = 'sawtooth';
            stab.frequency.setValueAtTime(f, now + 2.2);
            stabG.gain.setValueAtTime(0.25, now + 2.2);
            stabG.gain.exponentialRampToValueAtTime(0.001, now + 3.4);
            stab.connect(stabG);
            stabG.connect(masterGain);
            stab.start(now + 2.2);
            stab.stop(now + 3.5);
        });

        // 5. Authentic Temple Gong Strike at the end
        this.createDeepGong(now + 2.2, 180, 2.8);
    }

    // =========================================================================
    // 2. ACTUAL BIGG BOSS ANNOUNCEMENT CHIME (Authentic Temple Gong)
    // =========================================================================
    playAnnouncementChime() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const gain = this.getGain(0.9);

        // Multi-frequency bronze bell gong (110Hz, 220Hz, 330Hz, 440Hz, 660Hz with non-harmonic overtones)
        const gongFrequencies = [130.81, 196.00, 261.63, 392.00, 523.25, 784.00];
        gongFrequencies.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, now);

            // Natural gong envelope: instant high peak with rich exponential decay
            g.gain.setValueAtTime(0.4 / (idx + 1), now);
            g.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

            osc.connect(g);
            g.connect(gain);
            osc.start(now);
            osc.stop(now + 2.6);
        });

        // Second resonant strike 0.25s later (the show's 2-part chime)
        setTimeout(() => {
            if (!this.ctx || this.muted) return;
            const t2 = this.ctx.currentTime;
            [261.63, 392.00, 523.25].forEach(f => {
                const osc = this.ctx.createOscillator();
                const g = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f * 1.5, t2);
                g.gain.setValueAtTime(0.25, t2);
                g.gain.exponentialRampToValueAtTime(0.0001, t2 + 2.0);
                osc.connect(g);
                g.connect(this.ctx.destination);
                osc.start(t2);
                osc.stop(t2 + 2.1);
            });
        }, 220);
    }

    // =========================================================================
    // 3. ACTUAL NOMINATION RED ALERT SIREN
    // =========================================================================
    playNominationSiren() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const gain = this.getGain(0.85);

        // Heartbeat under siren
        this.playHeartbeat();
        setTimeout(() => this.playHeartbeat(), 700);

        // 3 Cycles of the authentic dual-tone emergency sweep
        for (let i = 0; i < 3; i++) {
            const t = now + i * 0.55;
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sawtooth';
            
            osc.frequency.setValueAtTime(400, t);
            osc.frequency.exponentialRampToValueAtTime(960, t + 0.25);
            osc.frequency.exponentialRampToValueAtTime(400, t + 0.52);

            g.gain.setValueAtTime(0.28, t);
            g.gain.linearRampToValueAtTime(0.35, t + 0.25);
            g.gain.exponentialRampToValueAtTime(0.01, t + 0.54);

            osc.connect(g);
            g.connect(gain);
            osc.start(t);
            osc.stop(t + 0.55);
        }
    }

    // =========================================================================
    // 4. ACTUAL EVICTION SUSPENSE DOOM THUD & HEAVY METAL GATE SLAM
    // =========================================================================
    playEvictionDrama() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const gain = this.getGain(1.0);

        // Double suspense heartbeats leading into impact
        this.playHeartbeat();
        setTimeout(() => this.playHeartbeat(), 500);

        // 1. Heavy bass drop
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now + 0.9);
        osc.frequency.exponentialRampToValueAtTime(22, now + 2.6);
        g.gain.setValueAtTime(1.0, now + 0.9);
        g.gain.exponentialRampToValueAtTime(0.001, now + 2.8);
        osc.connect(g);
        g.connect(gain);
        osc.start(now + 0.9);
        osc.stop(now + 2.9);

        // 2. Dark drone dissonance
        [55.0, 65.41, 77.78].forEach(f => {
            const darkOsc = this.ctx.createOscillator();
            const darkG = this.ctx.createGain();
            darkOsc.type = 'sawtooth';
            darkOsc.frequency.setValueAtTime(f, now + 0.9);
            darkG.gain.setValueAtTime(0.3, now + 0.9);
            darkG.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
            
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(220, now + 0.9);
            darkOsc.connect(filter);
            filter.connect(darkG);
            darkG.connect(gain);
            darkOsc.start(now + 0.9);
            darkOsc.stop(now + 3.6);
        });

        // 3. Heavy metal crash / doom impact
        this.createNoiseBurst(now + 0.9, 1.4, 0.55);
    }

    // =========================================================================
    // 5. CAPTAIN CORONATION ROYAL FANFARE
    // =========================================================================
    playCaptainFanfare() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const gain = this.getGain(0.85);

        const fanfare = [
            { f: 392.00, d: 0.16 }, // G4
            { f: 523.25, d: 0.16 }, // C5
            { f: 659.25, d: 0.16 }, // E5
            { f: 783.99, d: 0.45 }, // G5
            { f: 659.25, d: 0.16 }, // E5
            { f: 783.99, d: 0.75 }  // G5
        ];

        let t = now;
        fanfare.forEach(item => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(item.f, t);

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(item.f * 3, t);

            g.gain.setValueAtTime(0.35, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + item.d + 0.15);

            osc.connect(filter);
            filter.connect(g);
            g.connect(gain);
            osc.start(t);
            osc.stop(t + item.d + 0.2);
            t += item.d;
        });
    }

    // =========================================================================
    // 6. IMMUNITY FORCEFIELD SHIELD
    // =========================================================================
    playImmunityShield() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const gain = this.getGain(0.75);

        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.5);
        osc.frequency.linearRampToValueAtTime(1100, now + 1.0);

        g.gain.setValueAtTime(0.01, now);
        g.gain.linearRampToValueAtTime(0.4, now + 0.25);
        g.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

        const lfo = this.ctx.createOscillator();
        const lfoG = this.ctx.createGain();
        lfo.frequency.setValueAtTime(9, now);
        lfoG.gain.setValueAtTime(50, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + 1.1);

        osc.connect(g);
        g.connect(gain);
        osc.start(now);
        osc.stop(now + 1.1);
    }

    // =========================================================================
    // 7. TASK TIMEOUT KLAXON BUZZER (Show buzzer)
    // =========================================================================
    playTimerBuzzer() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const gain = this.getGain(0.9);

        for (let i = 0; i < 2; i++) {
            const startT = now + i * 0.42;
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, startT);
            osc.frequency.linearRampToValueAtTime(160, startT + 0.35);

            g.gain.setValueAtTime(0.45, startT);
            g.gain.exponentialRampToValueAtTime(0.01, startT + 0.37);

            osc.connect(g);
            g.connect(gain);
            osc.start(startT);
            osc.stop(startT + 0.38);
        }
    }

    // =========================================================================
    // 8. POINTS REWARD & PENALTY
    // =========================================================================
    playPointAdd() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const gain = this.getGain(0.65);
        [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
            const time = now + i * 0.07;
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(f, time);
            g.gain.setValueAtTime(0.4, time);
            g.gain.exponentialRampToValueAtTime(0.001, time + 0.32);
            osc.connect(g);
            g.connect(gain);
            osc.start(time);
            osc.stop(time + 0.35);
        });
    }

    playPointDeduct() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const gain = this.getGain(0.65);
        [350, 275, 196].forEach((f, i) => {
            const time = now + i * 0.11;
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(f, time);
            g.gain.setValueAtTime(0.3, time);
            g.gain.exponentialRampToValueAtTime(0.01, time + 0.24);
            osc.connect(g);
            g.connect(gain);
            osc.start(time);
            osc.stop(time + 0.26);
        });
    }

    // =========================================================================
    // 9. SUSPENSE HEARTBEAT (Lub-Dub)
    // =========================================================================
    playHeartbeat() {
        this.init();
        if (this.muted) return;
        const now = this.ctx.currentTime;
        const gain = this.getGain(0.9);

        // Lub
        const o1 = this.ctx.createOscillator();
        const g1 = this.ctx.createGain();
        o1.type = 'sine';
        o1.frequency.setValueAtTime(80, now);
        o1.frequency.exponentialRampToValueAtTime(35, now + 0.14);
        g1.gain.setValueAtTime(0.7, now);
        g1.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
        o1.connect(g1);
        g1.connect(gain);
        o1.start(now);
        o1.stop(now + 0.18);

        // Dub
        const o2 = this.ctx.createOscillator();
        const g2 = this.ctx.createGain();
        o2.type = 'sine';
        o2.frequency.setValueAtTime(70, now + 0.22);
        o2.frequency.exponentialRampToValueAtTime(30, now + 0.38);
        g2.gain.setValueAtTime(0.5, now + 0.22);
        g2.gain.exponentialRampToValueAtTime(0.01, now + 0.42);
        o2.connect(g2);
        g2.connect(gain);
        o2.start(now + 0.22);
        o2.stop(now + 0.44);
    }

    // =========================================================================
    // 10. MICROPHONE LIVE BROADCAST & VOICE OVER ENGINE (MEGAPHONE / PA SYSTEM)
    // =========================================================================
    async startMicBroadcast(canvasElement = null, onStatusChange = null) {
        this.init();
        try {
            if (this.isMicActive) return true;

            // Request real mic access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            this.micStream = stream;
            this.micSource = this.ctx.createMediaStreamSource(stream);

            // Bigg Boss Voice Processing:
            // 1. Deep low-frequency boost for authoritative presence
            const bassBoost = this.ctx.createBiquadFilter();
            bassBoost.type = 'peaking';
            bassBoost.frequency.value = 180;
            bassBoost.gain.value = 6;

            // 2. High-cut low-pass filter to sound like an in-house PA broadcast
            const lowPass = this.ctx.createBiquadFilter();
            lowPass.type = 'lowpass';
            lowPass.frequency.value = 3600;

            // 3. Analyser for VU Meter visualization
            this.micAnalyser = this.ctx.createAnalyser();
            this.micAnalyser.fftSize = 64;

            // 4. Output gain
            this.micGain = this.ctx.createGain();
            this.micGain.gain.setValueAtTime(this.muted ? 0 : this.masterVolume * 1.1, this.ctx.currentTime);

            // Connect nodes
            this.micSource.connect(bassBoost);
            bassBoost.connect(lowPass);
            lowPass.connect(this.micAnalyser);
            
            // Connect to speakers (with anti-feedback safety volume)
            lowPass.connect(this.micGain);
            this.micGain.connect(this.ctx.destination);

            this.isMicActive = true;

            // Trigger Bigg Boss Announcement Chime before opening mic
            this.playAnnouncementChime();

            // Start visualizer if canvas provided
            if (canvasElement) {
                this.drawMicVisualizer(canvasElement);
            }

            if (onStatusChange) onStatusChange(true);
            return true;
        } catch (err) {
            console.error('Microphone access denied or unavailable:', err);
            if (onStatusChange) onStatusChange(false, err.message);
            return false;
        }
    }

    stopMicBroadcast(onStatusChange = null) {
        if (!this.isMicActive) return;

        if (this.micStream) {
            this.micStream.getTracks().forEach(track => track.stop());
            this.micStream = null;
        }

        if (this.micSource) {
            this.micSource.disconnect();
            this.micSource = null;
        }

        if (this.micAnimId) {
            cancelAnimationFrame(this.micAnimId);
            this.micAnimId = null;
        }

        this.isMicActive = false;
        if (onStatusChange) onStatusChange(false);
    }

    drawMicVisualizer(canvas) {
        if (!canvas || !this.micAnalyser) return;
        const ctx = canvas.getContext('2d');
        const bufferLength = this.micAnalyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!this.isMicActive) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
            this.micAnimId = requestAnimationFrame(draw);
            this.micAnalyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const barWidth = (canvas.width / bufferLength) * 1.8;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height;
                // Red/Gold Bigg Boss glowing bars
                const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
                grad.addColorStop(0, '#e50914');
                grad.addColorStop(1, '#ffd700');

                ctx.fillStyle = grad;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 2;
            }
        };
        draw();
    }

    // =========================================================================
    // 11. SPEECH RECOGNITION (VOICE-TO-ANNOUNCEMENT DICTATION)
    // =========================================================================
    initSpeechRecognition() {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRec) {
            this.recognition = new SpeechRec();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'hi-IN'; // Supports Hindi + English Indian dictation
        }
    }

    startDictation(onResult, onEnd) {
        if (!this.recognition) {
            alert('Speech Recognition is not supported in this browser. Please use Google Chrome or Safari.');
            if (onEnd) onEnd();
            return;
        }

        if (this.isRecognizing) {
            this.recognition.stop();
            return;
        }

        this.recognition.onstart = () => {
            this.isRecognizing = true;
        };

        this.recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            if (onResult) onResult(transcript);
        };

        this.recognition.onerror = (e) => {
            console.warn('Speech Recognition error:', e);
            this.isRecognizing = false;
            if (onEnd) onEnd();
        };

        this.recognition.onend = () => {
            this.isRecognizing = false;
            if (onEnd) onEnd();
        };

        this.recognition.start();
    }

    stopDictation() {
        if (this.recognition && this.isRecognizing) {
            this.recognition.stop();
            this.isRecognizing = false;
        }
    }

    // =========================================================================
    // 12. TEXT-TO-SPEECH (AUTHENTIC "BIGG BOSS CHAHTE HAIN" BARITONE VOICE)
    // =========================================================================
    speakBigBoss(text, onComplete = null) {
        if (!('speechSynthesis' in window)) {
            if (onComplete) onComplete();
            return;
        }

        window.speechSynthesis.cancel();
        this.playAnnouncementChime();

        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            
            // Prefer deep baritone Indian Hindi or English voice (like Atul Kapoor)
            const deepVoice = voices.find(v => 
                (v.lang.includes('hi') || v.lang.includes('IN')) && (v.name.includes('Male') || v.name.includes('Google') || v.name.includes('Rishi'))
            ) || voices.find(v => 
                v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('Fred') || v.name.includes('Male')
            ) || voices[0];

            if (deepVoice) utterance.voice = deepVoice;

            utterance.rate = 0.85; // Slow, authoritative Bigg Boss pacing
            utterance.pitch = 0.72; // Deep resonant bass
            utterance.volume = this.muted ? 0 : this.masterVolume;

            if (onComplete) {
                utterance.onend = onComplete;
                utterance.onerror = onComplete;
            }

            window.speechSynthesis.speak(utterance);
        }, 700);
    }

    // Helper synthesis methods
    createTaikoHit(startTime, vol = 1.0) {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, startTime);
        osc.frequency.exponentialRampToValueAtTime(38, startTime + 0.35);
        g.gain.setValueAtTime(vol * 0.8, startTime);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.55);
    }

    createDeepGong(startTime, freq, duration) {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        g.gain.setValueAtTime(0.6, startTime);
        g.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration + 0.1);
    }

    createNoiseBurst(startTime, duration, vol) {
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-2.5 * i / bufferSize);
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 650;
        const g = this.ctx.createGain();
        g.gain.setValueAtTime(vol, startTime);
        g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        noise.connect(filter);
        filter.connect(g);
        g.connect(this.ctx.destination);
        noise.start(startTime);
        noise.stop(startTime + duration);
    }
}

window.soundEngine = new SoundEngine();
