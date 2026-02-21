// Father's Dashboard - 6 Sections

function renderDashboard() {
  const todayOrders = AppData.orders.filter(o => o.pipeline_timestamps.created_at?.startsWith('2026-02-20'));
  const confirmedToday = todayOrders.filter(o => o.status !== 'inquiry');
  const deliveredToday = todayOrders.filter(o => ['delivered', 'payment_pending', 'closed'].includes(o.status));
  const totalValueToday = todayOrders.reduce((s, o) => s + o.total_amount, 0);

  const todayCollections = getTodayCollections();
  const overdueCollections = getOverdueCollections();
  const totalOverdue = overdueCollections.reduce((s, t) => s + t.amount_pending, 0);
  const totalCustomerOwes = AppData.collectionTasks.filter(t => t.status !== 'collected').reduce((s, t) => s + t.amount_pending, 0);
  const totalWeOweSuppliers = AppData.supplierPayments.filter(t => t.status !== 'paid').reduce((s, t) => s + t.amount_pending, 0);
  const supplierDueToday = AppData.supplierPayments.filter(t => t.payment_due_date === '2026-02-20' && t.status !== 'paid').reduce((s, t) => s + t.amount_pending, 0);
  const cashWithWorkers = AppData.workerAssignments.filter(a => a.status === 'in_progress' && a.expected_amount).reduce((s, a) => s + a.expected_amount, 0);

  const presentWorkers = AppData.workers.filter(w => isWorkerPresent(w.worker_id));
  const fatherTasks = AppData.tasks.filter(t => t.assigned_to === 'father' && t.due_date === '2026-02-20');

  // Attention items
  const attentionItems = [];
  overdueCollections.forEach(t => {
    const c = getCustomer(t.customer_id);
    attentionItems.push({ icon: '🔴', text: `${c?.name || 'Customer'} — ${formatCurrency(t.amount_pending)} बकाया` });
  });

  const overdueDeliveries = AppData.orders.filter(o =>
    o.delivery_deadline_agreed &&
    new Date(o.delivery_deadline_agreed) < new Date('2026-02-20T11:30:00') &&
    !['delivered', 'closed', 'payment_pending', 'cancelled'].includes(o.status)
  );
  overdueDeliveries.forEach(o => {
    const c = getCustomer(o.customer_id);
    attentionItems.push({ icon: '🔴', text: `${c?.name || 'Customer'} delivery लेट — ${o.order_id}` });
  });

  const inv = AppData.inventory[0];
  if (inv && inv.current_stock <= inv.reorder_threshold) {
    attentionItems.push({ icon: '🟡', text: `Cement stock low: ${inv.current_stock} bags` });
  }

  const beforeDispatch = AppData.supplierPayments.filter(s => s.payment_timing === 'before_dispatch' && s.status !== 'paid');
  beforeDispatch.forEach(sp => {
    const sup = getSupplier(sp.supplier_id);
    attentionItems.push({ icon: '🔴', text: `${sup?.name} — ${formatCurrency(sp.amount_pending)} dispatch से पहले pay करो` });
  });

  return `
    ${HeaderBar('📊 Dashboard', { subtitle: 'आज का कारोबार — 20 Feb', actions: `<button class="btn btn-sm btn-secondary" onclick="switchRole()">🔄</button>` })}

    <!-- Section 1: Business Today -->
    ${SectionTitle('📈 Business Today')}
    <div class="stats-grid">
      ${StatCard('पूछताछ आज', todayOrders.length, { icon: '📋' })}
      ${StatCard('ऑर्डर कन्फर्म', confirmedToday.length, { icon: '✅' })}
      ${StatCard('डिलीवरी पूरी', deliveredToday.length, { icon: '🚛' })}
      ${StatCard('कुल वैल्यू', formatCurrency(totalValueToday), { icon: '💰' })}
    </div>

    <!-- Section 2: Cash Position -->
    ${SectionTitle('💵 Cash Position')}
    ${Card(`
      <table class="cash-table">
        <tr><td>Customers owe us</td><td class="text-green">${formatCurrency(totalCustomerOwes)}</td></tr>
        <tr><td>Overdue from customers</td><td class="text-red">${formatCurrency(totalOverdue)}</td></tr>
        <tr><td>We owe suppliers</td><td>${formatCurrency(totalWeOweSuppliers)}</td></tr>
        <tr><td>Due today (suppliers)</td><td class="text-red">${formatCurrency(supplierDueToday)}</td></tr>
        <tr><td>Cash with workers</td><td>${formatCurrency(cashWithWorkers)}</td></tr>
        <tr class="total"><td>Today's expected collections</td><td class="text-green">${formatCurrency(todayCollections.reduce((s, t) => s + t.amount_pending, 0))}</td></tr>
      </table>
    `)}

    <!-- Section 3: Collections Today -->
    ${SectionTitle('💰 Collections Today', { action: `<span class="badge badge-${todayCollections.length + overdueCollections.length > 0 ? 'red' : 'green'}">${todayCollections.length + overdueCollections.length}</span>` })}
    ${[...overdueCollections, ...todayCollections].map(t => CollectionCard(t)).join('')}
    ${todayCollections.length + overdueCollections.length === 0 ? EmptyState('कोई collection pending नहीं', { icon: '✅' }) : ''}

    <!-- Section 4: Workers Today -->
    ${SectionTitle('👷 Workers Today', { action: `<span class="badge badge-blue">${presentWorkers.length}/${AppData.workers.length}</span>` })}
    ${AppData.workers.map(w => WorkerCard(w)).join('')}

    <!-- Section 5: Attention Needed -->
    ${attentionItems.length > 0 ? `
      ${SectionTitle('⚠️ Attention Needed', { action: `<span class="badge badge-red">${attentionItems.length}</span>` })}
      ${attentionItems.map(item => `
        <div class="attention-item">
          <span class="attention-icon">${item.icon}</span>
          <span class="attention-text">${item.text}</span>
        </div>
      `).join('')}
    ` : ''}

    <!-- Section 6: My Tasks Today -->
    ${SectionTitle('✅ My Tasks Today')}
    ${Card(fatherTasks.map(t => `
      <div class="task-item ${t.priority === 'high' ? 'task-priority-high' : ''}">
        <div class="task-checkbox ${t.status === 'done' ? 'checked' : ''}"
          onclick="toggleTask('${t.task_id}')">
          ${t.status === 'done' ? '✓' : ''}
        </div>
        <div class="task-content">
          <div class="task-title ${t.status === 'done' ? 'done' : ''}">${t.titleHi || t.title}</div>
          <div class="task-meta">${t.due_time} ${t.assigned_to_name ? '• ' + t.assigned_to_name : ''}</div>
        </div>
      </div>
    `).join(''))}

    <!-- Reminder Button -->
    <div class="reminder-banner" onclick="sendGeneralReminder()">
      📱 Nephew को reminder भेजो
    </div>

    <div style="height: 80px;"></div>
  `;
}

function toggleTask(taskId) {
  const task = AppData.tasks.find(t => t.task_id === taskId);
  if (task) {
    task.status = task.status === 'done' ? 'pending' : 'done';
    task.completed_at = task.status === 'done' ? new Date().toISOString() : null;
    handleRoute();
  }
}

function sendGeneralReminder() {
  showModal('Nephew को Reminder', `
    ${FormTextarea('Message (optional)', 'reminder-msg', { placeholder: 'Kuch likhna hai toh likho...', rows: 2 })}
    <div class="modal-actions">
      ${ActionButton('📱 भेजो', "closeModal(); showToast('📱 Reminder sent: Papa ka message — Please check karo')", { type: 'primary' })}
    </div>
  `);
}
