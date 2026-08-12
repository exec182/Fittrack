const CSRF_TOKEN = document.body.getAttribute('data-csrf-token') || '';

    function escapeHtml(value) {
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function jsonPostOptions(payload) {
      if (IS_READ_ONLY_VIEW) {
        throw new Error('Nur-Lese-Modus: Schreiben ist nicht erlaubt');
      }

      return {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': CSRF_TOKEN
        },
        body: JSON.stringify(payload)
      };
    }

    const fallbackData = {
      source: 'fallback',
      overview: [
        { label: 'Aktuelles Gewicht', value: '104,5 kg' },
        { label: 'Zielgewicht', value: '72,0 kg' },
        { label: 'BMI', value: '24,1' },
        { label: 'Aktivität', value: 'Täglich (3x Krafttraining, 2x Kardio, 2x aktive Erholung)' }
      ],
      heightM: 1.82,
      weights: [118.0, 117.6, 115.7, 115.6, 115.5, 115.3, 115.2, 114.9, 114.6, 114.0, 113.3, 113.0, 112.7, 112.8, 112.5, 112.4, 111.7, 111.4, 110.7, 110.9, 111.8, 110.8, 110.4, 110.2, 109.4, 109.3, 108.9, 109.2, 109.2, 109.0, 107.9, 107.7, 107.7, 108.1, 107.9, 107.2, 106.8, 106.4, 106.1, 105.8, 105.5, 105.8, 105.8, 105.7, 105.0, 104.5],
      dates: ['2026-06-14', '2026-06-16', '2026-06-18', '2026-06-19', '2026-06-20', '2026-06-21', '2026-06-22', '2026-06-23', '2026-06-24', '2026-06-25', '2026-06-26', '2026-06-27', '2026-06-28', '2026-06-29', '2026-06-30', '2026-07-01', '2026-07-02', '2026-07-03', '2026-07-04', '2026-07-05', '2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09', '2026-07-10', '2026-07-11', '2026-07-12', '2026-07-13', '2026-07-14', '2026-07-15', '2026-07-16', '2026-07-17', '2026-07-18', '2026-07-19', '2026-07-20', '2026-07-21', '2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30', '2026-07-31'],
      measurements: [
        { title: 'Brustumfang', value: '107,0 cm', note: 'Letzte Messung am 2026-07-31' },
        { title: 'Bauchumfang', value: '103,0 cm', note: 'Letzte Messung am 2026-07-31' },
        { title: 'Bundumfang', value: '104,2 cm', note: 'Letzte Messung am 2026-07-31' },
        { title: 'Poumfang', value: '108,9 cm', note: 'Letzte Messung am 2026-07-31' }
      ],
      trainingPlan: [
        { day: 'Montag', focus: 'Krafttraining + Spaziergang', duration: '60 Min.', note: '30 Min Ganzkörper (3x10 Kniebeugen, 3x10 erhöhte Liegestütze, 3x12 Rudern, 3x15 Hüftheben, 3x30s Plank), danach 30 Min zügiges Gehen' },
        { day: 'Dienstag', focus: 'Cardio', duration: '55-70 Min.', note: '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen' },
        { day: 'Mittwoch', focus: 'Krafttraining', duration: '50-60 Min.', note: '30-40 Min Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdrücken, 3x12 Rudern, 3x30s Plank), danach 20 Min Spaziergang' },
        { day: 'Donnerstag', focus: 'Aktive Erholung', duration: '75 Min.', note: '60 Min lockeres Gehen plus 15 Min Mobilität und Dehnen' },
        { day: 'Freitag', focus: 'Krafttraining', duration: '50-70 Min.', note: '30-40 Min Kraft (3x12 Kniebeugen, 3x12 Liegestütze an der Wand, 3x15 Hüftheben, 3x12 Rudern, 3x40s Plank), danach 20-30 Min lockeres Gehen' },
        { day: 'Samstag', focus: 'Längere Cardioeinheit', duration: '60-90 Min.', note: 'Spaziergang, Radfahren oder Schwimmen; Intensität so, dass Unterhaltung möglich bleibt' },
        { day: 'Sonntag', focus: 'Erholung', duration: '30-45 Min.', note: 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitätstraining' }
      ],
      recentTrainingEntries: [
        { id: 1, date: '2026-07-31', trainingText: 'Ganzkörperzirkel und lockerer Spaziergang', duration: '55 Min.', limitation: '', loadLevel: 3, painLevel: 1, sourceDay: 'Freitag', createdAt: '2026-07-31 18:20:00' },
        { id: 2, date: '2026-07-29', trainingText: '45 Min Cardio auf dem Rad', duration: '45 Min.', limitation: 'Kein Sprinten', loadLevel: 2, painLevel: 1, sourceDay: 'Mittwoch', createdAt: '2026-07-29 17:05:00' }
      ],
      measurementTypes: [
        { id: 1, name: 'Gewicht', unit: 'kg' },
        { id: 2, name: 'Brustumfang', unit: 'cm' },
        { id: 3, name: 'Bauchumfang', unit: 'cm' },
        { id: 4, name: 'Bundumfang', unit: 'cm' },
        { id: 5, name: 'Poumfang', unit: 'cm' }
      ],
      latestMeasurementEntries: [
        { typeId: 1, typeName: 'Gewicht', unit: 'kg', value: 104.5 },
        { typeId: 2, typeName: 'Brustumfang', unit: 'cm', value: 107.0 },
        { typeId: 3, typeName: 'Bauchumfang', unit: 'cm', value: 103.0 },
        { typeId: 4, typeName: 'Bundumfang', unit: 'cm', value: 104.2 },
        { typeId: 5, typeName: 'Poumfang', unit: 'cm', value: 108.9 }
      ]
    };

    const app = document.getElementById('app');
    let data = {
      source: 'loading', heightM: null, goalWeight: null, weights: [], dates: [],
      measurements: [], measurementHistory: [], measurementTypes: [],
      latestMeasurementEntries: [], goals: [], deeplinks: [], trainingPlan: [],
      trainingPlanHistory: [], recentTrainingEntries: [], trainingExceptions: []
    };
    const IS_READ_ONLY_VIEW = document.body.getAttribute('data-read-only') === '1';
    const SHARE_TOKEN = document.body.getAttribute('data-share-token') || '';
    const CURRENT_PAGE = document.body.getAttribute('data-page') || 'overview';

    function buildDataApiUrl() {
      if (IS_READ_ONLY_VIEW && SHARE_TOKEN) {
        return `data.php?share=${encodeURIComponent(SHARE_TOKEN)}`;
      }
      return 'data.php';
    }

    function formatDeeplinkDate(value) {
      if (!value) return 'Kein Ablauf';
      return String(value).replace('T', ' ').slice(0, 16);
    }

    function getDeeplinkStatusLabel(status) {
      if (status === 'disabled') return 'Deaktiviert';
      if (status === 'expired') return 'Abgelaufen';
      return 'Aktiv';
    }

    function getDeeplinkStatusClass(status) {
      if (status === 'disabled') return 'status-disabled';
      if (status === 'expired') return 'status-expired';
      return 'status-active';
    }

    function buildShareUrl(token) {
      const url = new URL(window.location.href);
      url.search = '';
      url.hash = '';
      url.searchParams.set('share', String(token || ''));
      return url.toString();
    }

    async function copyTextToClipboard(text) {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const helper = document.createElement('textarea');
      helper.value = text;
      helper.style.position = 'fixed';
      helper.style.left = '-9999px';
      document.body.appendChild(helper);
      helper.select();
      document.execCommand('copy');
      document.body.removeChild(helper);
    }

    function renderDeeplinkList() {
      if (IS_READ_ONLY_VIEW) return;
      const list = document.getElementById('deeplinkList');
      if (!list) return;

      const deeplinks = Array.isArray(data.deeplinks) ? data.deeplinks : [];
      if (deeplinks.length === 0) {
        list.innerHTML = '<div class="small">Noch keine Deeplinks vorhanden.</div>';
        return;
      }

      list.innerHTML = deeplinks.map((item) => {
        const statusClass = getDeeplinkStatusClass(String(item.status || 'active'));
        const statusLabel = getDeeplinkStatusLabel(String(item.status || 'active'));
        const canDisable = String(item.status || 'active') === 'active';
        return `
          <div class="deeplink-item">
            <div class="meta-row">
              <strong>Link #${Number(item.id)}</strong>
              <span class="status-pill ${statusClass}">${statusLabel}</span>
            </div>
            <div class="small">Erstellt: ${escapeHtml(formatDeeplinkDate(item.createdAt))}</div>
            <div class="small">Ablauf: ${escapeHtml(formatDeeplinkDate(item.expiresAt))}</div>
            <div class="deeplink-actions">
              <button class="tiny-btn" type="button" data-copy-deeplink="${escapeHtml(String(item.token || ''))}">Link kopieren</button>
              ${canDisable ? `<button class="tiny-btn warn" type="button" data-disable-deeplink="${Number(item.id)}">Deaktivieren</button>` : ''}
            </div>
          </div>
        `;
      }).join('');

      list.querySelectorAll('[data-copy-deeplink]').forEach((button) => {
        button.addEventListener('click', async () => {
          const token = String(button.getAttribute('data-copy-deeplink') || '');
          try {
            await copyTextToClipboard(buildShareUrl(token));
            state.deeplinkNotice = 'Link wurde in die Zwischenablage kopiert.';
            const notice = document.getElementById('deeplinkNotice');
            if (notice) notice.textContent = state.deeplinkNotice;
          } catch (error) {
            window.alert('Link konnte nicht kopiert werden.');
          }
        });
      });

      list.querySelectorAll('[data-disable-deeplink]').forEach((button) => {
        button.addEventListener('click', async () => {
          const deeplinkId = Number(button.getAttribute('data-disable-deeplink') || 0);
          if (!deeplinkId) return;

          try {
            const response = await fetch(buildDataApiUrl(), jsonPostOptions({
              action: 'disable_deeplink',
              deeplinkId
            }));
            const result = await response.json();
            if (!response.ok || !result.ok) {
              throw new Error(result.error || `HTTP ${response.status}`);
            }

            state.deeplinkNotice = 'Deeplink wurde deaktiviert.';
            await loadDashboardData();
          } catch (error) {
            window.alert(`Deaktivieren fehlgeschlagen: ${error.message}`);
          }
        });
      });
    }
    const state = {
      window: 'Alles',
      showFiveAverage: false,
      showTwentyOneAverage: false,
      showAllTraining: false,
      showTrainingPlanEditor: false,
      trainingPlanForm: null,
      trainingPlanNotice: '',
      showTrainingForm: false,
      trainingForm: null,
      trainingNotice: '',
      showMeasurementForm: false,
      measurementForm: null,
      measurementNotice: '',
      profileNotice: '',
      goalsNotice: '',
      showGoalEditor: false,
      goalForm: null,
      showProfileEditor: false,
      showRewardModal: false,
      rewardGoalId: null,
      rewardGoalTitle: '',
      knownAchievedGoalIds: [],
      recentlyAchievedGoalIds: [],
      goalCelebrationText: '',
      hasLoadedServerData: false,
      deeplinkNotice: '',
      showMeasurementDetail: false,
      measurementDetailItem: null
      ,analysisPeriod: '30'
      ,analysisNotice: ''
    };

    function isFallbackSource() {
      return String(data.source || '').toLowerCase() !== 'database';
    }

    function renderDataSourceBanner() {
      if (!state.hasLoadedServerData || !isFallbackSource()) return null;
      const banner = document.createElement('section');
      banner.className = 'data-source-banner';
      banner.textContent = 'Die Daten konnten nicht geladen werden. Es werden keine Ersatzdaten angezeigt.';
      return banner;
    }

    function normalizeTypeName(value) {
      return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    function getMeasurementTypes() {
      const rawTypes = Array.isArray(data.measurementTypes) ? data.measurementTypes : [];
      return rawTypes.map((item, index) => ({
        id: Number(item.id ?? index + 1),
        name: String(item.name || item.messurement || item.title || 'Messwert'),
        unit: String(item.unit || '')
      }));
    }

    function formatGoalValue(value, unit) {
      return `${Number(value).toFixed(1).replace('.', ',')} ${unit || ''}`.trim();
    }

    function formatDateTimeText(value) {
      if (!value) return '---';
      return String(value).replace('T', ' ').slice(0, 16);
    }

    function formatGermanDate(value) {
      const date = value instanceof Date ? value : new Date(String(value || ''));
      if (!Number.isFinite(date.getTime())) return '---';

      return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    }

    function parseChartDateToTimestamp(value) {
      if (value instanceof Date) {
        const directTs = value.getTime();
        return Number.isFinite(directTs) ? directTs : NaN;
      }

      let raw = String(value || '').trim();
      if (!raw) return NaN;
      if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        raw = `${raw}T00:00:00`;
      } else if (/^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/.test(raw)) {
        raw = raw.replace(' ', 'T');
      }

      const ts = new Date(raw).getTime();
      return Number.isFinite(ts) ? ts : NaN;
    }

    function formatChartDateLabel(value, withTime = false) {
      const ts = parseChartDateToTimestamp(value);
      if (!Number.isFinite(ts)) {
        return String(value || '').slice(0, withTime ? 16 : 10);
      }

      const date = new Date(ts);
      const formatter = withTime
        ? new Intl.DateTimeFormat('de-DE', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        : new Intl.DateTimeFormat('de-DE', {
            day: '2-digit',
            month: '2-digit'
          });

      return formatter.format(date).replace(',', '');
    }

    function sanitizePeriodForFilename(period) {
      return String(period || 'alles')
        .toLowerCase()
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_-]/g, '');
    }

    function getTodayForFilename() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function buildSharePictureFilename() {
      return `${getTodayForFilename()}_${sanitizePeriodForFilename(state.window)}.png`;
    }

    function trimTextToWidth(ctx, text, maxWidth) {
      const raw = String(text || '').trim();
      if (!raw) return '';
      if (ctx.measureText(raw).width <= maxWidth) return raw;

      const ellipsis = '...';
      let start = 0;
      let end = raw.length;
      let best = ellipsis;

      while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const candidate = `${raw.slice(0, mid).trim()}${ellipsis}`;
        const width = ctx.measureText(candidate).width;
        if (width <= maxWidth) {
          best = candidate;
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }

      return best;
    }

    function getSharePictureSnapshot() {
      const visible = getWindowedData();
      const maxLen = Math.min(visible.weights.length, visible.dates.length);
      let points = [];

      for (let index = 0; index < maxLen; index += 1) {
        const weight = Number(visible.weights[index]);
        const dateRaw = String(visible.dates[index] || '');
        const ts = parseChartDateToTimestamp(dateRaw);
        if (!Number.isFinite(weight) || !Number.isFinite(ts)) continue;
        points.push({ weight, date: dateRaw, ts });
      }

      if (points.length < 2) {
        const rawWeights = Array.isArray(data.weights) ? data.weights : [];
        const rawDates = Array.isArray(data.dates) ? data.dates : [];
        const fallbackLen = Math.min(rawWeights.length, rawDates.length);
        points = [];
        for (let index = 0; index < fallbackLen; index += 1) {
          const weight = Number(rawWeights[index]);
          const dateRaw = String(rawDates[index] || '');
          const ts = parseChartDateToTimestamp(dateRaw);
          if (!Number.isFinite(weight) || !Number.isFinite(ts)) continue;
          points.push({ weight, date: dateRaw, ts });
        }
      }

      if (points.length < 2) {
        throw new Error('Nicht genug Gewichtsverlauf-Daten für die Share-Grafik.');
      }

      const firstPoint = points[0];
      const lastPoint = points[points.length - 1];
      const weightLoss = firstPoint.weight - lastPoint.weight;
      const periodStart = firstPoint.ts;
      const periodEnd = lastPoint.ts;

      const goals = (Array.isArray(data.goals) ? data.goals : [])
        .map((goal) => {
          const achievedAt = String(goal?.achievedAt || '');
          const ts = parseChartDateToTimestamp(achievedAt);
          if (!Number.isFinite(ts)) return null;
          if (ts < periodStart || ts > periodEnd) return null;
          return {
            goalText: String(goal?.goalText || '').trim(),
            achievedAt,
            ts
          };
        })
        .filter((goal) => goal && goal.goalText)
        .sort((a, b) => b.ts - a.ts);

      return {
        points,
        goals,
        periodLabel: String(state.window || 'Alles'),
        periodStartText: formatDateTimeText(firstPoint.date),
        periodEndText: formatDateTimeText(lastPoint.date),
        currentWeight: lastPoint.weight,
        weightLoss
      };
    }

    function renderSharePictureCanvas(snapshot) {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas-Kontext nicht verfügbar.');
      }

      const { points, goals, periodLabel, periodStartText, periodEndText, currentWeight, weightLoss } = snapshot;

      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, '#0b1224');
      bg.addColorStop(1, '#111827');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(96, 165, 250, 0.2)';
      ctx.beginPath();
      ctx.arc(1010, -60, 280, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 44px Arial';
      ctx.fillText('FITTRACK Share', 48, 72);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 24px Arial';
      ctx.fillText(`Zeitraum: ${periodLabel}  |  ${periodStartText} - ${periodEndText}`, 48, 108);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.32)';
      ctx.lineWidth = 1;
      ctx.fillRect(40, 140, 1120, 450);
      ctx.strokeRect(40, 140, 1120, 450);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 24px Arial';
      ctx.fillText('Aktuelles Gewicht', 68, 188);

      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 56px Arial';
      ctx.fillText(`${currentWeight.toFixed(1).replace('.', ',')} kg`, 68, 252);

      const lossPositive = weightLoss >= 0;
      ctx.fillStyle = lossPositive ? '#22c55e' : '#ef4444';
      ctx.font = '700 30px Arial';
      const lossText = `${lossPositive ? '-' : '+'}${Math.abs(weightLoss).toFixed(1).replace('.', ',')} kg im Zeitraum`;
      ctx.fillText(lossText, 68, 298);

      const chartX = 68;
      const chartY = 330;
      const chartW = 730;
      const chartH = 230;
      const chartTop = chartY;
      const chartBottom = chartY + chartH;
      const chartLeft = chartX;
      const chartRight = chartX + chartW;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.74)';
      ctx.fillRect(chartX, chartY, chartW, chartH);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
      ctx.strokeRect(chartX, chartY, chartW, chartH);

      const minWeight = Math.min(...points.map((point) => point.weight));
      const maxWeight = Math.max(...points.map((point) => point.weight));
      const range = Math.max(maxWeight - minWeight, 0.5);
      const paddedMin = minWeight - range * 0.08;
      const paddedMax = maxWeight + range * 0.08;
      const xScale = createTimeScale(points.map((point) => point.date), chartLeft, chartW);
      const yAt = (weight) => chartBottom - ((weight - paddedMin) / (paddedMax - paddedMin || 1)) * chartH;

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.28)';
      ctx.setLineDash([4, 6]);
      const tickCount = 5;
      for (let i = 0; i < tickCount; i += 1) {
        const y = chartTop + (i * chartH) / 4;
        ctx.beginPath();
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartRight, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(203, 213, 225, 0.72)';
      ctx.font = '500 14px Arial';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < tickCount; i += 1) {
        const y = chartTop + (i * chartH) / (tickCount - 1);
        const value = paddedMax - ((paddedMax - paddedMin) * i) / (tickCount - 1);
        const label = `${value.toFixed(1).replace('.', ',')} kg`;
        ctx.fillText(label, chartLeft + 10, y);
      }
      ctx.textBaseline = 'alphabetic';

      ctx.fillStyle = 'rgba(148, 163, 184, 0.9)';
      ctx.font = '500 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(formatChartDateLabel(points[0].date), chartLeft, chartBottom + 22);
      ctx.textAlign = 'right';
      ctx.fillText(formatChartDateLabel(points[points.length - 1].date), chartRight, chartBottom + 22);
      ctx.textAlign = 'left';

      const lineGradient = ctx.createLinearGradient(chartLeft, chartTop, chartRight, chartBottom);
      lineGradient.addColorStop(0, '#60a5fa');
      lineGradient.addColorStop(1, '#22c55e');
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.beginPath();
      points.forEach((point, index) => {
        const x = xScale.getXAtIndex(index);
        const y = yAt(point.weight);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      points.forEach((point, index) => {
        const x = xScale.getXAtIndex(index);
        const y = yAt(point.weight);
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.arc(x, y, 3.2, 0, Math.PI * 2);
        ctx.fill();
      });

      const goalsX = 840;
      const goalsY = 182;
      const goalsRight = 1130;
      const goalsBottom = 560;
      const goalsTextWidth = goalsRight - (goalsX + 18);
      ctx.fillStyle = '#f8fafc';
      ctx.font = '700 28px Arial';
      ctx.fillText('Erreichte Ziele', goalsX, goalsY);

      if (goals.length === 0) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 22px Arial';
        const emptyText = trimTextToWidth(ctx, 'Keine Ziele im gewählten Zeitraum erreicht.', goalsTextWidth);
        ctx.fillText(emptyText, goalsX, goalsY + 46);
      } else {
        const itemHeight = 52;
        const firstItemY = goalsY + 42;
        const availableRows = Math.max(0, Math.floor((goalsBottom - firstItemY) / itemHeight));
        const visibleGoals = goals.slice(0, availableRows);
        let y = goalsY + 42;
        visibleGoals.forEach((goal) => {
          ctx.fillStyle = '#22c55e';
          ctx.beginPath();
          ctx.arc(goalsX + 6, y - 8, 4.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#f8fafc';
          ctx.font = '600 20px Arial';
          const name = trimTextToWidth(ctx, goal.goalText, goalsTextWidth);
          ctx.fillText(name, goalsX + 18, y);

          ctx.fillStyle = '#94a3b8';
          ctx.font = '500 18px Arial';
          ctx.fillText(formatDateTimeText(goal.achievedAt), goalsX + 18, y + 22);
          y += 52;
        });

        if (goals.length > visibleGoals.length && y + 10 <= goalsBottom) {
          ctx.fillStyle = '#94a3b8';
          ctx.font = '500 18px Arial';
          ctx.fillText(`+${goals.length - visibleGoals.length} weitere`, goalsX + 18, y + 10);
        }
      }

      ctx.fillStyle = '#64748b';
      ctx.font = '500 16px Arial';
      ctx.fillText(`Generiert am ${formatDateTimeText(new Date().toISOString())}`, 48, 610);

      return canvas;
    }

    async function canvasToBlob(canvas) {
      return await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Bild konnte nicht erzeugt werden.'));
            return;
          }
          resolve(blob);
        }, 'image/png');
      });
    }

    function downloadBlob(blob, fileName) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    async function saveSharePictureToServer(fileName, imageData) {
      if (IS_READ_ONLY_VIEW) return;

      const response = await fetch(buildDataApiUrl(), jsonPostOptions({
        action: 'save_share_picture',
        filename: fileName,
        imageData
      }));
      const rawText = await response.text();
      let result = null;
      try {
        result = JSON.parse(rawText);
      } catch (error) {
        const compact = rawText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        throw new Error(compact || `Ungueltige Serverantwort (HTTP ${response.status})`);
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }
    }

    async function handleSharePictureClick() {
      const shareButton = document.getElementById('sharePictureBtn');
      if (shareButton) {
        shareButton.disabled = true;
        shareButton.textContent = 'Erzeuge Bild...';
      }

      try {
        const snapshot = getSharePictureSnapshot();
        const fileName = buildSharePictureFilename();
        const canvas = renderSharePictureCanvas(snapshot);
        const blob = await canvasToBlob(canvas);
        downloadBlob(blob, fileName);

        const imageData = canvas.toDataURL('image/png');
        try {
          await saveSharePictureToServer(fileName, imageData);
        } catch (saveError) {
          console.warn('Share image could not be saved on server:', saveError);
          if (!IS_READ_ONLY_VIEW) {
            window.alert(`Bild wurde heruntergeladen, aber nicht auf dem Server gespeichert: ${saveError.message}`);
          }
        }
      } catch (error) {
        window.alert(`Share-Picture fehlgeschlagen: ${error.message}`);
      } finally {
        if (shareButton) {
          shareButton.disabled = false;
          shareButton.textContent = 'Share-Picture';
        }
      }
    }

    function hasSameDayMultipleMeasurements(dateValues) {
      const counts = new Map();

      for (const value of dateValues) {
        const ts = parseChartDateToTimestamp(value);
        if (!Number.isFinite(ts)) continue;
        const date = new Date(ts);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const next = (counts.get(key) || 0) + 1;
        if (next > 1) return true;
        counts.set(key, next);
      }

      return false;
    }

    function createTimeScale(dateValues, startX, chartWidth) {
      const parsed = dateValues.map((value) => parseChartDateToTimestamp(value));
      const firstValid = parsed.find((ts) => Number.isFinite(ts));

      if (!Number.isFinite(firstValid)) {
        return {
          timestamps: parsed,
          getXAtIndex(index) {
            return startX + (index * chartWidth) / Math.max(dateValues.length - 1, 1);
          }
        };
      }

      const timestamps = [];
      let cursor = firstValid;
      for (let index = 0; index < parsed.length; index += 1) {
        const ts = parsed[index];
        if (Number.isFinite(ts)) {
          cursor = ts;
          timestamps.push(ts);
        } else {
          cursor += 1;
          timestamps.push(cursor);
        }
      }

      const minTs = Math.min(...timestamps);
      const maxTs = Math.max(...timestamps);
      const span = Math.max(maxTs - minTs, 1);

      return {
        timestamps,
        getXAtIndex(index) {
          const ts = timestamps[Math.max(0, Math.min(index, timestamps.length - 1))];
          return startX + ((ts - minTs) / span) * chartWidth;
        }
      };
    }

    function getGoalUnit(goal) {
      return String(goal?.unit || '').trim();
    }

    function getLoadLevelLabel(level) {
      const numericLevel = Number(level);
      if (numericLevel <= 1) return 'Belastung 1';
      if (numericLevel === 2) return 'Belastung 2';
      if (numericLevel === 3) return 'Belastung 3';
      if (numericLevel === 4) return 'Belastung 4';
      return 'Belastung 5';
    }

    function getPainLevelLabel(level) {
      const numericLevel = Number(level);
      if (numericLevel <= 1) return 'Schmerz 1';
      if (numericLevel === 2) return 'Schmerz 2';
      if (numericLevel === 3) return 'Schmerz 3';
      if (numericLevel === 4) return 'Schmerz 4';
      return 'Schmerz 5';
    }

    function getSeverityTone(level) {
      const numericLevel = Number(level);
      if (numericLevel <= 2) return 'level-low';
      if (numericLevel === 3) return 'level-mid';
      return 'level-high';
    }

    function getLoadLevelDisplay(level) {
      const numericLevel = Number(level);
      const emoji = numericLevel <= 1 ? '😀' : numericLevel === 2 ? '🙂' : numericLevel === 3 ? '😐' : numericLevel === 4 ? '😓' : '😵';
      return `${emoji} ${getLoadLevelLabel(level)}`;
    }

    function getPainLevelDisplay(level) {
      const numericLevel = Number(level);
      const emoji = numericLevel <= 1 ? '😀' : numericLevel === 2 ? '🙂' : numericLevel === 3 ? '😐' : numericLevel === 4 ? '😣' : '😖';
      return `${emoji} ${getPainLevelLabel(level)}`;
    }

    function getGoalHistoryStatus(goal) {
      const achieved = !!goal?.achievedAt;
      const rewarded = String(goal?.rewardedWith || '').trim().length > 0 || !!goal?.rewardedAt;
      if (achieved && rewarded) return 'status-achieved-rewarded';
      if (achieved) return 'status-achieved-open';
      return 'status-pending';
    }

    function getWeekdayOrder() {
      return ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
    }

    function getTrainingPlanEntries() {
      const rawPlan = Array.isArray(data.trainingPlan) ? data.trainingPlan : [];
      const weekdayOrder = getWeekdayOrder();

      return rawPlan
        .map((entry, index) => ({
          id: Number(entry.id ?? 0),
          day: String(entry.day || entry.weekday_name || ''),
          focus: String(entry.focus || entry.focus_text || ''),
          duration: String(entry.duration || entry.duration_text || ''),
          note: String(entry.note || entry.note_text || ''),
          validFrom: String(entry.validFrom || entry.valid_from || ''),
          deactivatedAt: entry.deactivatedAt || entry.deactivated_at || null,
          createdAt: String(entry.createdAt || entry.created_at || ''),
          isDefault: Boolean(entry.isDefault),
          sortIndex: index
        }))
        .filter((entry) => entry.day && entry.focus && entry.duration && entry.note)
        .sort((a, b) => {
          const aIndex = weekdayOrder.indexOf(a.day);
          const bIndex = weekdayOrder.indexOf(b.day);
          if (aIndex !== bIndex) return aIndex - bIndex;
          return a.sortIndex - b.sortIndex;
        });
    }

    function buildGoalCurrentValueMaps() {
      const latestEntries = Array.isArray(data.latestMeasurementEntries) ? data.latestMeasurementEntries : [];
      const measurementHistory = Array.isArray(data.measurementHistory) ? data.measurementHistory : [];
      const measurements = Array.isArray(data.measurements) ? data.measurements : [];

      const byTypeId = new Map();
      const byTypeName = new Map();

      latestEntries.forEach((entry) => {
        const typeId = Number(entry.typeId);
        const value = Number(entry.value);
        const typeNameKey = normalizeTypeName(String(entry.typeName || ''));
        if (Number.isFinite(typeId) && Number.isFinite(value)) {
          byTypeId.set(typeId, value);
        }
        if (typeNameKey && Number.isFinite(value)) {
          byTypeName.set(typeNameKey, value);
        }
      });

      measurementHistory.forEach((entry) => {
        const typeId = Number(entry.typeId);
        const typeNameKey = normalizeTypeName(String(entry.typeName || ''));
        const values = Array.isArray(entry.values) ? entry.values : [];
        if (values.length === 0) return;
        const lastValue = Number(values[values.length - 1]);
        if (!Number.isFinite(lastValue)) return;

        if (Number.isFinite(typeId) && !byTypeId.has(typeId)) {
          byTypeId.set(typeId, lastValue);
        }
        if (typeNameKey && !byTypeName.has(typeNameKey)) {
          byTypeName.set(typeNameKey, lastValue);
        }
      });

      // Split-measurement fallback: weights are often saved in a separate entry.
      const latestWeight = Array.isArray(data.weights) && data.weights.length > 0
        ? Number(data.weights[data.weights.length - 1])
        : null;
      if (Number.isFinite(latestWeight)) {
        if (!byTypeName.has('gewicht')) byTypeName.set('gewicht', latestWeight);
        if (!byTypeName.has('weight')) byTypeName.set('weight', latestWeight);
      }

      measurements.forEach((entry) => {
        const typeNameKey = normalizeTypeName(String(entry.title || ''));
        const parsed = Number(String(entry.value || '0').replace(',', '.').replace(/[^0-9.-]/g, ''));
        if (typeNameKey && Number.isFinite(parsed) && !byTypeName.has(typeNameKey)) {
          byTypeName.set(typeNameKey, parsed);
        }
      });

      return { byTypeId, byTypeName };
    }

    function getGoalEtaText(goal) {
      const targetValue = Number(goal?.targetValue);
      const typeId = Number(goal?.typeId);
      const typeNameKey = normalizeTypeName(String(goal?.typeName || ''));

      if (!Number.isFinite(targetValue) || targetValue <= 0) {
        return 'Nicht berechenbar';
      }

      const historyEntries = Array.isArray(data.measurementHistory) ? data.measurementHistory : [];
      const historyMatch = historyEntries.find((entry) => Number(entry?.typeId) === typeId);

      let series = [];
      if (historyMatch && Array.isArray(historyMatch.values) && Array.isArray(historyMatch.dates)) {
        const maxLen = Math.min(historyMatch.values.length, historyMatch.dates.length);
        for (let index = 0; index < maxLen; index += 1) {
          const value = Number(historyMatch.values[index]);
          const date = new Date(String(historyMatch.dates[index] || ''));
          if (Number.isFinite(value) && Number.isFinite(date.getTime())) {
            series.push({ value, date });
          }
        }
      }

      // Gewicht wird in manchen Datenmodellen getrennt gehalten.
      if (series.length < 2 && (typeNameKey === 'gewicht' || typeNameKey === 'weight')) {
        const rawWeights = Array.isArray(data.weights) ? data.weights : [];
        const rawDates = Array.isArray(data.dates) ? data.dates : [];
        series = [];
        const maxLen = Math.min(rawWeights.length, rawDates.length);
        for (let index = 0; index < maxLen; index += 1) {
          const value = Number(rawWeights[index]);
          const date = new Date(String(rawDates[index] || ''));
          if (Number.isFinite(value) && Number.isFinite(date.getTime())) {
            series.push({ value, date });
          }
        }
      }

      if (series.length < 2) {
        return 'Nicht genug Daten für Prognose';
      }

      const lastPoint = series[series.length - 1];
      const remainingKg = lastPoint.value - targetValue;
      if (remainingKg <= 0) {
        return 'Ziel bereits erreicht';
      }

      const windowStart = new Date(lastPoint.date.getTime() - 21 * 86400000);
      let last21 = series.filter((point) => point.date.getTime() >= windowStart.getTime());
      if (last21.length < 2) {
        last21 = series.slice(-Math.min(21, series.length));
      }

      if (last21.length < 2) {
        return 'Nicht genug Daten für Prognose';
      }

      const first21 = last21[0];
      const last21Point = last21[last21.length - 1];
      const daysRaw = Math.round((last21Point.date.getTime() - first21.date.getTime()) / 86400000);
      const days = Math.max(1, daysRaw);
      const dailyLoss = (first21.value - last21Point.value) / days;

      if (!(dailyLoss > 0)) {
        return 'Aktuell keine Abnahme erkennbar';
      }

      const remainingDays = Math.ceil(remainingKg / dailyLoss);
      const etaDate = new Date(last21Point.date.getTime() + remainingDays * 86400000);
      return `${formatGermanDate(etaDate)} [${remainingDays} ${remainingDays === 1 ? 'Tag' : 'Tage'}]`;
    }

    function getDefaultMeasurementEntries() {
      const latestEntries = Array.isArray(data.latestMeasurementEntries) ? data.latestMeasurementEntries : [];
      if (latestEntries.length > 0) {
        return latestEntries.map((entry, index) => ({
          uid: `${Date.now()}-${index}`,
          typeId: Number(entry.typeId || 0),
          value: Number(entry.value || 0),
          typeName: String(entry.typeName || ''),
          unit: String(entry.unit || '')
        }));
      }

      const types = getMeasurementTypes();
      const currentWeight = data.weights?.length ? data.weights[data.weights.length - 1] : 0;
      const mapByName = new Map(types.map(t => [normalizeTypeName(t.name), t]));
      const fallbackEntries = [];

      const weightType = mapByName.get('gewicht') || mapByName.get('weight') || types[0];
      if (weightType) {
        fallbackEntries.push({ uid: `${Date.now()}-w`, typeId: weightType.id, value: Number(currentWeight || 0), typeName: weightType.name, unit: weightType.unit });
      }

      (Array.isArray(data.measurements) ? data.measurements : []).forEach((measurement, index) => {
        const type = mapByName.get(normalizeTypeName(measurement.title)) || types[index + 1] || null;
        const numericValue = Number(String(measurement.value || '0').replace(',', '.').replace(/[^0-9.-]/g, ''));
        if (type) {
          fallbackEntries.push({
            uid: `${Date.now()}-m-${index}`,
            typeId: type.id,
            value: Number.isFinite(numericValue) ? numericValue : 0,
            typeName: type.name,
            unit: type.unit
          });
        }
      });

      return fallbackEntries;
    }

    function getLatestMeasurementValueByTypeId(typeId) {
      const requestedTypeId = Number(typeId);
      if (!Number.isFinite(requestedTypeId) || requestedTypeId <= 0) return null;

      const latestEntries = Array.isArray(data.latestMeasurementEntries) ? data.latestMeasurementEntries : [];
      const latestMatch = latestEntries.find((entry) => Number(entry?.typeId) === requestedTypeId);
      if (latestMatch) {
        const latestValue = Number(latestMatch.value);
        if (Number.isFinite(latestValue)) return latestValue;
      }

      const historyEntries = Array.isArray(data.measurementHistory) ? data.measurementHistory : [];
      const historyMatch = historyEntries.find((entry) => Number(entry?.typeId) === requestedTypeId);
      if (historyMatch && Array.isArray(historyMatch.values) && historyMatch.values.length > 0) {
        const value = Number(historyMatch.values[historyMatch.values.length - 1]);
        if (Number.isFinite(value)) return value;
      }

      return null;
    }

    function getTodayIsoDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function getCurrentTimeHHMM() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    function parseDurationMinutes(value, explicitMinutes = 0) {
      const direct = Number(explicitMinutes || 0);
      if (Number.isFinite(direct) && direct > 0) return Math.round(direct);
      const raw = String(value || '').trim().toLowerCase();
      const clock = raw.match(/^(\d{1,2}):(\d{2})/);
      if (clock) return Number(clock[1]) * 60 + Number(clock[2]);
      const hours = raw.match(/(\d+)\s*h/);
      const minutes = raw.match(/(\d+)\s*min/);
      if (hours || minutes) return Number(hours?.[1] || 0) * 60 + Number(minutes?.[1] || 0);
      const firstNumber = raw.match(/\d+/);
      return firstNumber ? Number(firstNumber[0]) : 0;
    }

    function formatDurationClock(minutes) {
      const total = Math.max(0, Math.min(1439, Math.round(Number(minutes || 0))));
      return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
    }

    function openTrainingForm(prefill = {}) {
      if (IS_READ_ONLY_VIEW) return;

      state.trainingForm = {
        date: prefill.date || getTodayIsoDate(),
        trainingText: prefill.trainingText || '',
        durationMinutes: parseDurationMinutes(prefill.duration, prefill.durationMinutes),
        limitation: prefill.limitation || '',
        loadLevel: prefill.loadLevel || '3',
        painLevel: prefill.painLevel || '1',
        sourceDay: prefill.sourceDay || '',
        sourcePlanEntryId: Number(prefill.sourcePlanEntryId || 0)
      };
      state.showTrainingForm = true;
      renderAll();
    }

    function closeTrainingForm() {
      state.showTrainingForm = false;
      state.trainingForm = null;
      renderAll();
    }

    function openTrainingPlanEditor() {
      if (IS_READ_ONLY_VIEW) return;

      const entries = getTrainingPlanEntries();
      const validFrom = entries.find((entry) => String(entry.validFrom || '').trim())?.validFrom || `${getTodayIsoDate()}T00:00`;
      state.trainingPlanForm = {
        validFrom: String(validFrom).replace(' ', 'T').slice(0, 16),
        entries: entries.map((entry, index) => ({
          uid: `${Date.now()}-plan-${index}`,
          id: Number(entry.id || 0),
          day: entry.day,
          focus: entry.focus,
          duration: entry.duration,
          note: entry.note
        }))
      };
      state.showTrainingPlanEditor = true;
      renderAll();
    }

    function closeTrainingPlanEditor() {
      state.showTrainingPlanEditor = false;
      state.trainingPlanForm = null;
      renderAll();
    }

    function openMeasurementForm(prefill = {}) {
      if (IS_READ_ONLY_VIEW) return;

      const defaults = getDefaultMeasurementEntries();
      state.measurementForm = {
        date: prefill.date || getTodayIsoDate(),
        time: prefill.time || getCurrentTimeHHMM(),
        entries: Array.isArray(prefill.entries) && prefill.entries.length > 0 ? prefill.entries : defaults
      };
      state.showMeasurementForm = true;
      renderAll();
    }

    function closeMeasurementForm() {
      state.showMeasurementForm = false;
      state.measurementForm = null;
      renderAll();
    }

    function openMeasurementDetail(item) {
      if (!item || !Array.isArray(item.series) || item.series.length === 0) return;
      state.measurementDetailItem = {
        title: String(item.title || 'Messwert'),
        value: String(item.value || ''),
        note: String(item.note || ''),
        unit: String(item.unit || 'cm'),
        series: Array.isArray(item.series) ? item.series.map((value) => Number(value)) : [],
        rates: Array.isArray(item.rates) ? item.rates.map((value) => Number(value)) : [],
        seriesDates: Array.isArray(item.seriesDates) ? item.seriesDates.map((value) => String(value || '')) : []
      };
      state.showMeasurementDetail = true;
      renderAll();
    }

    function closeMeasurementDetail() {
      state.showMeasurementDetail = false;
      state.measurementDetailItem = null;
      renderAll();
    }

    function applyTheme(theme) {
      const selectedTheme = theme === 'light' ? 'light' : 'dark';
      document.body.dataset.theme = selectedTheme;
      window.localStorage.setItem('diettool-theme', selectedTheme);
    }

    const savedTheme = window.localStorage.getItem('diettool-theme') || 'dark';
    applyTheme(savedTheme);

    function getWindowedData() {
      const windowDays = {
        '1 Woche': 7,
        '2 Wochen': 14,
        '3 Wochen': 21,
        '1 Monat': 30,
        '3 Monate': 90,
        '1 Jahr': 365,
        'Alles': null
      };

      const allWeights = Array.isArray(data.weights) ? data.weights : [];
      const allDates = Array.isArray(data.dates) ? data.dates : [];
      const maxLen = Math.min(allWeights.length, allDates.length);
      const points = [];

      for (let index = 0; index < maxLen; index += 1) {
        const weight = Number(allWeights[index]);
        const dateRaw = String(allDates[index] || '');
        const ts = parseChartDateToTimestamp(dateRaw);
        if (!Number.isFinite(weight) || !Number.isFinite(ts)) continue;
        points.push({ weight, date: dateRaw, ts });
      }

      if (points.length === 0) {
        return {
          weights: allWeights,
          dates: allDates
        };
      }

      const selectedDays = windowDays[state.window];
      if (!Number.isFinite(selectedDays) || selectedDays === null) {
        return {
          weights: points.map((point) => point.weight),
          dates: points.map((point) => point.date)
        };
      }

      const latestTs = points[points.length - 1].ts;
      const minTs = latestTs - selectedDays * 86400000;
      const filtered = points.filter((point) => point.ts >= minTs);

      const safePoints = filtered.length > 0 ? filtered : [points[points.length - 1]];
      return {
        weights: safePoints.map((point) => point.weight),
        dates: safePoints.map((point) => point.date)
      };
    }

    function movingAverage(values, period) {
      return values.map((_, index) => {
        const start = Math.max(0, index - period + 1);
        const slice = values.slice(start, index + 1);
        const sum = slice.reduce((total, value) => total + value, 0);
        return Number((sum / slice.length).toFixed(2));
      });
    }

    function calculateTrend(values) {
      const n = values.length;
      const xMean = (n - 1) / 2;
      const yMean = values.reduce((sum, value) => sum + value, 0) / n;
      const numerator = values.reduce((sum, value, index) => sum + ((index - xMean) * (value - yMean)), 0);
      const denominator = values.reduce((sum, _, index) => sum + ((index - xMean) ** 2), 0);
      const slope = denominator === 0 ? 0 : numerator / denominator;
      const intercept = yMean - slope * xMean;

      return values.map((_, index) => Number((slope * index + intercept).toFixed(2)));
    }

    function getNiceAxisBounds(min, max, targetTicks = 5) {
      const range = max - min || 1;
      const roughStep = range / Math.max(targetTicks - 1, 1);
      const magnitude = 10 ** Math.floor(Math.log10(Math.max(roughStep, 1e-9)));
      const normalized = roughStep / magnitude;
      let niceNormalized = 1;

      if (normalized > 2) niceNormalized = 5;
      else if (normalized > 1) niceNormalized = 2;
      else if (normalized > 0.5) niceNormalized = 1;
      else niceNormalized = 0.5;

      const step = niceNormalized * magnitude;
      const start = Math.floor(min / step) * step;
      const end = Math.ceil(max / step) * step;
      const ticks = [];

      for (let value = start; value <= end + step / 2; value += step) {
        ticks.push(Number(value.toFixed(4)));
      }

      return { start, end, step, ticks };
    }

    function getPaddedNiceAxisBounds(min, max, targetTicks = 5, paddingFraction = 0.08) {
      const safeMin = Number.isFinite(min) ? min : 0;
      const safeMax = Number.isFinite(max) ? max : safeMin + 1;
      const range = Math.max(Math.abs(safeMax - safeMin), 1e-6);
      const padding = range * Math.max(paddingFraction, 0);
      return getNiceAxisBounds(safeMin - padding, safeMax + padding, targetTicks);
    }

    function getSafeLabelPosition(pointX, pointY, chartBounds, options = {}) {
      const textWidth = Number(options.textWidth) || 72;
      const textHeight = Number(options.textHeight) || 12;
      const offsetX = Number(options.offsetX) || 8;
      const offsetY = Number(options.offsetY) || 10;
      const preferLeft = Boolean(options.preferLeft);
      const preferAbove = Boolean(options.preferAbove);

      const minX = Number(chartBounds.minX) || 0;
      const maxX = Number(chartBounds.maxX) || 0;
      const minY = Number(chartBounds.minY) || 0;
      const maxY = Number(chartBounds.maxY) || 0;

      const leftX = pointX - offsetX;
      const rightX = pointX + offsetX;
      const leftFits = leftX - textWidth >= minX;
      const rightFits = rightX + textWidth <= maxX;

      let anchor = 'start';
      let x = rightX;
      if (preferLeft && leftFits) {
        anchor = 'end';
        x = leftX;
      } else if (!preferLeft && rightFits) {
        anchor = 'start';
        x = rightX;
      } else if (leftFits) {
        anchor = 'end';
        x = leftX;
      } else {
        anchor = 'start';
        x = rightX;
      }

      const upY = pointY - offsetY;
      const downY = pointY + textHeight;
      const upFits = upY - textHeight >= minY;
      const downFits = downY <= maxY;

      let y = downY;
      if (preferAbove && upFits) {
        y = upY;
      } else if (!preferAbove && downFits) {
        y = downY;
      } else if (upFits) {
        y = upY;
      }

      return { x, y, anchor };
    }

    function getChartLabelBackgroundColors() {
      const isDarkTheme = document.body.dataset.theme === 'dark';
      if (isDarkTheme) {
        return {
          fill: 'rgba(15, 23, 42, 0.62)',
          stroke: 'rgba(148, 163, 184, 0.45)'
        };
      }

      return {
        fill: 'rgba(255, 255, 255, 0.74)',
        stroke: 'rgba(100, 116, 139, 0.55)'
      };
    }

    function renderSvgValueLabel(text, position, options = {}) {
      const textWidth = Number(options.textWidth) || 72;
      const textHeight = Number(options.textHeight) || 12;
      const padX = Number(options.padX) || 4;
      const padY = Number(options.padY) || 2;
      const cornerRadius = Number(options.cornerRadius) || 4;
      const fontSize = Number(options.fontSize) || 11;
      const textColor = String(options.textColor || '#0f172a');
      const colors = getChartLabelBackgroundColors();

      const anchor = position.anchor === 'end' ? 'end' : 'start';
      const x = Number(position.x) || 0;
      const y = Number(position.y) || 0;
      const rectX = anchor === 'end' ? x - textWidth - padX : x - padX;
      const rectY = y - textHeight - padY;
      const rectWidth = textWidth + padX * 2;
      const rectHeight = textHeight + padY * 2;

      return `
        <g>
          <rect x="${rectX}" y="${rectY}" width="${rectWidth}" height="${rectHeight}" rx="${cornerRadius}" fill="${colors.fill}" stroke="${colors.stroke}" stroke-width="0.8" />
          <text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${fontSize}" fill="${textColor}" font-weight="700">${text}</text>
        </g>
      `;
    }

    function formatTickValue(value) {
      const abs = Math.abs(value);
      if (abs >= 10) return value.toFixed(0);
      if (abs >= 1) return value.toFixed(1);
      return value.toFixed(2);
    }

    function getBmiCategory(bmi) {
      if (bmi < 18.5) return 'Untergewicht';
      if (bmi < 25) return 'Normalgewicht';
      if (bmi < 30) return 'Übergewicht';
      if (bmi < 35) return 'Adipositas Grad I';
      if (bmi < 40) return 'Adipositas Grad II';
      return 'Adipositas Grad III';
    }

    function renderProfileEditorMarkup(resolvedHeightM) {
      if (IS_READ_ONLY_VIEW) return '';
      return `
        <button class="profile-edit-toggle" id="profileToggleBtn" type="button">Änderungen eintragen</button>
        <div class="profile-editor" id="profileEditorPanel" style="display:${state.showProfileEditor ? 'block' : 'none'};">
          <h3>Zielwerte</h3>
          <form id="profileForm">
            <div class="profile-editor-grid">
              <div class="field"><label for="goalWeightInput">Zielgewicht (kg)</label><input id="goalWeightInput" name="goalWeight" type="number" min="1" step="0.1" value="${Number.isFinite(Number(data.goalWeight)) && Number(data.goalWeight) > 0 ? Number(data.goalWeight).toFixed(1) : ''}" /></div>
              <div class="field"><label for="heightMInput">Körpergröße (m)</label><input id="heightMInput" name="heightM" type="number" min="1" max="2.6" step="0.01" value="${resolvedHeightM.toFixed(2)}" required /></div>
            </div>
            <div class="profile-editor-actions"><button class="btn-primary" type="submit">Speichern</button>${state.profileNotice ? `<span class="profile-notice">${escapeHtml(state.profileNotice)}</span>` : ''}</div>
          </form>
        </div>`;
    }

    function bindProfileEditor(block) {
      block.querySelector('#profileToggleBtn')?.addEventListener('click', () => {
        state.showProfileEditor = !state.showProfileEditor;
        renderAll();
      });
      const profileForm = block.querySelector('#profileForm');
      profileForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(profileForm);
        try {
          const response = await fetch(buildDataApiUrl(), jsonPostOptions({
            action: 'save_profile',
            goalWeight: String(formData.get('goalWeight') || '').trim(),
            heightM: String(formData.get('heightM') || '').trim()
          }));
          const result = await response.json();
          if (!response.ok || !result.ok) throw new Error(result.error || `HTTP ${response.status}`);
          state.profileNotice = 'Zielwerte gespeichert.';
          state.showProfileEditor = false;
          await loadDashboardData();
        } catch (error) {
          window.alert(`Speichern fehlgeschlagen: ${error.message}`);
        }
      });
    }

    function renderOverview() {
      const block = document.createElement('section');
      block.className = 'block';

      if (!Array.isArray(data.weights) || data.weights.length === 0) {
        const rawHeight = Number(data.heightM ?? data.heightCm);
        const resolvedHeightM = Number.isFinite(rawHeight) && rawHeight > 0 ? (rawHeight > 3 ? rawHeight / 100 : rawHeight) : 1.75;
        block.innerHTML = `<h2>Übersicht</h2><div class="small">Noch keine Gewichtsmessungen vorhanden.</div>${renderProfileEditorMarkup(resolvedHeightM)}`;
        bindProfileEditor(block);
        return block;
      }

      const visible = getWindowedData();
      const allWeights = data.weights;
      const allDates = Array.isArray(data.dates) ? data.dates : [];
      const startWeight = Number(allWeights[0]);
      const currentWeight = Number(allWeights[allWeights.length - 1]);
      const firstWeightInWindow = Number(visible.weights[0]);
      const lastWeightInWindow = Number(visible.weights[visible.weights.length - 1]);
      const deltaInWindow = lastWeightInWindow - firstWeightInWindow;

      const firstDateInWindow = new Date(String(visible.dates[0] || allDates[0] || ''));
      const lastDateInWindow = new Date(String(visible.dates[visible.dates.length - 1] || allDates[allDates.length - 1] || ''));
      const rawDaysDiff = Math.round((lastDateInWindow.getTime() - firstDateInWindow.getTime()) / 86400000);
      const daysDiff = Number.isFinite(rawDaysDiff) && rawDaysDiff > 0 ? rawDaysDiff : Math.max(1, visible.weights.length - 1);
      const weeklyLossRate = state.window === '1 Woche'
        ? (firstWeightInWindow - lastWeightInWindow)
        : ((firstWeightInWindow - lastWeightInWindow) / daysDiff) * 7;

      const firstDateOverall = new Date(String(allDates[0] || ''));
      const lastDateOverall = new Date(String(allDates[allDates.length - 1] || ''));
      const overallDaysRaw = Math.round((lastDateOverall.getTime() - firstDateOverall.getTime()) / 86400000);
      const overallDays = Number.isFinite(overallDaysRaw) && overallDaysRaw >= 0 ? overallDaysRaw : 0;
      const overallWeeks = Math.floor(overallDays / 7);
      const overallRemainingDays = overallDays % 7;

      let overallDurationParts = [];
      if (overallWeeks > 0) {
        overallDurationParts.push(`${overallWeeks} ${overallWeeks === 1 ? 'Woche' : 'Wochen'}`);
      }
      if (overallRemainingDays > 0 || overallWeeks === 0) {
        overallDurationParts.push(`${overallRemainingDays} ${overallRemainingDays === 1 ? 'Tag' : 'Tage'}`);
      }

      const overallDurationText = `${overallDurationParts.join(' ')} (${overallDays} Tage)`;

      const rawHeight = Number(data.heightM ?? data.heightCm);
      const resolvedHeightM = Number.isFinite(rawHeight) && rawHeight > 0
        ? (rawHeight > 3 ? rawHeight / 100 : rawHeight)
        : 1.75;
      const bmi = currentWeight / (resolvedHeightM ** 2);
      const bmiCategory = getBmiCategory(bmi);
      const maintenanceCalories = Math.round(22 * currentWeight);
      const minimumCalories = Math.max(1200, maintenanceCalories - 550);

      const goalWeightValue = Number.isFinite(Number(data.goalWeight)) && Number(data.goalWeight) > 0
        ? `${Number(data.goalWeight).toFixed(1)} kg`
        : 'Nicht gesetzt';

      const goalWeight = Number(data.goalWeight);
      let progressPercentText = 'Nicht berechenbar';
      if (Number.isFinite(goalWeight) && goalWeight > 0 && Number.isFinite(startWeight) && startWeight > 0 && Number.isFinite(currentWeight)) {
        const fullDistance = startWeight - goalWeight;
        if (Math.abs(fullDistance) >= 0.001) {
          const doneDistance = startWeight - currentWeight;
          const progressRaw = (doneDistance / fullDistance) * 100;
          const progressClamped = Math.max(0, Math.min(100, progressRaw));
          progressPercentText = `${progressClamped.toFixed(1).replace('.', ',')} %`;

          if (state.window !== 'Alles') {
            const windowLoss = firstWeightInWindow - lastWeightInWindow;
            const windowProgressPercent = (windowLoss / fullDistance) * 100;
            progressPercentText += ` (im Zeitraum ${windowProgressPercent.toFixed(2).replace('.', ',')}%)`;
          }
        }
      }

      const weeklyRateText = weeklyLossRate >= 0
        ? `${Math.abs(weeklyLossRate).toFixed(2).replace('.', ',')} kg Abnahme/Woche`
        : `${Math.abs(weeklyLossRate).toFixed(2).replace('.', ',')} kg Zunahme/Woche`;

      const series = allWeights.map((weight, index) => ({
        weight: Number(weight),
        date: new Date(String(allDates[index] || ''))
      })).filter((item) => Number.isFinite(item.weight) && Number.isFinite(item.date.getTime()));

      let forecastText = 'Nicht berechenbar';
      if (Number.isFinite(goalWeight) && goalWeight > 0 && series.length >= 2 && Number.isFinite(currentWeight)) {
        const lastPoint = series[series.length - 1];
        const start21Date = new Date(lastPoint.date.getTime() - 21 * 86400000);
        let last21 = series.filter((point) => point.date.getTime() >= start21Date.getTime());

        if (last21.length < 2) {
          last21 = series.slice(-Math.min(21, series.length));
        }

        if (last21.length >= 2) {
          const first21 = last21[0];
          const last21Point = last21[last21.length - 1];
          const days21Raw = Math.round((last21Point.date.getTime() - first21.date.getTime()) / 86400000);
          const days21 = Math.max(1, days21Raw);
          const dailyLoss21 = (first21.weight - last21Point.weight) / days21;
          const remainingKg = currentWeight - goalWeight;

          if (remainingKg <= 0) {
            forecastText = 'Ziel bereits erreicht';
          } else if (dailyLoss21 > 0) {
            const remainingDays = Math.ceil(remainingKg / dailyLoss21);
            const etaDate = new Date(last21Point.date.getTime() + remainingDays * 86400000);
            forecastText = `${formatGermanDate(etaDate)} [${remainingDays} ${remainingDays === 1 ? 'Tag' : 'Tage'}]`;
          } else {
            forecastText = 'Aktuell keine Abnahme erkennbar';
          }
        }
      }

      const overviewItems = [
        { label: 'Startgewicht', value: `${startWeight.toFixed(1)} kg` },
        { label: 'Aktuelles Gewicht', value: `${currentWeight.toFixed(1)} kg` },
        { label: 'Zielgewicht', value: goalWeightValue },
        { label: 'Gesamtdauer', value: overallDurationText },
        { label: 'Änderung im Zeitraum', value: `${deltaInWindow < 0 ? '-' : '+'}${Math.abs(deltaInWindow).toFixed(1)} kg` },
        { label: 'Gesamtfortschritt', value: progressPercentText },
        { label: 'Durchschnittsrate pro Woche', value: weeklyRateText },
        { label: 'Zielgewicht voraussichtlich erreicht', value: forecastText },
        { label: 'Körpergröße', value: `${resolvedHeightM.toFixed(2)} m` },
        { label: 'BMI', value: `${bmi.toFixed(1)} (${bmiCategory})` },
        { label: 'Mindestkalorienzufuhr', value: `${minimumCalories} kcal` },
        { label: 'Benötigte Kalorien (Körpererhalt)', value: `${maintenanceCalories} kcal` }
      ];

      block.innerHTML = `
        <h2>Übersicht</h2>
        <div class="table-grid">
          ${overviewItems.map(item => `
            <div class="table-item">
              <span>${item.label}</span>
              <strong>${item.value}</strong>
            </div>
          `).join('')}
        </div>
        ${renderProfileEditorMarkup(resolvedHeightM)}
      `;
      bindProfileEditor(block);

      return block;
    }

    function openRewardModal(goalId, goalTitle) {
      state.showRewardModal = true;
      state.rewardGoalId = Number(goalId);
      state.rewardGoalTitle = String(goalTitle || 'Ziel');
      renderAll();
    }

    function closeRewardModal() {
      state.showRewardModal = false;
      state.rewardGoalId = null;
      state.rewardGoalTitle = '';
      renderAll();
    }

    function openGoalEditor(goal = null) {
      if (IS_READ_ONLY_VIEW) return;

      const measurementTypes = getMeasurementTypes();
      if (measurementTypes.length === 0) {
        window.alert('Keine Messwerttypen verfügbar.');
        return;
      }

      if (goal && Number(goal.id) > 0) {
        state.goalForm = {
          mode: 'edit',
          goalId: Number(goal.id),
          typeId: Number(goal.typeId || measurementTypes[0].id),
          targetValue: Number(goal.targetValue).toFixed(1),
          goalText: String(goal.goalText || ''),
          initiallyAchieved: !!goal.achievedAt,
          initiallyRewarded: !!goal.rewardedAt || String(goal.rewardedWith || '').trim().length > 0
        };
      } else {
        const defaultTypeId = Number(measurementTypes[0].id);
        const latestValue = getLatestMeasurementValueByTypeId(defaultTypeId);
        state.goalForm = {
          mode: 'create',
          goalId: 0,
          typeId: defaultTypeId,
          targetValue: Number.isFinite(latestValue) ? Number(latestValue).toFixed(1) : '',
          goalText: '',
          initiallyAchieved: false,
          initiallyRewarded: false
        };
      }

      state.showGoalEditor = true;
      renderAll();
    }

    function closeGoalEditor() {
      state.showGoalEditor = false;
      state.goalForm = null;
      renderAll();
    }

    async function deleteGoal(goalId) {
      if (IS_READ_ONLY_VIEW) return;
      const numericGoalId = Number(goalId || 0);
      if (!numericGoalId) return;

      const shouldDelete = window.confirm('Willst du wirklich löschen?');
      if (!shouldDelete) return;
      const shouldDeleteAgain = window.confirm('Willst du wirklich löschen? Dieser Schritt kann nicht rückgängig gemacht werden.');
      if (!shouldDeleteAgain) return;

      try {
        const response = await fetch(buildDataApiUrl(), jsonPostOptions({
          action: 'delete_goal',
          goalId: numericGoalId
        }));
        const result = await response.json();
        if (!response.ok || !result.ok) {
          throw new Error(result.error || `HTTP ${response.status}`);
        }

        state.goalsNotice = 'Ziel wurde gelöscht.';
        await loadDashboardData();
      } catch (error) {
        window.alert(`Löschen fehlgeschlagen: ${error.message}`);
      }
    }

    function renderGoalsBlock() {
      const block = document.createElement('section');
      block.className = 'block';
      if (state.recentlyAchievedGoalIds.length > 0) {
        block.classList.add('goal-celebrate');
      }

      const goals = Array.isArray(data.goals) ? data.goals : [];

      if (goals.length === 0) {
        block.innerHTML = `
          <h2>Zwischenziele & Motivation</h2>
          <div class="small">Noch keine Ziele vorhanden.</div>
          ${!IS_READ_ONLY_VIEW ? '<div style="margin-top:10px;"><button class="btn-primary" id="createGoalFromGoalsBlock" type="button">Neues Ziel erstellen</button></div>' : ''}
        `;
        const createBtn = block.querySelector('#createGoalFromGoalsBlock');
        createBtn?.addEventListener('click', () => openGoalEditor());
        return block;
      }

      const currentValueMaps = buildGoalCurrentValueMaps();

      const grouped = new Map();
      goals.forEach((goal) => {
        const typeId = Number(goal.typeId || 0);
        if (!grouped.has(typeId)) grouped.set(typeId, []);
        grouped.get(typeId).push(goal);
      });

      const cards = [];
      const recentAchievedSet = new Set((state.recentlyAchievedGoalIds || []).map((id) => Number(id)));
      grouped.forEach((typeGoals, typeId) => {
        const typeNameKey = normalizeTypeName(String(typeGoals[0]?.typeName || ''));
        const currentValue = currentValueMaps.byTypeId.get(typeId) ?? currentValueMaps.byTypeName.get(typeNameKey);
        if (!Number.isFinite(currentValue)) return;

        const unit = String(typeGoals[0]?.unit || '');
        const typeName = String(typeGoals[0]?.typeName || 'Messwert');
        const safeTypeName = escapeHtml(typeName);
        const sorted = [...typeGoals].sort((a, b) => Number(b.targetValue) - Number(a.targetValue));

        const achieved = sorted.filter((goal) => currentValue <= Number(goal.targetValue));
        const notAchieved = sorted.filter((goal) => currentValue > Number(goal.targetValue));

        const lastAchieved = achieved.length > 0
          ? [...achieved].sort((a, b) => Number(a.targetValue) - Number(b.targetValue))[0]
          : null;

        const nextGoal = notAchieved.length > 0
          ? [...notAchieved].sort((a, b) => Number(b.targetValue) - Number(a.targetValue))[0]
          : null;

        let progressPercent = 0;
        if (!nextGoal && lastAchieved) {
          progressPercent = 100;
        } else if (nextGoal && lastAchieved) {
          const startValue = Number(lastAchieved.targetValue);
          const endValue = Number(nextGoal.targetValue);
          const span = startValue - endValue;
          const done = startValue - currentValue;
          progressPercent = span > 0 ? Math.max(0, Math.min(100, (done / span) * 100)) : 0;
        }

        const rewardCandidate = !IS_READ_ONLY_VIEW && lastAchieved && !String(lastAchieved.rewardedWith || '').trim() ? lastAchieved : null;
        const nextGoalEtaText = nextGoal ? getGoalEtaText(nextGoal) : 'Alle Ziele bereits erreicht';

        const shouldCelebrateCard = (lastAchieved && recentAchievedSet.has(Number(lastAchieved.id))) ? 'goal-celebrate' : '';

        cards.push(`
          <div class="goal-card ${shouldCelebrateCard}">
            <div class="goal-title">${safeTypeName}</div>
            <div class="goal-line">Aktuell: <strong>${formatGoalValue(currentValue, unit)}</strong></div>
            <div class="goal-line">Letztes erreichtes Ziel: <strong>${lastAchieved ? `${escapeHtml(lastAchieved.goalText)} (${formatGoalValue(lastAchieved.targetValue, unit)})` : 'Noch keines'}</strong></div>
            <div class="goal-line">Nächstes Ziel: <strong>${nextGoal ? `${escapeHtml(nextGoal.goalText)} (${formatGoalValue(nextGoal.targetValue, unit)})` : 'Alle Ziele erreicht'}</strong></div>
            <div class="goal-line">Voraussichtlich erreicht: <strong>${escapeHtml(nextGoalEtaText)}</strong></div>
            <div class="goal-progress-track"><div class="goal-progress-fill" style="width:${progressPercent.toFixed(1)}%"></div></div>
            <div class="goal-line">Fortschritt zum nächsten Ziel: <strong>${progressPercent.toFixed(0)}%</strong></div>
            ${lastAchieved && String(lastAchieved.rewardedWith || '').trim()
              ? `<div class="goal-line">Belohnung: <strong>${escapeHtml(lastAchieved.rewardedWith)}</strong> (${formatDateTimeText(lastAchieved.rewardedAt)})</div>`
              : ''}
            ${rewardCandidate
              ? `<button class="goal-reward-btn" data-reward-goal-id="${rewardCandidate.id}" data-reward-goal-title="${escapeHtml(String(rewardCandidate.goalText || ''))}" type="button">Belohnung erhalten</button>`
              : ''}
          </div>
        `);
      });

      if (cards.length === 0) {
        block.innerHTML = `
          <h2>Zwischenziele & Motivation</h2>
          <div class="small">Keine passenden Messwerte fuer die vorhandenen Ziele gefunden.</div>
        `;
        return block;
      }

      block.innerHTML = `
        <h2>Zwischenziele & Motivation</h2>
        ${state.goalCelebrationText ? `<div class="goal-achievement-banner">${state.goalCelebrationText}</div>` : ''}
        ${state.goalsNotice ? `<div class="small" style="margin-bottom:8px; color: var(--success); font-weight:700;">${state.goalsNotice}</div>` : ''}
        <div class="goals-grid">${cards.join('')}</div>
      `;

      block.querySelectorAll('[data-reward-goal-id]').forEach((button) => {
        button.addEventListener('click', () => {
          openRewardModal(
            Number(button.getAttribute('data-reward-goal-id') || 0),
            String(button.getAttribute('data-reward-goal-title') || 'Ziel')
          );
        });
      });

      return block;
    }

    function renderGoalsHistoryBlock() {
      const block = document.createElement('section');
      block.className = 'block';

      const goals = Array.isArray(data.goals) ? data.goals : [];
      if (goals.length === 0) {
        block.innerHTML = `
          <div class="goal-history-toolbar">
            <h2>Ziel-Historie</h2>
            ${IS_READ_ONLY_VIEW ? '' : '<button class="btn-primary" id="createGoalBtnEmpty" type="button">Neues Ziel</button>'}
          </div>
          <div class="small">Noch keine Ziele vorhanden.</div>
        `;
        const createGoalBtnEmpty = block.querySelector('#createGoalBtnEmpty');
        createGoalBtnEmpty?.addEventListener('click', () => openGoalEditor());
        return block;
      }

      const currentValueMaps = buildGoalCurrentValueMaps();

      const sorted = [...goals].sort((a, b) => {
        const aIsAchieved = !!a.achievedAt;
        const bIsAchieved = !!b.achievedAt;

        if (aIsAchieved !== bIsAchieved) {
          return aIsAchieved ? -1 : 1;
        }

        if (aIsAchieved && bIsAchieved) {
          const aAchievedTs = new Date(a.achievedAt).getTime();
          const bAchievedTs = new Date(b.achievedAt).getTime();
          if (aAchievedTs !== bAchievedTs) return aAchievedTs - bAchievedTs;
          return Number(a.id) - Number(b.id);
        }

        const aCurrent = currentValueMaps.byTypeId.get(Number(a.typeId)) ?? currentValueMaps.byTypeName.get(normalizeTypeName(String(a.typeName || '')));
        const bCurrent = currentValueMaps.byTypeId.get(Number(b.typeId)) ?? currentValueMaps.byTypeName.get(normalizeTypeName(String(b.typeName || '')));
        const aDistance = Number.isFinite(aCurrent)
          ? Math.max(0, Number(aCurrent) - Number(a.targetValue))
          : Number.POSITIVE_INFINITY;
        const bDistance = Number.isFinite(bCurrent)
          ? Math.max(0, Number(bCurrent) - Number(b.targetValue))
          : Number.POSITIVE_INFINITY;

        if (aDistance !== bDistance) return aDistance - bDistance;
        return Number(a.id) - Number(b.id);
      });

      block.innerHTML = `
        <div class="goal-history-toolbar">
          <h2>Ziel-Historie</h2>
          ${IS_READ_ONLY_VIEW ? '' : '<button class="btn-primary" id="createGoalBtn" type="button">Neues Ziel</button>'}
        </div>
        <div class="goal-history-legend">
          <div class="goal-history-legend-item"><span class="goal-status-dot status-achieved-rewarded"></span> Erreicht und belohnt</div>
          <div class="goal-history-legend-item"><span class="goal-status-dot status-achieved-open"></span> Erreicht, noch nicht belohnt</div>
          <div class="goal-history-legend-item"><span class="goal-status-dot status-pending"></span> Noch nicht erreicht</div>
        </div>
        <div class="goals-history-list">
          ${sorted.map((goal) => {
            const achieved = !!goal.achievedAt;
            const hasReward = String(goal.rewardedWith || '').trim().length > 0;
            const unit = getGoalUnit(goal);
            const statusClass = getGoalHistoryStatus(goal);
            const currentValue = currentValueMaps.byTypeId.get(Number(goal.typeId)) ?? currentValueMaps.byTypeName.get(normalizeTypeName(String(goal.typeName || '')));
            const missingAmount = !achieved && Number.isFinite(currentValue)
              ? Math.max(0, Number(currentValue) - Number(goal.targetValue))
              : null;
            const etaText = !achieved ? getGoalEtaText(goal) : null;
            return `
              <div class="goal-history-card ${statusClass} ${state.recentlyAchievedGoalIds.includes(Number(goal.id)) ? 'goal-celebrate' : ''}">
                <div class="goal-history-head">
                  <div class="goal-title goal-history-title"><span class="goal-status-dot ${statusClass}"></span>${escapeHtml(goal.typeName)}: ${escapeHtml(goal.goalText)}</div>
                  <div class="goal-line"><strong>${formatGoalValue(goal.targetValue, unit)}</strong></div>
                </div>
                ${!achieved && Number.isFinite(missingAmount) ? `<div class="goal-line">Da fehlt noch: <strong>${formatGoalValue(missingAmount, unit)}</strong></div>` : ''}
                ${!achieved ? `<div class="goal-line">Voraussichtlich erreicht: <strong>${escapeHtml(String(etaText || 'Nicht berechenbar'))}</strong></div>` : ''}
                ${achieved ? `<div class="goal-line">Erreicht am: <strong>${formatDateTimeText(goal.achievedAt)}</strong></div>` : ''}
                ${achieved ? `<div class="goal-line">Belohnt am: <strong>${formatDateTimeText(goal.rewardedAt)}</strong></div>` : ''}
                ${achieved ? `<div class="goal-line">Belohnung: <strong>${hasReward ? escapeHtml(goal.rewardedWith) : 'Noch keine Belohnung eingetragen'}</strong></div>` : ''}
                ${!IS_READ_ONLY_VIEW ? `
                  <div class="goal-history-actions">
                    <button class="tiny-btn" data-edit-goal-id="${goal.id}" type="button">Bearbeiten</button>
                    <button class="tiny-btn warn" data-delete-goal-id="${goal.id}" type="button">Löschen</button>
                    ${achieved && !hasReward
                      ? `<button class="goal-reward-btn goal-history-reward-btn" data-reward-goal-id="${goal.id}" data-reward-goal-title="${escapeHtml(String(goal.goalText || ''))}" type="button">Belohnung eintragen</button>`
                      : ''}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;

      const createGoalBtn = block.querySelector('#createGoalBtn');
      createGoalBtn?.addEventListener('click', () => openGoalEditor());

      block.querySelectorAll('[data-reward-goal-id]').forEach((button) => {
        button.addEventListener('click', () => {
          openRewardModal(
            Number(button.getAttribute('data-reward-goal-id') || 0),
            String(button.getAttribute('data-reward-goal-title') || 'Ziel')
          );
        });
      });

      block.querySelectorAll('[data-edit-goal-id]').forEach((button) => {
        button.addEventListener('click', () => {
          const goalId = Number(button.getAttribute('data-edit-goal-id') || 0);
          const goal = goals.find((item) => Number(item.id) === goalId);
          if (!goal) return;
          openGoalEditor(goal);
        });
      });

      block.querySelectorAll('[data-delete-goal-id]').forEach((button) => {
        button.addEventListener('click', async () => {
          const goalId = Number(button.getAttribute('data-delete-goal-id') || 0);
          await deleteGoal(goalId);
        });
      });

      return block;
    }

    function renderActions() {
      const block = document.createElement('section');
      block.className = 'block';
      block.innerHTML = `
        <h2>Maßnahmen</h2>
        <div class="action-row">
          ${IS_READ_ONLY_VIEW ? '' : '<button class="btn-primary" id="measurementOpenBtn" type="button">Messung durchführen</button>'}
          ${IS_READ_ONLY_VIEW ? '' : '<button class="btn-secondary" id="trainingOpenBtn" type="button">Training eintragen</button>'}
          <button class="btn-toggle" id="themeToggle" type="button">☀️ Lightmode</button>
        </div>
        ${IS_READ_ONLY_VIEW ? '<div class="small" style="margin-top:10px;">Nur-Lese-Modus: Änderungen sind in diesem Link deaktiviert.</div>' : ''}
      `;

      const toggleButton = block.querySelector('#themeToggle');
      if (toggleButton) {
        const currentTheme = document.body.dataset.theme === 'light' ? 'light' : 'dark';
        toggleButton.textContent = currentTheme === 'dark' ? '☀️ Lightmode' : '🌙 Darkmode';
        toggleButton.addEventListener('click', () => {
          const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
          applyTheme(nextTheme);
          renderAll();
        });
      }

      const trainingOpenBtn = block.querySelector('#trainingOpenBtn');
      if (trainingOpenBtn) {
        trainingOpenBtn.addEventListener('click', () => openTrainingForm());
      }

      const measurementOpenBtn = block.querySelector('#measurementOpenBtn');
      if (measurementOpenBtn) {
        measurementOpenBtn.addEventListener('click', () => openMeasurementForm());
      }

      return block;
    }

    function renderWindowSelector() {
      const block = document.createElement('section');
      block.className = 'block';

      const options = ['1 Woche', '2 Wochen', '3 Wochen', '1 Monat', '3 Monate', '1 Jahr', 'Alles'];
      block.innerHTML = `
        <h2>Zeitraum</h2>
        <div class="window-selector">
          ${options.map(option => `
            <button class="window-btn ${state.window === option ? 'active' : ''}" data-window="${option}" type="button">${option}</button>
          `).join('')}
        </div>
      `;

      block.querySelectorAll('.window-btn').forEach((button) => {
        button.addEventListener('click', () => {
          state.window = button.dataset.window;
          renderAll();
        });
      });

      return block;
    }

    function renderChart() {
      const block = document.createElement('section');
      block.className = 'block';
      const isMobileChart = window.matchMedia('(max-width: 760px)').matches;

      const visible = getWindowedData();
      const weights = visible.weights;
      const dates = visible.dates;
      const movingFive = movingAverage(weights, 5);
      const movingTwentyOne = movingAverage(weights, 21);
      const trendLine = calculateTrend(weights);
      const showFive = state.showFiveAverage;
      const showTwentyOne = state.showTwentyOneAverage;
      const visibleSeries = [weights, ...(showFive ? [movingFive] : []), ...(showTwentyOne ? [movingTwentyOne] : []), trendLine];
      const allSeries = visibleSeries.flat();
      const axis = getPaddedNiceAxisBounds(Math.min(...allSeries), Math.max(...allSeries), 5, 0.1);
      const min = axis.start;
      const max = axis.end;
      const width = 920;
      const height = isMobileChart ? 520 : 260;
      const padding = { top: 18, right: 20, bottom: 42, left: 58 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const timeScale = createTimeScale(dates, padding.left, chartWidth);
      const showTimeOnXAxis = hasSameDayMultipleMeasurements(dates);

      const getPoint = (value, index) => {
        const x = timeScale.getXAtIndex(index);
        const y = height - padding.bottom - ((value - min) / (max - min || 1)) * chartHeight;
        return `${x},${y}`;
      };

      const points = weights.map((value, index) => getPoint(value, index)).join(' ');
      const pointsFive = movingFive.map((value, index) => getPoint(value, index)).join(' ');
      const pointsTwentyOne = movingTwentyOne.map((value, index) => getPoint(value, index)).join(' ');
      const pointsTrend = trendLine.map((value, index) => getPoint(value, index)).join(' ');
      const minValue = Math.min(...weights);
      const maxValue = Math.max(...weights);
      const minIndex = weights.indexOf(minValue);
      const maxIndex = weights.indexOf(maxValue);
      const minX = timeScale.getXAtIndex(minIndex);
      const minY = height - padding.bottom - ((minValue - min) / (max - min || 1)) * chartHeight;
      const maxX = timeScale.getXAtIndex(maxIndex);
      const maxY = height - padding.bottom - ((maxValue - min) / (max - min || 1)) * chartHeight;
      const chartBounds = {
        minX: padding.left,
        maxX: width - padding.right,
        minY: padding.top,
        maxY: height - padding.bottom
      };
      const maxLabelPos = getSafeLabelPosition(maxX, maxY, chartBounds, {
        textWidth: 88,
        textHeight: 12,
        offsetX: 9,
        offsetY: 10,
        preferLeft: maxX > padding.left + chartWidth * 0.7,
        preferAbove: true
      });
      const minLabelPos = getSafeLabelPosition(minX, minY, chartBounds, {
        textWidth: 88,
        textHeight: 12,
        offsetX: 9,
        offsetY: 10,
        preferLeft: minX > padding.left + chartWidth * 0.7,
        preferAbove: false
      });

      const yTickMarkup = axis.ticks.map((value) => {
        const y = height - padding.bottom - ((value - min) / (max - min || 1)) * chartHeight;
        return `
          <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#dbe2ea" stroke-dasharray="3 4" />
          <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#64748b">${formatTickValue(value)}</text>
        `;
      }).join('');

      const tickStep = Math.max(1, Math.ceil(weights.length / 6));
      const xTickMarkup = dates.map((date, index) => {
        const x = timeScale.getXAtIndex(index);
        if (index !== 0 && index !== weights.length - 1 && index % tickStep !== 0) return '';
        return `<text x="${x}" y="${height - 12}" text-anchor="middle" font-size="11" fill="#64748b">${formatChartDateLabel(date, showTimeOnXAxis)}</text>`;
      }).join('');

      const trendDifference = weights[weights.length - 1] - weights[0];
      const avgLoss = (trendDifference / weights.length).toFixed(2);

      block.innerHTML = `
        <h2>Gewichtsverlauf</h2>
        <div class="chart-wrap">
          <div class="chart-box chart-box-main">
            <div class="chart-main-canvas">
            <svg class="chart-svg-main" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Gewichtsverlauf">
              <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="#1e293b" stroke-width="1.2" />
              <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="#1e293b" stroke-width="1.2" />
              ${yTickMarkup}
              ${xTickMarkup}
              <text x="${width / 2}" y="${height - 2}" text-anchor="middle" font-size="12" fill="#64748b">Datum</text>
              <text x="16" y="${height / 2}" text-anchor="middle" font-size="12" fill="#64748b" transform="rotate(-90 16 ${height / 2})">Gewicht (kg)</text>
              <polyline fill="none" stroke="#2563eb" stroke-width="3" points="${points}" stroke-linecap="round" stroke-linejoin="round" />
              ${showFive ? `<polyline fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="7 5" points="${pointsFive}" stroke-linecap="round" stroke-linejoin="round" />` : ''}
              ${showTwentyOne ? `<polyline fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="2 6" points="${pointsTwentyOne}" stroke-linecap="round" stroke-linejoin="round" />` : ''}
              <polyline fill="none" stroke="#0891b2" stroke-width="2.5" stroke-dasharray="1 4" points="${pointsTrend}" stroke-linecap="round" stroke-linejoin="round" />
              ${weights.map((value, index) => {
                const x = timeScale.getXAtIndex(index);
                const y = height - padding.bottom - ((value - min) / (max - min || 1)) * chartHeight;
                return `<circle cx="${x}" cy="${y}" r="3.8" fill="#2563eb" />`;
              }).join('')}
              <circle cx="${maxX}" cy="${maxY}" r="5" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
              ${renderSvgValueLabel(`Max ${maxValue.toFixed(1)} kg`, maxLabelPos, { textWidth: 88, textHeight: 12, fontSize: 11, textColor: '#991b1b' })}
              <circle cx="${minX}" cy="${minY}" r="5" fill="#10b981" stroke="#ffffff" stroke-width="2" />
              ${renderSvgValueLabel(`Min ${minValue.toFixed(1)} kg`, minLabelPos, { textWidth: 88, textHeight: 12, fontSize: 11, textColor: '#065f46' })}
            </svg>
            </div>
            <div class="small" style="margin-top: 10px;">
              <span style="color:#2563eb; font-weight:700;">●</span> Gewicht &nbsp;
              ${showFive ? `<span style="color:#f59e0b; font-weight:700;">●</span> 5-Tage-Durchschnitt &nbsp;` : ''}
              ${showTwentyOne ? `<span style="color:#ef4444; font-weight:700;">●</span> 21-Tage-Durchschnitt &nbsp;` : ''}
              <span style="color:#0891b2; font-weight:700;">●</span> Trend
            </div>
            <div class="toggle-row">
              <button class="toggle-btn ${state.showFiveAverage ? 'on' : ''}" data-show-five="true" type="button">5-Tage-Durchschnitt</button>
              <button class="toggle-btn ${state.showTwentyOneAverage ? 'on' : ''}" data-show-twentyone="true" type="button">21-Tage-Durchschnitt</button>
            </div>
          </div>
        </div>
      `;

      block.querySelector('[data-show-five]')?.addEventListener('click', () => {
        state.showFiveAverage = !state.showFiveAverage;
        renderAll();
      });

      block.querySelector('[data-show-twentyone]')?.addEventListener('click', () => {
        state.showTwentyOneAverage = !state.showTwentyOneAverage;
        renderAll();
      });

      return block;
    }

    function renderRateChart() {
      const block = document.createElement('section');
      block.className = 'block';
      const isMobileChart = window.matchMedia('(max-width: 760px)').matches;

      const visible = getWindowedData();
      const weights = visible.weights;
      const dates = visible.dates;
      const rateDates = dates.slice(1);
      const rates = weights.slice(1).map((value, index) => value - weights[index]);
      const movingFive = movingAverage(rates, 5);
      const movingTwentyOne = movingAverage(rates, 21);
      const trend = calculateTrend(rates);
      const showFive = state.showFiveAverage;
      const showTwentyOne = state.showTwentyOneAverage;
      const visibleSeries = [rates, ...(showFive ? [movingFive] : []), ...(showTwentyOne ? [movingTwentyOne] : []), trend];
      const allSeries = visibleSeries.flat();
      const axis = getPaddedNiceAxisBounds(Math.min(0, ...allSeries), Math.max(0, ...allSeries), 5, 0.12);
      const min = axis.start;
      const max = axis.end;
      const width = 920;
      const height = isMobileChart ? 440 : 220;
      const padding = { top: 18, right: 20, bottom: 42, left: 58 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const timeScale = createTimeScale(rateDates, padding.left, chartWidth);
      const showTimeOnXAxis = hasSameDayMultipleMeasurements(rateDates);

      const getPoint = (value, index) => {
        const x = timeScale.getXAtIndex(index);
        const y = height - padding.bottom - ((value - min) / (max - min || 1)) * chartHeight;
        return `${x},${y}`;
      };

      const points = rates.map((value, index) => getPoint(value, index)).join(' ');
      const pointsFive = movingFive.map((value, index) => getPoint(value, index)).join(' ');
      const pointsTwentyOne = movingTwentyOne.map((value, index) => getPoint(value, index)).join(' ');
      const pointsTrend = trend.map((value, index) => getPoint(value, index)).join(' ');
      const minRate = Math.min(...rates);
      const maxRate = Math.max(...rates);
      const minRateIndex = rates.indexOf(minRate);
      const maxRateIndex = rates.indexOf(maxRate);
      const minRateX = timeScale.getXAtIndex(minRateIndex);
      const minRateY = height - padding.bottom - ((minRate - min) / (max - min || 1)) * chartHeight;
      const maxRateX = timeScale.getXAtIndex(maxRateIndex);
      const maxRateY = height - padding.bottom - ((maxRate - min) / (max - min || 1)) * chartHeight;
      const chartBounds = {
        minX: padding.left,
        maxX: width - padding.right,
        minY: padding.top,
        maxY: height - padding.bottom
      };
      const maxRateLabelPos = getSafeLabelPosition(maxRateX, maxRateY, chartBounds, {
        textWidth: 96,
        textHeight: 12,
        offsetX: 9,
        offsetY: 10,
        preferLeft: maxRateX > padding.left + chartWidth * 0.7,
        preferAbove: true
      });
      const minRateLabelPos = getSafeLabelPosition(minRateX, minRateY, chartBounds, {
        textWidth: 96,
        textHeight: 12,
        offsetX: 9,
        offsetY: 10,
        preferLeft: minRateX > padding.left + chartWidth * 0.7,
        preferAbove: false
      });

      const yTickMarkup = axis.ticks.map((value) => {
        const y = height - padding.bottom - ((value - min) / (max - min || 1)) * chartHeight;
        return `
          <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#dbe2ea" stroke-dasharray="3 4" />
          <text x="${padding.left - 10}" y="${y + 4}" text-anchor="end" font-size="11" fill="#64748b">${formatTickValue(value)}</text>
        `;
      }).join('');

      const tickStep = Math.max(1, Math.ceil(rates.length / 6));
      const zeroY = height - padding.bottom - ((0 - min) / (max - min || 1)) * chartHeight;
      const xTickMarkup = rateDates.map((date, index) => {
        const x = timeScale.getXAtIndex(index);
        if (index !== 0 && index !== rates.length - 1 && index % tickStep !== 0) return '';
        return `<text x="${x}" y="${height - 12}" text-anchor="middle" font-size="11" fill="#64748b">${formatChartDateLabel(date, showTimeOnXAxis)}</text>`;
      }).join('');

      block.innerHTML = `
        <h2>Gewichtsänderungsrate</h2>
        <div class="chart-box chart-box-main">
          <div class="chart-main-canvas">
          <svg class="chart-svg-main" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Gewichtsänderungsrate">
            <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="#1e293b" stroke-width="1.2" />
            <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="#1e293b" stroke-width="1.2" />
            <line x1="${padding.left}" y1="${zeroY}" x2="${width - padding.right}" y2="${zeroY}" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="4 4" />
            ${yTickMarkup}
            ${xTickMarkup}
            <text x="${width / 2}" y="${height - 2}" text-anchor="middle" font-size="12" fill="#64748b">Datum</text>
            <text x="16" y="${height / 2}" text-anchor="middle" font-size="12" fill="#64748b" transform="rotate(-90 16 ${height / 2})">Δ Gewicht (kg)</text>
            <polyline fill="none" stroke="#16a34a" stroke-width="3" points="${points}" stroke-linecap="round" stroke-linejoin="round" />
            ${showFive ? `<polyline fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-dasharray="7 5" points="${pointsFive}" stroke-linecap="round" stroke-linejoin="round" />` : ''}
            ${showTwentyOne ? `<polyline fill="none" stroke="#0f766e" stroke-width="2.5" stroke-dasharray="2 6" points="${pointsTwentyOne}" stroke-linecap="round" stroke-linejoin="round" />` : ''}
            <polyline fill="none" stroke="#0891b2" stroke-width="2.5" stroke-dasharray="1 4" points="${pointsTrend}" stroke-linecap="round" stroke-linejoin="round" />
            ${rates.map((value, index) => {
              const x = timeScale.getXAtIndex(index);
              const y = height - padding.bottom - ((value - min) / (max - min || 1)) * chartHeight;
              return `<circle cx="${x}" cy="${y}" r="3.8" fill="#16a34a" />`;
            }).join('')}
            <circle cx="${maxRateX}" cy="${maxRateY}" r="5" fill="#ef4444" stroke="#ffffff" stroke-width="2" />
            ${renderSvgValueLabel(`Max ${maxRate.toFixed(2)} kg`, maxRateLabelPos, { textWidth: 96, textHeight: 12, fontSize: 11, textColor: '#991b1b' })}
            <circle cx="${minRateX}" cy="${minRateY}" r="5" fill="#10b981" stroke="#ffffff" stroke-width="2" />
            ${renderSvgValueLabel(`Min ${minRate.toFixed(2)} kg`, minRateLabelPos, { textWidth: 96, textHeight: 12, fontSize: 11, textColor: '#065f46' })}
          </svg>
          </div>
          <div class="small" style="margin-top: 10px;">
            <span style="color:#16a34a; font-weight:700;">●</span> Rate &nbsp;
            ${showFive ? `<span style="color:#8b5cf6; font-weight:700;">●</span> 5-Tage-Durchschnitt &nbsp;` : ''}
            ${showTwentyOne ? `<span style="color:#0f766e; font-weight:700;">●</span> 21-Tage-Durchschnitt &nbsp;` : ''}
            <span style="color:#0891b2; font-weight:700;">●</span> Trend
          </div>
          <div class="toggle-row">
            <button class="toggle-btn ${state.showFiveAverage ? 'on' : ''}" data-show-five="true" type="button">5-Tage-Durchschnitt</button>
            <button class="toggle-btn ${state.showTwentyOneAverage ? 'on' : ''}" data-show-twentyone="true" type="button">21-Tage-Durchschnitt</button>
          </div>
        </div>
      `;

      block.querySelector('[data-show-five]')?.addEventListener('click', () => {
        state.showFiveAverage = !state.showFiveAverage;
        renderAll();
      });

      block.querySelector('[data-show-twentyone]')?.addEventListener('click', () => {
        state.showTwentyOneAverage = !state.showTwentyOneAverage;
        renderAll();
      });

      return block;
    }

    function getMeasurements() {
      const history = Array.isArray(data.measurementHistory) ? data.measurementHistory : [];
      const fromHistory = history
        .map((entry) => {
          const title = String(entry?.typeName || '').trim();
          const normalizedTitle = normalizeTypeName(title);
          const unit = String(entry?.unit || 'cm').trim() || 'cm';
          const rawValues = Array.isArray(entry?.values) ? entry.values : [];
          const rawDates = Array.isArray(entry?.dates) ? entry.dates : [];
          const maxLen = Math.min(rawValues.length, rawDates.length);
          const pairs = [];
          for (let index = 0; index < maxLen; index += 1) {
            const value = Number(rawValues[index]);
            const dateRaw = String(rawDates[index] || '');
            const ts = parseChartDateToTimestamp(dateRaw);
            if (!Number.isFinite(value) || !Number.isFinite(ts)) continue;
            pairs.push({ value, date: dateRaw });
          }

          if (!title || pairs.length === 0) return null;
          // "Gewicht" has its own dedicated chart and should not be duplicated here.
          if (normalizedTitle === 'gewicht' || normalizedTitle === 'weight') return null;

          const lastPoint = pairs[pairs.length - 1];
          const lastValue = lastPoint.value;
          const lastDate = lastPoint.date || getTodayIsoDate();

          return {
            title,
            value: `${lastValue.toFixed(1).replace('.', ',')} ${unit}`,
            note: `Letzte Messung am ${formatDateTimeText(lastDate)}`
          };
        })
        .filter(Boolean);

      if (fromHistory.length > 0) {
        return fromHistory;
      }

      if (Array.isArray(data.measurements) && data.measurements.length) {
        return data.measurements;
      }

      return [
        { title: 'Brustumfang', value: '107,0 cm', note: 'Letzte Messung am 2026-07-31' },
        { title: 'Bauchumfang', value: '103,0 cm', note: 'Letzte Messung am 2026-07-31' },
        { title: 'Bundumfang', value: '104,2 cm', note: 'Letzte Messung am 2026-07-31' },
        { title: 'Poumfang', value: '108,9 cm', note: 'Letzte Messung am 2026-07-31' }
      ];
    }

    function renderMeasurementMiniChart(values, rates, label, dates, unit = 'cm') {
      const width = 440;
      const height = 190;
      const padding = { top: 12, right: 38, bottom: 24, left: 32 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const timeScale = createTimeScale(dates, padding.left, chartWidth);
      const showTimeOnXAxis = hasSameDayMultipleMeasurements(dates);

      const valueAxis = getPaddedNiceAxisBounds(Math.min(...values), Math.max(...values), 4, 0.12);
      const rateAxis = getPaddedNiceAxisBounds(Math.min(0, ...rates), Math.max(0, ...rates), 4, 0.12);

      const vMin = valueAxis.start;
      const vMax = valueAxis.end;
      const rMin = rateAxis.start;
      const rMax = rateAxis.end;

      const scaleV = (v) => height - padding.bottom - ((v - vMin) / (vMax - vMin || 1)) * chartHeight;
      const scaleR = (r) => height - padding.bottom - ((r - rMin) / (rMax - rMin || 1)) * chartHeight;
      const scaleX = (index) => timeScale.getXAtIndex(index);
      const scaleRateX = (index) => scaleX(Math.min(index + 1, dates.length - 1));

      const valuePoints = values.map((v, i) => `${scaleX(i)},${scaleV(v)}`).join(' ');
      const trend = calculateTrend(values);
      const trendPoints = trend.map((v, i) => `${scaleX(i)},${scaleV(v)}`).join(' ');
      const rateTrend = calculateTrend(rates);
      const rateTrendPoints = rateTrend.map((r, i) => `${scaleRateX(i)},${scaleR(r)}`).join(' ');
      const ratePoints = rates.map((r, i) => `${scaleRateX(i)},${scaleR(r)}`).join(' ');
      const valueDots = values.map((v, i) => `<circle cx="${scaleX(i)}" cy="${scaleV(v)}" r="2.8" fill="#2563eb" />`).join('');
      const rateDots = rates.map((r, i) => `<circle cx="${scaleRateX(i)}" cy="${scaleR(r)}" r="2.2" fill="#f59e0b" fill-opacity="0.92" />`).join('');

      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const minValueIndex = values.indexOf(minValue);
      const maxValueIndex = values.indexOf(maxValue);
      const minValueX = scaleX(minValueIndex);
      const minValueY = scaleV(minValue);
      const maxValueX = scaleX(maxValueIndex);
      const maxValueY = scaleV(maxValue);
      const chartBounds = {
        minX: padding.left,
        maxX: width - padding.right,
        minY: padding.top,
        maxY: height - padding.bottom
      };
      const maxValueLabelPos = getSafeLabelPosition(maxValueX, maxValueY, chartBounds, {
        textWidth: 66,
        textHeight: 10,
        offsetX: 7,
        offsetY: 9,
        preferLeft: maxValueX > padding.left + chartWidth * 0.7,
        preferAbove: true
      });
      const minValueLabelPos = getSafeLabelPosition(minValueX, minValueY, chartBounds, {
        textWidth: 66,
        textHeight: 10,
        offsetX: 7,
        offsetY: 9,
        preferLeft: minValueX > padding.left + chartWidth * 0.7,
        preferAbove: false
      });

      const lastValue = values[values.length - 1];
      const lastRate = rates[rates.length - 1];
      const lastX = scaleX(values.length - 1);

      // grid lines from value axis
      const gridLines = valueAxis.ticks.map((v) => {
        const y = scaleV(v);
        return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#334155" stroke-dasharray="2 3" stroke-opacity="0.6" />`;
      }).join('');

      // left axis ticks (value)
      const leftTicks = valueAxis.ticks.map((v) => {
        const y = scaleV(v);
        return `<line x1="${padding.left - 4}" y1="${y}" x2="${padding.left}" y2="${y}" stroke="#2563eb" stroke-width="1.5" />
                <text x="${padding.left - 7}" y="${y + 3.5}" text-anchor="end" font-size="9" fill="#2563eb">${formatTickValue(v)}</text>`;
      }).join('');

      // right axis ticks (rate)
      const rightTicks = rateAxis.ticks.map((r) => {
        const y = scaleR(r);
        return `<line x1="${width - padding.right}" y1="${y}" x2="${width - padding.right + 4}" y2="${y}" stroke="#f59e0b" stroke-width="1.5" />
                <text x="${width - padding.right + 7}" y="${y + 3.5}" text-anchor="start" font-size="9" fill="#f59e0b">${formatTickValue(r)}</text>`;
      }).join('');

      const zeroRateY = scaleR(0);

      // date labels
      const tickStep = Math.max(1, Math.ceil(dates.length / 5));
      const dateLabels = dates.map((date, i) => {
        const x = scaleX(i);
        if (i !== 0 && i !== dates.length - 1 && i % tickStep !== 0) return '';
        return `<text x="${x}" y="${height - 5}" text-anchor="middle" font-size="9" fill="#64748b">${formatChartDateLabel(date, showTimeOnXAxis)}</text>`;
      }).join('');

      return `
        <div class="measure-chart">
          <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${label}">
            ${gridLines}
            <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="#2563eb" stroke-width="1.2" stroke-opacity="0.8" />
            <line x1="${width - padding.right}" y1="${padding.top}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="#f59e0b" stroke-width="1.2" stroke-opacity="0.8" />
            <line x1="${padding.left}" y1="${zeroRateY}" x2="${width - padding.right}" y2="${zeroRateY}" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 4" stroke-opacity="0.8" />
            <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="#64748b" stroke-width="1" />
            ${leftTicks}
            ${rightTicks}
            ${dateLabels}
            <polyline fill="none" stroke="#2563eb" stroke-width="2.4" points="${valuePoints}" stroke-linecap="round" stroke-linejoin="round" />
            <polyline fill="none" stroke="#0891b2" stroke-width="1.8" stroke-dasharray="4 3" points="${trendPoints}" stroke-linecap="round" stroke-linejoin="round" />
            <polyline fill="none" stroke="#f59e0b" stroke-width="2.2" points="${ratePoints}" stroke-linecap="round" stroke-linejoin="round" />
            <polyline fill="none" stroke="#f59e0b" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.8" points="${rateTrendPoints}" stroke-linecap="round" stroke-linejoin="round" />
            ${valueDots}
            ${rateDots}
            <circle cx="${lastX}" cy="${scaleV(lastValue)}" r="4" fill="#2563eb" />
            <circle cx="${maxValueX}" cy="${maxValueY}" r="4.5" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" />
            ${renderSvgValueLabel(`Max ${maxValue.toFixed(1)}`, maxValueLabelPos, { textWidth: 66, textHeight: 10, fontSize: 9, textColor: '#991b1b', padX: 3, padY: 2, cornerRadius: 3 })}
            <circle cx="${minValueX}" cy="${minValueY}" r="4.5" fill="#10b981" stroke="#ffffff" stroke-width="1.5" />
            ${renderSvgValueLabel(`Min ${minValue.toFixed(1)}`, minValueLabelPos, { textWidth: 66, textHeight: 10, fontSize: 9, textColor: '#065f46', padX: 3, padY: 2, cornerRadius: 3 })}
          </svg>
        </div>
        <div class="measure-legend">
          <div class="legend-dot"><span style="background:#2563eb"></span> Messwert</div>
          <div class="legend-dot"><span style="background:#0891b2"></span> Trend</div>
          <div class="legend-dot"><span style="background:#f59e0b"></span> Rate</div>
          <div class="legend-dot"><span style="background:#d97706"></span> Rate-Trend</div>
        </div>
        <div class="subtle">Aktuell: <strong>${lastValue.toFixed(1)} ${escapeHtml(unit)}</strong> • Rate: <strong>${lastRate.toFixed(2)} ${escapeHtml(unit)}</strong></div>
      `;
    }

    function renderMeasurements() {
      const block = document.createElement('section');
      block.className = 'block';
      const measurements = getMeasurements();
      const visible = getWindowedData();
      const dates = visible.dates || data.dates || [];
      const windowSize = dates.length || (data.dates || []).length;
      const windowDaysMap = {
        '1 Woche': 7,
        '2 Wochen': 14,
        '3 Wochen': 21,
        '1 Monat': 30,
        '3 Monate': 90,
        '1 Jahr': 365,
        'Alles': null
      };
      const selectedDays = windowDaysMap[state.window];
      const rawMeasurementHistory = Array.isArray(data.measurementHistory) ? data.measurementHistory : [];

      const knownTimestamps = [];
      (Array.isArray(data.dates) ? data.dates : []).forEach((value) => {
        const ts = parseChartDateToTimestamp(value);
        if (Number.isFinite(ts)) knownTimestamps.push(ts);
      });
      rawMeasurementHistory.forEach((entry) => {
        const historyDates = Array.isArray(entry?.dates) ? entry.dates : [];
        historyDates.forEach((value) => {
          const ts = parseChartDateToTimestamp(value);
          if (Number.isFinite(ts)) knownTimestamps.push(ts);
        });
      });

      const latestKnownTs = knownTimestamps.length > 0 ? Math.max(...knownTimestamps) : NaN;
      const hasWindowRange = Number.isFinite(selectedDays) && selectedDays !== null && Number.isFinite(latestKnownTs);
      const windowStartTs = hasWindowRange ? latestKnownTs - (selectedDays * 86400000) : NaN;
      const windowEndTs = hasWindowRange ? latestKnownTs : NaN;

      const historyByTitle = new Map();
      rawMeasurementHistory.forEach((entry) => {
        const title = String(entry?.typeName || '').trim();
        if (!title) return;

        const rawValues = Array.isArray(entry.values) ? entry.values : [];
        const rawSeriesDates = Array.isArray(entry.dates) ? entry.dates : [];
        const maxLen = Math.min(rawValues.length, rawSeriesDates.length);
        const values = [];
        const seriesDates = [];

        for (let index = 0; index < maxLen; index += 1) {
          const value = Number(rawValues[index]);
          const dateRaw = String(rawSeriesDates[index] || '');
          const ts = parseChartDateToTimestamp(dateRaw);
          if (!Number.isFinite(value) || !Number.isFinite(ts)) continue;
          values.push(value);
          seriesDates.push(dateRaw);
        }

        if (values.length === 0 || seriesDates.length === 0) return;

        historyByTitle.set(normalizeTypeName(title), {
          title,
          unit: String(entry?.unit || 'cm'),
          values,
          dates: seriesDates
        });
      });

      const measurementSeries = measurements.map((item) => {
        const title = item.title;
        const normalizedTitle = normalizeTypeName(title);
        const historyEntry = historyByTitle.get(normalizedTitle);

        const parsedFallback = Number(String(item.value || '0').replace(',', '.').replace(/[^0-9.-]/g, ''));
        const fallbackValue = Number.isFinite(parsedFallback) ? parsedFallback : 0;
        const genericFallbackLength = Math.max(windowSize, 2);
        const genericFallbackSeries = Array.from({ length: genericFallbackLength }, () => fallbackValue);
        const genericFallbackDates = dates.length >= genericFallbackLength
          ? dates.slice(-genericFallbackLength)
          : Array.from({ length: genericFallbackLength }, () => getTodayIsoDate());

        let series = [];
        let seriesDates = [];

        if (historyEntry) {
          const maxLen = Math.min(historyEntry.values.length, historyEntry.dates.length);
          const pairs = [];
          for (let index = 0; index < maxLen; index += 1) {
            const value = Number(historyEntry.values[index]);
            const dateRaw = String(historyEntry.dates[index] || '');
            const ts = parseChartDateToTimestamp(dateRaw);
            if (!Number.isFinite(value) || !Number.isFinite(ts)) continue;
            pairs.push({ value, date: dateRaw, ts });
          }

          const filteredPairs = hasWindowRange
            ? pairs.filter((entry) => entry.ts >= windowStartTs && entry.ts <= windowEndTs)
            : pairs;
          const scopedPairs = filteredPairs.length > 0 ? filteredPairs : pairs;
          series = scopedPairs.map((entry) => entry.value);
          seriesDates = scopedPairs.map((entry) => entry.date);
        } else {
          series = genericFallbackSeries.slice(-windowSize);
          seriesDates = genericFallbackDates.slice(-series.length);
        }

        if (series.length === 0) {
          const today = getTodayIsoDate();
          series = [fallbackValue, fallbackValue];
          seriesDates = [today, today];
        } else if (series.length === 1) {
          series = [series[0], series[0]];
          const singleDate = seriesDates[0] || getTodayIsoDate();
          seriesDates = [singleDate, singleDate];
        }

        const rates = series.slice(1).map((value, index) => value - series[index]);
        const lastValue = series[series.length - 1];
        const lastDate = seriesDates[seriesDates.length - 1] || item.note;
        const unit = historyEntry ? String(historyEntry.unit || 'cm') : 'cm';
        const displayValue = Number.isFinite(lastValue) ? `${lastValue.toFixed(1).replace('.', ',')} ${unit}` : item.value;
        return {
          ...item,
          value: displayValue,
          note: `Letzte Messung am ${formatDateTimeText(lastDate)}`,
          unit,
          series,
          seriesDates,
          rates
        };
      });

      block.innerHTML = `
        <h2>Zusätzliche Messungen</h2>
        <div class="measure-grid">
          ${measurementSeries.map((item, index) => `
            <div class="measure-card is-clickable" data-open-measure-detail="${index}" role="button" tabindex="0" aria-label="${escapeHtml(item.title)} groß anzeigen">
              <div class="measure-header">
                <div class="label">${escapeHtml(item.title)}</div>
                <div class="value-pill">${escapeHtml(item.value)}</div>
              </div>
              ${renderMeasurementMiniChart(item.series, item.rates, escapeHtml(item.title), item.seriesDates, item.unit)}
              <div class="subtle">${escapeHtml(item.note)}</div>
              <div class="measure-open-hint">Klick für große Ansicht</div>
            </div>
          `).join('')}
        </div>
      `;

      block.querySelectorAll('[data-open-measure-detail]').forEach((card) => {
        const index = Number(card.getAttribute('data-open-measure-detail'));
        const open = () => {
          const selected = measurementSeries[index];
          if (selected) openMeasurementDetail(selected);
        };

        card.addEventListener('click', open);
        card.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            open();
          }
        });
      });

      return block;
    }

    function renderMeasurementDetailModal() {
      if (!state.showMeasurementDetail || !state.measurementDetailItem) return null;

      const item = state.measurementDetailItem;
      const chartMarkup = renderMeasurementMiniChart(item.series, item.rates, escapeHtml(item.title), item.seriesDates, item.unit)
        .replace('class="measure-chart"', 'class="measure-chart measure-chart-large"');
      const overlay = document.createElement('section');
      overlay.className = 'modal-backdrop';
      overlay.innerHTML = `
        <div class="modal-card modal-card-wide" role="dialog" aria-modal="true" aria-label="Messung Detailansicht">
          <div class="measure-detail-head">
            <h3>${escapeHtml(item.title)}</h3>
            <div class="value-pill">${escapeHtml(item.value)}</div>
          </div>
          ${chartMarkup}
          <div class="small">${escapeHtml(item.note)}</div>
          <div class="toggle-row">
            <button class="btn-toggle" id="closeMeasurementDetail" type="button">Schließen</button>
          </div>
        </div>
      `;

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
          closeMeasurementDetail();
        }
      });

      overlay.querySelector('#closeMeasurementDetail')?.addEventListener('click', () => {
        closeMeasurementDetail();
      });

      return overlay;
    }

    function renderTrainingPlan() {
      const block = document.createElement('section');
      block.className = 'block';

      const allPlanItems = getTrainingPlanEntries();
      const weekdayOrder = getWeekdayOrder();
      const weekdayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
      const todayName = weekdayNames[new Date().getDay()];
      const tomorrowName = weekdayNames[(new Date().getDay() + 1) % 7];

      const groupedPlanItems = weekdayOrder
        .map((day) => ({
          day,
          entries: allPlanItems.filter((item) => item.day === day)
        }))
        .filter((group) => group.entries.length > 0);

      const visiblePlanGroups = state.showAllTraining
        ? groupedPlanItems
        : [
            groupedPlanItems.find((group) => group.day === todayName),
            groupedPlanItems.find((group) => group.day === tomorrowName)
          ].filter(Boolean);

      const fallbackPlanGroups = visiblePlanGroups.length > 0
        ? visiblePlanGroups
        : groupedPlanItems.slice(0, 2);

      block.innerHTML = `
        <h2>Trainingsplan</h2>
        ${state.trainingPlanNotice ? `<div class="small" style="margin-bottom:10px; color: var(--success); font-weight:700;">${state.trainingPlanNotice}</div>` : ''}
        ${state.trainingNotice ? `<div class="small" style="margin-bottom:10px; color: var(--success); font-weight:700;">${state.trainingNotice}</div>` : ''}
        <div class="plan-grid">
          ${fallbackPlanGroups.map((group) => `
            <div class="plan-card ${group.day === todayName ? 'today' : ''}">
              <div class="day-row">
                <div class="day">${escapeHtml(group.day)}</div>
                ${group.day === todayName ? '<span class="today-pill">Heute</span>' : ''}
              </div>
              <div class="plan-entry-list">
                ${group.entries.map((entry) => `
                  <div class="plan-entry-item">
                    <div class="meta">${escapeHtml(entry.focus)} • ${escapeHtml(entry.duration)}</div>
                    <div class="small">${escapeHtml(entry.note).replace(/\n/g, '<br />')}</div>
                    ${!IS_READ_ONLY_VIEW && group.day === todayName ? `<button class="mini-btn" data-apply-training-entry="${entry.id}" type="button">Training übernehmen</button>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="toggle-row" style="margin-top: 12px;">
          <button class="toggle-btn ${state.showAllTraining ? 'on' : ''}" id="trainingMoreBtn" type="button">${state.showAllTraining ? 'Weniger' : 'Mehr'}</button>
          ${IS_READ_ONLY_VIEW ? '' : '<button class="btn-secondary" id="editTrainingPlanBtn" type="button">Trainingsplan bearbeiten</button>'}
        </div>
      `;

      const trainingMoreBtn = block.querySelector('#trainingMoreBtn');
      if (trainingMoreBtn) {
        trainingMoreBtn.addEventListener('click', () => {
          state.showAllTraining = !state.showAllTraining;
          renderAll();
        });
      }

      block.querySelector('#editTrainingPlanBtn')?.addEventListener('click', () => {
        openTrainingPlanEditor();
      });

      block.querySelectorAll('[data-apply-training-entry]').forEach((button) => {
        button.addEventListener('click', () => {
          const entryId = Number(button.getAttribute('data-apply-training-entry'));
          const selectedPlan = allPlanItems.find((item) => Number(item.id) === entryId);
          if (!selectedPlan) return;
          openTrainingForm({
            date: getTodayIsoDate(),
            trainingText: `${selectedPlan.focus}\n${selectedPlan.note}`,
            duration: selectedPlan.duration,
            limitation: '',
            loadLevel: '3',
            painLevel: '1',
            sourceDay: selectedPlan.day,
            sourcePlanEntryId: selectedPlan.id
          });
        });
      });

      return block;
    }

    function renderRecentTrainingEntriesBlock() {
      const block = document.createElement('section');
      block.className = 'block';

      const entries = Array.isArray(data.recentTrainingEntries) ? data.recentTrainingEntries : [];
      if (entries.length === 0) {
        block.innerHTML = `
          <h2>Letzte absolvierte Trainings</h2>
          <div class="small">Noch keine absolvierten Trainings gespeichert.</div>
        `;
        return block;
      }

      block.innerHTML = `
        <h2>Letzte absolvierte Trainings</h2>
        <div class="training-history-list">
          ${entries.map((entry) => {
            const limitation = String(entry?.limitation || '').trim();
            const sourceDay = String(entry?.sourceDay || '').trim();
            const hasPlanReference = String(entry?.planFocus || '').trim() !== '' || String(entry?.planNote || '').trim() !== '';
            const loadTone = getSeverityTone(entry.loadLevel);
            const painTone = getSeverityTone(entry.painLevel);
            return `
              <div class="training-history-card">
                <div class="training-history-head">
                  <div class="goal-title">${escapeHtml(String(entry.date || '---'))}</div>
                  <div class="training-history-duration">${escapeHtml(formatDurationClock(parseDurationMinutes(entry.duration, entry.durationMinutes)))}</div>
                </div>
                ${sourceDay ? `<div class="goal-line">Aus Plan: <strong>${escapeHtml(sourceDay)}</strong></div>` : ''}
                <div class="training-history-text">${escapeHtml(String(entry.trainingText || '')).replace(/\n/g, '<br />')}</div>
                ${limitation ? `<div class="goal-line">Einschränkung: <strong>${escapeHtml(limitation)}</strong></div>` : ''}
                ${hasPlanReference ? `
                  <details class="training-plan-details">
                    <summary>Geplanten Eintrag ansehen</summary>
                    <div class="goal-line">Tag: <strong>${escapeHtml(String(entry.planDay || sourceDay || '---'))}</strong></div>
                    <div class="goal-line">Gültig ab: <strong>${escapeHtml(formatDateTimeText(entry.planValidFrom))}</strong></div>
                    ${String(entry.planFocus || '').trim() ? `<div class="goal-line">Fokus: <strong>${escapeHtml(String(entry.planFocus || ''))}</strong></div>` : ''}
                    ${String(entry.planDuration || '').trim() ? `<div class="goal-line">Dauer: <strong>${escapeHtml(String(entry.planDuration || ''))}</strong></div>` : ''}
                    ${String(entry.planNote || '').trim() ? `<div class="training-history-text">${escapeHtml(String(entry.planNote || '')).replace(/\n/g, '<br />')}</div>` : ''}
                  </details>
                ` : ''}
                <div class="training-meta-pills">
                  <span class="training-meta-pill ${loadTone}">${escapeHtml(getLoadLevelDisplay(entry.loadLevel))}</span>
                  <span class="training-meta-pill ${painTone}">${escapeHtml(getPainLevelDisplay(entry.painLevel))}</span>
                  <span class="training-meta-pill muted">Erfasst ${escapeHtml(formatDateTimeText(entry.createdAt))}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      return block;
    }

    function renderTrainingFormModal() {
      if (IS_READ_ONLY_VIEW) return null;
      if (!state.showTrainingForm || !state.trainingForm) return null;

      const overlay = document.createElement('section');
      overlay.className = 'modal-backdrop';
      overlay.innerHTML = `
        <div class="modal-card" role="dialog" aria-modal="true" aria-label="Training erfassen">
          <h3>Training erfassen</h3>
          <form id="trainingForm" class="form-grid">
            <div class="field">
              <label for="trainingDate">Datum</label>
              <input id="trainingDate" name="date" type="date" value="${state.trainingForm.date}" required />
            </div>
            <div class="field">
              <label for="trainingText">Trainingstext</label>
              <textarea id="trainingText" name="trainingText" required>${state.trainingForm.trainingText}</textarea>
            </div>
            <div class="field">
              <label for="trainingDuration">Dauer (hh:mm)</label>
              <input id="trainingDuration" name="durationClock" type="time" min="00:01" max="23:59" step="60" value="${state.trainingForm.durationMinutes > 0 ? formatDurationClock(state.trainingForm.durationMinutes) : ''}" required />
            </div>
            <div class="field">
              <label for="trainingLimitation">Einschraenkung</label>
              <textarea id="trainingLimitation" name="limitation">${state.trainingForm.limitation}</textarea>
            </div>
            <div class="field">
              <label for="loadLevel">Belastung</label>
              <select id="loadLevel" name="loadLevel" required>
                <option value="1" ${state.trainingForm.loadLevel === '1' ? 'selected' : ''}>1 😀 Sehr leicht</option>
                <option value="2" ${state.trainingForm.loadLevel === '2' ? 'selected' : ''}>2 🙂 Leicht</option>
                <option value="3" ${state.trainingForm.loadLevel === '3' ? 'selected' : ''}>3 😐 Mittel</option>
                <option value="4" ${state.trainingForm.loadLevel === '4' ? 'selected' : ''}>4 😓 Anstrengend</option>
                <option value="5" ${state.trainingForm.loadLevel === '5' ? 'selected' : ''}>5 😵 Sehr hart</option>
              </select>
            </div>
            <div class="field">
              <label for="painLevel">Schmerzfaktor</label>
              <select id="painLevel" name="painLevel" required>
                <option value="1" ${state.trainingForm.painLevel === '1' ? 'selected' : ''}>1 😀 Kein Schmerz</option>
                <option value="2" ${state.trainingForm.painLevel === '2' ? 'selected' : ''}>2 🙂 Leicht</option>
                <option value="3" ${state.trainingForm.painLevel === '3' ? 'selected' : ''}>3 😐 Mittel</option>
                <option value="4" ${state.trainingForm.painLevel === '4' ? 'selected' : ''}>4 😣 Stark</option>
                <option value="5" ${state.trainingForm.painLevel === '5' ? 'selected' : ''}>5 😖 Sehr stark</option>
              </select>
            </div>
            <div class="toggle-row" style="margin-top: 4px;">
              <button class="btn-primary" type="submit">In DB speichern</button>
              <button class="btn-toggle" id="cancelTrainingForm" type="button">Abbrechen</button>
            </div>
          </form>
        </div>
      `;

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeTrainingForm();
      });

      const cancelBtn = overlay.querySelector('#cancelTrainingForm');
      cancelBtn?.addEventListener('click', () => closeTrainingForm());

      const form = overlay.querySelector('#trainingForm');
      form?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const durationClock = String(formData.get('durationClock') || '');
        const durationParts = durationClock.split(':').map(Number);
        const durationMinutes = (durationParts[0] || 0) * 60 + (durationParts[1] || 0);
        const payload = {
          action: 'save_training',
          date: String(formData.get('date') || ''),
          trainingText: String(formData.get('trainingText') || ''),
          duration: formatDurationClock(durationMinutes),
          durationMinutes,
          limitation: String(formData.get('limitation') || ''),
          loadLevel: Number(formData.get('loadLevel') || 3),
          painLevel: Number(formData.get('painLevel') || 1),
          sourceDay: state.trainingForm?.sourceDay || '',
          sourcePlanEntryId: Number(state.trainingForm?.sourcePlanEntryId || 0)
        };

        try {
          const response = await fetch(buildDataApiUrl(), jsonPostOptions(payload));
          const result = await response.json();
          if (!response.ok || !result.ok) {
            throw new Error(result.error || `HTTP ${response.status}`);
          }
          state.trainingNotice = 'Training wurde übernommen und gespeichert.';
          state.showTrainingForm = false;
          state.trainingForm = null;
          renderAll();
        } catch (error) {
          window.alert(`Speichern fehlgeschlagen: ${error.message}`);
        }
      });

      return overlay;
    }

    function renderTrainingPlanEditorModal() {
      if (IS_READ_ONLY_VIEW) return null;
      if (!state.showTrainingPlanEditor || !state.trainingPlanForm) return null;

      const overlay = document.createElement('section');
      overlay.className = 'modal-backdrop';
      const weekdayOptions = getWeekdayOrder();
      const entryRows = Array.isArray(state.trainingPlanForm.entries) ? state.trainingPlanForm.entries : [];

      overlay.innerHTML = `
        <div class="modal-card modal-card-wide" role="dialog" aria-modal="true" aria-label="Trainingsplan bearbeiten">
          <h3>Trainingsplan bearbeiten</h3>
          <div class="small">Beim Speichern wird der bisher aktive Plan deaktiviert und eine neue Version ab dem gewählten Zeitpunkt angelegt.</div>
          <form id="trainingPlanForm" class="form-grid">
            <div class="field">
              <label for="trainingPlanValidFrom">Gültig ab</label>
              <input id="trainingPlanValidFrom" name="validFrom" type="datetime-local" value="${escapeHtml(state.trainingPlanForm.validFrom || `${getTodayIsoDate()}T00:00`)}" required />
            </div>
            <div class="training-plan-editor-list">
              ${entryRows.map((entry, index) => `
                <div class="training-plan-row">
                  <div class="training-plan-row-head">
                    <strong>Eintrag ${index + 1}</strong>
                    <button class="remove-btn" data-remove-plan-entry="${index}" type="button" aria-label="Plan-Eintrag entfernen">🗑</button>
                  </div>
                  <div class="profile-editor-grid">
                    <div class="field">
                      <label for="plan-day-${index}">Tag</label>
                      <select id="plan-day-${index}" name="plan-day-${index}" required>
                        ${weekdayOptions.map((day) => `<option value="${escapeHtml(day)}" ${entry.day === day ? 'selected' : ''}>${escapeHtml(day)}</option>`).join('')}
                      </select>
                    </div>
                    <div class="field">
                      <label for="plan-duration-${index}">Dauer</label>
                      <input id="plan-duration-${index}" name="plan-duration-${index}" type="text" value="${escapeHtml(entry.duration || '')}" required />
                    </div>
                  </div>
                  <div class="field">
                    <label for="plan-focus-${index}">Fokus</label>
                    <input id="plan-focus-${index}" name="plan-focus-${index}" type="text" value="${escapeHtml(entry.focus || '')}" required />
                  </div>
                  <div class="field">
                    <label for="plan-note-${index}">Beschreibung</label>
                    <textarea id="plan-note-${index}" name="plan-note-${index}" required>${escapeHtml(entry.note || '')}</textarea>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="toggle-row">
              <button class="btn-toggle" id="addTrainingPlanEntryBtn" type="button">Plan-Eintrag hinzufügen</button>
            </div>
            <div class="toggle-row">
              <button class="btn-primary" type="submit">Trainingsplan speichern</button>
              <button class="btn-toggle" id="cancelTrainingPlanForm" type="button">Abbrechen</button>
            </div>
          </form>
        </div>
      `;

      const syncPlanEntriesFromForm = () => {
        const rows = Array.from(overlay.querySelectorAll('.training-plan-row'));
        state.trainingPlanForm.entries = rows.map((row, index) => {
          const existing = (state.trainingPlanForm.entries || [])[index] || {};
          return {
            uid: existing.uid || `${Date.now()}-plan-row-${index}`,
            id: Number(existing.id || 0),
            day: String(row.querySelector(`[name="plan-day-${index}"]`)?.value || existing.day || ''),
            duration: String(row.querySelector(`[name="plan-duration-${index}"]`)?.value || existing.duration || ''),
            focus: String(row.querySelector(`[name="plan-focus-${index}"]`)?.value || existing.focus || ''),
            note: String(row.querySelector(`[name="plan-note-${index}"]`)?.value || existing.note || '')
          };
        });
      };

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeTrainingPlanEditor();
      });

      overlay.querySelector('#cancelTrainingPlanForm')?.addEventListener('click', () => closeTrainingPlanEditor());

      overlay.querySelectorAll('[data-remove-plan-entry]').forEach((button) => {
        button.addEventListener('click', () => {
          syncPlanEntriesFromForm();
          const index = Number(button.getAttribute('data-remove-plan-entry'));
          state.trainingPlanForm.entries = (state.trainingPlanForm.entries || []).filter((_, rowIndex) => rowIndex !== index);
          renderAll();
        });
      });

      overlay.querySelector('#addTrainingPlanEntryBtn')?.addEventListener('click', () => {
        syncPlanEntriesFromForm();
        const currentEntries = state.trainingPlanForm.entries || [];
        const usedDays = new Set(currentEntries.map((entry) => String(entry.day || '')));
        const nextDay = weekdayOptions.find((day) => !usedDays.has(day)) || weekdayOptions[0];
        state.trainingPlanForm.entries = [
          ...currentEntries,
          {
            uid: `${Date.now()}-plan-new-${currentEntries.length}`,
            id: 0,
            day: nextDay,
            duration: '',
            focus: '',
            note: ''
          }
        ];
        renderAll();
      });

      overlay.querySelector('#trainingPlanForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        syncPlanEntriesFromForm();

        const formData = new FormData(event.currentTarget);
        const entries = (state.trainingPlanForm.entries || []).map((entry, index) => ({
          day: String(formData.get(`plan-day-${index}`) || entry.day || ''),
          duration: String(formData.get(`plan-duration-${index}`) || entry.duration || '').trim(),
          focus: String(formData.get(`plan-focus-${index}`) || entry.focus || '').trim(),
          note: String(formData.get(`plan-note-${index}`) || entry.note || '').trim()
        })).filter((entry) => entry.day && entry.duration && entry.focus && entry.note);

        if (entries.length === 0) {
          window.alert('Bitte mindestens einen vollständigen Plan-Eintrag angeben.');
          return;
        }

        try {
          const response = await fetch(buildDataApiUrl(), jsonPostOptions({
            action: 'save_training_plan',
            validFrom: String(formData.get('validFrom') || ''),
            entries
          }));
          const result = await response.json();
          if (!response.ok || !result.ok) {
            throw new Error(result.error || `HTTP ${response.status}`);
          }

          state.trainingPlanNotice = 'Trainingsplan wurde versioniert gespeichert.';
          state.showTrainingPlanEditor = false;
          state.trainingPlanForm = null;
          await loadDashboardData();
        } catch (error) {
          window.alert(`Speichern fehlgeschlagen: ${error.message}`);
        }
      });

      return overlay;
    }

    function renderMeasurementFormModal() {
      if (IS_READ_ONLY_VIEW) return null;
      if (!state.showMeasurementForm || !state.measurementForm) return null;

      const overlay = document.createElement('section');
      overlay.className = 'modal-backdrop';
      const measurementTypes = getMeasurementTypes();
      const entryRows = state.measurementForm.entries || [];

      overlay.innerHTML = `
        <div class="modal-card" role="dialog" aria-modal="true" aria-label="Messung erfassen">
          <h3>Messung erfassen</h3>
          ${state.measurementNotice ? `<div class="small" style="color: var(--success); font-weight:700;">${state.measurementNotice}</div>` : ''}
          <form id="measurementForm" class="form-grid">
            <div class="plan-grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="field">
                <label for="measurementDate">Datum</label>
                <input id="measurementDate" name="date" type="date" value="${state.measurementForm.date}" required />
              </div>
              <div class="field">
                <label for="measurementTime">Uhrzeit</label>
                <input id="measurementTime" name="time" type="time" value="${state.measurementForm.time || getCurrentTimeHHMM()}" required />
              </div>
            </div>
            <div class="field">
              <label>Messwerte</label>
              <div class="helper-line">Default sind die zuletzt genutzten Messwerte. Du kannst Zeilen entfernen oder weitere Typen hinzufügen.</div>
            </div>
            <div class="measurement-entries-grid">
            ${entryRows.map((entry, index) => {
              const options = measurementTypes.map(type => `<option value="${type.id}" ${Number(entry.typeId) === Number(type.id) ? 'selected' : ''}>${escapeHtml(type.name)}</option>`).join('');
              const selectedType = measurementTypes.find(type => Number(type.id) === Number(entry.typeId));
              const unit = selectedType?.unit || entry.unit || '';
              const hasValue = entry.value !== null && entry.value !== undefined && String(entry.value).trim() !== '';
              const numericValue = Number(entry.value);
              const valueForInput = hasValue && Number.isFinite(numericValue) ? String(numericValue) : '';
              return `
                <div class="measurement-entry-card">
                  <div class="measurement-row" data-entry-index="${index}">
                    <select name="typeId-${index}" required>
                      ${options}
                    </select>
                    <input name="value-${index}" type="number" step="0.1" value="${valueForInput}" required />
                    <div class="unit-badge">${unit || '-'}</div>
                    <button class="remove-btn" data-remove-entry="${index}" type="button" aria-label="Messwert entfernen">🗑</button>
                  </div>
                </div>
              `;
            }).join('')}
            </div>
            <div class="toggle-row" style="margin-top: 6px;">
              <button class="btn-toggle" id="addMeasurementTypeBtn" type="button">Messwerttyp hinzufügen</button>
            </div>
            <div class="toggle-row" style="margin-top: 4px;">
              <button class="btn-primary" type="submit">Messung in DB speichern</button>
              <button class="btn-toggle" id="cancelMeasurementForm" type="button">Abbrechen</button>
            </div>
          </form>
        </div>
      `;

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeMeasurementForm();
      });

      const cancelBtn = overlay.querySelector('#cancelMeasurementForm');
      cancelBtn?.addEventListener('click', () => closeMeasurementForm());

      const syncEntriesFromForm = () => {
        const rows = Array.from(overlay.querySelectorAll('.measurement-row'));
        state.measurementForm.entries = rows.map((row, index) => {
          const existing = (state.measurementForm.entries || [])[index] || {};
          const typeSelect = row.querySelector(`select[name="typeId-${index}"]`);
          const valueInput = row.querySelector(`input[name="value-${index}"]`);
          const selectedTypeId = Number(typeSelect?.value || existing.typeId || 0);
          const selectedType = measurementTypes.find((item) => Number(item.id) === selectedTypeId);
          const inputValueRaw = String(valueInput?.value || '').replace(',', '.');
          const inputValue = Number(inputValueRaw);

          return {
            uid: existing.uid || `${Date.now()}-${index}`,
            typeId: selectedTypeId,
            typeName: selectedType?.name || existing.typeName || '',
            unit: selectedType?.unit || existing.unit || '',
            value: Number.isFinite(inputValue) ? inputValue : existing.value
          };
        });
      };

      overlay.querySelectorAll('.measurement-row').forEach((row, index) => {
        const typeSelect = row.querySelector(`select[name="typeId-${index}"]`);
        const valueInput = row.querySelector(`input[name="value-${index}"]`);
        const unitBadge = row.querySelector('.unit-badge');

        typeSelect?.addEventListener('change', () => {
          const selectedTypeId = Number(typeSelect.value || 0);
          const selectedType = measurementTypes.find((item) => Number(item.id) === selectedTypeId);
          const latestValue = getLatestMeasurementValueByTypeId(selectedTypeId);

          if (unitBadge) {
            unitBadge.textContent = selectedType?.unit || '-';
          }

          if (valueInput) {
            valueInput.value = Number.isFinite(latestValue) ? String(latestValue) : '';
          }

          const existingEntry = (state.measurementForm.entries || [])[index] || {};
          if (state.measurementForm.entries && state.measurementForm.entries[index]) {
            state.measurementForm.entries[index] = {
              ...existingEntry,
              typeId: selectedTypeId,
              typeName: selectedType?.name || existingEntry.typeName || '',
              unit: selectedType?.unit || existingEntry.unit || '',
              value: Number.isFinite(latestValue) ? latestValue : ''
            };
          }
        });
      });

      overlay.querySelectorAll('[data-remove-entry]').forEach((button) => {
        button.addEventListener('click', () => {
          syncEntriesFromForm();
          const index = Number(button.getAttribute('data-remove-entry'));
          state.measurementForm.entries = (state.measurementForm.entries || []).filter((_, i) => i !== index);
          renderAll();
        });
      });

      const addButton = overlay.querySelector('#addMeasurementTypeBtn');
      addButton?.addEventListener('click', () => {
        syncEntriesFromForm();
        const currentEntries = state.measurementForm.entries || [];
        const usedTypeIds = new Set(currentEntries.map(entry => Number(entry.typeId)));
        const available = measurementTypes.find(type => !usedTypeIds.has(Number(type.id))) || measurementTypes[0];
        if (!available) return;
        const latestValue = getLatestMeasurementValueByTypeId(Number(available.id));
        state.measurementForm.entries = [
          ...currentEntries,
          {
            uid: `${Date.now()}-new-${currentEntries.length}`,
            typeId: Number(available.id),
            typeName: available.name,
            unit: available.unit,
            value: Number.isFinite(latestValue) ? latestValue : ''
          }
        ];
        renderAll();
      });

      const form = overlay.querySelector('#measurementForm');
      form?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const entries = (state.measurementForm.entries || []).map((entry, index) => {
          const typeId = Number(formData.get(`typeId-${index}`) || entry.typeId || 0);
          const type = measurementTypes.find(item => Number(item.id) === typeId);
          const valueRaw = String(formData.get(`value-${index}`) || '0').replace(',', '.');
          const value = Number(valueRaw);
          return {
            typeId,
            typeName: type?.name || entry.typeName || '',
            unit: type?.unit || entry.unit || '',
            value: Number.isFinite(value) ? value : 0
          };
        }).filter(item => item.typeId > 0);

        if (entries.length === 0) {
          window.alert('Bitte mindestens einen Messwert erfassen.');
          return;
        }

        const payload = {
          action: 'save_measurement',
          date: String(formData.get('date') || ''),
          time: String(formData.get('time') || ''),
          entries
        };

        try {
          const response = await fetch(buildDataApiUrl(), jsonPostOptions(payload));
          const result = await response.json();
          if (!response.ok || !result.ok) {
            throw new Error(result.error || `HTTP ${response.status}`);
          }

          state.measurementNotice = 'Messung wurde gespeichert.';
          state.showMeasurementForm = false;
          state.measurementForm = null;
          await loadDashboardData();
          renderAll();
        } catch (error) {
          window.alert(`Speichern fehlgeschlagen: ${error.message}`);
        }
      });

      return overlay;
    }

    function renderRewardModal() {
      if (IS_READ_ONLY_VIEW) return null;
      if (!state.showRewardModal || !state.rewardGoalId) return null;

      const overlay = document.createElement('section');
      overlay.className = 'modal-backdrop';
      overlay.innerHTML = `
        <div class="modal-card" role="dialog" aria-modal="true" aria-label="Belohnung erfassen">
          <h3>Belohnung erhalten</h3>
          <div class="small">Ziel: <strong>${escapeHtml(state.rewardGoalTitle)}</strong></div>
          <form id="rewardForm" class="form-grid">
            <div class="field">
              <label for="rewardText">Was hast du dir gegönnt?</label>
              <textarea id="rewardText" name="rewardText" required placeholder="z. B. Kinobesuch, neues Shirt, Ausflug ..."></textarea>
            </div>
            <div class="toggle-row" style="margin-top: 4px;">
              <button class="btn-primary" type="submit">Belohnung speichern</button>
              <button class="btn-toggle" id="cancelRewardForm" type="button">Abbrechen</button>
            </div>
          </form>
        </div>
      `;

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeRewardModal();
      });

      overlay.querySelector('#cancelRewardForm')?.addEventListener('click', () => closeRewardModal());

      overlay.querySelector('#rewardForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const payload = {
          action: 'save_goal_reward',
          goalId: state.rewardGoalId,
          rewardText: String(formData.get('rewardText') || '').trim()
        };

        try {
          const response = await fetch(buildDataApiUrl(), jsonPostOptions(payload));
          const result = await response.json();
          if (!response.ok || !result.ok) {
            throw new Error(result.error || `HTTP ${response.status}`);
          }

          state.goalsNotice = 'Belohnung wurde gespeichert. Weiter so!';
          state.showRewardModal = false;
          state.rewardGoalId = null;
          state.rewardGoalTitle = '';
          await loadDashboardData();
        } catch (error) {
          window.alert(`Speichern fehlgeschlagen: ${error.message}`);
        }
      });

      return overlay;
    }

    function renderGoalEditorModal() {
      if (IS_READ_ONLY_VIEW) return null;
      if (!state.showGoalEditor || !state.goalForm) return null;

      const measurementTypes = getMeasurementTypes();
      if (measurementTypes.length === 0) return null;

      const selectedTypeId = Number(state.goalForm.typeId || measurementTypes[0].id);
      const selectedType = measurementTypes.find((type) => Number(type.id) === selectedTypeId) || measurementTypes[0];
      const unit = String(selectedType?.unit || '').trim();
      const mode = String(state.goalForm.mode || 'create') === 'edit' ? 'edit' : 'create';

      const overlay = document.createElement('section');
      overlay.className = 'modal-backdrop';
      overlay.innerHTML = `
        <div class="modal-card" role="dialog" aria-modal="true" aria-label="Ziel bearbeiten">
          <h3>${mode === 'edit' ? 'Ziel bearbeiten' : 'Neues Ziel erstellen'}</h3>
          <form id="goalEditorForm" class="form-grid">
            <div class="field">
              <label for="goalTypeId">Messwerttyp</label>
              <select id="goalTypeId" name="typeId" required>
                ${measurementTypes.map((type) => `
                  <option value="${Number(type.id)}" ${Number(type.id) === selectedTypeId ? 'selected' : ''}>${escapeHtml(String(type.name || 'Messwert'))}${String(type.unit || '').trim() ? ` (${escapeHtml(String(type.unit))})` : ''}</option>
                `).join('')}
              </select>
            </div>
            <div class="field">
              <label id="goalTargetLabel" for="goalTargetValue">Zielwert ${unit ? `(${escapeHtml(unit)})` : ''}</label>
              <input id="goalTargetValue" name="targetValue" type="number" min="0.1" step="0.1" required value="${escapeHtml(String(state.goalForm.targetValue || ''))}" />
            </div>
            <div class="field">
              <label for="goalText">Zielbeschreibung</label>
              <input id="goalText" name="goalText" type="text" maxlength="160" required value="${escapeHtml(String(state.goalForm.goalText || ''))}" placeholder="z. B. Uhu erreichen" />
            </div>
            <div class="toggle-row" style="margin-top: 4px;">
              <button class="btn-primary" type="submit">${mode === 'edit' ? 'Änderungen speichern' : 'Ziel speichern'}</button>
              <button class="btn-toggle" id="cancelGoalEditor" type="button">Abbrechen</button>
            </div>
          </form>
        </div>
      `;

      overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeGoalEditor();
      });

      overlay.querySelector('#cancelGoalEditor')?.addEventListener('click', () => closeGoalEditor());

      overlay.querySelector('#goalTypeId')?.addEventListener('change', (event) => {
        const typeId = Number(event.currentTarget.value || 0);
        const type = measurementTypes.find((item) => Number(item.id) === typeId);
        const selectedUnit = String(type?.unit || '').trim();
        const label = overlay.querySelector('#goalTargetLabel');
        if (label) label.textContent = `Zielwert${selectedUnit ? ` (${selectedUnit})` : ''}`;
      });

      overlay.querySelector('#goalEditorForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const selectedTypeId = Number(formData.get('typeId') || 0);
        const targetValueRaw = String(formData.get('targetValue') || '').trim();
        const targetValue = Number(targetValueRaw.replace(',', '.'));

        if (mode === 'edit' && state.goalForm?.initiallyRewarded) {
          const currentValueMaps = buildGoalCurrentValueMaps();
          const selectedType = measurementTypes.find((type) => Number(type.id) === selectedTypeId) || null;
          const typeNameKey = normalizeTypeName(String(selectedType?.name || ''));
          const currentValue = currentValueMaps.byTypeId.get(selectedTypeId) ?? currentValueMaps.byTypeName.get(typeNameKey);
          const willBeAchieved = Number.isFinite(currentValue) && Number.isFinite(targetValue)
            ? Number(targetValue) >= Number(currentValue)
            : false;

          if (!willBeAchieved) {
            const shouldProceed = window.confirm('Achtung: Dieses Ziel ist bereits belohnt. Durch die Änderung wäre es wieder nicht erreicht und die Belohnung wird entfernt. Trotzdem speichern?');
            if (!shouldProceed) {
              return;
            }
          }
        }

        const payload = {
          action: mode === 'edit' ? 'update_goal' : 'create_goal',
          typeId: selectedTypeId,
          targetValue: targetValueRaw,
          goalText: String(formData.get('goalText') || '').trim()
        };

        if (mode === 'edit') {
          payload.goalId = Number(state.goalForm.goalId || 0);
        }

        try {
          const response = await fetch(buildDataApiUrl(), jsonPostOptions(payload));
          const result = await response.json();
          if (!response.ok || !result.ok) {
            throw new Error(result.error || `HTTP ${response.status}`);
          }

          state.goalsNotice = mode === 'edit' ? 'Ziel wurde aktualisiert.' : 'Neues Ziel wurde erstellt.';
          state.showGoalEditor = false;
          state.goalForm = null;
          await loadDashboardData();
        } catch (error) {
          window.alert(`Speichern fehlgeschlagen: ${error.message}`);
        }
      });

      return overlay;
    }

    async function loadDashboardData() {
      try {
        const response = await fetch(buildDataApiUrl(), { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json();
        if (payload && typeof payload === 'object') {
          const previousSet = new Set((state.knownAchievedGoalIds || []).map((id) => Number(id)));
          const incomingGoals = Array.isArray(payload.goals) ? payload.goals : [];
          const nextAchievedIds = incomingGoals
            .filter((goal) => !!goal.achievedAt)
            .map((goal) => Number(goal.id));

          if (state.hasLoadedServerData) {
            const newIds = nextAchievedIds.filter((id) => !previousSet.has(id));
            state.recentlyAchievedGoalIds = newIds;
            if (newIds.length > 0) {
              const names = incomingGoals
                .filter((goal) => newIds.includes(Number(goal.id)))
                .map((goal) => escapeHtml(goal.goalText))
                .slice(0, 3)
                .join(', ');
              state.goalCelebrationText = `Goal erreicht: ${names}`;
              setTimeout(() => {
                state.goalCelebrationText = '';
                state.recentlyAchievedGoalIds = [];
                renderAll();
              }, 4500);
            }
          }

          state.knownAchievedGoalIds = nextAchievedIds;

          data = payload;
        }
      } catch (error) {
        console.warn('Dashboard data could not be loaded:', error);
        data.source = 'error';
      } finally {
        state.hasLoadedServerData = true;
        renderAll();
      }
    }

    function getAnalysisCutoff() {
      if (state.analysisPeriod === 'all') return null;
      const days = Number(state.analysisPeriod || 30);
      const cutoff = new Date();
      cutoff.setHours(0, 0, 0, 0);
      cutoff.setDate(cutoff.getDate() - Math.max(1, days) + 1);
      return cutoff;
    }

    function dateToIsoLocal(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function exceptionReasonLabel(reason) {
      return ({ illness: 'Krank', pain_pause: 'Pause wegen Beschwerden', vacation: 'Urlaub', other: 'Sonstiger Grund' })[reason] || 'Ausnahme';
    }

    function buildAnalysis() {
      const cutoff = getAnalysisCutoff();
      const cutoffTs = cutoff ? cutoff.getTime() : -Infinity;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const trainings = (Array.isArray(data.recentTrainingEntries) ? data.recentTrainingEntries : [])
        .filter((entry) => parseChartDateToTimestamp(entry.date) >= cutoffTs);
      const exceptions = Array.isArray(data.trainingExceptions) ? data.trainingExceptions : [];
      const plans = Array.isArray(data.trainingPlanHistory) ? data.trainingPlanHistory : [];
      const weekdayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
      let completed = 0;
      let missed = 0;
      const consumedTrainingIds = new Set();
      const calendarDays = {};
      const excused = { illness: 0, pain_pause: 0, vacation: 0, other: 0 };
      const firstPlanTs = plans.reduce((min, plan) => Math.min(min, parseChartDateToTimestamp(plan.validFrom)), Infinity);
      const loopStart = new Date(Math.max(cutoffTs, Number.isFinite(firstPlanTs) ? firstPlanTs : today.getTime()));
      loopStart.setHours(0, 0, 0, 0);

      for (let day = new Date(loopStart); day <= yesterday; day.setDate(day.getDate() + 1)) {
        const iso = dateToIsoLocal(day);
        const dayEnd = new Date(day); dayEnd.setHours(23, 59, 59, 999);
        const scheduled = plans.filter((plan) => {
          const validFrom = parseChartDateToTimestamp(plan.validFrom);
          const deactivated = plan.deactivatedAt ? parseChartDateToTimestamp(plan.deactivatedAt) : Infinity;
          return plan.day === weekdayNames[day.getDay()] && validFrom <= dayEnd.getTime() && deactivated > day.getTime();
        });
        calendarDays[iso] = calendarDays[iso] || { planned: 0, completed: 0, missed: 0, excused: 0, additional: 0 };
        calendarDays[iso].planned += scheduled.length;
        scheduled.forEach((plan) => {
          const performed = trainings.find((entry) => {
            if (consumedTrainingIds.has(Number(entry.id)) || String(entry.date) !== iso) return false;
            const linked = Number(entry.sourcePlanEntryId || 0) > 0;
            return Number(entry.sourcePlanEntryId) === Number(plan.id)
              || (linked && String(entry.sourceDay || entry.planDay || '') === String(plan.day));
          });
          if (performed) {
            consumedTrainingIds.add(Number(performed.id));
            calendarDays[iso].completed += 1;
            completed += 1;
            return;
          }
          const exception = exceptions.find((item) => String(item.dateFrom) <= iso && String(item.dateTo) >= iso);
          if (exception) {
            calendarDays[iso].excused += 1;
            excused[exception.reason] = (excused[exception.reason] || 0) + 1;
          } else {
            calendarDays[iso].missed += 1;
            missed += 1;
          }
        });
      }

      trainings.forEach((entry) => {
        const iso = String(entry.date || '');
        calendarDays[iso] = calendarDays[iso] || { planned: 0, completed: 0, missed: 0, excused: 0, additional: 0 };
        if (Number(entry.sourcePlanEntryId || 0) > 0 && !consumedTrainingIds.has(Number(entry.id))) {
          consumedTrainingIds.add(Number(entry.id));
          calendarDays[iso].planned += 1;
          calendarDays[iso].completed += 1;
          completed += 1;
        } else if (Number(entry.sourcePlanEntryId || 0) <= 0) {
          calendarDays[iso].additional += 1;
        }
      });

      const additional = trainings.filter((entry) => Number(entry.sourcePlanEntryId || 0) <= 0).length;
      const denominator = completed + missed;
      const completionRate = denominator > 0 ? Math.round((completed / denominator) * 100) : null;
      const points = [];
      (Array.isArray(data.weights) ? data.weights : []).forEach((weight, index) => {
        const ts = parseChartDateToTimestamp((data.dates || [])[index]);
        if (Number.isFinite(ts) && ts >= cutoffTs && Number.isFinite(Number(weight))) points.push({ value: Number(weight), ts });
      });
      points.sort((a, b) => a.ts - b.ts);
      const weightChange = points.length > 1 ? points[points.length - 1].value - points[0].value : null;
      const plateau = points.length >= 5 && weightChange !== null && Math.abs(weightChange) / points[0].value < 0.005;
      const avgLoad = trainings.length ? trainings.reduce((sum, entry) => sum + Number(entry.loadLevel || 0), 0) / trainings.length : null;
      const avgPain = trainings.length ? trainings.reduce((sum, entry) => sum + Number(entry.painLevel || 0), 0) / trainings.length : null;
      const totalMinutes = trainings.reduce((sum, entry) => sum + parseDurationMinutes(entry.duration, entry.durationMinutes), 0);
      const statements = [];
      if (weightChange !== null) {
        statements.push(weightChange < -0.05
          ? `Dein Gewicht ist im Zeitraum um ${Math.abs(weightChange).toFixed(1).replace('.', ',')} kg gesunken.`
          : weightChange > 0.05
            ? `Dein Gewicht ist im Zeitraum um ${weightChange.toFixed(1).replace('.', ',')} kg gestiegen. Einzelne Schwankungen sind normal.`
            : 'Dein Gewicht ist im betrachteten Zeitraum weitgehend stabil geblieben.');
      } else statements.push('Für eine belastbare Gewichtsaussage sind mindestens zwei Messungen im Zeitraum nötig.');
      if (plateau) statements.push('Der geglättete Verlauf deutet auf ein Plateau hin. Das macht deinen bisherigen Fortschritt nicht kleiner; Regelmäßigkeit zählt.');
      if (completionRate !== null) statements.push(`Du hast ${completed} geplante Einheiten absolviert; die Planerfüllung ohne entschuldigte Pausen liegt bei ${completionRate} %.`);
      if (additional > 0) statements.push(`${additional} frei eingetragene Einheiten werden separat als zusätzliche Aktivität berücksichtigt.`);
      if (missed > 0) statements.push(`${missed} ausgelassene Einheiten entscheiden nicht allein über den Fortschritt. Entscheidend ist die Konstanz über längere Zeit.`);
      if (avgPain !== null && avgPain >= 3) statements.push('Das durchschnittliche Schmerzempfinden ist erhöht. Bleib im schmerzfreien Bewegungsumfang und kläre anhaltende Beschwerden fachlich ab.');
      return { points, trainings, calendarDays, completed, missed, excused, additional, completionRate, weightChange, plateau, avgLoad, avgPain, totalMinutes, statements };
    }

    function getAnalysisTimeDomain(points, trainings) {
      const cutoff = getAnalysisCutoff();
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);
      const timestamps = [
        ...points.map((point) => point.ts),
        ...trainings.map((entry) => parseChartDateToTimestamp(entry.date))
      ].filter(Number.isFinite);
      let startTs = cutoff ? cutoff.getTime() : Math.min(...timestamps);
      if (!Number.isFinite(startTs)) {
        const fallback = new Date(todayEnd);
        fallback.setDate(fallback.getDate() - 29);
        fallback.setHours(0, 0, 0, 0);
        startTs = fallback.getTime();
      }
      return { startTs, endTs: Math.max(startTs + 86400000, todayEnd.getTime()) };
    }

    function analysisTimeX(timestamp, domain) {
      const plotLeft = 48;
      const plotRight = 580;
      return plotLeft + ((timestamp - domain.startTs) / (domain.endTs - domain.startTs)) * (plotRight - plotLeft);
    }

    function buildAnalysisExceptionBands(domain) {
      const plotTop = 12;
      const plotBottom = 122;
      return (Array.isArray(data.trainingExceptions) ? data.trainingExceptions : []).map((exception) => {
        const fromTs = parseChartDateToTimestamp(exception.dateFrom);
        const toDate = new Date(parseChartDateToTimestamp(exception.dateTo));
        toDate.setDate(toDate.getDate() + 1);
        const toTs = toDate.getTime();
        if (!Number.isFinite(fromTs) || !Number.isFinite(toTs) || toTs <= domain.startTs || fromTs >= domain.endTs) return '';
        const clippedFrom = Math.max(domain.startTs, fromTs);
        const clippedTo = Math.min(domain.endTs, toTs);
        const x = analysisTimeX(clippedFrom, domain);
        const width = Math.max(1, analysisTimeX(clippedTo, domain) - x);
        return `<rect class="analysis-exception-band" x="${x}" y="${plotTop}" width="${width}" height="${plotBottom - plotTop}" fill="#94a3b8" fill-opacity=".32"><title>Trainingsausnahme: ${escapeHtml(exceptionReasonLabel(exception.reason))}</title></rect>`;
      }).join('');
    }

    function buildAnalysisTimeLabels(domain) {
      const formatDate = (timestamp) => new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' }).format(new Date(timestamp));
      return `<text x="48" y="142" text-anchor="start" font-size="10" fill="#475569">${formatDate(domain.startTs)}</text>
        <text x="580" y="142" text-anchor="end" font-size="10" fill="#475569">${formatDate(domain.endTs)}</text>`;
    }

    function buildTrainingLoadChart(trainings, domain) {
      const ordered = [...trainings]
        .filter((entry) => Number.isFinite(parseChartDateToTimestamp(entry.date)))
        .sort((a, b) => parseChartDateToTimestamp(a.date) - parseChartDateToTimestamp(b.date));
      const y = (value) => 122 - (Math.max(1, Math.min(5, Number(value || 1))) - 1) * 27.5;
      const load = ordered.map((entry) => `${analysisTimeX(parseChartDateToTimestamp(entry.date), domain)},${y(entry.loadLevel)}`).join(' ');
      const pain = ordered.map((entry) => `${analysisTimeX(parseChartDateToTimestamp(entry.date), domain)},${y(entry.painLevel)}`).join(' ');
      return `<svg class="analysis-chart-svg" viewBox="0 0 600 150" role="img" aria-label="Belastung und Schmerz im Verlauf">
        ${buildAnalysisExceptionBands(domain)}
        ${[1,2,3,4,5].map((level) => `<line x1="48" y1="${y(level)}" x2="580" y2="${y(level)}" stroke="#cbd5e1" stroke-width="1"/><text x="42" y="${y(level) + 4}" text-anchor="end" font-size="10" fill="#475569">${level}</text>`).join('')}
        <line x1="48" y1="12" x2="48" y2="122" stroke="#64748b"/><line x1="48" y1="122" x2="580" y2="122" stroke="#64748b"/>
        ${buildAnalysisTimeLabels(domain)}
        ${ordered.length === 0 ? '<text x="314" y="72" text-anchor="middle" font-size="12" fill="#64748b">Noch keine Trainingswerte im Zeitraum.</text>' : ''}
        <polyline points="${load}" fill="none" stroke="#1e3a8a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <polyline points="${pain}" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    }

    function calendarMarkerSegments(day) {
      if (!day) return [];
      const done = Number(day.completed || 0);
      const missed = Number(day.missed || 0);
      const extra = Number(day.additional || 0);
      const excused = Number(day.excused || 0);
      return [
        { count: done, type: 'done', color: '#14532d' },
        { count: missed, type: 'missed', color: '#ef4444' },
        { count: extra, type: 'extra', color: '#60a5fa' },
        { count: excused, type: 'excused', color: '#d1d5db' }
      ].filter((segment) => segment.count > 0);
    }

    function calendarSectorPath(startFraction, endFraction) {
      const point = (fraction) => {
        const angle = fraction * Math.PI * 2 - Math.PI / 2;
        return [12 + 10.5 * Math.cos(angle), 12 + 10.5 * Math.sin(angle)];
      };
      const start = point(startFraction);
      const end = point(endFraction);
      const largeArc = endFraction - startFraction > 0.5 ? 1 : 0;
      return `M 12 12 L ${start[0].toFixed(3)} ${start[1].toFixed(3)} A 10.5 10.5 0 ${largeArc} 1 ${end[0].toFixed(3)} ${end[1].toFixed(3)} Z`;
    }

    function calendarMarkerMarkup(day, dayNumber) {
      const segments = calendarMarkerSegments(day);
      if (segments.length === 0) return `<span>${dayNumber}</span>`;
      const total = segments.reduce((sum, segment) => sum + segment.count, 0);
      let cursor = 0;
      const shapes = segments.map((segment) => {
        const start = cursor;
        cursor += segment.count / total;
        const shape = segments.length === 1
          ? '<circle cx="12" cy="12" r="10.5"/>'
          : `<path d="${calendarSectorPath(start, cursor)}"/>`;
        return `<g class="calendar-marker-color marker-${segment.type}" fill="${segment.color}">${shape}</g>`;
      }).join('');
      return `<svg class="day-circle" viewBox="0 0 24 24" role="img" aria-hidden="true">
        ${shapes}<circle class="calendar-marker-outline" cx="12" cy="12" r="10.5"/><text x="12" y="12">${dayNumber}</text>
      </svg>`;
    }

    function calendarLegendMarker(type) {
      return calendarMarkerMarkup({
        completed: type === 'done' ? 1 : 0,
        missed: type === 'missed' ? 1 : 0,
        additional: type === 'extra' ? 1 : 0,
        excused: type === 'excused' ? 1 : 0
      }, '');
    }

    function buildTrainingCalendar(calendarDays) {
      const now = new Date();
      now.setHours(23, 59, 59, 999);
      const threeMonthCap = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      const selectedCutoff = getAnalysisCutoff();
      const effectiveStart = selectedCutoff && selectedCutoff > threeMonthCap ? selectedCutoff : threeMonthCap;
      effectiveStart.setHours(0, 0, 0, 0);
      const firstMonth = new Date(effectiveStart.getFullYear(), effectiveStart.getMonth(), 1);
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const months = [];
      for (let cursor = new Date(firstMonth); cursor <= lastMonth; cursor.setMonth(cursor.getMonth() + 1)) {
        const first = new Date(cursor);
        const year = first.getFullYear();
        const month = first.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const leading = (first.getDay() + 6) % 7;
        const cells = Array.from({ length: leading }, () => '<div class="calendar-day empty"></div>');
        for (let day = 1; day <= daysInMonth; day += 1) {
          const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const cellDate = new Date(year, month, day);
          if (cellDate < effectiveStart || cellDate > now) {
            cells.push('<div class="calendar-day out-of-range"></div>');
            continue;
          }
          const stats = calendarDays[iso];
          const label = stats ? `${stats.completed || 0} absolviert, ${stats.missed || 0} ausgelassen, ${stats.additional || 0} zusätzlich, ${stats.excused || 0} Ausnahme` : 'Kein Training';
          cells.push(`<div class="calendar-day" title="${escapeHtml(label)}">${calendarMarkerMarkup(stats, day)}</div>`);
        }
        months.push(`<div class="training-calendar"><div class="calendar-title">${new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' }).format(first)}</div><div class="calendar-weekdays">${['Mo','Di','Mi','Do','Fr','Sa','So'].map((day) => `<span>${day}</span>`).join('')}</div><div class="calendar-grid">${cells.join('')}</div></div>`);
      }
      return `<div class="training-calendars">${months.join('')}</div><div class="calendar-legend"><span>${calendarLegendMarker('done')}Absolviert</span><span>${calendarLegendMarker('missed')}Ausgelassen</span><span>${calendarLegendMarker('extra')}Zusatztraining</span><span>${calendarLegendMarker('excused')}Ausnahme</span></div>`;
    }

    function renderAnalysis() {
      const analysis = buildAnalysis();
      const generatedAt = new Date();
      const generatedDate = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(generatedAt);
      const generatedTime = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' }).format(generatedAt);
      const block = document.createElement('section');
      block.className = 'block analysis-report';
      block.id = 'analysisReport';
      const periodLabels = { '7': '7 Tage', '30': '30 Tage', '90': '90 Tage', '180': '6 Monate', '365': '12 Monate', all: 'Gesamter Verlauf' };
      const chartPoints = analysis.points;
      const analysisTimeDomain = getAnalysisTimeDomain(chartPoints, analysis.trainings);
      let polyline = '';
      let weightScale = '';
      if (chartPoints.length > 1) {
        const measuredMin = Math.min(...chartPoints.map((point) => point.value));
        const measuredMax = Math.max(...chartPoints.map((point) => point.value));
        const padding = Math.max(0.5, (measuredMax - measuredMin) * 0.1);
        const scaleMin = Math.floor((measuredMin - padding) * 2) / 2;
        const scaleMax = Math.ceil((measuredMax + padding) * 2) / 2;
        const range = Math.max(0.5, scaleMax - scaleMin);
        const plotLeft = 48;
        const plotRight = 580;
        const plotTop = 12;
        const plotBottom = 122;
        const y = (value) => plotBottom - ((value - scaleMin) / range) * (plotBottom - plotTop);
        polyline = chartPoints.map((point) => `${analysisTimeX(point.ts, analysisTimeDomain)},${y(point.value)}`).join(' ');
        const ticks = Array.from({ length: 5 }, (_, index) => scaleMin + range * index / 4).reverse();
        const formatWeight = (value) => value.toFixed(1).replace('.', ',');
        weightScale = `${buildAnalysisExceptionBands(analysisTimeDomain)}${ticks.map((value) => `<line x1="${plotLeft}" y1="${y(value)}" x2="${plotRight}" y2="${y(value)}" stroke="#cbd5e1" stroke-width="1"/><text x="42" y="${y(value) + 4}" text-anchor="end" font-size="10" fill="#475569">${formatWeight(value)}</text>`).join('')}
          <line x1="${plotLeft}" y1="${plotTop}" x2="${plotLeft}" y2="${plotBottom}" stroke="#64748b"/>
          <line x1="${plotLeft}" y1="${plotBottom}" x2="${plotRight}" y2="${plotBottom}" stroke="#64748b"/>
          ${buildAnalysisTimeLabels(analysisTimeDomain)}
          <text x="8" y="12" font-size="9" fill="#475569">kg</text>`;
      }
      block.innerHTML = `
        <div class="analysis-head">
          <div><h2>Analyse</h2><div class="small">Kompakte, regelbasierte Auswertung ohne KI</div></div>
          <div class="analysis-controls no-print">
            <select id="analysisPeriod">${Object.entries(periodLabels).map(([value, label]) => `<option value="${value}" ${state.analysisPeriod === value ? 'selected' : ''}>${label}</option>`).join('')}</select>
            ${IS_READ_ONLY_VIEW ? '' : '<button class="btn-secondary" id="printAnalysisBtn" type="button">Als PDF exportieren</button>'}
          </div>
        </div>
        <div class="analysis-a4">
          <div class="analysis-kpis">
            <div><span>Gewichtsänderung</span><strong>${analysis.weightChange === null ? '---' : `${analysis.weightChange > 0 ? '+' : ''}${analysis.weightChange.toFixed(1).replace('.', ',')} kg`}</strong></div>
            <div><span>Planerfüllung</span><strong>${analysis.completionRate === null ? '---' : `${analysis.completionRate} %`}</strong></div>
            <div><span>Geplant absolviert</span><strong>${analysis.completed}</strong></div>
            <div><span>Zusätzlich trainiert</span><strong>${analysis.additional}</strong></div>
            <div><span>Ausgelassen</span><strong>${analysis.missed}</strong></div>
            <div><span>Trainingsminuten</span><strong>${analysis.totalMinutes || '---'}</strong></div>
          </div>
          <div class="analysis-main-grid">
            <div class="analysis-charts">
              <div class="analysis-chart-card">
                <h3>Gewichtsverlauf · ${periodLabels[state.analysisPeriod]}</h3>
                ${polyline ? `<svg class="analysis-chart-svg" viewBox="0 0 600 150" role="img" aria-label="Gewichtsverlauf mit Kilogramm- und Datumsskala">${weightScale}<polyline points="${polyline}" fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>` : '<div class="small">Nicht genügend Messwerte für ein Diagramm.</div>'}
                <div class="analysis-substats">Ø Belastung: ${analysis.avgLoad === null ? '---' : analysis.avgLoad.toFixed(1).replace('.', ',')} · Ø Schmerz: ${analysis.avgPain === null ? '---' : analysis.avgPain.toFixed(1).replace('.', ',')}</div>
              </div>
              <div class="analysis-chart-card analysis-load-card">
                <h3>Belastung und Schmerz</h3>
                ${buildTrainingLoadChart(analysis.trainings, analysisTimeDomain)}
                <div class="analysis-chart-legend"><span><i class="load"></i>Belastung</span><span><i class="pain"></i>Schmerz</span></div>
              </div>
            </div>
            <div class="analysis-support-stack">
              <div class="analysis-text-card"><h3>Zusammenfassung</h3><ul>${analysis.statements.map((text) => `<li>${escapeHtml(text)}</li>`).join('')}</ul></div>
              <div class="analysis-calendar-card">${buildTrainingCalendar(analysis.calendarDays)}</div>
            </div>
          </div>
          <div class="analysis-excused"><strong>Ausnahmen:</strong> Krank ${analysis.excused.illness || 0} · Beschwerden ${analysis.excused.pain_pause || 0} · Urlaub ${analysis.excused.vacation || 0} · Sonstige ${analysis.excused.other || 0}</div>
          <div class="analysis-disclaimer">BMI-Werte und Trendanalysen sind Orientierungshilfen und keine medizinische Diagnose. Zeitliche Zusammenhänge beweisen keine Ursache.</div>
          <div class="analysis-generated">Generiert am ${generatedDate} um ${generatedTime} Uhr</div>
        </div>
        ${IS_READ_ONLY_VIEW ? '' : `
          <details class="analysis-exceptions no-print">
            <summary>Trainingsausnahmen verwalten</summary>
            <form id="exceptionForm" class="exception-form">
              <label>Von <input name="dateFrom" type="date" required></label>
              <label>Bis <input name="dateTo" type="date" required></label>
              <label>Grund <select name="reason" required><option value="illness">Krank</option><option value="pain_pause">Pause wegen Beschwerden</option><option value="vacation">Urlaub</option><option value="other">Sonstiger Grund</option></select></label>
              <label>Notiz <input name="note" maxlength="255" placeholder="optional"></label>
              <button class="btn-secondary" type="submit">Ausnahme speichern</button>
            </form>
            <div class="exception-list">${(data.trainingExceptions || []).map((item) => `<div><span>${escapeHtml(item.dateFrom)} bis ${escapeHtml(item.dateTo)} · ${escapeHtml(exceptionReasonLabel(item.reason))}${item.note ? ` · ${escapeHtml(item.note)}` : ''}</span><button type="button" data-delete-exception="${Number(item.id)}">Löschen</button></div>`).join('') || '<div class="small">Keine Ausnahmen erfasst.</div>'}</div>
          </details>`}
      `;
      block.querySelector('#analysisPeriod')?.addEventListener('change', (event) => { state.analysisPeriod = event.target.value; renderAll(); });
      block.querySelector('#printAnalysisBtn')?.addEventListener('click', () => { document.body.classList.add('print-analysis'); window.print(); setTimeout(() => document.body.classList.remove('print-analysis'), 500); });
      block.querySelector('#exceptionForm')?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const response = await fetch(buildDataApiUrl(), jsonPostOptions({ action: 'save_training_exception', dateFrom: form.get('dateFrom'), dateTo: form.get('dateTo'), reason: form.get('reason'), note: form.get('note') }));
        const result = await response.json();
        if (!response.ok || !result.ok) { window.alert(result.error || 'Speichern fehlgeschlagen'); return; }
        await loadDashboardData();
      });
      block.querySelectorAll('[data-delete-exception]').forEach((button) => button.addEventListener('click', async () => {
        const response = await fetch(buildDataApiUrl(), jsonPostOptions({ action: 'delete_training_exception', exceptionId: Number(button.dataset.deleteException) }));
        const result = await response.json();
        if (!response.ok || !result.ok) { window.alert(result.error || 'Löschen fehlgeschlagen'); return; }
        await loadDashboardData();
      }));
      return block;
    }

    function maybeShowMotivation() {
      if (IS_READ_ONLY_VIEW || !state.hasLoadedServerData) return;
      const analysis = buildAnalysis();
      if (!analysis.plateau) return;
      const key = `fittrack-motivation-${getTodayIsoDate()}`;
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, '1');
      const overlay = document.createElement('div');
      overlay.className = 'motivation-toast';
      overlay.innerHTML = '<strong>Bleib dran.</strong><span>Ein Plateau gehört zum Weg. Jeder Tag und jeder Schritt zählt.</span>';
      document.body.appendChild(overlay);
      setTimeout(() => overlay.classList.add('visible'), 20);
      setTimeout(() => { overlay.classList.remove('visible'); setTimeout(() => overlay.remove(), 300); }, 5000);
    }

    function renderAll() {
      app.innerHTML = '';

      const sourceBanner = renderDataSourceBanner();
      if (sourceBanner) {
        app.appendChild(sourceBanner);
      }

      if (CURRENT_PAGE === 'analysis') {
        app.appendChild(renderAnalysis());
        renderDeeplinkList();
        maybeShowMotivation();
        return;
      }

      app.appendChild(renderOverview());
      app.appendChild(renderGoalsBlock());

      const combo = document.createElement('div');
      combo.className = 'combo-grid';
      combo.appendChild(renderActions());
      combo.appendChild(renderWindowSelector());
      app.appendChild(combo);

      if (Array.isArray(data.weights) && data.weights.length > 0) {
        app.appendChild(renderChart());
      }
      if (Array.isArray(data.weights) && data.weights.length > 1) {
        app.appendChild(renderRateChart());
      }
      if (Array.isArray(data.measurements) && data.measurements.length > 0) {
        app.appendChild(renderMeasurements());
      }
      app.appendChild(renderTrainingPlan());
      app.appendChild(renderRecentTrainingEntriesBlock());
      app.appendChild(renderGoalsHistoryBlock());

      const formModal = renderTrainingFormModal();
      if (formModal) {
        app.appendChild(formModal);
      }

      const measurementModal = renderMeasurementFormModal();
      if (measurementModal) {
        app.appendChild(measurementModal);
      }

      const rewardModal = renderRewardModal();
      if (rewardModal) {
        app.appendChild(rewardModal);
      }

      const goalEditorModal = renderGoalEditorModal();
      if (goalEditorModal) {
        app.appendChild(goalEditorModal);
      }

      const trainingPlanModal = renderTrainingPlanEditorModal();
      if (trainingPlanModal) {
        app.appendChild(trainingPlanModal);
      }

      const measurementDetailModal = renderMeasurementDetailModal();
      if (measurementDetailModal) {
        app.appendChild(measurementDetailModal);
      }

      renderDeeplinkList();
      maybeShowMotivation();
    }

    renderAll();
    loadDashboardData();

    const passwordModal = document.getElementById('passwordModal');
    const openPasswordModalBtn = document.getElementById('openPasswordModal');
    const closePasswordModalBtn = document.getElementById('closePasswordModal');
    const deeplinkMenuWrap = document.getElementById('deeplinkMenuWrap');
    const deeplinkMenu = document.getElementById('deeplinkMenu');
    const openDeeplinkMenuBtn = document.getElementById('openDeeplinkMenu');
    const closeDeeplinkMenuBtn = document.getElementById('closeDeeplinkMenu');
    const deeplinkCreateForm = document.getElementById('deeplinkCreateForm');
    const sharePictureBtn = document.getElementById('sharePictureBtn');

    sharePictureBtn?.addEventListener('click', () => {
      handleSharePictureClick();
    });

    openDeeplinkMenuBtn?.addEventListener('click', () => {
      deeplinkMenu?.classList.toggle('hidden');
      const notice = document.getElementById('deeplinkNotice');
      if (notice) notice.textContent = state.deeplinkNotice || '';
      renderDeeplinkList();
    });

    closeDeeplinkMenuBtn?.addEventListener('click', () => {
      deeplinkMenu?.classList.add('hidden');
    });

    document.addEventListener('click', (event) => {
      if (!deeplinkMenuWrap || !deeplinkMenu || deeplinkMenu.classList.contains('hidden')) return;
      if (!deeplinkMenuWrap.contains(event.target)) {
        deeplinkMenu.classList.add('hidden');
      }
    });

    deeplinkCreateForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(deeplinkCreateForm);
      const expiresAtRaw = String(formData.get('expiresAt') || '').trim();
      const expiresAt = expiresAtRaw ? `${expiresAtRaw}:00` : '';

      try {
        const response = await fetch(buildDataApiUrl(), jsonPostOptions({
          action: 'create_deeplink',
          expiresAt
        }));
        const result = await response.json();
        if (!response.ok || !result.ok) {
          throw new Error(result.error || `HTTP ${response.status}`);
        }

        state.deeplinkNotice = 'Deeplink wurde erstellt.';
        deeplinkCreateForm.reset();
        await loadDashboardData();
      } catch (error) {
        window.alert(`Deeplink erstellen fehlgeschlagen: ${error.message}`);
      }
    });

    openPasswordModalBtn?.addEventListener('click', () => {
      passwordModal?.classList.remove('hidden');
    });

    closePasswordModalBtn?.addEventListener('click', () => {
      passwordModal?.classList.add('hidden');
    });

    passwordModal?.addEventListener('click', (event) => {
      if (event.target === passwordModal) {
        passwordModal.classList.add('hidden');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && state.showMeasurementDetail) {
        closeMeasurementDetail();
      }
    });

