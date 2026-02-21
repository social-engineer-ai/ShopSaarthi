// Module 8: Ad Hoc Tasks & Reminders

function renderTasks() {
  if (AppState.role === 'father') return renderFatherTasks();
  return renderNephewTasks();
}

function renderFatherTasks() {
  const myTasks = AppData.tasks.filter(t => t.assigned_to === 'father' && t.due_date === '2026-02-20');
  const assignedPending = AppData.tasks.filter(t => t.assigned_to !== 'father' && ['pending', 'in_progress'].includes(t.status));
  const upcoming = AppData.tasks.filter(t => t.due_date > '2026-02-20' && t.status !== 'done');
  const overdue = AppData.tasks.filter(t => t.status !== 'done' && t.due_date < '2026-02-20');

  return `
    ${HeaderBar('✅ Tasks', { subtitle: 'काम और reminders', actions: ActionButton('+ नया', 'showNewTaskForm()', { type: 'success', small: true }) })}

    <!-- My Tasks Today -->
    ${SectionTitle('📋 My Tasks Today')}
    ${Card(myTasks.length > 0 ? myTasks.map(t => renderTaskItem(t)).join('') : '<div style="padding:12px; color:var(--gray-400); text-align:center;">कोई task नहीं</div>')}

    <!-- Assigned & Pending -->
    ${assignedPending.length > 0 ? `
      ${SectionTitle('👤 Assigned & Pending', { action: `<span class="badge badge-yellow">${assignedPending.length}</span>` })}
      ${Card(assignedPending.map(t => renderTaskItem(t)).join(''))}
    ` : ''}

    <!-- Overdue -->
    ${overdue.length > 0 ? `
      ${SectionTitle('⚠️ Overdue', { action: `<span class="badge badge-red">${overdue.length}</span>` })}
      ${Card(overdue.map(t => renderTaskItem(t)).join(''))}
    ` : ''}

    <!-- Upcoming -->
    ${upcoming.length > 0 ? `
      ${SectionTitle('📅 Upcoming (Next 3 days)')}
      ${Card(upcoming.map(t => renderTaskItem(t)).join(''))}
    ` : ''}

    <!-- Task Templates -->
    ${SectionTitle('📝 Templates', { action: ActionButton('Manage', 'showTemplateManager()', { type: 'secondary', small: true }) })}
    ${Card(AppData.taskTemplates.filter(tt => tt.is_active).map(tt => `
      <div class="list-item" onclick="createFromTemplate('${tt.template_id}')">
        <span style="font-size:16px;">${tt.nameHi || tt.name}</span>
      </div>
    `).join(''))}

    <div style="height:80px;"></div>
  `;
}

function renderNephewTasks() {
  const myTasks = AppData.tasks.filter(t =>
    (t.assigned_to === 'nephew' || t.assigned_to_name === 'Nephew') &&
    t.status !== 'done'
  ).sort((a, b) => (a.due_time || '').localeCompare(b.due_time || ''));

  const completedTasks = AppData.tasks.filter(t =>
    (t.assigned_to === 'nephew' || t.assigned_to_name === 'Nephew') &&
    t.status === 'done' && t.due_date === '2026-02-20'
  );

  return `
    ${HeaderBar('✅ My Tasks', { subtitle: 'Assigned to me', backRoute: 'more' })}

    ${SectionTitle('📋 Pending Tasks', { action: `<span class="badge badge-yellow">${myTasks.length}</span>` })}
    ${myTasks.length > 0 ? Card(myTasks.map(t => renderTaskItem(t)).join('')) : EmptyState('कोई pending task नहीं!', { icon: '🎉' })}

    ${completedTasks.length > 0 ? `
      ${SectionTitle('✅ Completed Today')}
      ${Card(completedTasks.map(t => renderTaskItem(t)).join(''))}
    ` : ''}
    <div style="height:80px;"></div>
  `;
}

function renderTaskItem(task) {
  return `
    <div class="task-item ${task.priority === 'high' ? 'task-priority-high' : ''}">
      <div class="task-checkbox ${task.status === 'done' ? 'checked' : ''}"
        onclick="toggleTask('${task.task_id}')">
        ${task.status === 'done' ? '✓' : ''}
      </div>
      <div class="task-content">
        <div class="task-title ${task.status === 'done' ? 'done' : ''}">${task.titleHi || task.title}</div>
        <div class="task-meta">
          ${task.due_time || ''} ${task.due_date !== '2026-02-20' ? '| ' + formatDate(task.due_date + 'T00:00') : ''}
          | ${task.assigned_to_name || task.assigned_to}
          ${task.priority === 'high' ? ' | 🔴 High' : ''}
          ${task.recurrence !== 'none' ? ' | 🔄 ' + task.recurrence : ''}
        </div>
        ${task.description ? `<div style="font-size:12px; color:var(--gray-500); margin-top:2px;">${task.description}</div>` : ''}
      </div>
    </div>
  `;
}

function showNewTaskForm() {
  showModal('नई Task बनाओ', `
    ${FormDropdown('Task Type', 'task-template', [
      ...AppData.taskTemplates.filter(tt => tt.is_active).map(tt => ({ value: tt.template_id, label: tt.nameHi || tt.name })),
      { value: 'custom', label: 'Custom (अपना लिखो)' }
    ])}
    ${FormTextInput('Details (optional)', 'task-details', { placeholder: 'कुछ और बताना है?' })}
    ${FormDropdown('When', 'task-when', [
      { value: '2026-02-20', label: 'आज' },
      { value: '2026-02-21', label: 'कल' },
      { value: '2026-02-22', label: 'परसों' }
    ])}
    ${FormTextInput('Time', 'task-time', { type: 'time', value: '10:00' })}
    ${FormDropdown('Assign To', 'task-assign', [
      { value: 'father', label: 'Papa (खुद)' },
      { value: 'nephew', label: 'Nephew' },
      ...AppData.workers.filter(w => isWorkerPresent(w.worker_id)).map(w => ({ value: w.worker_id, label: w.name }))
    ])}
    ${FormDropdown('Priority', 'task-priority', [
      { value: 'normal', label: 'Normal' },
      { value: 'high', label: '🔴 High' },
      { value: 'low', label: 'Low' }
    ])}
    ${FormDropdown('Recurrence', 'task-recurrence', [
      { value: 'none', label: 'One time' },
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' }
    ])}
    <div class="modal-actions">
      ${ActionButton('✅ Task बनाओ', 'createNewTask()', { type: 'primary' })}
    </div>
  `);
}

function createNewTask() {
  const templateId = document.getElementById('task-template')?.value;
  const template = AppData.taskTemplates.find(tt => tt.template_id === templateId);
  const title = template ? (template.nameHi || template.name) : 'Custom Task';
  const assignTo = document.getElementById('task-assign')?.value || 'nephew';
  const assignName = assignTo === 'father' ? 'Papa' : assignTo === 'nephew' ? 'Nephew' : getWorker(assignTo)?.name || assignTo;

  AppData.tasks.push({
    task_id: 'T' + Date.now(),
    template_id: templateId !== 'custom' ? templateId : null,
    title: title,
    titleHi: title,
    description: document.getElementById('task-details')?.value || '',
    due_date: document.getElementById('task-when')?.value || '2026-02-20',
    due_time: document.getElementById('task-time')?.value || '10:00',
    assigned_to: assignTo,
    assigned_to_name: assignName,
    priority: document.getElementById('task-priority')?.value || 'normal',
    status: 'pending',
    recurrence: document.getElementById('task-recurrence')?.value || 'none',
    created_by: AppState.role,
    created_at: new Date().toISOString(),
    completed_at: null,
    completion_note: ''
  });

  closeModal();
  showToast(`✅ Task created for ${assignName}`);
  handleRoute();
}

function createFromTemplate(templateId) {
  const template = AppData.taskTemplates.find(tt => tt.template_id === templateId);
  if (!template) return;

  // Pre-fill the form
  showNewTaskForm();
  setTimeout(() => {
    const sel = document.getElementById('task-template');
    if (sel) sel.value = templateId;
    const time = document.getElementById('task-time');
    if (time && template.default_reminder_time) time.value = template.default_reminder_time;
  }, 100);
}

function showTemplateManager() {
  showModal('📝 Template Manager', `
    ${AppData.taskTemplates.map(tt => `
      <div class="toggle-row">
        <span>${tt.nameHi || tt.name}</span>
        <div class="toggle-switch ${tt.is_active ? 'active' : ''}"
          onclick="toggleTemplate('${tt.template_id}')"></div>
      </div>
    `).join('')}
    <div style="margin-top:16px;">
      ${ActionButton('+ नया Template', `
        closeModal();
        showModal('नया Template', FormTextInput('Template Name', 'new-template-name', {placeholder: 'Task ka naam'})
          + '<div class=\\'modal-actions\\'>'
          + ActionButton('Save', \\"addTemplate()\\", {type:'primary'})
          + '</div>');
      `, { type: 'secondary' })}
    </div>
  `);
}

function toggleTemplate(templateId) {
  const tt = AppData.taskTemplates.find(t => t.template_id === templateId);
  if (tt) {
    tt.is_active = !tt.is_active;
    showToast(tt.is_active ? '✅ Active' : '❌ Inactive');
    // Re-render the modal
    closeModal();
    showTemplateManager();
  }
}
