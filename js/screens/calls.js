// Module 9: Call Recording & Intelligence

function renderCalls() {
  const tabs = [
    { id: 'all', label: 'सभी', count: AppData.callRecordings.length },
    { id: 'supplier', label: 'Supplier', count: AppData.callRecordings.filter(c => c.type === 'supplier').length },
    { id: 'customer', label: 'Customer', count: AppData.callRecordings.filter(c => c.type === 'customer').length },
    { id: 'pending', label: 'Pending', count: AppData.callRecordings.filter(c => !c.confirmed_by_nephew).length }
  ];

  let calls = [];
  switch (AppState.callTab) {
    case 'supplier': calls = AppData.callRecordings.filter(c => c.type === 'supplier'); break;
    case 'customer': calls = AppData.callRecordings.filter(c => c.type === 'customer'); break;
    case 'pending': calls = AppData.callRecordings.filter(c => !c.confirmed_by_nephew); break;
    default: calls = [...AppData.callRecordings];
  }

  calls.sort((a, b) => new Date(b.call_datetime) - new Date(a.call_datetime));

  return `
    ${HeaderBar('📞 Call Intelligence', { subtitle: 'Recordings & Summaries', backRoute: AppState.role === 'nephew' ? 'more' : '' })}
    ${TabBar(tabs, AppState.callTab, 'setCallTab')}

    ${calls.map(c => `
      <div class="call-card" onclick="showCallDetail('${c.call_id}')">
        <div class="call-header">
          <div>
            <span class="call-contact">${c.contact_name}</span>
            <span class="badge badge-${c.type === 'supplier' ? 'blue' : 'green'}" style="margin-left:6px;">${c.type}</span>
          </div>
          <span class="call-time">${formatTime(c.call_datetime)}</span>
        </div>
        <div class="call-duration">
          ${Math.floor(c.duration_seconds / 60)}:${(c.duration_seconds % 60).toString().padStart(2, '0')} min
          ${c.order_id ? ` | Order: ${c.order_id}` : ''}
        </div>
        <div class="call-summary">${c.summary_text}</div>
        <div style="margin-top:8px; display:flex; gap:8px; align-items:center;">
          ${c.confirmed_by_nephew ?
            `<span class="badge badge-green">✅ Confirmed</span>` :
            `<span class="badge badge-yellow">⏳ Pending</span>`
          }
          ${c.corrections_made ? `<span style="font-size:11px; color:var(--gray-500);">✏️ Edited</span>` : ''}
        </div>
      </div>
    `).join('')}

    ${calls.length === 0 ? EmptyState('कोई call recording नहीं', { icon: '📞' }) : ''}
    <div style="height:80px;"></div>
  `;
}

function setCallTab(tabId) {
  AppState.callTab = tabId;
  handleRoute();
}

function showCallDetail(callId) {
  const call = AppData.callRecordings.find(c => c.call_id === callId);
  if (!call) return;

  const entities = call.extracted_entities || {};
  const entityList = Object.entries(entities).map(([k, v]) => `
    <div class="info-row"><span class="info-label">${k.replace(/_/g, ' ')}</span><span class="info-value">${typeof v === 'number' ? formatCurrency(v) : v}</span></div>
  `).join('');

  showModal(`📞 ${call.contact_name}`, `
    <div class="info-row"><span class="info-label">Type</span><span class="info-value">${call.type}</span></div>
    <div class="info-row"><span class="info-label">Date/Time</span><span class="info-value">${formatDate(call.call_datetime)} ${formatTime(call.call_datetime)}</span></div>
    <div class="info-row"><span class="info-label">Duration</span><span class="info-value">${Math.floor(call.duration_seconds / 60)}:${(call.duration_seconds % 60).toString().padStart(2, '0')}</span></div>
    ${call.order_id ? `<div class="info-row"><span class="info-label">Order</span><span class="info-value">${call.order_id}</span></div>` : ''}

    <div style="margin:16px 0; padding:12px; background:var(--gray-50); border-radius:8px;">
      <strong>Summary:</strong><br>
      <p style="margin-top:6px; font-size:14px; line-height:1.6;">${call.summary_text}</p>
    </div>

    ${entityList ? `
      <div style="margin:12px 0;">
        <strong>Extracted Data:</strong>
        ${entityList}
      </div>
    ` : ''}

    ${call.corrections_made ? `
      <div style="margin:12px 0; padding:8px; background:var(--yellow-light); border-radius:6px; font-size:13px;">
        ✏️ Corrections: ${call.corrections_made}
      </div>
    ` : ''}

    <div style="margin-top:16px; display:flex; gap:8px; flex-wrap:wrap;">
      ${!call.confirmed_by_nephew ? `
        <button class="wa-action-btn" onclick="confirmCall('${call.call_id}', true); closeModal();">✅ Sahi hai, save karo</button>
        <button class="wa-action-btn" onclick="closeModal(); showToast('✏️ Edit mode')">✏️ Edit karo</button>
        <button class="wa-action-btn" onclick="confirmCall('${call.call_id}', false); closeModal();">❌ Galat hai</button>
      ` : `<span class="badge badge-green">✅ Confirmed at ${formatTime(call.confirmed_at)}</span>`}
    </div>
  `);
}

function confirmCall(callId, confirmed) {
  const call = AppData.callRecordings.find(c => c.call_id === callId);
  if (call) {
    if (confirmed) {
      call.confirmed_by_nephew = true;
      call.confirmed_at = new Date().toISOString();
      showToast('✅ Call summary confirmed & saved');
    } else {
      showToast('❌ Call summary rejected');
    }
    handleRoute();
  }
}
