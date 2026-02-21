// Module 5: Payment & Collections

function renderCollections() {
  const today = AppData.collectionTasks.filter(t => t.scheduled_date === '2026-02-20' && t.status !== 'collected' && t.status !== 'overdue');
  const overdue = AppData.collectionTasks.filter(t => t.status === 'overdue');
  const upcoming = AppData.collectionTasks.filter(t => t.scheduled_date > '2026-02-20' && t.status !== 'collected');
  const completed = AppData.collectionTasks.filter(t => t.status === 'collected');

  const tabs = [
    { id: 'today', label: 'आज', count: today.length },
    { id: 'overdue', label: 'बकाया', count: overdue.length },
    { id: 'upcoming', label: 'आगे', count: upcoming.length },
    { id: 'completed', label: 'पूरा', count: completed.length }
  ];

  let tasks = [];
  switch (AppState.collectionTab) {
    case 'today': tasks = today; break;
    case 'overdue': tasks = overdue; break;
    case 'upcoming': tasks = upcoming; break;
    case 'completed': tasks = completed; break;
    default: tasks = today;
  }

  const totalPending = [...today, ...overdue, ...upcoming].reduce((s, t) => s + t.amount_pending, 0);

  return `
    ${HeaderBar('💰 Collections', { subtitle: `Pending: ${formatCurrency(totalPending)}` })}
    ${TabBar(tabs, AppState.collectionTab, 'setCollectionTab')}

    ${tasks.length > 0 ? tasks.map(t => {
      const customer = getCustomer(t.customer_id);
      const isOverdue = t.status === 'overdue';
      return Card(`
        <div class="collection-header">
          <div>
            <strong>${customer?.name || 'Unknown'}</strong>
            <div style="font-size:12px; color:var(--gray-500);">Order: ${t.order_id} | ${t.collection_method}</div>
            ${isOverdue ? `<div class="overdue-badge">⚠️ ${t.notes || 'Overdue'}</div>` : ''}
          </div>
          <div style="text-align:right;">
            ${AmountDisplay(t.amount_pending, { size: 'large', color: isOverdue ? 'red' : '' })}
            ${t.amount_collected > 0 ? `<div style="font-size:11px; color:var(--gray-500);">Collected: ${formatCurrency(t.amount_collected)}</div>` : ''}
          </div>
        </div>
        <div style="font-size:13px; color:var(--gray-500); margin-bottom:8px;">
          📅 Due: ${t.scheduled_date} | Assigned: ${t.assigned_to}
        </div>
        <div class="collection-actions">
          ${CallButton(customer?.phone || '', customer?.name || '', { small: true })}
          ${ActionButton('Nephew को भेजो', `sendCollectionToNephew('${t.collection_task_id}')`, { type: 'secondary', small: true })}
          ${ActionButton('Worker भेजो', `assignWorkerToCollection('${t.collection_task_id}')`, { type: 'secondary', small: true })}
          ${t.status !== 'collected' ? ActionButton('✅ Collect', `collectPayment('${t.collection_task_id}')`, { type: 'success', small: true }) : ''}
        </div>
      `, { className: isOverdue ? 'card-urgent' : '' });
    }).join('') : EmptyState('कोई collection नहीं', { icon: '💰' })}
    <div style="height:80px;"></div>
  `;
}

function setCollectionTab(tabId) {
  AppState.collectionTab = tabId;
  handleRoute();
}

function collectPayment(taskId) {
  event.stopPropagation();
  showModal('Payment Collect', `
    ${FormDropdown('Outcome', 'collect-outcome', [
      { value: 'upi_now', label: 'Customer UPI से pay कर रहा है' },
      { value: 'coming_shop', label: 'Customer दुकान आ रहा है' },
      { value: 'delay', label: 'Customer delay माँग रहा है' },
      { value: 'no_answer', label: 'फोन नहीं उठा — बाद में' },
      { value: 'dispute', label: 'Dispute — Owner को escalate करो' }
    ])}
    <div class="modal-actions">
      ${ActionButton('Save', `
        const outcome = document.getElementById('collect-outcome').value;
        if (outcome === 'upi_now') {
          const task = AppData.collectionTasks.find(t => t.collection_task_id === '${taskId}');
          if (task) { task.status = 'collected'; task.amount_collected = task.amount_total; task.amount_pending = 0; }
          showToast('✅ Payment collected!');
        } else if (outcome === 'dispute') {
          showToast('🚨 Owner को escalate किया');
        } else {
          showToast('📝 Updated');
        }
        closeModal();
        handleRoute();
      `, { type: 'primary' })}
    </div>
  `);
}

function sendCollectionToNephew(taskId) {
  event.stopPropagation();
  const task = AppData.collectionTasks.find(t => t.collection_task_id === taskId);
  const customer = task ? getCustomer(task.customer_id) : null;
  showToast(`📱 Nephew को WhatsApp: ${customer?.name || 'Customer'} ka ${formatCurrency(task?.amount_pending || 0)} collect karo`);
}
