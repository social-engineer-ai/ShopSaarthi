// Module 7: Worker Management

function renderWorkers() {
  const presentWorkers = AppData.workers.filter(w => isWorkerPresent(w.worker_id));
  const totalWages = presentWorkers.reduce((s, w) => s + w.daily_wage_rate, 0);
  const activeAssignments = AppData.workerAssignments.filter(a => a.status === 'in_progress');
  const cashWithWorkers = activeAssignments.filter(a => a.expected_amount).reduce((s, a) => s + a.expected_amount, 0);

  return `
    ${HeaderBar('👷 Workers', { subtitle: `${presentWorkers.length}/${AppData.workers.length} हाज़िर` })}

    <!-- Attendance Grid -->
    ${SectionTitle('📋 Attendance', { action: `<span class="badge badge-blue">${presentWorkers.length}/${AppData.workers.length}</span>` })}
    <div class="attendance-grid">
      ${AppData.workers.map(w => {
        const present = isWorkerPresent(w.worker_id);
        const att = AppData.attendance.find(a => a.worker_id === w.worker_id);
        return `
          <div class="attendance-card ${present ? 'present' : ''}" onclick="toggleAttendance('${w.worker_id}')">
            <div class="worker-name">${w.name}</div>
            <div style="font-size:13px; margin:4px 0;">${present ? '✅ हाज़िर' : '❌ अनुपस्थित'}</div>
            ${present && att?.marked_present_at ? `<div class="attendance-time">${att.marked_present_at}</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>

    <!-- Worker Cards with Assignments -->
    ${SectionTitle('📝 Assignments')}
    ${AppData.workers.filter(w => isWorkerPresent(w.worker_id)).map(w => WorkerCard(w)).join('')}

    <!-- Money with Workers -->
    ${cashWithWorkers > 0 ? `
      ${SectionTitle('💵 Cash with Workers')}
      ${Card(`
        <div style="text-align:center; margin-bottom:12px;">
          <div style="font-size:12px; color:var(--gray-500);">Total Cash with Workers</div>
          <div style="font-size:28px; font-weight:700; color:var(--red-dark);">${formatCurrency(cashWithWorkers)}</div>
        </div>
        ${activeAssignments.filter(a => a.expected_amount).map(a => {
          const w = getWorker(a.worker_id);
          return `<div class="info-row">
            <span class="info-label">👷 ${w?.name || 'Worker'} — ${a.type}</span>
            <span class="info-value">${formatCurrency(a.expected_amount)}</span>
          </div>`;
        }).join('')}
      `)}
    ` : ''}

    <!-- Daily Summary -->
    ${SectionTitle('📊 Daily Summary')}
    ${Card(`
      <div class="info-row"><span class="info-label">Workers present</span><span class="info-value">${presentWorkers.length}</span></div>
      <div class="info-row"><span class="info-label">Total assignments</span><span class="info-value">${AppData.workerAssignments.filter(a => a.assigned_at?.startsWith('2026-02-20')).length}</span></div>
      <div class="info-row"><span class="info-label">Completed</span><span class="info-value text-green">${AppData.workerAssignments.filter(a => a.status === 'completed' && a.assigned_at?.startsWith('2026-02-20')).length}</span></div>
      <div class="info-row"><span class="info-label">In progress</span><span class="info-value text-blue">${activeAssignments.length}</span></div>
      <div class="info-row"><span class="info-label">Daily wages payable</span><span class="info-value">${formatCurrency(totalWages)}</span></div>
    `)}

    <div style="height:80px;"></div>
  `;
}

function toggleAttendance(workerId) {
  const att = AppData.attendance.find(a => a.worker_id === workerId);
  if (att) {
    if (att.marked_present_at) {
      att.marked_present_at = null;
      att.marked_by = null;
      showToast('❌ Absent marked');
    } else {
      const now = new Date();
      att.marked_present_at = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
      att.marked_by = 'father';
      showToast('✅ Present marked');
    }
  }
  handleRoute();
}

function workerReturn(assignmentId) {
  const assignment = AppData.workerAssignments.find(a => a.assignment_id === assignmentId);
  if (!assignment) return;

  if (assignment.type === 'collection' || assignment.expected_amount) {
    showModal('Worker Return — Reconciliation', `
      <p><strong>Expected:</strong> ${formatCurrency(assignment.expected_amount)}</p>
      ${FormNumberInput('Amount returned', 'return-amount', { unit: '₹', placeholder: 'कितने रुपए लाया?' })}
      <div id="variance-section"></div>
      <div class="modal-actions">
        ${ActionButton('✅ Done', `
          const returned = parseInt(document.getElementById('return-amount').value) || 0;
          const assignment = AppData.workerAssignments.find(a => a.assignment_id === '${assignmentId}');
          if (assignment) {
            assignment.status = 'completed';
            assignment.actual_return_time = new Date().toISOString();
            assignment.collected_amount = returned;
            if (returned < assignment.expected_amount) {
              assignment.variance_reason = 'Partial collection';
            }
          }
          closeModal();
          showToast('✅ Reconciled');
          handleRoute();
        `, { type: 'primary' })}
      </div>
    `);
  } else {
    showModal('Worker Return', `
      ${FormDropdown('Status', 'return-status', [
        { value: 'completed', label: '✅ Delivered / Done' },
        { value: 'partial', label: '⚠️ Partial' },
        { value: 'failed', label: '❌ Not delivered' }
      ])}
      <div class="modal-actions">
        ${ActionButton('✅ Done', `
          const assignment = AppData.workerAssignments.find(a => a.assignment_id === '${assignmentId}');
          if (assignment) { assignment.status = 'completed'; assignment.actual_return_time = new Date().toISOString(); }
          closeModal();
          showToast('✅ Updated');
          handleRoute();
        `, { type: 'primary' })}
      </div>
    `);
  }
}
